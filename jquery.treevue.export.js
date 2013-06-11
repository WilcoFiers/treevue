(function ($) {
    'use strict';
    
    var collapseCls   = 'treevue-collapsed',
        disableCls    = 'treevue-disabled';
    
    function treenodeToJson(node) {
        var children, checkbox,
            obj = {};
        
        node     = $(node);
        checkbox = node.find(':checkbox:first()');
        children = node.find('ul:first() > li, ol:first() > li');
        
        if (children.length > 0) {
            obj.children  = $.map(children, treenodeToJson);
            obj.collapsed = node.hasClass(collapseCls);
        }
        
        // Check if it has a checkbox
        if (checkbox.closest('li').is(node)) {
            //obj.id          = checkbox.attr('id');
            obj.disabled    = node.hasClass(disableCls);
            obj.value       = checkbox.attr('value');
            obj.selected    = checkbox.prop('checked');
            obj.subselector = (checkbox.attr('data-type') === 'subselector');
            obj.label       = $.trim(node.find('label:first()').text());
            
        } else { // Label when there is no checkbox
            obj.label = $.trim(node.clone().
                    find('ul, ol, [aria-hidden]').remove().end().
                    text());
        }
        return obj;
    }
    
    $.fn.treevueJson = function () {
        if (!this.first().is('.treevue')) {
            throw new Error('This node is not a treevue');
        }
        return $.map(this.first().children(), treenodeToJson);
    };
    
}(jQuery));