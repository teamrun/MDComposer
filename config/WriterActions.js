var WriterDispatcher = require('./WriterDispatcher');
var WriterConstants = require('./WriterConstants');

var WriterActions = {
    /*
     * 完成了一行的编辑, 把写好的内容渲染出来吧~
     * @param: content
     */
    createLine: function(raw, tag, processed){
        WriterDispatcher.dispatch({
            actionType: WriterConstants.LINE_CREATE,
            raw: raw,
            processed: processed,
            tag: tag
        });
    },
    /*
     * @param: id: after which paragraph
     */
    removePgph: function(id){
        WriterDispatcher.dispatch({
            //actionType: WriterConstants.morePgph,
            id: id
        });
    }
};

module.exports = WriterActions;