(()=>{var t={797:()=>{
/*! instant.page v5.1.1 - (C) 2019-2020 Alexandre Dieulot - https://instant.page/license */
let t;const e=new Set,r=document.createElement("link"),n=r.relList&&r.relList.supports&&r.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype;if(n){const e={capture:!0,passive:!0};document.addEventListener("touchstart",(function(e){t=performance.now();const r=e.target.closest("a");if(!o(r))return;s(r.href)}),e),document.addEventListener("mousedown",(function(t){const e=t.target.closest("a");if(!o(e))return;s(e.href)}),e)}function o(t,r){let n;if(!t||!(n=t.href))return!1;if(!r&&e.has(n)||35===n.charCodeAt(0))return!1;const o=new URL(n);return(o.origin===location.origin||"instant"in t.dataset)&&(("http:"===o.protocol||"https:"===o.protocol)&&(("http:"!==o.protocol||"https:"!==location.protocol)&&(!o.search&&((!o.hash||o.pathname+o.search!==location.pathname+location.search)&&null===t.getAttribute("download")))))}function s(t){if(e.has(t))return;const r=document.createElement("link");r.rel="prefetch",r.href=t,document.head.appendChild(r),e.add(t)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,r),s.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";r(797)})()})();