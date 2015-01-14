var React = require('react');
var WriterActions = require('../config/WriterActions');

/* editing status:
 *      0: editing
 *      1: processing || loading
 *      2: processed || done
 */

function defaultProcessor(raw){
    return raw;
}

function renderContent(){
    var content = this.state.processed;
    return (
        <div className="tc-line"
            onClick={this._onClick}
        >{ content }</div>
    );
}
function renderHtml(){
    var html = { __html: this.state.processed };
    return (
        <div className="tc-line"
            onClick={this._onClick}
            dangerouslySetInnerHTML={html}
        ></div>
    );
}
function renderNode(){
    var node = this.state.processed;
    return node;
}

// 通过传来的props  生成render function 
function getRenderFunc(props){
    var insertWay = props.option.insertWay;
    switch(insertWay){
        case 'content':
            return renderContent;
            break;
        case 'setHtml':
            return renderHtml;
            break;
        case 'node': 
            return renderNode;
            break;
    }
}

var Paragraph = React.createClass({
    getInitialState: function(){
        console.log('getInitialState');
        if(this.props.processor instanceof Function ){
            this.genContent = this.props.processor;
        }
        else{
            this.genContent = defaultProcessor;
        }
        // console.log('a new instanceof this component will render');
        var raw = this.props.data.raw;
        this._render = getRenderFunc(this.props).bind(this);
        return {
            raw: raw,
            processed: this.genContent(raw)
        };
    },
    componentWillMount: function(){
        console.log('componentWillMount');
    },
    componentDidMount: function(){
        console.log('componentDidMount');
        // console.log(this.props.data.id, this.props.focus);
        // if(this.props.focus == true){
        //     this.getDOMNode().focus();
        // }
    },
    componentWillReceiveProps: function(nextProps){
        console.log('componentWillReceiveProps');
        // 尽管后面shouldUpdata会有判断 但是还是要减少一次计算
        if(nextProps.data.raw !== this.props.data.raw){
            this.setState({
                processed: this.genContent(nextProps.data.raw)
            });
        }
        
    },
    shouldComponentUpdate: function(nextProps, nextState){
        // 内容有变更时才更新
        console.log('checking for should update');
        return nextProps.data.raw !== this.props.data.raw;
    },
    componentDidUpdate: function(){
        //
        //console.log('owneeeee updated');
    },
    render: function() {
        return this._render();
        // var content = this.state.processed;
        // return (
        //     <div className="tc-line"
        //         onClick={this._onClick}
        //     >{ content }</div>
        // );
    },
    _onClick: function(){
        /* 点击后会出现range
         * 将range位置, 和 自己的id传给action, action去做输入器的定位
         */
    }
});

module.exports = Paragraph;
