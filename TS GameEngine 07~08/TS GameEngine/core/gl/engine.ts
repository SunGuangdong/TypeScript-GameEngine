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
        private _shader: Shader;

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

            this.loadShaders();
            this._shader.use();

            this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);

            this._sprite = new Sprite("test", "assets/textures/duck.png");
            this._sprite.load();
            this._sprite.position.x= 200;

            this.resize();
            this.loop();
        }


        /**
         * 游戏主循环 
         */
        private loop(): void {
            MessageBus.update(0);

            gl.clear(gl.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新

            // set uniform 
            let colorPosition = this._shader.getUniformLocation("u_tint");
            //gl.uniform4f(colorPosition, 1, 1, 1, 1);
            gl.uniform4f(colorPosition, 1, 0.5, 1, 1);

            let projectionPosition = this._shader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

            let modelPosition = this._shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelPosition, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));

            this._sprite.draw(this._shader);

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

            gl.viewport(-1, 1, 1, -1);
        }

        private loadShaders(): void {
            let vertexShaderSource = `
attribute vec3 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_projection;
uniform mat4 u_model;

varying vec2 v_texCoord;

void main() {
    gl_Position = u_projection * u_model * vec4(a_position, 1.0);
    v_texCoord = a_texCoord;
}
`;
            let fragmentShaderSource = `
precision mediump float;
uniform vec4 u_tint;
uniform sampler2D u_diffuse;

varying vec2 v_texCoord;

void main() {
    gl_FragColor = u_tint * texture2D(u_diffuse, v_texCoord);
}
`;
            this._shader = new Shader("base", vertexShaderSource, fragmentShaderSource);
        }
    }
}