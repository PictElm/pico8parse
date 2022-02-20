/*-*/;(function() {
  window.makeColoredTextarea = _makeColoredTextarea;

  function _makeColoredTextarea(elm, lex) {
    var par = document.createElement('div')
      , div = par.appendChild(document.createElement('div'))
      , r = {
            element: par
          , textarea: elm
          , update: function() {
              var style = window.getComputedStyle(elm);
              par.setAttribute('style',
                  "width:"
                + elm.clientWidth
                + "px;height:"
                + elm.clientHeight
                + "px;top:"
                + elm.offsetTop
                + "px;left:"
                + elm.offsetLeft
                + "px;position:absolute;pointer-events:none;overflow:hidden;z-index:42"
              );
              div.setAttribute('style',
                  "width:"
                + elm.scrollWidth
                + "px;height:"
                + elm.scrollHeight
                + "px;top:"
                + (__getPixelValue('padding-top')+__getPixelValue('border-top-width') - elm.scrollTop)
                + "px;left:"
                + (__getPixelValue('padding-left')+__getPixelValue('border-left-width') - elm.scrollLeft)
                + "px;position:absolute;color:"
                + style.getPropertyValue('color')
                + ";font:"
                // XXX: https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertyvalue ("4. Return the empty string."?)
                + style.getPropertyValue('font')
                + ";font-weight:700"
              );
              function __getPixelValue(property) {
                return parseInt(style.getPropertyValue(property));
              }
            }
          , redraw: function() {
              r.update();
              div.textContent = "";
              var text = elm.value
                , index = 0
                , skipped = ""
                , matched = ""
                , s = {
                      peek: function(search) {
                        if (search instanceof RegExp) {
                          var m = text.match(search);
                          if (m) return m[0];
                        } else if (text.startsWith(search)) return search;
                      }
                    , skip: function(search) {
                        var m = s.peek(search);
                        if (m) {
                          text = text.slice(m.length);
                          index+= m.length;
                          skipped+= m;
                          return m;
                        }
                      }
                    , next: function(search) {
                        var m = s.peek(search);
                        if (m) {
                          text = text.slice(m.length);
                          index+= m.length;
                          matched+= m;
                          return m;
                        }
                      }
                  };
              var limit_iter = 16611 // note: this is a lot, probly too much
                , lexer = lex();
              while ("" !== text && 0 <-- limit_iter) {
                var previous = index
                  , token = lexer(s);
                if (skipped && (matched || "" === text)) {
                  __appendSpan(skipped);
                  skipped = "";
                }
                if (matched) {
                  __appendSpan(matched).setAttribute('class', token.join ? token.join(" ") : token);
                  matched = "";
                }
                if (!token || previous === index) break;
              }
              if (!limit_iter) console.warn("lexer token limit reached (maybe too much text?)");
              if ("" !== skipped) __appendSpan(skipped);
              if ("" !== text) __appendSpan(text);
              function __appendSpan(content) {
                  var span = div.appendChild(document.createElement('span'))
                    , lines = content.split("\n");
                  for (var k = 0; k < lines.length; k++) {
                    if (k) span.appendChild(document.createElement('br'));  // vv XXX: no handling of eg '\t'...
                    span.appendChild(document.createTextNode(lines[k].replace(/\s/g, "\u00A0")));
                  }
                  return span;
              }
            }
        };
    var revertStyle = elm.getAttribute('style') || ""
      , interval = setInterval(__handleReshape, 125);
    elm.setAttribute('style', revertStyle + ";font-weight:100;color:#888");
    par.addEventListener('click', __handleClick);
    elm.addEventListener('scroll', r.update);
    elm.addEventListener('input', r.redraw);
    elm.addEventListener('keydown', __handleTabulation);
    window.addEventListener('resize', r.update);
    document.body.insertBefore(par, null);
    return r;
    function __handleClick() {
      console.warn("no click-through, removing coloration... sorry");
      clearInterval(interval);
      elm.setAttribute('style', revertStyle);
      par.removeEventListener('click', __handleClick);
      elm.removeEventListener('scroll', r.update);
      elm.removeEventListener('input', r.redraw);
      elm.removeEventListener('keydown', __handleTabulation);
      window.removeEventListener('resize', r.update);
      document.body.removeChild(par);
      elm.focus();
    }
    function __handleTabulation(e) {
      if (9 === e.keyCode) {
        elm.setRangeText("    ", elm.selectionStart, elm.selectionStart, 'end');
        r.redraw();
        e.preventDefault();
      }
    }
    function __handleReshape() {
      if (elm.clientWidth !== par.clientWidth
       || elm.clientHeight !== par.clientHeight
       || elm.offsetTop !== par.offsetTop
       || elm.offsetLeft !== par.offsetLeft
         ) r.update();
    }
  }
})();
