namespace TSE {

    export interface IComponent {

        name: string;

        readonly owner: SimObject;
        setOwner(owner: SimObject): void;

        load(): void;

        updateReady(): void;

        update(time: number): void;

        render(shader: Shader): void;
    }
}