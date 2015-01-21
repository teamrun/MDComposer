var React = require('react');

var WriterStore = require('../store/WriterStore');
var WriteActions = require('../config/WriterActions');

var Paragraph = require('./Paragraph.react.js');
var Ineo = require('./Ineo.react');

var MD = require('../util/md-with-context');
var util = require('../util');
var SR = require('../util/sr');


// var ENV = 'pro';
var ENV = 'dev';

var debugClasses = {
    pro: '',
    dev: 'dev'
};


var App = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            editData: {},
            ineoStyle: {}
        };
    },
    componentDidMount: function(){
        this.getStoreData();
        WriterStore.addChangeListener(this.getStoreData);

        this.updateInputStyle();
    },
    componentWillUnmount: function(){
        WriterStore.removeChangeListener(this.getStoreData);
    },
    componentDidUpdate: function(){
        //console.log('owner updated');
    },
    componentDidUpdate: function(prevProps, prevState){
        // 如果有新增行, 那么最底部的input就应该更新一下样式
        var prevDate = prevState.data, nowData = this.state.data;
        var lastPrev = prevDate[prevDate.length-1] || {};
        var lastNow = nowData[nowData.length-1] || {};
        if( lastPrev.id !== lastNow.id ){
            this.updateInputStyle();
        }
    },
    render: function() {
        var data = this.state.data;
        /*---------- 渲染line ----------*/
        var LineNodes = data.map(function(d, i){
            return <Paragraph
                key={d.id}
                ref={d.id}
                lineId={d.id}

                content={d.processed}
                classes={d.tag}

                editLine={this.editLine} />;
        }.bind(this));

        /*---------- 编辑框 ----------*/
        var InoeNode = (
            <Ineo 
                submitHandler={this.createDone}
                style={this.state.ineoStyle}
                manualFocus={this.state.inputFocus}
                editLineData={this.state.editLineData} >
            </Ineo>
        );
        
        return (
            <div className={"md-composer "+debugClasses[ENV]} onClick={this._onClick}>
                {this.props.preNodes}
                {LineNodes}
                {InoeNode}
                {this.props.afterNodes}
            </div>
        );
    },
    /* -------------------- 功能函数 -------------------- */
    getStoreData: function(){
        this.setState({
            data: WriterStore.getAll()
        });
    },
    // 输入框绝对定位(只关乎 translateY 和 marginTop ) 以便随时编辑某行(定位到这一行,clone它的class, 填充它的内容 将其遮盖, )
    // 需要重新计算定位的时机: 
    //      写完了新的一行, 回车新建行之后 要将输入框定位到刚渲染好的line直下
    //          此时不需要传lineId
    //      编辑某一行 传lineId
    updateInputStyle: function(lineId){
        var style = {
        };
        var line, y;
        // 编辑某一行
        if(lineId){
            style.marginTop = '0em';
            line = this.refs[lineId].getDOMNode();
            // 不需要计算高度, 由输入组件内部的size-gen来计算( 可能会有闪动~? )
            // var lineStyle = window.getComputedStyle(line);
            // style.height = lineStyle.height;
            
            y = line.offsetTop;
        }
        // 新建的行
        else{
            style.marginTop = '0.25em';
            var datas = this.state.data;
            if(datas.length === 0){
                var comStyle = window.getComputedStyle(this.getDOMNode())
                var paddingTop = util.getStyleValue( comStyle.paddingTop );
                var borderTop = util.getStyleValue( comStyle.borderTopWidth );
                
                y = paddingTop + borderTop;
            }
            else{
                line = this.refs[datas[datas.length-1].id].getDOMNode();
                var lineTop = line.offsetTop;
                var lineStyle = window.getComputedStyle(line);
                var h = util.getStyleValue(lineStyle.height);
                var marginBottom = util.getStyleValue(lineStyle.marginBottom);
                
                y = lineTop + h + marginBottom;
            }
        }

        style.transform = 'translate(0, '+y+'px)';

        this.setState({
            ineoStyle: style
        });
    },
    // 新增行
    createDone: function(raw){
        var ctx = WriterStore.getLast();
        var lastTag = ctx? ctx.tag: undefined;
        var mdData = MD(lastTag, raw);
        WriteActions.createLine(raw, mdData.tag, mdData.htmlWithStart);
        return mdData;
    },
    // 编辑行
    editLine: function(lineId){
        var sel = window.getSelection();
        // 点击中未生成划选, 立即进入编辑状态
        if(sel.isCollapsed){
            this.ineoEditLine(lineId);
        }
    },
    ineoEditLine: function(lineId){
        var selData = SR.getSelection();
        // 获取line数据, 需要tag和raw
        var lineData = WriterStore.getLine(lineId);

        this.setState({
            editLineData: {
                id: lineData.id,
                tag: lineData.tag,
                raw: lineData.raw,
                // 现在设定的是line中没有其他子节点的情况下的鼠标位置
                // 如果有子节点的话 还需要进一步的计算基于line的offset
                cursor: selData.startOffset
            },

            inputFocus: true
        });

        this.updateInputStyle(lineId);
    },
    /* -------------------- 事件处理 -------------------- */
    // 点击到编辑器主体时, 将输入框聚焦, 且定位到最下面
    // 实现这个, 需要 line 和 input 做stopBubble
    _onClick: function(){
        var sel = window.getSelection();
        // 鼠标划选line时 会在父节点形成点击事件
        if(!sel.isCollapsed){
            this.setState({
                inputFocus: false
            });
            return;
        }
        // 聚焦
        this.setState({
            inputFocus: true,
            // 清空之前的editData
            editLineData: false
        });
        // 定位 到新起一行
        this.updateInputStyle();
        // 提交当前行~? 如何提交... 新建的空行, 还是
    }
});

module.exports = App;
