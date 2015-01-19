var React = require('react');
var WriterStore = require('../store/WriterStore');

var Paragraph = require('./Paragraph.react.js');
var Ineo = require('./Ineo.react');



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
                    content={d.raw}
                    classes={'p'} />;
        }.bind(this));
        
        return (
            <div className="md-composer">
                {this.props.preNodes}
                {nodes}
                <Ineo />
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
