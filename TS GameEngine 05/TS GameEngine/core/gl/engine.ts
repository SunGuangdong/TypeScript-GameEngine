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
            this._buffer = new GLBuffer();
            let positionArribute = new AttributeInfo();
            positionArribute.location = this._shader.getAttributeLocation("a_position");
            positionArribute.offset = 0;
            positionArribute.size = 3;
            this._buffer.addAttributeLocation(positionArribute);

            let vertices = [
                // x, y, z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0
            ];

            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();
        }


        /**
         * 游戏主循环 
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);  // 使用颜色缓冲区中的颜色，每次刷新

            // set uniform 
            let colorPosition = this._shader.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

            this._buffer.bind();
            this._buffer.draw();

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
uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
`;
            this._shader = new Shader("base", vertexShaderSource, fragmentShaderSource);
        }
    }
}