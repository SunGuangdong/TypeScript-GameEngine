namespace TSE {
    /**
     * 游戏引擎类
     */
    export class Engine implements IMessageHandler{

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

        private _previousTime: number = 0;

        /**
         * Start up 函数
         */
        public start(): void {
            this._canvas = GLUtilities.initialize();
            AssetManager.initialize();
            InputManager.initialize();
            ZoneManager.initialize();


            Message.subscribe("MOUSE_UP", this);

            gl.clearColor(0, 0, 0.3, 1);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            this._basicShader = new BasicShader();
            this._basicShader.use();

            //let zoneID = ZoneManager.createTestZone();
            // load material 
            MaterialManager.registerMaterial(new Material("end", "assets/textures/end.png", new Color(0, 128, 255, 255)));
            MaterialManager.registerMaterial(new Material("duck", "assets/textures/duck.png", Color.white()));

            AudioManager.loadSoundFile("flap", "assets/sounds/flap.mp3", false);

            this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);

            ZoneManager.changeZone(0);

            this.resize();
            this.loop();
        }

        /**
         * 游戏主循环 
         */
        private loop(): void {
            this.update();
            this.render();
        }

        private update(): void {

            let delta = performance.now() - this._previousTime;

            MessageBus.update(delta);
            ZoneManager.update(delta);
            CollisionManager.update(delta);

            this._previousTime = performance.now();
        }

        private render(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            ZoneManager.render(this._basicShader);
            // Set uniforms.
            let projectionPosition = this._basicShader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            requestAnimationFrame(this.loop.bind(this));
        }

        public onMessage(message: Message): void {
            if (message.code === "MOUSE_UP") {
                let context = message.context as MouseContext;
                document.title = `Pos: [${context.position.x},${context.position.y}]`;

                AudioManager.playSound("flap");
            }
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