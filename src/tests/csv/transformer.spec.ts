import { Transformer } from "../../csv/transformer"
import { Parser } from "../../csv/parser";
import { Utils } from "../../csv/utils";

const filename = "test.csv"

describe("[Unit] csv-transformer test suite", () => {
    it("#parseDateStr should transform datetime string into formatted data", () => {
        const parser = new Parser(filename) // TODO: mock this
        const utils = new Utils() // TODO: mock this
        const transformer = new Transformer(parser, utils);
        const testString = 'Mon-Thu, Sun 11:30 am - 10 pm  / Fri-Sat 11:30 am - 10:30 pm'
        const controlData = [
            { day: "Mon", open: "11:30", close: "22:00" },
            { day: "Tue", open: "11:30", close: "22:00" },
            { day: "Wed", open: "11:30", close: "22:00" },
            { day: "Thu", open: "11:30", close: "22:00" },
            { day: "Sun", open: "11:30", close: "22:00" },
            { day: "Fri", open: "11:30", close: "22:30" },
            { day: "Sat", open: "11:30", close: "22:30" }
        ]

        expect(transformer.parseDateStr(testString)).toEqual(controlData)
    })
    it("#transform should return a restaurant object", () => {
        const parser = new Parser(filename) // TODO: mock this
        const utils = new Utils() // TODO: mock this
        const transformer = new Transformer(parser, utils);
        const record = ["Osakaya Restaurant","Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"] 
        const controlData:any = {
            name: "Osakaya Restaurant",
            schedule: [
                { day: "Mon", open: "11:30", close: "21:00" },
                { day: "Tue", open: "11:30", close: "21:00" },
                { day: "Wed", open: "11:30", close: "21:00" },
                { day: "Thu", open: "11:30", close: "21:00" },
                { day: "Sun", open: "11:30", close: "21:00" },
                { day: "Fri", open: "11:30", close: "21:30" },
                { day: "Sat", open: "11:30", close: "21:30" }
            ]
        }
        
        expect(transformer.transform(record)).toEqual(controlData)
    })
    it("#getDataPromise should return a promise all the resolved data", async () => {
        const parser = new Parser(filename)
        const utils = new Utils()
        const transformer = new Transformer(parser, utils);
        const data = await transformer.getDataPromise()
        const controlData1 = {
            name: "Kushi Tsuru",
            schedule: [
                { day: "Mon", open: "11:30", close: "21:00" },
                { day: "Tue", open: "11:30", close: "21:00" },
                { day: "Wed", open: "11:30", close: "21:00" },
                { day: "Thu", open: "11:30", close: "21:00" },
                { day: "Fri", open: "11:30", close: "21:00" },
                { day: "Sat", open: "11:30", close: "21:00" },
                { day: "Sun", open: "11:30", close: "21:00" }
            ]
        }
        const controlData2 = {
            name: "Osakaya Restaurant",
            schedule: [
                { day: "Mon", open: "11:30", close: "21:00" },
                { day: "Tue", open: "11:30", close: "21:00" },
                { day: "Wed", open: "11:30", close: "21:00" },
                { day: "Thu", open: "11:30", close: "21:00" },
                { day: "Sun", open: "11:30", close: "21:00" },
                { day: "Fri", open: "11:30", close: "21:30" },
                { day: "Sat", open: "11:30", close: "21:30" }
            ]
        }

        expect(data[0]).toEqual(controlData1)
        expect(data[1]).toEqual(controlData2)
    })
})