import{i as e}from"./ipcRenderer-5e19eaee.js";import{_ as a,m as l,n,e as s,r as t,o as d,c as o,f as r,w as i,s as p,h as u,v as c,b as m,d as y,j as f}from"./index-1c26504e.js";const _="production",k={class:"hello_wrap"},v=y({name:"Hello"}),C=a(Object.assign(v,{setup(a){l();const y=n("123"),v=()=>{e.send("close"),e.send("window-close")},C=()=>{e.send("max")},w=()=>{e.send("min")},b=()=>{e.send("restoreDown")},x=()=>{e.send("exitFullScreen")},g=()=>{e.send("goFullScreen")},h=()=>{e.send("openScreenKeyboard")},j=()=>{e.send("sendMsgMain","1111")};return s((()=>{})),(e,a)=>{const l=t("el-button"),n=t("el-input");return d(),o("div",k,[r(l,{type:"primary",onClick:v},{default:i((()=>[f("关闭窗口")])),_:1}),r(l,{type:"primary",onClick:C},{default:i((()=>[f("最大化")])),_:1}),r(l,{type:"primary",onClick:w},{default:i((()=>[f("最小化")])),_:1}),r(l,{type:"primary",onClick:b},{default:i((()=>[f("向下还原")])),_:1}),"development"==p(_)?(d(),u(l,{key:0,type:"primary",onClick:x},{default:i((()=>[f("退出全屏")])),_:1})):c("",!0),"development"==p(_)?(d(),u(l,{key:1,type:"primary",onClick:g},{default:i((()=>[f("进入全屏")])),_:1})):c("",!0),r(l,{type:"primary",onClick:h},{default:i((()=>[f("打开新窗口")])),_:1}),r(l,{type:"primary",onClick:j},{default:i((()=>[f("给主程序发消息")])),_:1}),m("div",null,[r(n,{modelValue:y.value,"onUpdate:modelValue":a[0]||(a[0]=e=>y.value=e),style:{width:"240px"},placeholder:"Please input"},null,8,["modelValue"])])])}}}),[["__scopeId","data-v-2f463b6d"]]);export{C as default};
