!function(e,t,o){var a={addClickListener:function(e,t){for(var a=o.getElementsByClassName(e),n=a.length;n--;)a[n].addEventListener("click",t)},navigation:function(){o.getElementsByClassName("b-nav__link_home")&&a.addClickListener("b-nav__link_home",function(e){return history.pushState({page:"home"},"Home page of World Fly","/"),a.pages.home(),e.preventDefault(),!1}),o.getElementsByClassName("b-nav__link_projects")&&a.addClickListener("b-nav__link_projects",function(e){return history.pushState({page:"projects"},"Projects of World Fly","/projects"),a.pages.projects(),e.preventDefault(),!1})},pages:{home:function(){o.title="Home page of World Fly",o.getElementsByClassName("b-layout")[0].innerHTML=a.render.home,a.navigation()},projects:function(){o.title="Projects of World Fly",o.getElementsByClassName("b-layout")[0].innerHTML=a.render.projects,a.navigation()}},render:{home:e.run("app",JSON.parse(t.wf.PagesData).home),projects:e.run("app",JSON.parse(t.wf.PagesData).projects)}};t.addEventListener("popstate",function(e){"home"===e.state.page?a.pages.home():"projects"===e.state.page&&a.pages.projects()});var n=t.location.hash||"";"/"===t.location.pathname?(history.replaceState({page:"home"},"Home page of World Fly",n),a.pages.home()):"/projects"===t.location.pathname&&(history.replaceState({page:"projects"},"Projects of World Fly",n),a.pages.projects(),n&&t.scrollTo(0,o.querySelector(n).offsetTop))}(yr,window,document);