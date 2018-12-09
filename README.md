## Typeorm ##

Here's a list of examples and snippets that I've played around on how to work with typeorm:

1. Raw sql query for `SELECT`:
```js
const results = await connection.query(`SELECT * FROM user`)
for (let result of results) {
    // create a UserEntity from the RawRowData
    const user = connection.manager.create(User, result)
    console.log(user)
}
```

2. Query builder for `datetime` selection and filtering:
```js
// parse day from Date
console.log(new Date('2007-02-03').getDay())
let schedules = await connection.createQueryBuilder()
    .select("schedule")
    .from(Schedule, "schedule") // using sql parameter
    .where("schedule.day_of_week = :day", { day: "SUN" })
    .andWhere("schedule.open_hour < :hour", { hour: "9:00"})
    .andWhere("schedule.close_hour > :hour", { hour: "9:00"})
    .getMany();

console.log(schedules)
```

3. Raw sql query for `ON DUPLICATE KEY`:
```js
// query insert does not return any usable data
await connection.query(`INSERT INTO restaurant (name) VALUES (?) ON DUPLICATE KEY UPDATE name=?;`, [data.name, data.name])
// we have to query for the data
const restaurant = await Restaurant.findOne({ name: data.name })

for (const dataSchedule of data.schedule) {
    let schedule = new Schedule();
    schedule.dayOfTheWeek = dataSchedule.day;
    schedule.openingHour = dataSchedule.open;
    schedule.closingHour = dataSchedule.close;
    schedule.restaurant = restaurant;

    await connection.manager.save(schedule);
}
```