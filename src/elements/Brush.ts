import { Element } from './Element';
import * as PIXI from 'pixi.js';

export class Brush extends Element {
    sprite: PIXI.DisplayObject;

    private _lastPoint: PIXI.Point | null = null;
    private static MIN_DISTANCE = 5;

    private _points: PIXI.Point[] = [];
    private _color: string = '#000000';
    private _weight: number = 10;
    private _dirty: boolean = false;

    constructor(uuid?: string) {
        super(uuid);

        this.sprite = new PIXI.Graphics();
    }

    set color(color: string) {
        this._color = color;
        this._dirty = true;
    }

    get color() {
        return this._color;
    }

    set weight(value: number) {
        this._weight = value;
        this._dirty = true;
    }

    get weight() {
        return this._weight;
    }

    set points(value: PIXI.Point[]) {
        this._points = value;
        this._dirty = true;
    }

    get points() {
        return this._points;
    }

    lineTo(x: number, y: number) {
        if (!this._lastPoint) {
            this._lastPoint = new PIXI.Point(0, 0);
        }
        this._lastPoint = new PIXI.Point(this._lastPoint.x + x, this._lastPoint.y + y);

        this._points.push(this._lastPoint);
        this._dirty = true;
    }

    private _calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance;
    }

    render(): boolean {
        if (this._dirty && this._points.length > 3) {
            this.graphics.clear();
            this.graphics.lineStyle(this._weight, this._color);
            for (let index = 0; index < this._points.length - 1; index++) {
                let control = this._points[index];
                let end = new PIXI.Point(
                    (this._points[index].x + this._points[index + 1].x) / 2,
                    (this._points[index].y + this._points[index + 1].y) / 2
                );
                this.graphics.quadraticCurveTo(control.x, control.y, end.x, end.y);
            }
            this._dirty = false;
            return true;
        } else {
            return false;
        }
    }

    private get graphics() {
        return this.sprite as PIXI.Graphics;
    }
}
