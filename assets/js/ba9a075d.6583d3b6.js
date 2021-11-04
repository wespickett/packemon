"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3171],{5318:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return f}});var r=t(7378);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),c=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(i.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=c(t),f=a,d=m["".concat(i,".").concat(f)]||m[f]||u[f]||o;return t?r.createElement(d,l(l({ref:n},s),{},{components:t})):r.createElement(d,l({ref:n},s))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var c=2;c<o;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},2738:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return i},toc:function(){return c},default:function(){return u}});var r=t(5773),a=t(808),o=(t(7378),t(5318)),l=["components"],p={},i=void 0,c=[{value:"Installation",id:"installation",children:[],level:2},{value:"Requirements",id:"requirements",children:[],level:2}],s={toc:c};function u(e){var n=e.components,t=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/milesj/packemon/actions?query=branch%3Amaster"},(0,o.kt)("img",{parentName:"a",src:"https://github.com/milesj/packemon/workflows/Build/badge.svg",alt:"Build Status"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/babel-plugin-env-constants"},(0,o.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/babel-plugin-env-constants.svg",alt:"npm version"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/babel-plugin-env-constants"},(0,o.kt)("img",{parentName:"a",src:"https://david-dm.org/milesj/packemon.svg?path=packages/babel-plugin-env-constants",alt:"npm deps"}))),(0,o.kt)("p",null,"Transform ",(0,o.kt)("inlineCode",{parentName:"p"},"__DEV__"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"__PROD__"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"__TEST__")," constants to ",(0,o.kt)("inlineCode",{parentName:"p"},"process.env.NODE_ENV")," conditionals."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"// Input\nif (__DEV__) {\n    console.log('Some message in development!');\n}\n\nconst value = __TEST__ ? 0 : 100;\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"// Output\nif (process.env.NODE_ENV !== 'production') {\n    console.log('Some message in development!');\n}\n\nconst value = process.env.NODE_ENV === 'test' ? 0 : 100;\n")),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yarn add --dev babel-plugin-env-constants\n")),(0,o.kt)("p",null,"Add the plugin to your root ",(0,o.kt)("inlineCode",{parentName:"p"},"babel.config.*")," file."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"module.exports = {\n    plugins: ['babel-plugin-env-constants'],\n};\n")),(0,o.kt)("p",null,"And if you are using TypeScript, you'll most likely need to declare the globals yourself."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"declare global {\n    const __DEV__: boolean;\n    const __PROD__: boolean;\n    const __TEST__: boolean;\n}\n")),(0,o.kt)("h2",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Linux, OSX, Windows"),(0,o.kt)("li",{parentName:"ul"},"Node 12.17+")))}u.isMDXComponent=!0}}]);