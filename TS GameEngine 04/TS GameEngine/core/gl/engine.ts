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

        private _buffer : WebGLBuffer;   // 缓冲区是数据的容器， 会被推送到显卡中， 专用于顶点着色器

        /**
         * Start up 函数
         */
        public start(): void {
            this._canvas = GLUtilities.initialize();
            gl.clearColor(1, 0, 0, 1);  // 设置红色

            this.loadShaders();
            this._shader.use();

            this.craeteBuffer();

            this.resize();
            this.loop();
        }


        private craeteBuffer(): void {
            this._buffer = gl.createBuffer();

            let vertices = [
                // x, y, z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
            gl.disableVertexAttribArray(0);
        }


        /**
         * 游戏主循环 
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);

            gl.drawArrays(gl.TRIANGLES, 0, 3);

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

            gl.viewport(0,0 , window.innerWidth, window.innerHeight);
        }

        private loadShaders(): void {
            let vertexShaderSource = `
attribute vec3 a_position;

void main() {
    gl_Position = vec4(a_position, 1.0);
}
`;
            let fragmentShaderSource = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;
            this._shader = new Shader("base", vertexShaderSource, fragmentShaderSource);
        }
    }
}