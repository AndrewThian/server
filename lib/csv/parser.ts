import parse from "csv-parse";
import fs from "fs";
import path from "path";
import { _Record, _Callback } from "./types"

export interface _Parser {
    getCSVParser(): parse.Parser;
    getCSVData(Callback): void;
}

export class Parser implements _Parser {
    private filepath: string
    private readStream: fs.ReadStream;
    private csvParser: parse.Parser;

    constructor(filename: string) {
        this.filepath = path.join(__dirname, "../..", `data/${filename}`)
        this.readStream = fs.createReadStream(this.filepath)
        this.csvParser = parse({ delimiter: "," })
        this.readStream.pipe(this.csvParser)
    }

    getCSVParser() {
        return this.csvParser;
    }

    getCSVData(callback: _Callback) {
        this.csvParser.on("readable", () => {
            let record: _Record;
            while(record = this.csvParser.read()) {
                callback(record)
            }
        })
    }
}