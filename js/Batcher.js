class Batcher{
	constructor(){
		this.reset();
	}
	reset(){
		this.has = {};
		this.queue = [];
		this.waiting = false;
	}
	push(job){
		if(!this.has[job.name]){
			this.queue.push(job);
			this.has[job.name] = job;
			if(!this.waiting){
				this.waiting = true;
				setTimeout(()=>{
					this.flush();
				})
			}
		}
	}
	flush(){
		this.queue.forEach((job)=>{
			job.cb();
		});
		this.reset();
	}
}