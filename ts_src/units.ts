import { GlobalPoint, LocalPoint, Ray } from "./geom";
import Settings from "./settings";

export function g2l(obj: GlobalPoint): LocalPoint {
    const z = Settings.zoomFactor;
    const panX = Settings.panX;
    const panY = Settings.panY;
    return new LocalPoint((obj.x + panX) * z, (obj.y + panY) * z);
}

export function g2lx(x: number) {
    return g2l(new GlobalPoint(x, 0)).x;
}

export function g2ly(y: number) {
    return g2l(new GlobalPoint(0, y)).y;
}

export function g2lz(z: number) {
    return z * Settings.zoomFactor;
}

export function getUnitDistance(r: number) {
    return (r / Settings.unitSize) * Settings.gridSize;
}

export function g2lr(r: number) {
    return g2lz(getUnitDistance(r))
}

export function l2g(obj: LocalPoint): GlobalPoint;
export function l2g(obj: Ray<LocalPoint>): Ray<GlobalPoint>;
export function l2g(obj: LocalPoint|Ray<LocalPoint>): GlobalPoint|Ray<GlobalPoint> {
    const z = Settings.zoomFactor;
        const panX = Settings.panX;
        const panY = Settings.panY;
    if (obj instanceof LocalPoint) {
        return new GlobalPoint((obj.x / z) - panX, (obj.y / z) - panY);
    } else {
        return new Ray<GlobalPoint>(l2g(obj.origin), obj.direction.multiply(1 / z), obj.tMax);
    }
}

export function l2gx(x: number) {
    return l2g(new LocalPoint(x, 0)).x;
}

export function l2gy(y: number) {
    return l2g(new LocalPoint(0, y)).y;
}