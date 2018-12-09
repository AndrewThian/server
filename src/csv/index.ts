import { Parser } from "./parser";
import { Utils } from "./utils";
import { Transformer } from "./transformer";

export class CSV {
    protected filename: string
    public parser: Parser
    public utils: Utils
    public transformer: Transformer

    constructor(filename: string) {
        this.filename = filename
        this.parser = new Parser(filename);
        this.utils = new Utils();
        this.transformer = new Transformer(this.parser, this.utils);
    }
}
