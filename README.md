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
unchecked.

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

# Accessibility

Treevue has successfully been tested with:
- NVDA 2013.1 on Firefox
- NVDA 2010.1 on Firefox

# Upcoming Features

- Treevue should fire custom events
- Options for animation speed and L10n
- Additional style examples
- Generate a tree from JSON
- Export a tree to JSON
- Disabled checkboxes
- Persistence through local storage
- Automatic collapse when a new branch is opened

# Development
jQuery treevue was created as part of the Accessibility Supported database 
project by the W3C.

# License
Copyright (c) 2013 Accessibility Foundation Licensed under the New BSD license.
