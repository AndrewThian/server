import moment from "moment";
import { _Day } from "./types";

export interface IUtils {
    convertDays(s: string): string[];
    getDays(s: string): _Day[];
    getTime(s: string): string[];
}

export class Utils implements IUtils {
    private regex: RegExp;
    private days: _Day[];
    private currentDays: _Day[];

    constructor() {
        this.regex = new RegExp(
            "(Mon|Tue|Wed|Thu|Fri|Sat|Sun)-(Mon|Tue|Wed|Thu|Fri|Sat|Sun)|(Mon|Tue|Wed|Thu|Fri|Sat|Sun)",
            "gi"
        );
        this.currentDays = [];
        this.days = [
            _Day.Mon,
            _Day.Tue,
            _Day.Wed,
            _Day.Thu,
            _Day.Fri,
            _Day.Sat,
            _Day.Sun,
        ];
    }

    /**
     * convert shortened days string into full set of days
     * return early if it's just one day
     * @param s example "Mon-Thu" | "Sun"
     * @returns {Array} [ "Mon", "Tue", "Wed", "Thu" ]
     */
    convertDays(s: string): _Day[] {
        const dateString = s.split("-") as _Day[];
        if (dateString.length === 1) {
            return dateString;
        }
        const from = this.days.indexOf(dateString[0]);
        const to = this.days.indexOf(dateString[1]) + 1;
        return this.days.slice(from, to);
    }

    /**
     * convert datetime strings into dates
     * 1. get datestrings
     * 2. parse into Day[]
     * 3. flatten arrays
     * @param datetimeStrings example "Mon-Thu, Sun 11:30 am - 10 pm"
     * @returns {Array} ["Mon", "Tue", "Wed", "Thur", "Sun"]
     */
    getDays(datetimeStrings: string): _Day[] {
        const dateStrings = datetimeStrings.match(this.regex);
        const dates = dateStrings.map(date => this.convertDays(date));
        /* cache currentDays */
        this.currentDays = dates.reduce((acc, curr) => [...acc, ...curr], []);
        /* flatten arrays */
        return this.currentDays;
    }

    /**
     * convert datetime strings into time
     * 1. remove all dates
     * 2. remove all commans
     * 3. trim whitespaces
     * 4. split timestring into start - end
     * 5. convert start and end string to date
     * @param datetimeStrings example "Mon-Thu, Sun 11:30 am - 10 pm"
     * @returns {Array} ["11:30 am", "10 pm"]
     */
    getTime(datetimeStrings: string): string[] {
        const timeStrings = datetimeStrings
            .replace(this.regex, "")
            .replace(/[,]/g, "");
        const [start, end] = timeStrings
            .trim().split("-")
            .map(time => moment(time.trim(), "h:m A").format("HH:mm"))
        return [start, end];
    }
}
