!function(e,t,a){t.app={launch:function(){"/"===t.location.pathname?(history.replaceState({page:"home"},"Home page of World Fly","/"),app.pages.home()):"/projects"===t.location.pathname&&(history.replaceState({page:"projects"},"Projects of World Fly","/projects"),app.pages.projects())},navigation:function(){void 0!==a.getElementsByClassName("b-nav__link_home")[0]&&a.getElementsByClassName("b-nav__link_home")[0].addEventListener("click",function(){return history.pushState({page:"home"},"Home page of World Fly","/"),app.pages.home(),!1}),a.getElementsByClassName("b-nav__link_projects")[0].addEventListener("click",function(){return history.pushState({page:"projects"},"Projects of World Fly","/projects"),app.pages.projects(),!1})},pages:{home:function(){a.title="Home page of World Fly",a.getElementsByTagName("html")[0].innerHTML=app.render.home,app.navigation()},projects:function(){a.title="Projects of World Fly",a.getElementsByTagName("html")[0].innerHTML=app.render.projects,app.navigation()}},render:{home:e.run("common",JSON.parse(t.wf.PagesData).home),projects:e.run("common",JSON.parse(t.wf.PagesData).projects)}},t.addEventListener("popstate",function(e){"home"===e.state.page?app.pages.home():"projects"==e.state.page&&app.pages.projects()}),app.launch()}(yr,window,document);