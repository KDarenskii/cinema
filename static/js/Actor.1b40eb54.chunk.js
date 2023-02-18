"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[783],{6952:function(e,t,n){n.d(t,{Z:function(){return a}});n(2791);var s=n(1694),r=n.n(s),i=n(184),a=function(e){var t=e.title,n=e.overview,s=e.className;return(0,i.jsxs)("header",{className:r()("description-header",s),children:[(0,i.jsx)("h1",{className:"description-header__title",children:t}),n&&(0,i.jsx)("p",{className:"description-header__overview",children:n})]})}},3399:function(e,t,n){n.d(t,{Z:function(){return r}});n(2791);var s=n(184),r=function(e){var t=e.name,n=e.value;return(0,s.jsxs)("li",{className:"description-item",children:[(0,s.jsx)("div",{className:"description-item__name",children:t}),(0,s.jsx)("div",{className:"description-item__values-wrapper",children:Array.isArray(n)?n.map((function(e,t){return(0,s.jsx)("span",{className:"description-item__value",children:e},t)})):(0,s.jsx)("span",{className:"description-item__value",children:n})})]})}},5811:function(e,t,n){n.d(t,{Z:function(){return r}});n(2791);var s=n(184),r=function(e){var t=e.children,n=e.title;return(0,s.jsxs)("div",{className:"description-info",children:[(0,s.jsx)("h4",{className:"description-info__title",children:n}),(0,s.jsx)("ul",{className:"description-info__list",children:t})]})}},4814:function(e,t,n){n.d(t,{Z:function(){return a}});n(2791);var s=n(1694),r=n.n(s),i=n(184),a=function(e){var t=e.title,n=e.children,s=e.className;return(0,i.jsxs)("div",{className:r()("description-list",s),children:[(0,i.jsx)("h5",{className:"description-list__title",children:t}),(0,i.jsx)("ul",{className:"description-list__list",children:n})]})}},202:function(e,t,n){n.d(t,{Z:function(){return a}});n(2791);var s=n(1694),r=n.n(s),i=n(184),a=function(e){var t=e.src,n=e.className;return(0,i.jsx)("div",{className:r()("description-poster",n),children:(0,i.jsx)("img",{className:"description-poster__img",src:t,alt:"Poster"})})}},227:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var s=n(4165),r=n(5861),i=n(9439),a=n(2791),c=n(7689),l=n(1087),o=n(6952),u=n(5811),d=n(3399),m=n(4814),h=n(202),v=n(184),p=function(e){var t,n,s,r=e.actor;return(0,v.jsxs)("section",{className:"actor",children:[(0,v.jsx)("div",{className:"actor__intro",children:(0,v.jsx)(h.Z,{className:"actor__intro-poster",src:r.posterSrc})}),(0,v.jsxs)("div",{className:"actor__content",children:[(0,v.jsx)(o.Z,{className:"actor__content-header",title:r.name}),(0,v.jsx)(h.Z,{className:"actor__content-intro-poster",src:r.posterSrc}),(0,v.jsxs)("div",{className:"actor__content-about",children:[(0,v.jsxs)(u.Z,{title:"About person",children:[(0,v.jsx)(d.Z,{name:"Career",value:r.career}),(0,v.jsx)(d.Z,{name:"Height",value:r.height+" cm"}),(0,v.jsx)(d.Z,{name:"Birthplace",value:[null===(t=r.birthplace)||void 0===t?void 0:t.city,null===(n=r.birthplace)||void 0===n?void 0:n.state,null===(s=r.birthplace)||void 0===s?void 0:s.country]}),(0,v.jsx)(d.Z,{name:"Genres",value:r.genres}),(0,v.jsx)(d.Z,{name:"Movies amount",value:String(r.filmsNumber)})]}),(0,v.jsx)(m.Z,{className:"actor__content-about-list",title:"Best films",children:r.bestWorks&&r.bestWorks.map((function(e,t){return(0,v.jsx)(l.rU,{className:"actor__content-about-link",to:"/cinema/film/"+e.id,children:e.title},t)}))})]})]})]})},f=n(2270),x=n(9026),_=n(3144),j=n(5671),N=n(1776),Z=(0,_.Z)((function e(){(0,j.Z)(this,e)}));Z.fetchActortById=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(t,n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",N.h.get("actors/"+t,n));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();var b=function(){var e=(0,c.UO)().id,t=void 0===e?"":e,n=a.useState(!1),l=(0,i.Z)(n,2),o=l[0],u=l[1],d=a.useState(null),m=(0,i.Z)(d,2),h=m[0],_=m[1],j=a.useState({}),N=(0,i.Z)(j,2),b=N[0],k=N[1],g=a.useCallback((0,r.Z)((0,s.Z)().mark((function e(){var n,r,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),_(null),e.prev=2,e.next=5,Z.fetchActortById(t);case 5:n=e.sent,k(n.data),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),i=e.t0,_(null!==(r=i.message)&&void 0!==r?r:null);case 13:return e.prev=13,u(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[2,9,13,16]])}))),[t]);return a.useEffect((function(){g()}),[g]),(0,v.jsxs)("div",{className:"actor-page",children:[h&&(0,v.jsx)(x.Z,{onClick:g,message:h}),o&&(0,v.jsx)(f.Z,{}),!h&&!o&&(0,v.jsx)(p,{actor:b})]})}}}]);
//# sourceMappingURL=Actor.1b40eb54.chunk.js.map