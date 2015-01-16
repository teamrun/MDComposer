var React = require('react');
var TextComposer = require('../../index');

var getMD = require('./selfMadeMD');

var converter = new Showdown.converter();

var option = {
    insertWay: 'setHtml'
}

var tcLineStateGen = function(raw){
    var mdData = getMD(raw);
    return {
        processed: mdData.htmlWithStart,
        extraClasses: [mdData.tag]
    }
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
                stateGen={ tcLineStateGen }
                option={ option }
            />
        );
    }
});

module.exports = MarkdownEditor;