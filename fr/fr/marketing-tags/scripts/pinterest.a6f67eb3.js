(function(){"use strict";if(/@|%40/.test(document.location.href))return!1;const t={...window.utag_data||{},get country(){return window.location.pathname.split("/")[1]},get language(){return window.location.pathname.split("/")[2]},get site_level_1(){return window.location.pathname.split("/")[3]},get site_level_2(){return window.location.pathname.split("/")[4]}};let l={_pintrk:null,pixelType:null,id:null,currency:null,country:null,language:null,countryInfo:{fr:["2613984693572","EUR","script"]},getPixelId:function(e=t.country,i=t.language){return this.countryInfo[e]?.[i]?.[0]||this.countryInfo[e][0]},getCurrency:function(e=t.country,i=t.language){return(this.countryInfo[e]?.[i]?.[1]||this.countryInfo[e][1]).toUpperCase()},getPixelType:function(e=t.country,i=t.language){return this.countryInfo[e]?.[i]?.[2]||this.countryInfo[e][2]},init:function(e=t.country,i=t.language,n,r,o){if(!e||typeof e!="string")return console.error("Failed to initiate Pinterest pixel: Country code must be passed to the init-function.");this.country=e.toLowerCase(),this.language=i.toLowerCase(),this.currency=r?.toUpperCase()||this.getCurrency(this.country,this.language),this.id=n||this.getPixelId(this.country,this.language),this.pixelType=o||this.getPixelType(this.country,this.language),this.pixelType==="script"&&function(a){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var s=window.pintrk;s.queue=[],s.version="3.0";var c=document.createElement("script");c.async=!0,c.src=a,c.onload=function(){this._pintrk=window.pintrk,this._pintrk("load",this.id),this.initEventTracking()}.bind(l),c.onerror=function(){this.pixelType="img",this.initEventTracking()}.bind(l);var u=document.getElementsByTagName("script")[0];u.parentNode.insertBefore(c,u)}}("https://s.pinimg.com/ct/core.js")},send:function(e,i={}){if(!this.id)return console.error("Failed to send Pinterest event: Pinterest pixel id is not defined.");if(this.pixelType==="script"&&typeof this._pintrk=="function")this._pintrk("track",e,i);else{let n="",r;i&&(i?.line_items&&(r=i.line_items,delete i.line_items),Object.entries(i).forEach(([o,a])=>n+=`&ed[${o}]=${a}`),r&&r.forEach((o,a)=>{Object.entries(o).forEach(([s,c])=>{n+=`&ed[line_items][${a}][${s}]=${c}`})})),new Image().src=`https://ct.pinterest.com/v3/?tid=${this.id}&event=${e}${n}`}},getTotalQuantity:function(e=[]){return e.length?e.reduce((i,{quantity:n=1})=>Number(i)+Number(n),0):1},getTotalPrice:function(e=[]){return e.reduce((n,r)=>Number(n)+Number(r?.price||0)*Number(r?.quantity||0),0).toFixed(2)},getContents:function(e=[]){let i=[];for(const n of e){let r={};n.id&&(r.product_id=n.id),n.price&&(r.product_price=n.price),n.quantity&&(r.product_quantity=n.quantity),i.push(r)}return i},trackPageView:function(){if(this.pixelType==="script")return this._pintrk("page");this.send("init")},trackSearch:function(){this.trackEvent("search_box",e=>{let{event_action:i,event_label:n}=e;return i!=="hard_search"?void 0:{eventName:"Search",eventData:{search_query:n}}})},trackAddToCart:function(){this.trackEvent("add_to_cart",e=>{const{params:i={},custom:n={},event_label:r}=e,{currency:o,items:a=[]}=i,{cart_value_local:s}=n;let c={currency:o||this.currency,value:Number(s)||a?.length?this.getTotalPrice(a):void 0,order_quantity:a?.length?this.getTotalQuantity(a):void 0,line_items:a?.length?this.getContents(a):void 0};return r==="pip"?(c.line_items[0].product_name=t?.product_item_names?.[0]||t?.product_names?.[0],c.line_items[0].product_category=`${t?.category_local.toLowerCase()||""} - ${t?.category}`,c.line_items[0].product_variant=t?.product_variant.toLowerCase(),c.line_items[0].product_brand=t?.product_series.toLowerCase()):t?.page_category_level==="chapter"&&r==="plp"&&(c.line_items[0].product_category=t?.site_level_2?`${t.site_level_2?.replace(/-/g," ")}`:void 0),{eventName:"AddToCart",eventData:c}})},trackViewItem:function(){if(t?.page_type==="product information page"){let e={currency:t?.currency_code||this.currency,value:Number(t?.price?.[0]||t?.product_prices?.[0]),line_items:[{product_name:t?.product_item_names?.[0]||t?.product_names?.[0],product_id:t?.product_ids?.[0],product_quantity:1,product_price:Number(t?.price?.[0]),product_category:`${t?.category_local.toLowerCase()+"-"||""}${t?.category}`,product_variant:t?.product_variant.toLowerCase(),product_brand:t?.product_series.toLowerCase()}]};this.send("PageVisit",e)}},trackViewCategory:function(){if(t?.page_category_level!=="chapter"&&t?.site_level_2)return;let e={product_category:t?.site_level_2?`${t.site_level_2?.replace(/-/g," ")}`:void 0};this.send("ViewCategory",e)},trackPurchase:function(){this.trackEvent("purchase",e=>{const{params:i={},custom:n={}}=e,{currency:r,items:o=[],value:a,transaction_id:s}=i,{cart_quantity:c}=n;let u={currency:r||this.currency,value:a||o?.length?this.getTotalPrice(o):void 0,order_quantity:c||o?.length?this.getTotalQuantity(o):void 0,line_items:o?.length?this.getContents(o):void 0,order_id:s};return{eventName:"Checkout",eventData:u}})},trackEvent:function(e,i){window.addEventListener(e,({detail:n={}})=>{let{eventName:r,eventData:o={}}=i(n)||{};r&&this.send(r,o)})},trackLocal:function(){if(window._pinLocal)window._pinLocal(this,t);else{let e=()=>{window?._pinLocal?.(this,t),window.removeEventListener("_pinLocalLoaded",e)};window.addEventListener("_pinLocalLoaded",e)}},initEventTracking:function(){this.trackPageView(),this.trackSearch(),this.trackAddToCart(),t.site_level_1==="p"?this.trackViewItem():t.site_level_1==="cat"?this.trackViewCategory():window.Checkout&&this.trackPurchase(),this.trackLocal()}};l.init()})();
