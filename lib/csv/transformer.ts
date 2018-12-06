import parse from "csv-parse";
import { _Parser } from "./parser";
import { _Utils } from "./utils"
import { _Day, _Record, _Schedule, _Restaurant } from "./types"

type Callback = (data: _Restaurant) => void

interface _Transformer {
    getDataPromise(): Promise<Array<_Restaurant> | Error>
    getDataCallback(Callback): void
    transform(record: _Record): _Restaurant
}

export class Transformer implements _Transformer {
    private parser: _Parser
    private utils: _Utils
    private csvParser: parse.Parser;
    private output: Array<_Restaurant>;

    constructor(parser, utils) {
        this.parser = parser;
        this.utils = utils
        this.csvParser = parser.getCSVParser();
        this.output = [];
    }

    /**
     * Promise version of the getData for transformer
     * @returns promise array of restuarants
     */
    getDataPromise (): Promise<Array<_Restaurant> | Error> {
        this.parser.getCSVData((record: _Record) => {
            const transformed = this.transform(record)
            this.output.push(transformed)
        })

        return new Promise((resolve, reject) => {
            this.csvParser.on("end", () => {
                resolve(this.output)
            })
            this.csvParser.on("error", error => {
                reject(error)
            })
        })
    }

    /**
     * callback version of the getData
     * @param callback callback to retrieve each row of transformed data
     */
    getDataCallback (callback: Callback): void {
        this.parser.getCSVData((record: _Record) => {
            const transformed = this.transform(record)
            callback(transformed)
        })
    }

    transform (record: _Record): _Restaurant {
        const name = record[0]
        const schedule = this.parseDateStr(record[1])
        const restaurant: _Restaurant = { name, schedule }
        return restaurant
    }

    /**
     * parse the dateStr into usable dates with opening and closing times
     * @param dateStr example: 'Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 10:30 pm'
     */
    parseDateStr (dateStr: string): Array<_Schedule> {
        const schedules: Array<_Schedule> = [];
        dateStr.split("/").map((e: string) => {
            const trimmed = e.trim()
            const days = this.utils.getDays(trimmed)
            const [open, close] = this.utils.getTime(trimmed)
            for (let i = 0; i < days.length; i++) {
                schedules.push({ day: days[i], open, close })
            }
        });
        return schedules
    }
}