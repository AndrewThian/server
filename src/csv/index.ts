import { Parser } from "./parser";
import { Utils } from "./utils";
import { Transformer } from "./transformer";

const parser = new Parser("hours.csv");
const utils = new Utils();
export const csv = new Transformer(parser, utils);
