var React = require('react');
var WriterStore = require('../store/WriterStore');

var Paragraph = require('./Paragraph.react.js');
var Ineo = require('./Ineo.react');


/*
 * 都是有哪些可以自定义: 
 *      节点: preNodes, afterNodes: 在正文之前和之后可以插入这些节点
 *      内容处理器 processor: 用户编辑的内容经过这个processor后再渲染
 *      option对象: 
 *          insertWay: 如何插入渲染的内容, 
 *              'content': 安全的方式, 类似innerText
 *              'setHtml': 不安全的方式, 调用 dangerouslySetInnerHTML
 *              'node': 直接return出process后生成的ReactDOM
 *          
*/

var App = React.createClass({
    getInitialState: function(){
        return {data: []};
    },
    componentDidMount: function(){
        this.getStoreData();
        WriterStore.addChangeListener(this.getStoreData);
    },
    componentWillUnmount: function(){
        WriterStore.removeChangeListener(this.getStoreData);
    },
    componentDidUpdate: function(){
        //console.log('owner updated');
    },
    render: function() {
        var data = this.state.data;
        var nodes = data.map(function(d, i){
                var pRender = this.props.getRender(d, i);
                return <Paragraph
                    key={d.id}
                    content={pRender.content}
                    classes={pRender.classes}
                    option={this.props.option}   />;
        }.bind(this));
        
        return (
            <div className="text-composer">
                {this.props.preNodes}
                {nodes}
                <Ineo extraClass={['heading-1', 'code', 'quote']}/>
                {this.props.afterNodes}
            </div>
        );
    },
    getStoreData: function(){
        this.setState({
            data: WriterStore.getAll()
        });
    }
});

module.exports = App;
