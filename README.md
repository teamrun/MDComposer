# Composer
A composer/editor build with react

## How to require
if you use webpack, you can use it with style in it(thanks to webpack's almighty bundle feature)

    var TextComposer = require('text-composer');

    var MyEditor = React.createClass({
        render: function(){
            return <TextComposer
                processor={someFunc}
            />;
        }
    });

if you use other build tools, like gulp grunt browserify:

    // in js
    var TextComposer = require('text-composer');

    // import style with less
    @import 'path/to/component/layout/less/layout.less';

    // or import style in html
    ...


## How to create your own editor based on this 

     * 都是有哪些可以自定义: 
     *      节点: preNodes, afterNodes: 在正文之前和之后可以插入这些节点
     *      内容渲染组件的所需要的props: getRender: 接收要渲染的数据, 计算出渲染的内容
     *      option对象: 
     *          insertWay: 如何插入渲染的内容, 
     *              'content': 安全的方式, 类似innerText
     *              'setHtml': 不安全的方式, 调用 dangerouslySetInnerHTML
     *              'node': 直接return出process后生成的ReactDOM