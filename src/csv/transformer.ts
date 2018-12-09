import parse from "csv-parse";
import { IParser } from "./parser";
import { IUtils } from "./utils";
import { _Day, _Record, ISchedule, IRestaurant } from "./types";

type _Callback = (data: IRestaurant) => void;

interface TransformerInterface {
    getDataPromise(): Promise<IRestaurant[] | Error>;
    getDataCallback(callback: _Callback): void;
}

export class Transformer implements TransformerInterface {
    private parser: IParser;
    private utils: IUtils;
    private csvParser: parse.Parser;
    private output: IRestaurant[];

    constructor(parser: IParser, utils: IUtils) {
        this.parser = parser;
        this.utils = utils;
        this.csvParser = parser.getCSVParser();
        this.output = [];
    }

    /**
     * Promise version of the getData for transformer
     * @returns promise array of restuarants
     */
    getDataPromise(): Promise<IRestaurant[]> {
        this.parser.getCSVData((record: _Record) => {
            const transformed = this.transform(record);
            this.output.push(transformed);
        });

        return new Promise((resolve, reject) => {
            this.csvParser.on("end", () => {
                resolve(this.output);
            });
            this.csvParser.on("error", error => {
                reject(error);
            });
        });
    }

    /**
     * callback version of the getData
     * @param callback callback to retrieve each row of transformed data
     */
    getDataCallback(callback: _Callback): void {
        this.parser.getCSVData((record: _Record) => {
            const transformed = this.transform(record);
            callback(transformed);
        });
    }

    transform(record: _Record): IRestaurant {
        const name = record[0];
        const schedule = this.parseDateStr(record[1]);
        const restaurant: IRestaurant = { name, schedule };
        return restaurant;
    }

    /**
     * parse the dateStr into usable dates with opening and closing times
     * @param dateStr example: 'Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 10:30 pm'
     */
    parseDateStr(dateStr: string): ISchedule[] {
        const schedules: ISchedule[] = [];
        dateStr.split("/").map((e: string) => {
            const trimmed = e.trim();
            const days = this.utils.getDays(trimmed);
            const [open, close] = this.utils.getTime(trimmed);
            for (const day of days) {
                schedules.push({ day, open, close });
            }
        });
        return schedules;
    }
}
