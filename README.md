=Treevue=
The treevue jQuery plugin allows you to make an accessible tree view. It uses plain old semantic HTML. Use nested UL to set up the tree in HTML and start the plugin with .treevue();. Any ul that is given the aria-hidden="true" will be collapsed when treevue is started.

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

=Development=
jQuery treevue was created as part of the Accessibility Supported database project by the W3C.

=License=
Copyright (c) 2013 Accessibility Foundation Licensed under the New BSD license.
