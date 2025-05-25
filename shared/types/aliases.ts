export type UUID = string
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Brand<T, U> = T & { __brand: U }
export type UnixTimestamp = number
export type ISODateString = string
export type NonEmptyArray<T> = [T, ...T[]]
