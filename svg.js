import {h} from "../hscript.js"

const svgns = "http://www.w3.org/2000/svg";

export const root = (attrs={},props={},children=[]) => {
  const ps = {"namespace":svgns,...props};
  return h("svg",attrs,ps,children)
}

export const defs = (attrs={},props={},children=[]) => {
  const ps = {"namespace":svgns,...props};
  return h("defs",attrs,ps,children)
}

export const pattern = (id,attrs={},props={},children=[]) => {
  const as = {id:id,...attrs};
  const ps = {"namespace":svgns,...props};
  
  return h("pattern",as,ps,children)
}

export const g = (attrs={},props={},children=[]) => {
  const ps = {"namespace":svgns,...props};
  return h("g",attrs,ps,children);
}

export const circle = (cx,cy,r,attrs={},props={}) => {
  const ats = {cx,cy,r,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("circle",ats,ps);
}

export const rect = (x,y,width,height,attrs={},props={}) => {
  const ats = {x,y,width,height,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("rect",ats,ps);
}

export const path = (pts,attrs={},props={}) => {
  const [head,...rest] = pts;
  const d = [`M ${head[0]} ${head[1]}`, ...(rest.map(([x,y])=>`L ${x} ${y}`))].join(" ");

  const ats = {d,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("path",ats,ps);
}

export const text = (x,y,txt,attrs={},props={}) => {
  const ats = {x,y,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("text",ats,ps,txt);
}

text.path = (txt,pts,attrs={},props={}) => {
  const [head,...rest] = pts;
  const path = [`M ${head[0]} ${head[1]}`, ...(rest.map(([x,y])=>`L ${x} ${y}`))].join(" ");
  return h("text",ats,ps,[h("textPath"),{path},{},[txt]]);
}

export const use = (name,attrs={},props={}) => {
  const ats = {"href":`#${name}`,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("use",ats,ps);
}

use.external = (src,name,attrs={},props={}) => {
  const ats = {"href":`${src}#${name}`,...attrs};
  const ps = {"namespace":svgns,...props};

  return h("use",ats,ps);
}

