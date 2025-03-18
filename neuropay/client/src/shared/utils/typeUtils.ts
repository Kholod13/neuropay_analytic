import { isPlainObject as lodashIsPlainObject, isObjectLike as lodashIsObjectLike } from 'lodash-es';

export type ValueOf<T> = T[keyof T]

export function isValue<T> (value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function isPlainObject (obj: unknown): obj is Record<string, unknown> {
    return lodashIsPlainObject(obj);
}

export function isObjectLike (obj: unknown): obj is object {
    return lodashIsObjectLike(obj);
}

export function hasOwnProperty<Obj extends object, Prop extends PropertyKey, PropValue> (
    obj: Obj,
    prop: Prop,
): obj is Obj & Record<Prop, PropValue> {
    return Object.hasOwn(obj, prop);
}

export function hasProperty<Obj extends object, Prop extends PropertyKey, PropValue> (
    obj: Obj,
    prop: Prop,
): obj is Obj & Record<Prop, PropValue> {
    return prop in obj;
}
