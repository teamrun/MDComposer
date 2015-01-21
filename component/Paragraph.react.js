var React = require('react/addons');
var assign = require('react/lib/Object.assign');
var CX = React.addons.ClassSet;

var WriterActions = require('../config/WriterActions');


var Paragraph = React.createClass({
    getInitialState: function(){

        return {
            content: this.props.content || '',
            classes: this.props.classes || ''
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
    shouldComponentUpdate: function(nextProps, nextState){
        // 内容有变更时才更新
        var nowContent = this.props.content, nowClass = this.state.classes;
        return (nextProps.content !== nowContent || nextProps.classes !== nowClass);
    },
    componentDidUpdate: function(){
        //
        //console.log('owneeeee updated');
    },
    render: function() {
        return (<div className={"tc-line " + this.state.classes}
                    onClick={this._onClick}
                    dangerouslySetInnerHTML={ {__html: this.state.content} }
                >
                </div>);
    },
    _onClick: function(e){
        /* 点击后会出现range
         * 将range位置, 和 自己的id传给action, action去做输入器的定位
         */
        
        this.props.editLine(this.props.lineId);
        e.stopPropagation();
    }
});

module.exports = Paragraph;
