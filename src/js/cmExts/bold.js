'use strict';

var boldRegex = /^[\*_]{2,}[^\*_]*[\*_]{2,}$/;
var Bold = {
    name: 'Bold',
    type: 'md',
    fn: function bold(cm) {
        if (cm.getOption("disableInput")) {
            return CodeMirror.Pass;
        }

        cm.execCommand('singleSelection');

        function isNeedRemove(text) {
            return boldRegex.test(text);
        }

        function append(text) {
            return '**' + text + '**';
        }

        function remove(text) {
            return text.substr(2, text.length - 4);
        }

        var doc = cm.getDoc();
        var cursor = doc.getCursor();
        var selection = doc.getSelection();
        var result = isNeedRemove(selection) ? remove(selection) : append(selection);

        console.log(selection);
        console.log(result);

        doc.replaceSelection(result, 'around');

        if (!selection) {
            console.log(cursor);
            doc.setCursor(cursor.line, cursor.ch + 2);
        }
    },
    keyMap: ['Ctrl-B', 'Cmd-B']
};

module.exports = Bold;