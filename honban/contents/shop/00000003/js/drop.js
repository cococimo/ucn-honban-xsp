var dropdown = function(e) {
	var node       = null;
	var anchorNode = null;
	var targetId   = '';
	var thisId     = '';
	var nodes      = this.parentNode.childNodes;

	anchorNode = this.childNodes[0];
	targetId   = anchorNode.id;
	if ((n = targetId.lastIndexOf('#')) !== -1) {
		thisId = targetId.substring(n).replace('#', '');
		node = document.getElementById(thisId);
		if(e.type === 'mouseover') {
			node.style.display    = 'block';
			node.style.visibility = 'visible';
		} else {
			node.style.display    = 'none';
			node.style.visibility = 'hidden';
		}
	}

	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i].nodeType === 1) {
			anchorNode = nodes[i].childNodes[0];
			targetId   = anchorNode.id;
			if ((n = targetId.lastIndexOf('#')) !== -1) {
				targetId = targetId.substring(n).replace('#', '');
				if(targetId !== '' && thisId !== targetId) {
					node = document.getElementById(targetId);
					node.style.display    = 'none';
					node.style.visibility = 'hidden';
				}
			}
		}
	}
};
