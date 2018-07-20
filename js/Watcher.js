class Watcher{
	constructor(vm, node, name, type){
		Dep.target = this;
		this.name = name;
		this.node = node;
		this.vm = vm;
		this.type = type;
		//这里update会不会执行两次，倒是不会
		this.update();
		Dep.target = null;
	}
	update(){
		//这里为什么还要取一次，获取一次新的值，为执行cb作准备
		this.get();
		//
		var batcher = new Batcher();
		batcher.push(this);
	}
	cb(){
		this.node[this.type] = this.value;
	}
	get(){
		this.value = this.vm[this.name];
	}
}