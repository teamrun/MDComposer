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

var Paragraph = React.createClass({
    getInitialState: function(){
        if(this.props.processor instanceof Function ){
            this.genContent = this.props.processor;
        }
        else{
            this.genContent = defaultProcessor;
        }
        console.log('a new instanceof this component will render');
        return {
            raw: '',
            processed: 'no out put yet',
            status: 2
        };
    },
    componentDidMount: function(){
        // console.log(this.props.data.id, this.props.focus);
        // if(this.props.focus == true){
        //     this.getDOMNode().focus();
        // }
    },
    componentWillReceiveProps: function(nextProps){
        //console.log(nextProps);
        //console.log('我要接受新props了: ', this.getDOMNode().innerHTML);
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
        var status = this.state.status;
        var content = this.genContent(this.props.data.raw);

        return (
            <div className="tc-line"
                onClick={this._onClick}
            >{ content }</div>
        );
    },
    _onClick: function(){
        /* 点击后会出现range
         * 将range位置, 和 自己的id传给action, action去做输入器的定位
         */
    }
});

module.exports = Paragraph;
