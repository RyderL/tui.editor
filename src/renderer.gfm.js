/**
 * @fileoverview Implements gfmRenderer
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var Renderer = require('./renderer'),
    basicRenderer = require('./renderer.basic');
/*
var FIND_LAST_RETURN_RX = /\n$/g,
    START_OF_LINES_RX = /^/gm;
*/

/**
 * gfmRenderer
 * github flavored Markdown Renderer
 * @exports gfmRenderer
 * @augments Renderer
 */
var gfmRenderer = Renderer.factory(basicRenderer, {
    'PRE CODE': function(node, subContent) {
        var language = '';

        if (node.getAttribute('data-language')) {
            language = ' ' + node.getAttribute('data-language');
        }

        return '\n```' + language + '\n' + subContent + '\n```\n';
    },
    'LI INPUT': function(node) {
        var condition;

        if (node.type !== 'checkbox') {
            return;
        }

        condition = node.checked ? 'x' : ' ';

        return '[' + condition + ']';
    },

    //Table
    'TR TD, TR TH': function(node, subContent) {
        return ' ' + subContent + ' |';
    },
    'TR': function(node, subContent) {
        return '|' + subContent + '\n';
    },
    'THEAD': function(node, sbContent) {
        var i, ths, thsLength, align, leftAlignValue, rightAlignValue, textLength,
            result = '';

        if (!node.firstChild || node.firstChild.tagName !== 'TR' || node.firstChild.firstChild.tagName !== 'TH') {
            return;
        }

        ths = node.firstChild.childNodes;
        thsLength = ths.length;

        for (i = 0; i < thsLength; i++){
            align = ths[i].align;
            textLength = ths[i].innerText.length;
            leftAlignValue = '';
            rightAlignValue = '';

            if (align) {
               if (align === 'left') {
                    leftAlignValue = ':';
                    textLength -= 1;
               } else if (align === 'right') {
                    rightAlignValue = ':';
                    textLength -= 1;
               } else if (align === 'center') {
                    rightAlignValue = ':';
                    leftAlignValue = ':';
                    textLength -= 2;
               }
            }

            result += ' ' + leftAlignValue + repeatString('=', textLength) + rightAlignValue + ' |';
        }

        return sbContent + '|' + result + '\n';
    }
});

function repeatString(pattern, count) {
    var result = pattern;

    while (count > 1) {
        result += pattern;
        count--;
    }

    return result;
}
module.exports = gfmRenderer;