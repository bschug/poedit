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
      'Rarity','Class','BaseType','SocketGroup','Identified','Corrupted',
      'ShaperItem','ElderItem','ShapedMap','MapTier',
      'SetBackgroundColor','SetBorderColor','SetTextColor','SetFontSize','PlayAlertSound','PlayAlertSoundPositional',
      'DisableDropSound', 'CustomAlertSound', 'MinimapIcon', 'PlayEffect'
  ];

  var RARITIES = [
      'Normal','Magic','Rare','Unique'
  ];

  var COLOR_NAMES = [
      'Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow'
  ];

  var ICON_SHAPES = [
      'Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle'
  ];

  var BOOLEANS = [
      'True','False'
  ];

  var OPERATORS = [
      '=', '<', '>', '<=', '>='
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
      var lineStr = cm.getLine( cur.line );

      if (line.length === 0) {
          return KEYWORDS;
      }

      if (token.start === line[0].start) {
          // Don't show suggestions if current text is already a valid keyword
          if (ArrayUtils.contains(KEYWORDS, token.string)) {
              return [];
          }
          return KEYWORDS.filter( function(kw) {
              return kw.startsWith( token.string ) && kw !== token.string;
          });
      }

      if (line[0].string === 'Rarity') {
          // If we are still writing the operator, only show the
          // rarity suggestions once there is a space after the operator
          if (line.length == 2 && ArrayUtils.contains(OPERATORS, line[1].string)) {
              if (!StrUtils.endsWith( lineStr, ' ' )) {
                  return [];
              }
          }
          return RARITIES.filter( function(r) {
              return r.startsWith( token.string )
          });
      }

      if (line[0].string === 'PlayEffect') {
          var endsWithSpace = StrUtils.endsWith( lineStr, ' ' );
          if (line.length == 1 && endsWithSpace) {
              return COLOR_NAMES;
          }
          return COLOR_NAMES.filter( function(c) {
              return c.startsWith( token.string );
          })
      }

      if (line[0].string === 'MinimapIcon') {
          var endsWithSpace = StrUtils.endsWith( lineStr, ' ' );
          if (line.length == 2 && endsWithSpace) {
              return COLOR_NAMES;
          }
          if (line.length == 3 && !endsWithSpace) {
              return COLOR_NAMES.filter( function(c) {
                  return c.startsWith( token.string );
              });
          }
          if (line.length == 3 && endsWithSpace) {
              return ICON_SHAPES;
          }
          if (line.length == 4 && !endsWithSpace) {
              return ICON_SHAPES.filter( function(s) {
                  return s.startsWith( token.string );
              });
          }
      }

      if (['Identified','Corrupted','ElderItem','ShaperItem','ShapedMap'].indexOf( line[0].string ) >= 0) {
          if (line.length > 1) { return []; }
          if (!ArrayUtils.contains(BOOLEANS, token.string)) {
              return BOOLEANS;
          }
      }

      return [];
  }

  CodeMirror.registerHelper("hint", "poe", function(cm, options) {
    options.words = getHintWords(cm, options);
    return hintFromList(cm, options);
  });

});
