# vdom
A small virtual DOM libary that uses ES6 modules

## what is this for?
this is for when you want to use virtual DOM but don't want to use a bunch of complicated build tool stuff.
All the other VDOM systems I know of (react, mercury, elm) require you to use a bunch of extra tooling just to set a website up.
but when I make websites I like to use as little of that stuff as possible, I don't want to run webpack or parcel or whatever the latest one is.
I just want to serve files and have my big fancy web browser go get them.

## how do I get it onto my website?
you just put the files in a place you can serve them and then use import, the files all expect to be served from the same relative position
so if you can't do that you might have to change one of the import statements or use import maps or something.

## ok how do I work with this?
under the examples folder there are a few simple examples, but the basic idea is you work with the "hscript" and "vdom_loop" modules.
you use the hscript to make your dom and then the vdom_loop thing sets everything up. You can do it differently though. 

## how do I use the examples?
the examples assume you have cloned this repo and have an HTTP server that will serve it as static files. All the urls are relative.

### a brief explainer of the main files and what they do

#### core.js
this is the actual vdom core, you should, in general not need to import this directly, it contains the key virtual dom ideas, nodes, diffing, and applying patches
if you want to use a different system to handle the vdom loop (there are a few ways to do it) you will need to import from this.

#### hscript.js
this is an implentation of what I've usually seen called "h" scripts, it lets you write your "HTML" bits as composed function calls to this function "h" that
then creates virtual dom trees, it looks kinda like this:
```javascript
/*
if you wanted html like this:
<div class="line wine"><span class="loud">It's It!</span><span id="the_sauce">gourded?</span></div>
*/

h("div.line.wine",{},{},[ 
    h("span.loud",{},{},"It's It!"),
    h("span#the_sauce",{},{},"gourded?")
])

```

because you are just using regular javascript functions and variables you can easily do things like make part of your html and stick it in a variable, use map and filter to generate
lists and sub-trees etc. 

#### vdom_loop.js
this contains a boilerplate function for setting up the vdom loop. There are a few different ways to set up a vdom program and the one I've chosen is the laziest.

you have 4 arguments. 
    #1 a root element, this is a dom element where your stuff will render, note the original element will be thrown away, and replaced by what your program makes!
    #2 a state, this is an object that will be mutated by events
    #3 an event handler, which takes the state, an event type, and some event data and then mutates the state returning true if you want to re-render the dom, false if you want to ignore it
    #4 a render function, which takes the state, and returns a new virtual dom representing what you want on the screen

you get back an object with a couple of methods.
    #1 "go" which initializes the dom and starts the loop running
    #2 "post" which lets external things like setInterval or fetch post events to the program

this style is pretty similar to the way Elm does things, except instead of creating a new state with every update we mutate an existing one, and we don't have a difference between "commands"
and "updates" they are all just events. If you need to use fetch or something you just use it and pass your event posting function with it. 
This style still retains a lot of the nice properties that elm programs have in terms of composing smaller programs together. 
You take your sub-components states, event handlers, and render functions and just wire them in to the higher level structure.

#### svg.js
this is a set of helpers for doing SVG graphics with the virtual DOM. it's both an example of how to do namespaced stuff, as well as an example of how to use helpers with hscript.
