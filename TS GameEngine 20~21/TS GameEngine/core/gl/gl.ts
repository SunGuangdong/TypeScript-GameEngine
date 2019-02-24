
namespace TSE {
    /**
     * The WebGL rendering context.
     * */
    export var gl: WebGLRenderingContext;
    /**
     * 负责设置WebGL渲染上下文。
     */
    export class GLUtilities {

        /**
         * 初始化WebGL，如果已经定义画布了就是查找， 否则就创建。
         * @param elementId 要搜索的元素的ID。
         */
        public static initialize(elementId?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement;

            if (elementId !== undefined) {
                canvas = document.getElementById(elementId) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named:" + elementId);
                }
            } else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }

            // 可能浏览器不支持，要做一下检查
            gl = canvas.getContext("webgl");
            if (gl === undefined || gl === null) {
                gl = canvas.getContext("experimental-webgl");
                if (gl === undefined || gl === null) {
                    throw new Error("Unable to initialize WebGL!");
                }
            }

            return canvas;
        }
    }
}