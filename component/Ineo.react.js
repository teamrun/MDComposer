var React = require('react');
/* React组件名:
 * Ineo, 我即是唯一
 */

var util = require('../util');

var Ineo = React.createClass({
    getInitialState: function() {
        return {
            content: '',
            inputH: '1.5em'
        };
    },
    componentDidMount: function(){
        this.input = this.refs['ineo-input'].getDOMNode();
        this.sizeGen = this.refs['size-gen'].getDOMNode();
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.manualFocus){
            this.input.focus();
        }
    },
    // 高度重新计算.. 逻辑很复杂啊...
    componentDidUpdate: function(prevProps, prevState) {
        var nowELD = this.props.editLineData, prevELD = prevProps.editLineData;
        // 内容不一样时, 尝试更新高度
        
        if( nowELD ){
            // editline前后两次不是同一行时 定位鼠标
            if( prevELD ){
                if( nowELD.id !== prevELD.id ){
                    this.input.setSelectionRange(nowELD.cursor, nowELD.cursor);
                }
            }
            // 现在edit以前不是edit 要定位
            else{
                this.input.setSelectionRange(nowELD.cursor, nowELD.cursor);
            }
            // 只要是新编辑行 就要重新计算高度
            this.updateHeight();
            return;
        }
        else{
            // 现在没 以前在 也要重新计算
            if(prevELD){
                this.updateHeight();
                return;
            }
        }

        // 前后两次编写的内容有变更 计算
        if(this.state.content !== prevState.content ){
            this.updateHeight();
        }
        
    },
    render: function(){
        var styleObj = {
            height: this.state.inputH
        };
        var editLineData = this.props.editLineData;

        var content = this.state.content||(editLineData? editLineData.raw:'');
        var extraClass = editLineData?editLineData.tag:'';
        // console.log('render...');
        return (
            <div className="ineo" style={this.props.style} onClick={this._onClick}>
                <textarea 
                    className={"ineo-input "+extraClass}
                    ref="ineo-input"
                    style={styleObj}

                    onKeyDown={this._onKeyDown}
                    onPaste={this._onPaste}
                    onChange={this._onChange}

                    value={content}
                >
                </textarea>
                <div 
                    className={"size-gen "+extraClass}
                    ref="size-gen"
                    dangerouslySetInnerHTML={{__html: content.replace(/\ \ /g, ' &nbsp;')}}
                    >
                </div>
            </div>
        );
    },
    _onClick: function(e){
        e.stopPropagation();
    },
    // 同步内容, 控制高度
    _onChange: function(e){
        // console.time('a change');
        var stateObj = {
            content: e.target.value
        };
        this.setState(stateObj);
    },
    // 监控回车, 删除等键
    _onKeyDown: function(e){
        if(e.keyCode === 13){
            e.preventDefault();
            var res = this.props.submitHandler(this.state.content);
            // 控制缩进
            if(res.tag == 'code-block'){
                this.setState({
                    content: '    '
                });
            }
            else{
                this.setState({
                    content: ''
                });
            }
            return;
        }
        if(e.keyCode === 8){
            // 退格键
        }
    },
    // 粘贴时, 获取内容, 插入在鼠标指针处
    _onPaste: function(e){
        // 注意 preventDefault 之后, cmd+z就不能回退了... 好麻烦
        e.preventDefault();
        var self = this;
        var pasteData = e.clipboardData;
        if(pasteData.files.length > 0){

        }
        else{
            var itemArr = [].slice.call(pasteData.items, 0);
            var types = pasteData.types;

            itemArr.forEach(function(item, i){
                // 只处理文本. 其他text/html之类的就略过了
                if(types[i] === 'text/plain'){
                    item.getAsString(function(data){
                        self.insertText(data);
                    });
                }
            });
        }
    },
    // 将文本插入到鼠标指针/划选区域内, 并定位鼠标指针到插入的尾部
    insertText: function(text){
        var nowContent = this.state.content;
        // 输入框中的selection比较特殊, 不能用window.getSelection获得
        var selStart = this.input.selectionStart;
        var selEnd = this.input.selectionEnd;
        var arr = nowContent.split('');
        arr.splice(selStart, selEnd - selStart, text);
        var newContent = arr.join('');
        this.setState({
            content: newContent
        });
        // 定位鼠标指针
        var cursorPos = selStart + text.length;
        this.input.setSelectionRange(cursorPos, cursorPos);
    },
    updateHeight: function(){
        var h = util.getStyleValue( window.getComputedStyle(this.sizeGen).height );
        // console.log('got H', h);
        // console.log('old H', this.state.inputH);
        if(h !== this.state.inputH){
            this.setState({
                inputH: h
            });
        }

    }
});

module.exports = Ineo;
