(function(yr,window){
    document.getElementsByTagName('html')[0].innerHTML = yr.run('common', JSON.parse(window.wf.PagesData));
})(yr, window);