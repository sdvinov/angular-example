# Cupcake app

This app was a final assignment for AngularJS class in 2015. It has just 3 routes: list, form, and details.

List is a list of existing items taken from browser's local storage.

On form route you can add items to the list.

Details feature info of each item on the list, which is basically the same thing as list item on the list page. However, on the details page just one selected item is displayed without delete function.

# Technologies

* [AngularJS](https://angularjs.org/)

# Installation

To install this app, download files from this repo, then access index page (which is /list route) from localhost (for example, using [MAMP](https://www.mamp.info/en/) or [WAMP](http://www.wampserver.com/en/)).

# Structure

Index page is a template for other components which are: details, form, and list. Each component loads on routes: /details/{index}, /form, and /list, respectively. 
