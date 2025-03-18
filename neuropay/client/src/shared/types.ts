export type MaybeGetter<T> = T | (() => T)

export type DataRecord = {
    id: string
}

export type DateRange<T extends Date | string = Date> = {
    from: T
    to: T
}

export type Numeric = number | string
