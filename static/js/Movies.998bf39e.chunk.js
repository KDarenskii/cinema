"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[249],{5951:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var s=n(4165),a=n(3433),r=n(5861),c=n(9439),u=n(2791),i=n(1087),l=n(9331),o=n(3674),f=n(5084),m=n(9026),p=n(8540),h=n(6498),Z=n(7620),g=n(4771),v=n(5655),x=n(7345),d=n(1339),_=n(184),j=function(){var e=u.useState(!1),t=(0,c.Z)(e,2),n=t[0],j=t[1],k=u.useState(null),w=(0,c.Z)(k,2),N=w[0],S=w[1],b=u.useState([]),y=(0,c.Z)(b,2),C=y[0],M=y[1],q=u.useState(1),E=(0,c.Z)(q,2),T=E[0],A=E[1],F=u.useState(0),I=(0,c.Z)(F,2),L=I[0],O=I[1],V=(0,i.lr)(),z=(0,c.Z)(V,1)[0],B=z.toString().length>0;u.useEffect((function(){A(1),M([])}),[z]);var D=u.useCallback(function(){var e=(0,r.Z)((0,s.Z)().mark((function e(t){var n,r,c;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(null),j(!0),e.prev=2,e.next=5,d.Z.fetchTrailers({params:{type:Z.a.MOVIE,q:z.get("q"),_page:t,_limit:12}});case 5:n=e.sent,O(Number(n.headers["x-total-count"])),M((function(e){return[].concat((0,a.Z)(e),(0,a.Z)(n.data))})),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),c=e.t0,S(null!==(r=c.message)&&void 0!==r?r:null);case 14:return e.prev=14,j(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[2,10,14,17]])})));return function(t){return e.apply(this,arguments)}}(),[z]);return u.useEffect((function(){D(T)}),[D,z,T]),(0,_.jsxs)("div",{className:"movies-page",children:[(0,_.jsx)(p.Z,{className:"movies-page__search"}),(0,_.jsxs)("section",{className:"movies-page__list",children:[(0,_.jsx)(h.Z,{className:"movies-page__title",text:B?"Found ".concat(n?"":C.length," results for '").concat(z.get("q"),"'"):"Movies"}),!N&&(0,_.jsx)(g.Z,{next:function(){return A((function(e){return e+1}))},dataLength:C.length,hasMore:C.length<L,loader:(0,_.jsx)(x.Z,{}),className:"movies-page__scroll",style:{overflow:"initial"},endMessage:(0,_.jsx)(v.Z,{className:"movies-page__list-message",message:"There is no more content to show you ^_^"}),children:(0,_.jsxs)(f.Z,{children:[C.map((function(e){return(0,_.jsx)(l.Z,{preview:e},e.id)})),n&&(0,a.Z)(new Array(12)).map((function(e,t){return(0,_.jsx)(o.Z,{},t)}))]})}),N&&(0,_.jsx)(m.Z,{message:N,onClick:function(){return D(T)}})]})]})}}}]);
//# sourceMappingURL=Movies.998bf39e.chunk.js.map