/**
 * Created with JetBrains WebStorm.
 * User: Maksim.Kanev
 * Date: 07.10.13
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    var pluginName = 'traceProgress'
        , _defaults = {
            hintWidth: 200 //
            , hintPosition: 'right' //
            , hintOffset: 14 //
            , hintFontSize: 14 //
            , hintFontColor: 'ecf0f1' //
            , hintBackgroundColor: '27ae60' //
            , hintPaddingTop: 4 //
            , hintPaddingRight: 12 //
            , hintPaddingBottom: 6 //
            , hintPaddingLeft: 8 //
            , traceRequired: true //
            , hintInvalidClass: 'hintInvalid' //
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
                , hintHtml = $('<div class=\"hintHolder\">' + //
                    '<span class=\"hintHelper\" style=\"display: ' + (pluginOptions.showHelper ? 'block' : 'none') + '\">' + progressHint + '</span>' + //
                    '<span class=\"hintProgress\" style=\"display: ' + (pluginOptions.showProgressBar ? 'block' : 'none') + '\">Progress: ' + (idx / hintCount * 100) + '%</span>' + //
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
                    hintHtml.addClass(pluginOptions.hintInvalidClass);
                    return;
                }
                hintHtml.removeClass(pluginOptions.hintInvalidClass);
                hintHtml.hide();
            });
        });
    };
})(jQuery);