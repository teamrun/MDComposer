var React = require('react');
var TextComposer = require('../../index');

var getMD = require('./selfMadeMD');

// var converter = new Showdown.converter();

require('./layout/layout.less');

var option = {
    insertWay: 'setHtml'
}

// 获取Paragraph渲染需要的东西:  content, classes
var getRender = function(lineData, index){
    var mdData = getMD(lineData.raw);
    return {
        content: mdData.htmlWithStart,
        classes: mdData.tag
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
                getRender={getRender}
                option={ option }
            />
        );
    }
});

module.exports = MarkdownEditor;