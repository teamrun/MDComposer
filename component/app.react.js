var React = require('react');

var WriterStore = require('../store/WriterStore');
var WriteActions = require('../config/WriterActions');

var Paragraph = require('./Paragraph.react.js');
var Ineo = require('./Ineo.react');

var MD = require('../markdown/md-with-context');



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
                return <Paragraph
                    key={d.id} 
                    content={d.processed}
                    classes={d.tag} />;
        }.bind(this));
        
        return (
            <div className="md-composer">
                {this.props.preNodes}
                {nodes}
                <Ineo submitHandler={this.editDone}/>
                {this.props.afterNodes}
            </div>
        );
    },
    getStoreData: function(){
        this.setState({
            data: WriterStore.getAll()
        });
    },
    editDone: function(raw){
        var ctx = WriterStore.getLast();
        var lastTag = ctx? ctx.tag: undefined;
        var mdData = MD(lastTag, raw);
        WriteActions.createLine(raw, mdData.tag, mdData.htmlWithStart);
        return mdData;
    }
});

module.exports = App;
