import {v_node,txt_node,diff,patch} from "./core.js"

//=============================================================================
//  the "program" which creates an observable state and runs a reactive loop
//  this function doesn't do much, it just ensures that the real DOM and 
//  virtual doms remain consistent.
//  the arguments are as follows:
//  
//  root_element: this is the actual DOM element the virtual dom should take
//  over. It can be <body> if you want, or any other element, the main thing
//  is that it shouldn't have any children, the vdom owns all that now!
//
//  state: this your "model" it's an abstract thing that just gets passed around
//  to other stuff
//
//  ev_handler: This is a function that takes your state, an event type and some
//  event data and updates the state accordingly. It needs to return truthy in order
//  to update the dom, or falsy to say "this event didn't change anything worth showing"
//
//  render: this is a function that takes your state and an event posting function 
//  and returns a new virtual dom that reflects what you want to display. the event
//  posting function is for handling clicks and hovers and stuff.

export const vdom_loop = (root_element,state,ev_handler,render) => {

  let vd = undefined;
  let root = root_element;

  const post_event = (type,data) => {
    const r = ev_handler(state,type,data);
    
    if(r){
      re_render();
    }
  }

  const re_render = () => {
    const new_vd = render(state,post_event);
    const patches = diff(vd,new_vd);
    root = patch(root,patches);
    vd = new_vd;
  }

  
  return {"go":re_render,"post":post_event};
}
