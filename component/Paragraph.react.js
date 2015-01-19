var React = require('react/addons');
var assign = require('react/lib/Object.assign');
var CX = React.addons.ClassSet;

var WriterActions = require('../config/WriterActions');


// 通过传来的props  生成render function 
function getRenderFunc(props){
    var insertWay = props.option.insertWay;
    
    switch(insertWay){
        case 'content':
            return function(){
                var content = this.state.content;
                var extraClasses = this.state.classes;
                return (<div className={"tc-line " + extraClasses}
                    onClick={this._onClick}>
                    {content}
                </div>)
            };
        case 'setHtml':
            return function(){
                var content = this.state.content;
                var extraClasses = this.state.classes;
                return (<div className={"tc-line " + extraClasses}
                    onClick={this._onClick} 
                    dangerouslySetInnerHTML={ {__html: content} }
                    >
                </div>)
            };
        // case 'node': 
        //     return renderNode;
        //     break;
    }
}


var Paragraph = React.createClass({
    getInitialState: function(){
        
        this._render = getRenderFunc(this.props).bind(this);

        return {
            content: this.props.content,
            classes: this.props.classes
        };
    },
    componentWillMount: function(){
        // console.log('componentWillMount');
    },
    componentDidMount: function(){
        // console.log('componentDidMount');
    },
    componentWillReceiveProps: function(nextProps){
        // console.log('componentWillReceiveProps');
        // 尽管后面shouldUpdata会有判断 但是还是要减少一次计算
    },
    // shouldComponentUpdate: function(nextProps, nextState){
    //     // 内容有变更时才更新
    //     // console.log('checking for should update');
    //     // return nextProps.data.raw !== this.props.data.raw;
    // },
    componentDidUpdate: function(){
        //
        //console.log('owneeeee updated');
    },
    render: function() {
        return this._render();
    },
    _onClick: function(){
        /* 点击后会出现range
         * 将range位置, 和 自己的id传给action, action去做输入器的定位
         */
    }
});

module.exports = Paragraph;
