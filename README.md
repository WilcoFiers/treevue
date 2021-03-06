# Treevue
The treevue jQuery plugin allows you to make an accessible tree view. It uses 
plain old semantic HTML. Use nested UL to set up the tree in HTML and start the 
plugin with `.treevue();`. Any ul that is given the aria-hidden="true" will be 
collapsed when treevue is started.

HTML:

    <ul id="myTree">
      <li>Item A</li>
      <li>Item B<ul>
          <li>Iteam B1</li>
          <li>Iteam B2</li>
        </ul></li>
      <li>Item C<ul>
          <li>Iteam C1</li>
          <!-- Closed node on start because of aria-hidden -->
          <li>Iteam C2<ul aria-hidden="true">
            <li>Item C2-a</li>
            <li>Item C2-b</li>
          </ul></li>
        </ul></li>
    </ul>
  
Javascript:

    $('#myTree').treevue();

You can add a type to nodes by setting the `data-treevue-type` attribute on the 
list item. This attribute can be used to hook other functionality into a treevue.
    
# Checkboxes
To make a tree view where from which items can be selected, simply include 
checkboxes to the list item elements. To ensure inheritance in selection the 
subselector property is available by adding `data-type="subselector"` to the 
checkbox. Checking/unchecking a subselector will check/uncheck it's 
descendends. Subselectors become unchecked when any of it's children is 
unchecked. When checkboxes are disabled they are ignored by the subselector.

Example:

    <ul id="myTree">
      <li><input type="checkbox" id="item_a" data-type="subselector">
          <label for="item_a">Item A</label><ul>
          <li><input type="checkbox" id="item_a1">
              <label for="item_a1">Item A1</label></li>
          <li><input type="checkbox" id="item_a2">
              <label for="item_a2">Item A2</label></li>
        </ul></li>
      <li><input type="checkbox" id="item_b" data-type="subselector">
          <label for="item_b">Item B</label><ul>
          <li><input type="checkbox" id="item_b1">
              <label for="item_b1">Item B1</label></li>
          <li><input type="checkbox" id="item_b2">
              <label for="item_b2">Item B2</label></li>
        </ul></li>
    </ul>

# Options
Optionally, an object can be passed to the tree view, allowing to set 
options. Currenlty, only one option is available, the `useAria` option, 
which is set to true by default. Use options as followed:

    $('ul.tree').treevue({useAria: false});

# Events
Treevue triggers serveral custom events. The `treevue:expand` and 
`treevue:collapse` events are triggered whenever a branch is expanded or 
collapsed. The `treevue:change` event will trigger when a node is checked or 
unchecked, giving an array of selected values on the `event.values` property. If 
the checkbox doesn't have a value set, the label for that checkbox is used as 
it's value.

    $('#tree').on('treevue:expand treevue:collapse', function (event) {
        // Do something with the event
    }).on('treevue:change', function (event) {
        /*
        event.values now contains an array with objects for each of the selected nodes:
        {
            value: The value of the checkbox or alternatively the text of the label
            id: The id of the checkbox
            type: The type of this node
        }
        */
    });
    
# Treevue and JSON
You can build a treevue from a JSON by passing it to `jQuery.treevue()`. This function takes an array containing one or more nodes that will be put into the tree. The function then will return a jquery selection containing the initialized tree. As a second parameter, you can add a namespace, which will be prepended to the id's used for the checkboxes. This might be useful when you include the same tree on a page multiple times.

    jQuery.treevue([{
            'label'      : '', // Label of the tree item
            'id'         : '', // Optional; ID attribute given to the checkbox
            'children'   : [], // Optional; an array with children
            'value'      : '', // Optional; value of the checkbox
            // Is the item initially selected (checked), default: false
            'selected'   : true,
            // Is the item disabled, default: false
            'disabled'   : true,
            // Is the item a subselector, default: false            
            'subselector': true,
            // This property let's you override if a checkbox should be placed
            'selectable' : undefined,
            // Is the item collapsed, default: false
            'collapsed': true,
            // This value will be added to a data-treevue-type attribute on li
            'type': ''
    }], 'myNamespace').appendTo('body'); // Add the node to the body of the page

Alternatively, the `.treevueJson()` plugin that comes with Treevue can read a tree and convert it to a json object following the above structure. The `.treevueJson()` will look at the first tree in the selection and return it's structure, like so:

    $('#myTree').treevueJson();

# Accessibility
Treevue has successfully been tested with:
- NVDA 2013.1 on Firefox
- NVDA 2010.1 on Firefox

**Warming**: Unfortunately some serious problems have been encountered with 
JAWS 14 and 15. Because of this it is currently not recommended to rely on this 
plugin alone to expose information and functionality on your website without 
providing a conforming alternative version.

## Known problems
(Tested with JAWS 15 in IE and Firefox)
- JAWS does not support the 'aria-selected' property
- In JAWS, the name of a treeview item will incorrectly include it's decendents
- JAWS does not expose the arrow key events because autoforms mode does not trigger with tree views
- Chrome does not communicate the name of treeview items.
- In Firefox with NVDA, aria-selected is assumed if it is anywhere on the treeview


# Upcoming Features
- Additional style examples
- Persistence through local storage
- Create a property for ordered lists in the JSON objects
- Automatic collapse when a new branch is opened
- Options for animation speed and L10n

# Development
jQuery treevue was created as part of the Accessibility Supported database 
project by the W3C.


# License
Copyright © WAI-ACT Consortium 2011-2013:

* World Wide Web Consortium (W3C) <www.w3.org>
* Accessibility Foundation <www.accessibility.nl>
* Fraunhofer Institute for Applied Information Technology FIT <www.fit.fraunhofer.de>