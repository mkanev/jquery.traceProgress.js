(function ($) {
    var pluginName = 'traceProgress'
        , _defaults = {
            hintWidth: 200 //
            , hintPosition: 'right' //
            , hintOffset: 14 //
            , hintFontSize: 14 //
            , hintFontColor: 'ecf0f1' //
            , hintBackgroundColor: '27ae60' //
            , hintInvalidBackgroundColor: 'd35400' //
            , hintPaddingTop: 4 //
            , hintPaddingRight: 12 //
            , hintPaddingBottom: 6 //
            , hintPaddingLeft: 8 //
            , traceRequired: true //
            , showHelper: true //
            , showProgressBar: true //
        };
    var dataHolderLabel = '[data-holder]' //
        , dataHelperLabel = 'data-helper' //
        ;
    $.fn[pluginName] = function (options) {
        var pluginOptions = $.extend({}, _defaults, options);
        var hintHolders = this.find(dataHolderLabel);
        var hintCount = hintHolders.length;
        hintHolders.each(function (idx) {
            var $this = $(this);
            var progressHint = $this.attr(dataHelperLabel) //
                , isRequired = $this.attr('required') && true //
                ;
            var curTop = $this.offset().top //
                , curLeft = $this.offset().left //
                , hintHtml = $('<div class=\"hintHolder\" style=\"position: absolute; text-align: justify; border-radius: 3.1875px;\">' + //
                    '<span class=\"hintHelper\" style=\"display: ' + (pluginOptions.showHelper ? 'block' : 'none') + '\">' + progressHint + '</span>' + //
                    '<span class=\"hintProgress\" style=\"text-align: right; display: ' + (pluginOptions.showProgressBar ? 'block' : 'none') + '\">Progress: ' + (idx / hintCount * 100) + '%</span>' + //
                    '</div>') //
                ;
            var hintLeft = curLeft + $this.outerWidth() + pluginOptions.hintOffset //
                , hintTop = curTop - hintHtml.outerHeight() / 2 - pluginOptions.hintPaddingTop //
                ;
            if (pluginOptions.hintPosition === 'left') {
                hintLeft = curLeft - pluginOptions.hintWidth - pluginOptions.hintPaddingLeft - pluginOptions.hintPaddingRight - pluginOptions.hintOffset;
            }
            hintHtml.width(pluginOptions.hintWidth);
            hintHtml.css({
                'font-size': pluginOptions.hintFontSize + 'px' //
                , 'color': '#' + pluginOptions.hintFontColor //
                , 'background-color': '#' + pluginOptions.hintBackgroundColor //
                , 'line-height': pluginOptions.hintFontSize + 4 + 'px' //
                , 'padding': pluginOptions.hintPaddingTop + 'px ' + pluginOptions.hintPaddingRight + 'px ' + pluginOptions.hintPaddingBottom + 'px ' + pluginOptions.hintPaddingLeft + 'px ' //
                , 'left': hintLeft + 'px' //
                , 'top': hintTop + 'px' //
            });
            hintHtml.hide();
            $this.parent().prepend(hintHtml);
            $this.on('live focus change', function () {
                hintHtml.show();
            });
            $this.on('focusout', function (eventObject) {
                var fieldValue = $(eventObject.target).val();
                if (pluginOptions.traceRequired && isRequired && fieldValue.length === 0) {
                    hintHtml.css('background-color', '#' + pluginOptions.hintInvalidBackgroundColor);
                    return;
                }
                hintHtml.css('background-color', '#' + pluginOptions.hintBackgroundColor);
                hintHtml.hide();
            });
        });
    };
})(jQuery);