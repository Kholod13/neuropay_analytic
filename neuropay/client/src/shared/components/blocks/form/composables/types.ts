export type FormError = string
export type FormErrorsByFieldName<T extends string> = Partial<Record<T, FormError>>

export type IsFieldTouched<T extends string> = (name: T) => boolean
