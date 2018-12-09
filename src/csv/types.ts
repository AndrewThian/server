export enum _Day {
    Mon = "Mon",
    Tue = "Tue",
    Wed = "Wed",
    Thu = "Thu",
    Fri = "Fri",
    Sat = "Sat",
    Sun = "Sun",
}

export type _Record = string[];

export type _Callback = (record: _Record, row: number) => void;

export interface ISchedule {
    day: _Day;
    open: string;
    close: string;
}

export interface IRestaurant {
    name: string;
    schedule: ISchedule[];
}
