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
    componentDidUpdate: function(prevProps, prevState) {
        // 内容不一样时, 尝试更新高度
        if(this.state.content !== prevState.content){
            var h = util.getStyleValue( window.getComputedStyle(this.sizeGen).height );
            // console.log('got H', h);
            // console.log('old H', this.state.inputH);
            if(h !== this.state.inputH){
                this.setState({
                    inputH: h
                });
            }
            console.timeEnd('a change');
        }
    },
    render: function(){
        var styleObj = {
            height: this.state.inputH
        };
        // console.log('render...');
        return (
            <div className="ineo" style={this.props.style}>
                <textarea 
                    className={"ineo-input"}
                    ref="ineo-input"
                    style={styleObj}

                    onKeyDown={this._onKeyDown}
                    onPaste={this._onPaste}
                    onChange={this._onChange}

                    value={this.state.content}
                >
                </textarea>
                <div 
                    className="size-gen" 
                    ref="size-gen"
                    dangerouslySetInnerHTML={{__html: this.state.content.replace(/\ \ /g, ' &nbsp;')}}
                    >
                </div>
            </div>
        );
    },
    // 同步内容, 控制高度
    _onChange: function(e){
        console.time('a change');
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
    }
});

module.exports = Ineo;
