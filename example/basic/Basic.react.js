var React = require('react');
var TextComposer = require('../../index');

var BasicUsage = React.createClass({
    render: function(){
        var title = <h2>Text xxxx</h2>;
        return (
            <TextComposer preNodes={title} afterNodes={<span>x</span>}/>
        );
    }
});

module.exports = BasicUsage;