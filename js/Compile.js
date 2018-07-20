class Compile{
	constructor(node, vm){
		if(node){
			this.$frag = this.nodeToFragment(node, vm);
			return this.$frag;
		}
	}
	nodeToFragment(node, vm){
		var self = this;
		let frag = document.createDocumentFragment();
		let child;
		while(child = node.firstChild){
			self.compileElement(child, vm);
			frag.append(child);
		}
		return frag;
	}
	compileElement(node, vm){
		var reg = /\{\{(.*)\}\}/;
		if(node.nodeType === 1){
			var attr = node.attributes;
			for(var i = 0; i < attr.length; i++){
				if(attr[i].nodeName == 'v-model'){
					var name = attr[i].nodeValue;
					node.addEventListener('input', function(e){
						vm[name] = e.target.value;
					});
					//都加了watcher为什么还要dom diff和virtual dom呢，都加一个watcher不就行了？
					new Watcher(vm, node, name, 'value');
				}
			}
		}
		if(node.nodeType === 3){
			if(reg.test(node.nodeValue)){
				var name = RegExp.$1;
				name = name.trim();
				new Watcher(vm, node, name, 'nodeValue');
			}
		}
	}

}