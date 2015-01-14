var WriterDispatcher = require('./WriterDispatcher');
var WriterConstants = require('./WriterConstants');

var WriterActions = {
    /*
     * 完成了一行的编辑, 把写好的内容渲染出来吧~
     * @param: content
     */
    finishThich: function(content){
        WriterDispatcher.dispatch({
            actionType: WriterConstants.Thich_Finish,
            content: content
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