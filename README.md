# Composer
A composer/editor build with react

## How to use
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
