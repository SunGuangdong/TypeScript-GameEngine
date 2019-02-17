namespace TSE {

    /**
     * Represents a WebGL shader.
     * */
    export class Shader {
        private _name: string;
        private _program: WebGLProgram;

        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this.createProgram(vertexShader, fragmentShader);
        }

        /**
         * Use this shader.
         * */
        public use(): void {
            gl.useProgram(this._program);
        }

        /**
         * Creates a new shader.
         * @param name The name of this shader.
         */
        public get name():string {
            return this._name;
        }


        private loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader).trim();
            if (error !== "") {
                throw new Error("Error compiling shader '" + this._name + "': " + error + "  " + shaderType + "   " + source);
            }

            return shader;
        }

        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram();

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);

            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program).trim();
            if (error !== "") {
                throw new Error("Error linking shader '" + this._name + "': " + error);
            }
        }
    }
}