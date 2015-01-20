// 考虑到上下文的md渲染
// markdown compiler with taking context into consideration

var smd = require('./selfmade-md');

// @param: ctx: 需要考虑的上一个line的tag类型
// 比较特殊的是 
//      ~~1. p后面紧跟img/a: 生成的内容会和p在一起, 属于同一行      p>img/a ~~
//      ~~  空行 才会生成单独一块儿的img/a     p+p>img/a ~~
//      1. 不用考虑img和a, 他们一直是inline的元素, 块儿的只不过是这个p里没别的内容
//      2. p后面紧跟四个空格的code-block: 不会生成code          p
//          空行 才会生成code:     p+pre>code

//      3. p后面紧跟li:  会按直觉生成正常的         p+ul>li
//      4. p后面紧跟quote:  正常     p+blockquote
//          quote后面也是必须有空行, 否则都会记在quote中
//      5. p后面紧跟heading: 正常

// 难点: 1&4如何将另一个line加到上一个line, 表现为行内...

var mdWithContext = function(ctx, raw){
    var mdData = smd(raw);
    var consideredTag = mdData.tag;
    var thisTag = mdData.tag;
    if( ctx === 'p' &&  thisTag === 'code-block'  ){
        consideredTag = 'p';
        // switch(mdData.tag){
        //     case 'code-block':
        //         consideredTag = 'p';
        //         break;
        // }
    }
    // quote之后必须跟一个空行才可以
    if( ctx === 'quote' && thisTag !== 'empty' ){
        consideredTag = 'quote md-inline';
    }

    if( thisTag === 'list-item' && ctx !== 'list-item' ){
        consideredTag = 'list-item first-item';
    }

    mdData.tag = consideredTag;
    return mdData;
}

module.exports = mdWithContext;