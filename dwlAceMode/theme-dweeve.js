ace.define("ace/theme/dweeve",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-dweeve";
exports.cssText = "\
.ace-dweeve .ace_gutter {\
background: #e8e8e8;\
color: #AAA;\
}\
.ace-dweeve  {\
background: #fff;\
color: #000;\
}\
.ace-dweeve .ace_keyword {\
color: #0020a0;\
font-weight: bold;\
}\
.ace-dweeve .ace_string {\
color: #D14;\
}\
.ace-dweeve .ace_variable.ace_class {\
color: teal;\
}\
.ace-dweeve .ace_constant.ace_numeric {\
color: #099;\
}\
.ace-dweeve .ace_constant.ace_buildin {\
color: #0086B3;\
}\
.ace-dweeve .ace_support.ace_function {\
color: #00b386;\
}\
.ace-dweeve .ace_comment {\
color: #998;\
font-style: italic;\
}\
.ace-dweeve .ace_variable.ace_language  {\
color: #701000;\
}\
.ace-dweeve .ace_paren {\
font-weight: bold;\
}\
.ace-dweeve .ace_boolean {\
font-weight: bold;\
}\
.ace-dweeve .ace_string.ace_regexp {\
color: #009926;\
font-weight: normal;\
}\
.ace-dweeve .ace_variable.ace_instance {\
color: teal;\
}\
.ace-dweeve .ace_constant.ace_language {\
font-weight: bold;\
}\
.ace-dweeve .ace_cursor {\
color: black;\
}\
.ace-dweeve.ace_focus .ace_marker-layer .ace_active-line {\
background: rgb(255, 255, 204);\
}\
.ace-dweeve .ace_marker-layer .ace_active-line {\
background: rgb(245, 245, 245);\
}\
.ace-dweeve .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-dweeve.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
}\
.ace-dweeve.ace_nobold .ace_line > span {\
font-weight: normal !important;\
}\
.ace-dweeve .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-dweeve .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-dweeve .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-dweeve .ace_gutter-active-line {\
background-color : rgba(0, 0, 0, 0.07);\
}\
.ace-dweeve .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-dweeve .ace_invisible {\
color: #BFBFBF\
}\
.ace-dweeve .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-dweeve .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    ace.require(["ace/theme/dweeve"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            