var EventEmmiter = require('events').EventEmitter;
var shortId = require('shortid');
var assign = require('react/lib/Object.assign');
var WriterDispather = require('../config/WriterDispatcher');
var WriterConstants = require('../config/WriterConstants');



// 应该有个顺序, 否则insertAfter会不太好实现
var WriterData = {};
var DataOrder = [];
var focusIndex=0;

function objAttrCount(obj){
    var res = 0;
    for(var i in obj){
        res ++;
    }
    return res;
}

function createLine(lineObj){
    var newId = shortId.generate();
    lineObj.id = newId;
    WriterData[newId] = lineObj;
    DataOrder.push(newId);
}


var WriteStore = assign({}, EventEmmiter.prototype, {
    getAll: function(){
        var arr = [];
        for(var i in WriterData){
            arr.push(WriterData[i]);
        }
        return arr;
    },
    getLast: function(){
        var lastId = DataOrder[DataOrder.length-1];
        return WriterData[lastId];
    },
    getFocus: function(){
        return focusIndex;
    },
    emitChange: function(){
        this.emit('change');
    },
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    }
});


WriterDispather.register(function(action){
    var type = action.actionType;

    switch (type){
        case WriterConstants.LINE_CREATE:
            var lineObj = {
                raw: action.raw,
                processed: action.processed,
                tag: action.tag
            };
            createLine(lineObj);
            WriteStore.emitChange();
            break;
        default :
            console.log('no handler...');
    }
});

module.exports = WriteStore;