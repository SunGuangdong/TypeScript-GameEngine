namespace TSE {
	export class Engine {
		public constructor() {
			console.log("Hello World");
		}

		private _count: number = 0;

		public start(): void {
			this.loop();
		}

		private loop(): void {
			this._count++;
			document.title = this._count.toString();

			requestAnimationFrame(this.loop.bind(this));
		}
	}
}

window.onload = function () {
	var e = new TSE.Engine();
	e.start();
	document.body.innerHTML += "Foo";
}