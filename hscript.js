import {v_node,txt_node} from "./core.js"

const parse_tag = (tag) => {
  if(typeof tag !== "string") {
    throw new Error("tag should be a string")
  };

  //this lets you write a tag like <span id="dogs" class="bogs logs"> as
  //h("span.bogs.logs#dogs,...
  //it will probably need to be more careful than just naive splits
  //but this works now
  const [head,id] = tag.split("#");
  const [node_tag,...classes]  = head.split(".");
  
  const out = { 
    node_tag,
    id,
  }

  if(classes.length !== 0) {
    out.css_class = classes.join(" ");
  }

  return out;
}

const format_style = (style) => {
  if(typeof style !== "object") {
    return style;
  }

  return Object.entries(style).map((pair) => pair.join(":")).join(";");
}

const format_props = (id,css_class,attrs,other_props) => {
  if(!(typeof other_props === "object" && other_props !== null)) {
    throw new Error("properties should be an object i.e this guy: {}");
  }

  const attributes = {...attrs};
  const {hooks =[], namespace, style, ...remaining_props} = other_props;

  if(id !== undefined) {
    attributes.id = id;
  }

  if(css_class !== undefined) {
    attributes["class"] = css_class;
  }

  const formatted_style =format_style(style); 

  if(style) {
    attributes["style"] = formatted_style;
  }

  return {
    "final_props":{attributes,...remaining_props},
    hooks,
    namespace
  }
}

const format_children = (children) => {
  const all_kids = Array.isArray(children) ? children : [children];

  return all_kids.map( k => {
    if(typeof k === "string") {
      return txt_node(k);
    }

    return k;
  });
}

//For some reason this kind of thing is traditionally named "h"
//I think it's meant to be short for HTML.
export const h = (tag,attrs={},props = {},children = []) => {
  const {node_tag,css_class,id} = parse_tag(tag);
  const {final_props,hooks,namespace} = format_props(id,css_class,attrs,props);
  const final_children = format_children(children);

  return v_node(node_tag,namespace,final_props,final_children,hooks);
}
