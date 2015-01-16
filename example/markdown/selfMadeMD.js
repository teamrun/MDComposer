/*
 * tag: 
 *      h1 2 3 4 5 6
 *      p
 *      blockquote
 *      ul ol
 *      li
 *      
 *      code
 * 
 * 
 * 
 * 
 * 
 * 
 */
String.prototype.startWith = function(substr) {
    return this.indexOf(substr) == 0;
};


// @param: a line of raw input
// @output:  tag name  and  innerHTML
module.exports = function(raw){
    var tag = '';
    switch(true){
        case (raw.startWith('#')):
            var hashSymbleCount = raw.match(/^\#+/)[0].length;
            tag = 'h'+hashSymbleCount;
            break;
        default:
            tag = 'p'
            break;
    }


    return {
        tag: tag,
        htmlWithStart: raw
    };
}