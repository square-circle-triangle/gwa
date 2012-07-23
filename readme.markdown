Generating the json product list
-------------------

- Edit the file tasks/products.xls
- go to the tasks folder in terminal
- run this: ruby import.rb

- open the file js/app/models/product.js
- make sure that rpp are numbers and not strings




Libraries in use
-----------------

Backbone
For MVC - just used for the routing in here

jQuery.clickNScroll
http://sourceforge.net/p/clicknscroll/home/Home/
Used for touch scroll

Sugar JS
Add functions to js prototypes

Head JS
Make the html5 code compatible with IE

Mustache
Templating



Image sizes
-------------

Intro images
900x1308

Product list thumbs
244x244

Product gallery thumbs
58x58

Product full image
820x710

Video size
----------

744x416

Issues
-----------

###Searching again when going back
At the moment the searches are triggered all the time. This is because of the need to show pop ups when no results are found (because the pop up need to appear on top of the input screen).

In order to avoid researching when going back we will probably need to put the no results pop up in the results screen and not in the input screen.

The current flow is like this

- user trigger a search
- the url changes to reflect the search
- router catches the url change and calls the search controller
- controller makes the search
- if no results shows the pop up
	- when user clicks ok, it triggers a back action 
- if results are found shows the screen

So the issue is that closing the no-results pop up sets the wentBack variable to true

Posssible solutions will be to change the flow:

- user triggers a search
- the url changes
- router catches the change
	- changes the screen (this resets the wentBack variable)
	- calls the search controller
- controller makes the search

