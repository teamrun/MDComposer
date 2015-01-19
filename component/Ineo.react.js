var React = require('react');
/* React组件名:
 * Ineo, 我即是唯一
 */

var Ineo = React.createClass({
    componentDidMount: function(){
        this.input = this.refs['ineo-input'].getDOMNode();
    },
    render: function(){
        return (
            <div className="ineo">
                <textarea className={"ineo-input"}
                    ref="ineo-input"
                    onKeyDown={this._onKeyDown}
                />
                <div className="size-gen" />
            </div>
        );
    },
    _onKeyDown: function(e){
        if(e.keyCode === 13){
            e.preventDefault();
            var res = this.props.submitHandler(this.input.value);
            if(res.tag == 'code-block'){
                this.input.value = '    ';
            }
            else{
                this.input.value = '';
            }
            
        }
    }
});

module.exports = Ineo;
