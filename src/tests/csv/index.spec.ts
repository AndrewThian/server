import { CSV } from "../../csv";
import { Restaurant } from "../../entity/Restaurant"
import { Schedule } from "../../entity/Schedule";

describe("[Integration] csv test suite", () => {
    it("should clear database on each run", async  () => {
        const r = await Restaurant.find()
        const s = await Schedule.find()

        expect(r.length).toEqual(0)
        expect(s.length).toEqual(0)
    })
    it("should insert all the relevant data into the database",async () => {
        const csv = new CSV("test.csv")

        const dataset = await csv.transformer.getDataPromise()
        for (const row of dataset) {
            const restaurant = await Restaurant.upsert(row.name);
            for (const schedule of row.schedule) {
                await Schedule.upsert(restaurant, schedule);
            }
        }

        const r = await Restaurant.find()
        const s = await Schedule.find()

        expect(r.length).toEqual(2)
        expect(s.length).toEqual(14)
    })
})