namespace TSE {
    /**
     * 游戏引擎类
     */
    export class Engine {
        /**
         * 构造函数
         */
        public constructor() {
            console.log("Hello World");
        }

        private _count: number = 0;
        private _canvas: HTMLCanvasElement;
        private _basicShader: BasicShader;

        private _buffer: GLBuffer; 
        private _sprite: Sprite;
        private _projection : Matrix4x4;


        /**
         * Start up 函数
         */
        public start(): void {
            this._canvas = GLUtilities.initialize();
            AssetManager.initialize();

            gl.clearColor(1, 0, 0, 1);  // 设置红色

            this._basicShader = new BasicShader();
            this._basicShader.use();

            // load material 
            MaterialManager.registerMaterial(new Material("create", "assets/textures/duck.png", new Color(0, 128, 255, 255)));

            this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);

            this._sprite = new Sprite("test", "create");
            this._sprite.load();
            this._sprite.position.x = 200;
            this._sprite.position.y = 100;

            this.resize();
            this.loop();
        }


        /**
         * 游戏主循环 
         */
        private loop(): void {
            MessageBus.update(0);

            gl.clear(gl.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新



            let projectionPosition = this._basicShader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            this._sprite.draw(this._basicShader);

            requestAnimationFrame(this.loop.bind(this));
        }

        /**
         * Resizes the canvas to fit the window.
         * */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);

        }
    }
}