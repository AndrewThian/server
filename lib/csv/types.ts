export enum _Day { Mon="Mon", Tue="Tue", Wed="Wed", Thu="Thu", Fri="Fri", Sat="Sat", Sun="Sun" }

export type _Record = string[]

export type _Callback = (record: _Record) => void;

export type _Schedule = {
    day: _Day,
    open: string
    close: string
}

export type _Restaurant = {
    name: string
    schedule: Array<_Schedule>
}