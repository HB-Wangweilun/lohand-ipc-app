import{_ as a,o as t,c as e,v as n,d as s,u as i,C as r,n as o,e as l,F as m,D as u,h as p,w as c,b as g,f as h,t as d,G as A,E as f,A as w,k as C,s as V}from"./index-1c26504e.js";import{i as v}from"./ipcRenderer-5e19eaee.js";import{p as b}from"./other-d8a343ee.js";const F=""+new URL("home-module-icon-meterManagement-f2a53609.png",import.meta.url).href,B=""+new URL("home-module-icon-logManagement-8d9283ba.png",import.meta.url).href,E=""+new URL("home-module-icon-logOut-bcc89e36.png",import.meta.url).href,y=""+new URL("home-module-icon-moreFunction-24a97c23.png",import.meta.url).href,Q=""+new URL("home-module-icon-operationManagement-9e263be6.png",import.meta.url).href,I=""+new URL("home-module-icon-paramSetting-ff24f3d8.png",import.meta.url).href,R=""+new URL("home-module-icon-selectData-23a3e43a.png",import.meta.url).href,Y=""+new URL("home-module-icon-systemSetting-62377880.png",import.meta.url).href,O={class:"icon_c_wrap"},W={key:0,class:"iconc_img",src:F},L={key:1,class:"iconc_img",src:B},N={key:2,class:"iconc_img",src:E},D={key:3,class:"iconc_img",src:y},k={key:4,class:"iconc_img",src:Q},K={key:5,class:"iconc_img",src:I},j={key:6,class:"iconc_img",src:R},q={key:7,class:"iconc_img",src:Y},S=s({name:"IconC"}),U=a(Object.assign(S,{props:["name"],setup(a){const s=a;return(a,i)=>(t(),e("div",O,["meterManagement"==s.name?(t(),e("img",W)):n("",!0),"logManagement"==s.name?(t(),e("img",L)):n("",!0),"logOut"==s.name?(t(),e("img",N)):n("",!0),"moreFunction"==s.name?(t(),e("img",D)):n("",!0),"operationManagement"==s.name?(t(),e("img",k)):n("",!0),"paramSetting"==s.name?(t(),e("img",K)):n("",!0),"selectData"==s.name?(t(),e("img",j)):n("",!0),"systemSetting"==s.name?(t(),e("img",q)):n("",!0)]))}}),[["__scopeId","data-v-08c98a55"]]),G={class:"home_main_wrap"},P={class:"home_module_item_box"},T={class:"module_item_text"},x=s({name:"Main"}),Z=a(Object.assign(x,{setup(a){const n=i();r();const s=o([]);return l((()=>{let a=n.getRoutes().filter((a=>a.meta.isModulePage));s.value=a})),(a,i)=>(t(),e("div",G,[(t(!0),e(m,null,u(s.value,((a,e)=>(t(),p(A,{class:"glass_card_item",width:"330",height:"280","background-color":a.meta.backgroundColor,onClick:t=>{return e=a,b(),"退出系统"==e.meta.title&&(v.send("close"),v.send("window-close")),void n.push({path:e.path});var e}},{default:c((()=>[g("div",P,[h(U,{name:a.meta.icon},null,8,["name"]),g("span",T,d(a.meta.title),1)])])),_:2},1032,["background-color","onClick"])))),256))]))}}),[["__scopeId","data-v-014c03f6"]]),X=""+new URL("andan-f03a8163.png",import.meta.url).href,M=""+new URL("CODcr-b7bea63c.png",import.meta.url).href,H=""+new URL("CODmn-094ab276.png",import.meta.url).href,J=""+new URL("diandaolv-c6072ff2.png",import.meta.url).href,_=""+new URL("orp-de6f86be.png",import.meta.url).href,z=""+new URL("ph-4d9baca7.png",import.meta.url).href,$=""+new URL("rongjieyang-a456349c.png",import.meta.url).href,aa=""+new URL("temp-93cf520a.png",import.meta.url).href,ta=""+new URL("yulv-801dcc5f.png",import.meta.url).href,ea=""+new URL("zhuodu-70c1a312.png",import.meta.url).href,na=""+new URL("zongdan-dea4764f.png",import.meta.url).href;var sa=function(){return sa=Object.assign||function(a){for(var t,e=1,n=arguments.length;e<n;e++)for(var s in t=arguments[e])Object.prototype.hasOwnProperty.call(t,s)&&(a[s]=t[s]);return a},sa.apply(this,arguments)},ia=function(){function a(a,t,e){var n=this;this.endVal=t,this.options=e,this.version="2.6.2",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(a){n.startTime||(n.startTime=a);var t=a-n.startTime;n.remaining=n.duration-t,n.useEasing?n.countDown?n.frameVal=n.startVal-n.easingFn(t,0,n.startVal-n.endVal,n.duration):n.frameVal=n.easingFn(t,n.startVal,n.endVal-n.startVal,n.duration):n.frameVal=n.startVal+(n.endVal-n.startVal)*(t/n.duration);var e=n.countDown?n.frameVal<n.endVal:n.frameVal>n.endVal;n.frameVal=e?n.endVal:n.frameVal,n.frameVal=Number(n.frameVal.toFixed(n.options.decimalPlaces)),n.printValue(n.frameVal),t<n.duration?n.rAF=requestAnimationFrame(n.count):null!==n.finalEndVal?n.update(n.finalEndVal):n.options.onCompleteCallback&&n.options.onCompleteCallback()},this.formatNumber=function(a){var t,e,s,i,r=a<0?"-":"";t=Math.abs(a).toFixed(n.options.decimalPlaces);var o=(t+="").split(".");if(e=o[0],s=o.length>1?n.options.decimal+o[1]:"",n.options.useGrouping){i="";for(var l=3,m=0,u=0,p=e.length;u<p;++u)n.options.useIndianSeparators&&4===u&&(l=2,m=1),0!==u&&m%l==0&&(i=n.options.separator+i),m++,i=e[p-u-1]+i;e=i}return n.options.numerals&&n.options.numerals.length&&(e=e.replace(/[0-9]/g,(function(a){return n.options.numerals[+a]})),s=s.replace(/[0-9]/g,(function(a){return n.options.numerals[+a]}))),r+n.options.prefix+e+s+n.options.suffix},this.easeOutExpo=function(a,t,e,n){return e*(1-Math.pow(2,-10*a/n))*1024/1023+t},this.options=sa(sa({},this.defaults),e),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(t),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof a?document.getElementById(a):a,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",typeof window<"u"&&this.options.enableScrollSpy&&(this.error?console.error(this.error,a):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return n.handleScroll(n)})),window.onscroll=function(){window.onScrollFns.forEach((function(a){return a()}))},this.handleScroll(this)))}return a.prototype.handleScroll=function(a){if(a&&window&&!a.once){var t=window.innerHeight+window.scrollY,e=a.el.getBoundingClientRect(),n=e.top+window.pageYOffset,s=e.top+e.height+window.pageYOffset;s<t&&s>window.scrollY&&a.paused?(a.paused=!1,setTimeout((function(){return a.start()}),a.options.scrollSpyDelay),a.options.scrollSpyOnce&&(a.once=!0)):(window.scrollY>s||n>t)&&!a.paused&&a.reset()}},a.prototype.determineDirectionAndSmartEasing=function(){var a=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>a;var t=a-this.startVal;if(Math.abs(t)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=a;var e=this.countDown?1:-1;this.endVal=a+e*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=a,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},a.prototype.start=function(a){this.error||(a&&(this.options.onCompleteCallback=a),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},a.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},a.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},a.prototype.update=function(a){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(a),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},a.prototype.printValue=function(a){var t;if(this.el){var e=this.formattingFn(a);null!==(t=this.options.plugin)&&void 0!==t&&t.render?this.options.plugin.render(this.el,e):"INPUT"===this.el.tagName?this.el.value=e:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=e:this.el.innerHTML=e}},a.prototype.ensureNumber=function(a){return"number"==typeof a&&!isNaN(a)},a.prototype.validateValue=function(a){var t=Number(a);return this.ensureNumber(t)?t:(this.error="[CountUp] invalid start or end value: ".concat(a),null)},a.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},a}();const ra={class:"countup-wrap"},oa=s({name:"CountUp",props:{endVal:null,startVal:{default:0},duration:{default:2.5},decimalPlaces:{default:0},autoplay:{type:Boolean,default:!0},loop:{type:[Boolean,Number],default:!1},delay:{default:0},options:{default:void 0}},emits:["init","finished"],setup(a,{expose:n,emit:s}){const i=a;let r=o(),m=o(),u=0;const p=o(!1);let c;function h(){if(!r.value)return void console.warn("[vue-countup-v3]","elRef can't found");u=0,p.value=!1;const a=Number(i.startVal),t=Number(i.endVal),e=Number(i.duration);m.value=new ia(r.value,t,{startVal:a,duration:e,decimalPlaces:i.decimalPlaces,...i.options}),m.value.error?console.error("[vue-countup-v3]",m.value.error):s("init",m.value)}function d(){var a;m.value||h(),null==(a=m.value)||a.start((function(){"boolean"==typeof i.loop&&i.loop||i.loop>u?c=function(a,t=1){const e=o(-1);let n;return e.value=requestAnimationFrame((function s(i){n||(n=i),i-n<1e3*t?e.value=requestAnimationFrame(s):a()})),{cancel:function(){window.cancelAnimationFrame(e.value)}}}((()=>{var a;null==(a=m.value)||a.reset(),d()}),i.delay):p.value=!0})),u++}function A(){null==c||c.cancel(),h(),d()}return f([()=>i.startVal,()=>i.endVal],(()=>{i.autoplay&&A()})),f(p,(a=>{var t;a&&(null!=(t=i.options)&&t.onCompleteCallback&&i.options.onCompleteCallback(),s("finished"))})),l((()=>{h(),i.autoplay&&d()})),w((()=>{var a;null==c||c.cancel(),null==(a=m.value)||a.reset()})),n({init:h,restart:A}),(a,n)=>(t(),e("div",ra,[C(a.$slots,"prefix"),g("span",{ref_key:"elRef",ref:r},null,512),C(a.$slots,"suffix")]))}}),la={class:"item"},ma={class:"content"},ua={class:"mark"},pa={class:"bottom"},ca={key:0,class:"param_icon",src:X},ga={key:1,class:"param_icon",src:M},ha={key:2,class:"param_icon",src:H},da={key:3,class:"param_icon",src:J},Aa={key:4,class:"param_icon",src:_},fa={key:5,class:"param_icon",src:z},wa={key:6,class:"param_icon",src:$},Ca={key:7,class:"param_icon",src:aa},Va={key:8,class:"param_icon",src:ta},va={key:9,class:"param_icon",src:ea},ba={key:10,class:"param_icon",src:na},Fa={key:11,class:"param_icon",src:"data:image/png;base64,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"},Ba={class:"param_name"},Ea={class:"value"},ya={class:"unit"},Qa=s({name:"ParamCard"}),Ia=a(Object.assign(Qa,{props:["paramName","paramValue","paramUnit"],setup(a){const s=a,i=a=>{let t;return t=a==s.paramName,t};return(a,r)=>(t(),e("div",la,[g("div",ma,[g("div",ua,[g("div",pa,[i("氨氮")?(t(),e("img",ca)):n("",!0),i("CODcr")?(t(),e("img",ga)):n("",!0),i("CODmn")?(t(),e("img",ha)):n("",!0),i("电导率")?(t(),e("img",da)):n("",!0),i("ORP")?(t(),e("img",Aa)):n("",!0),i("PH")?(t(),e("img",fa)):n("",!0),i("溶解氧")?(t(),e("img",wa)):n("",!0),i("温度")?(t(),e("img",Ca)):n("",!0),i("余氯")?(t(),e("img",Va)):n("",!0),i("浊度")?(t(),e("img",va)):n("",!0),i("总氮")?(t(),e("img",ba)):n("",!0),i("总磷")?(t(),e("img",Fa)):n("",!0),g("span",Ba,d(s.paramName),1)]),g("span",Ea,[h(V(oa),{"start-val":0,"end-val":s.paramValue,duration:4,"decimal-places":3,loop:1,delay:2},null,8,["end-val"])]),g("span",ya,d(s.paramUnit),1)])])]))}}),[["__scopeId","data-v-14c4ba6c"]]),Ra={class:"home_footer_wrap"},Ya={class:"top"},Oa={class:"bottom"},Wa=s({name:"Footer"}),La=a(Object.assign(Wa,{setup:a=>(a,n)=>(t(),e("div",Ra,[g("div",Ya,[h(Ia,{"param-name":"氨氮","param-value":200,"param-unit":"mg/L"}),h(Ia,{"param-name":"CODcr","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"CODmn","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"溶解氧","param-value":.306,"param-unit":"mg/L"})]),g("div",Oa,[h(Ia,{"param-name":"PH","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"余氯","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"浊度","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"ORP","param-value":.306,"param-unit":"mg/L"}),h(Ia,{"param-name":"电导率","param-value":.306,"param-unit":"mg/L"})])]))}),[["__scopeId","data-v-8f70006e"]]),Na={class:"home_wrap"},Da=s({name:"Home"}),ka=Object.assign(Da,{setup:a=>(i(),l((()=>{})),(a,n)=>(t(),e("div",Na,[h(Z,{class:"animate__animated animate__fadeInDown"}),h(La,{class:"animate__animated animate__fadeInUp"})])))});export{ka as default};
