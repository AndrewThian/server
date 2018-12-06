import { Parser } from "./parser";
import { Utils } from "./utils"
import { Transformer } from "./transformer";

const parser = new Parser("hours.csv")
const utils = new Utils()
const transformer = new Transformer(parser, utils);

transformer.getDataCallback(data => {
    console.log(data)
})