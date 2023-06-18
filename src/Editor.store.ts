import { defineStore } from 'pinia';
import { Editor } from './Editor';

export enum FunctionType {
    None,
    Draw,
}

export enum DrawType {
    Pen,
    Marker,
    Highlighter,
    Eraser,
    Selector,
    Color,
    Settings,
}

export const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            editor: new Editor(),
            selectedFunction: FunctionType.None,
            draw: DrawType.Pen,
        };
    },
});