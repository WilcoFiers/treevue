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
        // event.values <-- all the selected values
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

# Upcoming Features
- Additional style examples
- Persistence through local storage
- Create a property for ordered lists in the JSON objects
- Add a way to pass a type to different nodes
- Automatic collapse when a new branch is opened
- Options for animation speed and L10n

# Development
jQuery treevue was created as part of the Accessibility Supported database 
project by the W3C.


# License
Copyright (c) 2013 Accessibility Foundation Licensed under the New BSD license.
