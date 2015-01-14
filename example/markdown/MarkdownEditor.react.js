var React = require('react');
var TextComposer = require('../../index');

var MarkdownEditor = React.createClass({
    render: function(){
        var title = <h2>A self-made markdown editor</h2>;
        return (
            <TextComposer preNodes={title} afterNodes={<span>xxxxxx</span>}/>
        );
    }
});

module.exports = MarkdownEditor;