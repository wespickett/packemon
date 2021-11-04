"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4834],{5318:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=u(n),f=a,d=m["".concat(p,".").concat(f)]||m[f]||s[f]||o;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3939:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},toc:function(){return u},default:function(){return s}});var r=n(5773),a=n(808),o=(n(7378),n(5318)),i=["components"],l={},p=void 0,u=[{value:"Features",id:"features",children:[],level:2},{value:"Requirements",id:"requirements",children:[],level:2},{value:"Documentation",id:"documentation",children:[],level:2}],c={toc:u};function s(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/milesj/packemon/actions?query=branch%3Amaster"},(0,o.kt)("img",{parentName:"a",src:"https://github.com/milesj/packemon/workflows/Build/badge.svg",alt:"Build Status"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/packemon"},(0,o.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/packemon.svg",alt:"npm version"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/packemon"},(0,o.kt)("img",{parentName:"a",src:"https://david-dm.org/milesj/packemon.svg?path=packages/packemon",alt:"npm deps"}))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Gotta pack 'em all!")),(0,o.kt)("p",null,"Are you a library maintainer? Confused on how to build packages for consumers? Unsure of what\ntooling and plugins to use? What about CommonJS vs ECMAScript? TypeScript, JavaScript, or FlowType?\nForget that headache and let Packemon do the heavy lifting for you. No need to fiddle with Babel or\nRollup configurations!"),(0,o.kt)("p",null,'Packemon is a "batteries included" CLI that will prepare each package for distribution by building\nwith the proper tooling and plugins, provide sane defaults and configurations, verify package\nrequirements, and much more! By default Packemon will generate ECMAScript modules, but can be\nconfigured to support all formats.'),(0,o.kt)("h2",{id:"features"},"Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Scaffold TypeScript packages, in either a monorepo or polyrepo project setup."),(0,o.kt)("li",{parentName:"ul"},"Configure packages for Node.js, Web browsers, or React Native, with multiple output formats like\nCommonJS and ECMAScript (default)."),(0,o.kt)("li",{parentName:"ul"},"Build packages with Rollup to create self-contained and tree-shaken bundles. Provide the smallest\nfile sizes possible!"),(0,o.kt)("li",{parentName:"ul"},"Support a single index import, multiple imports, deep imports, or any kind of entry point."),(0,o.kt)("li",{parentName:"ul"},"Transform packages with Babel's ",(0,o.kt)("inlineCode",{parentName:"li"},"preset-env")," and the configured platform targets. Only ship and\npolyfill what's truly necessary!"),(0,o.kt)("li",{parentName:"ul"},"Generate and combine TypeScript declarations into a single public-only API representation."),(0,o.kt)("li",{parentName:"ul"},"Generate compact source maps for platform + format based builds.")),(0,o.kt)("h2",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Linux, OSX, Windows"),(0,o.kt)("li",{parentName:"ul"},"Node 12.17+")),(0,o.kt)("h2",{id:"documentation"},"Documentation"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://packemon.dev"},"https://packemon.dev")))}s.isMDXComponent=!0}}]);