import { Utils } from "../../csv/utils"

describe("[Unit] csv-utils test suite", () => {
    it("#convertDays should return an array of Mon-Thu if provided with a string 'Mon-Thu'", () => {
        const utils = new Utils();

        expect(utils.convertDays("Mon-Thu")).toEqual(["Mon","Tue","Wed","Thu"])
    })
    it("#convertDays should return an array of Fri-Sun if provided with a string 'Fri-Sun'", () => {
        const utils = new Utils();

        expect(utils.convertDays("Fri-Sun")).toEqual("Fri Sat Sun".split(" "))
    })
    it("#convertDays should return an array of Sat if provided with a string 'Sat'", () => {
        const utils = new Utils();

        expect(utils.convertDays("Sat")).toEqual(["Sat"])
    })
    it("#getDays should return just an array of days if passed in a datetime string", () => {
        const utils = new Utils();

        expect(utils.getDays("Mon-Thu, Sun 11:30 am - 10 pm")).toEqual("Mon Tue Wed Thu Sun".split(" "))
    })
    it("#getTime should return an array of [start 24hr, end 24hr] if passed in a datetime string", () => {
        const utils = new Utils();

        expect(utils.getTime("Mon-Thu, Sun 11:30 am - 10 pm")).toEqual(["11:30", "22:00"])
    })
})