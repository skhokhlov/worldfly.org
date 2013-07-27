var idc = {
	logo_link: document.getElementsByClassName('b-header-logo_link'), 
	img_after: '/images/b-error-header-logo.svg', 
	img_before: '/images/b-error-header-logo_hovered.svg'
};
      
idc.logo_link.onMouseOver = function(){alert(idc.img_after);};

console.log('qwert');