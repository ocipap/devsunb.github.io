"use strict";(self.webpackChunkdevsunb_github_io=self.webpackChunkdevsunb_github_io||[]).push([[873],{80446:function(e,t,l){l.d(t,{Z:function(){return u}});var n=l(19692),a=l(13465),r=l(67294),i=l(73075),o=l(20656);var s=function(e){var t,l,n,s=e.location,d=e.sidebarItems,u=(t="sidebar",l=r.useRef(),n=r.useCallback((function(e){return window.sessionStorage.setItem(t,e.target.scrollTop)}),[t]),r.useEffect((function(){var e=window.sessionStorage.getItem(t);e&&l.current&&(l.current.scrollTop=e)}),[t]),{ref:l,onScroll:n});return Array.isArray(d)&&d.length>0?r.createElement(a.Z,{display:["none",null,null,"block"],position:"sticky",top:i.M,height:"calc(100vh - "+i.M+"px)",minWidth:260,maxWidth:360,color:"auto.gray.8",bg:"auto.gray.0"},r.createElement(a.Z,Object.assign({borderStyle:"solid",borderColor:"border.primary"},u,{borderWidth:0,borderRightWidth:1,borderRadius:0,height:"100%",style:{overflow:"auto"}}),r.createElement(a.Z,{display:"flex",flexDirection:"column"},r.createElement(o.Z,{location:s,items:d})))):null},d=l(54877);var u=function(e){var t=e.children,l=e.location,n=e.pageContext,o=n.sidebarItems,u=n.tagsGroups,f=n.slug,m=(0,d.u)(o,u);return r.createElement(a.Z,{display:"flex",flexDirection:"column",minHeight:"100vh",bg:"bg.primary",color:"text.primary"},r.createElement(i.Z,{currentSlug:f,location:l,sidebarItems:m,tagsGroups:u}),r.createElement(c,{display:"flex",flex:"1 1 auto",flexDirection:"row"},r.createElement(s,{location:l,sidebarItems:m}),r.createElement(a.Z,{as:"main",flex:"1"},t)))},c=(0,n.default)(a.Z).withConfig({displayName:"layout___StyledBox",componentId:"sc-7a5ttt-0"})({zIndex:0})},11665:function(e,t,l){var n=l(67294),a=l(82907),r=l(13465),i=l(65754),o=l(80464);t.Z=function(e){var t=e.nodes,l=e.shouldShowInstantView,s=void 0!==l&&l,d=e.forceMobile,u=void 0!==d&&d,c=(0,o.Z)(),f=t,m=function(e){return n.createElement(a.Z.a,Object.assign({},e,{references:s?f:[]}))};return n.createElement(r.Z,null,n.createElement(a.Z.ul,null,f&&f.filter((function(e){return"/404/"!==e.fields.slug&&(!e.frontmatter||!0!==e.frontmatter.draft)})).map((function(e){return n.createElement("li",{key:e.fields.slug},n.createElement(m,{href:e.fields.slug},e.fields.title),c.shouldShowLastUpdated&&e.fields.lastUpdated&&!u&&n.createElement(i.Z,{display:["none",null,null,"inline-block"],color:"text.placeholder",fontSize:1},"  - ",c.lastUpdatedText," ",e.fields.lastUpdated),c.shouldShowLastUpdated&&e.fields.lastUpdated&&n.createElement(r.Z,{display:u?"block":["block",null,null,"none"],color:"text.placeholder",fontSize:1,mb:2,mt:1},c.lastUpdatedText," ",e.fields.lastUpdated))}))))}},89505:function(e,t,l){l.r(t),l.d(t,{default:function(){return c}});var n=l(67294),a=l(80446),r=l(5888),i=l(13465),o=l(58594),s=l.n(o),d=l(82907),u=l(11665),c=function(e){var t=e.data,l=e.pageContext,o=e.location,c=t.site.pathPrefix||"",f=l.slug,m=s()(c||"/",f),p=t.site.siteMetadata.siteUrl,g=s()(p,m),h=t.allMdx.nodes.sort((function(e,t){var l=new Date(e.fields.lastUpdatedAt||0).getTime();return new Date(t.fields.lastUpdatedAt||0).getTime()-l})),b=null,x=null;h.length>0&&(h[h.length-1].fields.gitCreatedAt&&(b=new Date(h[h.length-1].fields.gitCreatedAt)),h[0].fields.lastUpdatedAt&&(x=new Date(h[0].fields.lastUpdatedAt)));var y="Latest Posts",E=h.map((function(e){return e.fields.title})).join(", "),Z="All latest posts, "+E.slice(0,256),v={title:y,frontmatterTitle:"",description:Z,rawBody:E,excerpt:Z,datePublished:b,dateModified:x,category:"Latest",imageUrl:null,imageAlt:"",url:g,slug:f,tags:["All Posts"]};return n.createElement(a.Z,{pageContext:l,location:o},n.createElement(r.Z,{post:v}),n.createElement(i.Z,{py:"2",px:[4,5,6,7]},n.createElement(d.Z.h2,null,y),n.createElement(u.Z,{nodes:t.allMdx.nodes,shouldShowInstantView:!1})))}},54877:function(e,t,l){l.d(t,{u:function(){return n}});var n=function(e,t){return e.length>0?e:t.length>0?[{title:"Tags",items:t}]:[]}}}]);
//# sourceMappingURL=component---plugins-gatsby-theme-primer-wiki-src-templates-latest-query-js-5bdb3bfb559056020410.js.map