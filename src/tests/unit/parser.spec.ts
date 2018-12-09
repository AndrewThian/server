import { Parser } from "../../csv/parser"

const filename = "test.csv"

describe("[Unit] csv-parser test suite", () => {
    it("should parse the row of given filename", () => {
        const parser = new Parser(filename)

        parser.getCSVData((data, row) => {
            if (row === 1) {
                expect(data[0]).toEqual("Kushi Tsuru")
                expect(data[1]).toEqual("Mon-Sun 11:30 am - 9 pm")
            } else if (row === 2) {
                expect(data[0]).toEqual("Osakaya Restaurant")
                expect(data[1]).toEqual("Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm")
            }
        })
    })
})