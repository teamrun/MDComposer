var React = require('react');
var TextComposer = require('../../index');

var converter = new Showdown.converter();

var option = {
    insertWay: 'setHtml'
}

var MarkdownEditor = React.createClass({
    render: function(){
        var title = <h2>A self-made markdown editor</h2>;
        return (
            <TextComposer 
                /*about nodes*/
                preNodes={title}
                afterNodes={<span>xxxxxx</span>}

                /* about customize content */
                processor={converter.makeHtml.bind(converter)}
                option={ option }
            />
        );
    }
});

module.exports = MarkdownEditor;