(function($) {

    $.fn.rainbowText = function(options) {
if(!$(this).length) return;
        var settings = $.extend({
            timer: 80,
            delay: 800,
            colors: ["#330000","#AA0000","#FF0000","#FF3300","#333300","#AAAA00","#FFFF00","#33AA00","#00AA00","#00FF00","#00FFAA","#00AAAA","#00FFFF","#00AAFF","#0000AA","#0000FF","#3300FF","#AA00FF","#AA00FF","#AA00AA","#FF00AA","#AA33AA","#AAAAAA","#CCCCCC","#888888","#333333"],
            word: true
        }, options);
        var new_ele_html = '';
        var thisRainbow = this;
        var text_tree = [];
        if($(this).children().length > 0){
        text_tree = childTree(this);
    }else{
        text_tree.push($(this).text());
    }
        var rainText = [];
        var testing = [];
        var rainCount;
        if (text_tree.length) {
            for (tree_len = 0; tree_len < text_tree.length; tree_len++) {
                if (text_tree[tree_len].charCodeAt(0) !== 60) {
                    if(settings.word){
                        var newText = '';
newText += '<rgb>' + text_tree[tree_len] + '<rgb>';
                    }else{
                    rainText = text_tree[tree_len].split("");
                    var newText = '';
                    for (var g = 0; g < rainText.length; g++) {
                        newText += '<rgb>' + rainText[g] + '</rgb>';
                    }
                }
                    text_tree[tree_len] = newText;
                }
            }

            for (var i = 0; i < text_tree.length; i++) {
                new_ele_html += text_tree[i];
            }

            
            $(thisRainbow).html(new_ele_html);
var rgbcount = 0;
        var IntervalToken = setInterval(function(){
              rgbchange($(thisRainbow).children('rgb')[rgbcount],0);
              rgbcount++;
              if(rgbcount === $(thisRainbow).children('rgb').length){
                  clearInterval(IntervalToken);
              }
        },settings.timer);
        }

/* span should be custom created rgb tag <rgb></rgb>, color is the index of the color to animate to*/
            var colorCount = settings.colors.length;
            function rgbchange(span,color) {
            
                $(span).animate({color: settings.colors[color]}, settings.delay, function() {
                    var nextColor = color + 1;
                    if(nextColor === colorCount){
                        nextColor = 0;
                    }
                     rgbchange(this,nextColor);
                });
            }

            
            
            function childTree(element) {
    if(!$(element).html()) return;
    var open = false;
    var $element = $(element);
    var element_html = $element.html().trim();
    /*var element_count = ($(selection).children().length * 2);*/
    var element_tree = [];
    for (i = 0; i < element_html.length; i++) {
        if (element_html.charCodeAt(i) === 60 || !open && element_html.charCodeAt(i) !== 62) {
            open = true;
            element_tree.push(element_html.charAt(i));
        } else if (open && element_html.charCodeAt(i) !== 62) {
            element_tree[(element_tree.length - 1)] += element_html.charAt(i);
        } else if (open && element_html.charCodeAt(i) === 62) {
            element_tree[(element_tree.length - 1)] += element_html.charAt(i);
            open = false;
        } else if (!open) {
            if (element_tree.length && element_tree[(element_tree.length - 1)].charCodeAt(0) !== 60) {
                element_tree[(element_tree.length - 1)] += element_html.charAt(i);
            } else {
                element_tree.push(element_html.charAt(i));
            }
        }


    }
    for (var g = 0; g < element_tree.length; g++) {
        element_tree[g] = element_tree[g].trim();
        if (!element_tree[g]) {
            element_tree.splice(g, 1);
        }
    }
    return element_tree;
}

        
    };
}(jQuery));

