/**
 * Treevue is a jQuery plugin for accessible tree views. It uses wai-aria
 * for full feature support with modern screenreaders.
 * 
 * 
 */
(function($) {
    'use strict';
    
    var focusClass = 'treevue-focus';
    
    /**
     * Add ARIA roles
     */
    function addAriaTreeRoles($trees) {
        var collapsed;
        
        // Insert the tree in a div with role=application
        $trees.wrap("<div role='application'></div>");
        
        $trees.find('li').attr( // define tree nodes
            'role', 'treeitem'
        )
        $trees.find('ul').attr({ // define branches
            'role': 'group'
        }).closest('li').attr('aria-expanded', 'true');
        
        $trees.attr('role', 'tree');
        
        // Collapse nodes nested within a ul with aria-hidden
        collapsed = $trees.find('ul[aria-hidden=true]').closest('li');
        collapsed = collapsed.find('[aria-expanded=true]').andSelf();
        collapsed.attr('aria-expanded', 'false');
        collapsed.find('ul').attr('aria-hidden', 'true');
    }
    
    
    /**
     * Where checkboxes are included allow selection
     */
    function addAriaSelectStates($trees) {
        var $selectable = $trees.find(':checkbox').attr({
            'tabindex': '-1'
        }).closest('li').attr({
            'aria-selected': 'false'
        });
    }
    
    /**
     * Move the focus to an item in the tree.
     */
    function focusItem($elm) {
        var $tree = $elm.closest('.treevue');
        $tree.find('.' + focusClass).removeClass(focusClass).attr('tabindex', -1);
        $elm.focus().attr('tabindex', 0);
        $elm.addClass(focusClass);
        
        if ($elm.context.tagName !== 'LI') {
            alert('fout');
            console.log($elm);
        }
    }
    
    /**
     * Toggle the visibility of the branch
     */
    function toggleBranch(branch) {
        if (branch.attr('aria-expanded') === 'true') {
            branch.attr('aria-expanded', 'false');
            branch.children().filter('ul').hide(200).attr('aria-hidden', 'true');
        } else {
            branch.attr('aria-expanded', 'true');
            branch.children().filter('ul').show(200).attr('aria-hidden', 'false');
        }
    }
    
    /**
     * TreeVue jQuery plugin; accessible treeview
     */
    $.fn.treevue = function() {
        var $trees = $(this);
        $trees.addClass('treevue');
        $trees.find('li').attr('tabindex', -1);
        $trees.find('> :first-child').attr('tabindex', 0).addClass(focusClass);
        
        addAriaTreeRoles($trees);
        
        addAriaSelectStates($trees)
    };
    
    // When the document is loaded, attach event handlers for all vuetrees 
    $(function () {
        // pointer input
        $('body').on('click', '.treevue li[aria-expanded]', function (event) {
            if (event.target === this) {
                event.preventDefault();
                toggleBranch($(this));
                focusItem($(this));
            }
        
        // Keep aria-selected state in sync with the checkbox
        }).on('change', '.treevue :checkbox', function (event) {
            console.log(123);
            $(this).closest('[aria-selected]').attr(
                    'aria-selected', (this.checked ? 'true' : 'false'));
        
        // keyboard input
        }).on('keydown', '.treevue li', function (event) {
            var expanded, selected,
                $this = $(this);
            
            if (event.target !== this) {
                return;
            }
            expanded = $this.attr('aria-expanded');
            selected = $this.attr('aria-selected');
            
            // Press RETURN
            if (event.keyCode === 13 && selected !== undefined) {
                var checkbox = $this.find(':checkbox').first();
                if (checkbox.is(':checked')) {
                    checkbox.attr('checked', false);
                } else {
                    checkbox.attr('checked', true);
                }
                
            } else if (event.keyCode === 40) { // press DOWN
                if (expanded === 'true') { // enter a branch
                    focusItem($this.find('ul li').first());
                } else if ($this.next().length === 0) { // exit a branch
                    focusItem($this.parent().parent().next());
                } else { // next sibling
                    focusItem($this.next());
                }
                
            } else if (event.keyCode === 38) { // press UP
                if ($this.prev().attr('aria-expanded') === 'true') { // enter a branch
                    focusItem($this.prev().find('ul li').last());
                } else if ($this.prev().length === 0) { // exit a branch
                    focusItem($this.parent().parent());
                } else { // prev sibling
                    focusItem($this.prev());
                }
                
            } else if (event.keyCode === 37) { // press LEFT
                if (expanded === 'true') {
                    toggleBranch($this);
                } else { // exit the current branch
                    focusItem($this.parent().parent());
                }
                
            } else if (event.keyCode === 39) { // press RIGHT
                if (expanded === 'false') {
                    toggleBranch($this);
                } else if (expanded === 'true') { // enter a branch
                    focusItem($this.find('ul li').first());
                }
            
            } else { // no known keys activated, so nothing has to be prevented
                return;
            }
            
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    });
    
})(jQuery);