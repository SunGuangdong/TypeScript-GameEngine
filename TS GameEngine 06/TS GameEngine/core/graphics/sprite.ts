namespace TSE {

    /**
     * Represents a 2-dimensional sprite which is drawn on the screen.
     * */
    export class Sprite {

        protected _name: string;
        protected _width: number;
        protected _height: number;

        protected _buffer: GLBuffer;

        public position:Vector3 = new Vector3();   // 只是 暂时存储位置数据

        /**
         * Creates a new sprite.
         * @param name The name of this sprite.
         * @param materialName The name of the material to use with this sprite.
         * @param width The width of this sprite.
         * @param height The height of this sprite.
         */
        public constructor(name: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._width = width;
            this._height = height;
        }

        /**
         * Performs loading routines on this sprite.
         * */
        public load(): void {    // 把 engine.ts 中的 craeteBuffer 函数内容拷贝过来。 
            this._buffer = new GLBuffer();
            let positionArribute = new AttributeInfo();
            positionArribute.location = 0//this._shader.getAttributeLocation("a_position");
            positionArribute.offset = 0;
            positionArribute.size = 3;
            this._buffer.addAttributeLocation(positionArribute);

            let vertices = [
                // x, y, z
                0, 0, 0,
                0, this._height, 0,
                this._width, this._height, 0,

                this._width, this._height, 0,
                this._width, 0, 0,
                0, 0, 0
            ];

            this._buffer.pushBackData(vertices);
            this._buffer.upload();
            this._buffer.unbind();
        }

        /**
         * Performs update routines on this sprite.
         * @param time The delta time in milliseconds since the last update call.
         */
        public update(time: number): void {

        }

        /** Draws this sprite. */
        public draw(): void {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}