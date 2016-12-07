(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

function startState() {
    return {
        // we must remember whether we have encountered at least one visibility token,
        // because only empty lines and comments are allowed before that
        hasVisibilityToken: false,
        // stack of types to be expected next
        // KEYWORD - visibility | filter | modifier
        // STRINGS - one or more strings, with or without quotes
        // NUMBER_FORMULA - number or operator and number
        // NUMBER
        // OPERATOR
        // SOCKETS
        // RARITY_FORMULA - rarity or operator and rarity
        // RARITY
        expected: ['KEYWORD'],

        isVisibility: false,
        previousLineWasVisibility: false,
        isEmptyLine: false,
        previousLineWasEmpty: true,
        currentIndentation: 0,
        lastIndentation: 0
    };
}

function token(stream, state) {
    if (stream.sol()) {
        state.expected = ['KEYWORD'];
        state.previousLineWasEmpty = state.isEmptyLine;
        state.isEmptyLine = false;
        state.previousLineWasVisibility = state.isVisibility;
        state.isVisibility = false;
        state.lastIndentation = state.currentIndentation;
        state.currentIndentation = stream.indentation();

        if (stream.eatSpace()) {
            if (stream.eol()) {
                state.isEmptyLine = true;
            }
            return null;
        }
    }

    // ignore whitespace
    if (stream.eatSpace()) {
        return null;
    }

    if (stream.eol()) {
        return null;
    }

    // comments
    if (stream.eat('#')) {
        stream.skipToEnd();
        return 'comment';
    }

    if (state.expected.length === 0) {
        stream.skipToEnd();
        return 'error';
    }

    var expected = state.expected.pop();

    if (expected === 'KEYWORD') {
        if (matchKeyword(stream, ['Show','Hide'])) {
            state.hasVisibilityToken = true;
            state.isVisibility = true;
            state.expected = [];
            return 'keyword';
        }

        if (!state.hasVisibilityToken) {
            stream.skipToEnd();
            return 'error';
        }

        if (matchKeyword(stream, ['ItemLevel','DropLevel','Quality','Sockets','LinkedSockets','Width','Height'])) {
            state.expected = ['NUMBER_FORMULA'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['Rarity'])) {
            state.expected = ['RARITY_FORMULA'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['Class','BaseType'])) {
            state.expected = ['STRINGS'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['SocketGroup'])) {
            state.expected = ['SOCKETS'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['Identified', 'Corrupted'])) {
            state.expected = ['BOOLEAN'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['SetBackgroundColor','SetBorderColor','SetTextColor'])) {
            state.expected = ['NUMBER','NUMBER','NUMBER','NUMBER'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['SetFontSize'])) {
            state.expected = ['NUMBER'];
            return 'keyword';
        }
        if (matchKeyword(stream, ['PlayAlertSound'])) {
            state.expected = ['NUMBER','NUMBER'];
            return 'keyword';
        }

        stream.skipToEnd();
        return 'error';
    }

    if (expected === 'STRINGS') {
        if (stream.eat('"')) {
            stream.skipTo('"');
            state.expected.push('STRINGS');
            return 'string';
        }
        if (stream.match(/^[a-zA-Z]+/)) {
            state.expected.push('STRINGS');
            return 'string';
        }
        stream.skipToEnd();
        return 'error';
    }

    if (expected === 'NUMBER_FORMULA') {
        state.expected.push('NUMBER');
        if (matchKeyword(stream, [ '<=', '>=', '=', '<', '>' ])) {
            return 'operator';
        }
        return null;
    }

    if (expected === 'RARITY_FORMULA') {
        state.expected.push('RARITY');
        if (matchKeyword(stream, [ '<=', '>=', '=', '<', '>' ])) {
            return 'operator';
        }
        return null;
    }

    if (expected === 'NUMBER') {
        if (stream.match(/^[0-9]+/)) {
            return 'number';
        }
    }

    if (expected === 'BOOLEAN') {
        if (matchKeyword(stream, [ 'True', 'False' ])) {
            return 'atom';
        }
    }

    if (expected === 'OPERATOR') {
        if (matchKeyword(stream, [ '<=', '>=', '=', '<', '>' ])) {
            return 'operator';
        }
    }

    if (expected === 'SOCKETS') {
        if (stream.match(/^\"[RGBW]+\"/)) {
            return 'string';
        }
        if (stream.match(/^[RGBW]+/)) {
            return 'string';
        }
    }

    if (expected === 'RARITY') {
        if (matchKeyword(stream, [ 'Normal', 'Magic', 'Rare', 'Unique' ])) {
            return 'atom';
        }
    }

}

function matchKeyword(stream, keywords) {
    for (var i=0; i < keywords.length; i++) {
        if (stream.match(keywords[i], true, false)) {
            return true;
        }
    }
    return false;
}

function indent(state, textAfter) {
    if (textAfter.startsWith('Show') || textAfter.startsWith('Hide')) {
        return 0;
    }
    if (textAfter.trim().length === 0 || textAfter.trim().startsWith('#')) {
        return CodeMirror.Pass;
    }
    return 4;
}

CodeMirror.defineMode("poe", function(options, modeOptions) {
    var mode = {
        startState: startState,
        token: token,
        lineComment: '#'
    };

    if (modeOptions.autoIndent) {
        mode.indent = indent,
        mode.electricInput = /((Show)|(Hide))$/
    }

    return mode;
});

});
