(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var KEYWORDS = [
      'Show','Hide',
      'ItemLevel','DropLevel','Quality','Sockets','LinkedSockets','Width','Height',
      'Rarity','Class','BaseType','SocketGroup',
      'SetBackgroundColor','SetBorderColor','SetTextColor','SetFontSize','PlayAlertSound'
  ];

  var RARITIES = [
      'Normal','Magic','Rare','Unique'
  ];

  function hintFromList (cm, options) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    var to = CodeMirror.Pos(cur.line, token.end);
    if (token.string && /\w/.test(token.string[token.string.length - 1])) {
      var term = token.string, from = CodeMirror.Pos(cur.line, token.start);
    } else {
      var term = "", from = to;
    }
    var found = [];
    for (var i = 0; i < options.words.length; i++) {
      var word = options.words[i];
      if (word.slice(0, term.length) == term)
        found.push(word);
    }

    if (found.length) return {list: found, from: from, to: to};
  }

  function getHintWords (cm, options) {
      var cur = cm.getCursor(), token = cm.getTokenAt(cur);
      var line = cm.getLineTokens( cur.line ).filter( function(t) { return t.type; }) ;

      if (line.length === 0) {
          return KEYWORDS;
      }

      if (token.start === line[0].start) {
          if (ArrayUtils.contains(KEYWORDS, token.string)) {
              return [];
          }
          return KEYWORDS.filter( function(kw) {
              return kw.startsWith( token.string ) && kw !== token.string;
          });
      }

      if (line[0].string === 'Rarity') {
          return RARITIES;
      }

      return [];
  }

  CodeMirror.registerHelper("hint", "poe", function(cm, options) {
    options.words = getHintWords(cm, options);
    return hintFromList(cm, options);
  });

});
