class Vue{
	constructor(opts){
		this.data = opts.data;
		observe(this.data, this);
		let id = opts.el;
		let dom = new Compile(document.getElementById(id), this);
		document.getElementById(id).appendChild(dom);
	}
}