// operation for selection and range
// selection 和 range 相关的操作

// 注: 先只做现代浏览器的HTMLInputElement的支持吧...
var SR =  {
    // 将鼠标指针置于某个位置
    // 实际上就是创建一个collapse的range
    placeCursor: function(ele, pos){
        SR.setSelection(ele, pos);
    },
    // 创建划选高亮的区域
    setSelection: function(ele, start, end){
        var tagName = ele.tagName.toLowerCase();
        if(tagName === 'input' || tagName=== 'textarea'){
            ele.setSelectionRange( start, end||start);    
        }
        else{
            console.warn(ele, ' is not a HTMLInputElement, range operation not supported yet');
        }
    },
    getSelection: function(){
        var sel = window.getSelection();
        var startNode, endNode, startOffset, endOffset;
        startNode = getSelectionNode(sel.anchorNode);
        endNode = getSelectionNode(sel.focusNode);

        return {
            startNode: startNode,
            endNode: endNode,
            startOffset: sel.anchorOffset,
            endOffset: sel.focusOffset
        };
    }
};

function getSelectionNode(selNode){
    var node = undefined;
    if(selNode.nodeType === 3){
        node = selNode.parentNode;
    }
    else if(selNode.nodeType === 1){
        node = selNode;
    }
    return node;
}


module.exports = SR;