!function t(n,e){"function"!=typeof e.prototype.done&&(e.prototype.done=function(){var t=arguments.length?this.then.apply(this,arguments):this;t.then(null,function(t){setTimeout(function(){throw t},0)})});var o=function(t){return new e(function(n,e){var o=new XMLHttpRequest;o.open("GET",t,!0),o.onload=function(){200===o.status?n(o.response):e(Error(o.statusText))},o.onerror=function(){e(Error("Network Error"))},o.send(null)})},a=function(t,e,o){n.URL=n.URL||n.webkitURL;var a=new Blob(t,{type:e});if("text/css"===e){var r=document.createElement("link");r.id=o,r.rel="stylesheet",r.href=n.URL.createObjectURL(a),document.head.appendChild(r)}else if("text/javascript"===e){var i=document.createElement("script");i.id=o,i.src=n.URL.createObjectURL(a),document.head.appendChild(i)}};n.wf.BlobContent.load=0;var r=function(){3===n.wf.BlobContent.load&&(a([n.wf.BlobContent.runtimejs],"text/javascript","runtime.js"),a([n.wf.BlobContent.appyatejs],"text/javascript","app.yate.js"),a([n.wf.BlobContent.appjs],"text/javascript","app.js"))},i=function(e){n.wf.BootCount++,console.error(e),n.wf.BootCount<1&&(console.log("Loading error. I'm try again now"),t())};o("/public/runtime.js").then(function(t){n.wf.BlobContent.runtimejs=t,n.wf.BlobContent.load++,r()},function(t){i(t)}),o("/public/app.yate.js").then(function(t){n.wf.BlobContent.appyatejs=t,n.wf.BlobContent.load++,r()},function(t){i(t)}),o("/public/app.js").then(function(t){n.wf.BlobContent.appjs=t,n.wf.BlobContent.load++,r()},function(t){i(t)}),o("/assest/data.json").then(function(t){n.wf.PagesData=t},function(){i(error)})}(window,Promise);