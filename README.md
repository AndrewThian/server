## Introduction ##

Typeorm's development environment is a little new to me as I've always been using the standard SQL package in golang to write APIs. But due to my time constraint, I decided to use NodeJS to script the server. It was an oversight on my part.

## How to use ##

There are two ways of starting the application. I've provided an extra way to start the mysql container without compose as I felt it would be much easier to debug in the future.

To start a development environment:
```
> docker-compose build
> docker-compose up
```

To start a single container of mysql without the application:
```
> source scripts/dev_env.sh
> sh scripts/start_mysql.sh
```

Then run `npm run seed:restaurant` to insert the restaurant data into the db

Next, `npm run start` should boot in development env.

`package.json` scripts:
```json
"prettify:ts": // prettify code
"lint:ts": // lint using tslint
"start": // start development env
"start:test": // start test env
"test": // run test suite with jest
"test:unit": // run test suite on unit tests
"test:integration": // run test suite on int tests
"seed:restaurant": // seed the restaurant data
"migration:run": // run migrations
```

## Folder structure ##

```sh
├── Dockerfile
├── README.md 
├── appconfig.json # application configuration file read below for use case
├── data # folder to add restaurant data
│   ├── hours.csv 
│   └── test.csv
├── docker-compose.yml
├── docker.api.env # docker env variables
├── docker.mysql.env # docker env variables
├── google-keys.json # GCP secrets
├── healthcheck.js # health check route for docker
├── jest.config.js # jest configs
├── mysql
│   ├── db # mount point for docker_mount
│   └── init # db init files for mysql container
├── ormconfig.json # typeorm config
├── ormconfig.m.json # typeorm config for migrations
├── package-lock.json
├── package.json
├── scripts # relevant shell scripts
│   ├── clear_env.sh 
│   ├── clear_mount.sh
│   ├── dev_env.sh
│   ├── start_mysql.sh
│   └── wait-for-it.sh
├── src
│   ├── app.ts
│   ├── config.ts
│   ├── csv # csv parser to read hours.csv
│   ├── entity # entities for typeorm
│   ├── google # google authenticator for GCP keys
│   ├── index.ts
│   ├── mailer # mail with gmail
│   ├── migration 
│   ├── modules
│   ├── parse.ts
│   ├── socket
│   ├── tests
│   └── utils
├── tsconfig.json
├── tslint.json
└── types
    └── src
```

## Required Keys ##

**The application requires 3 sets of information:**

1. a `docker.api.env` and a `docker.mysql.env` for injecting environment variables into the `docker-compose`

Here are the properties required for (`docker.api.env`):

```
DB_NAME=<database_name>
DB_USER=<database_username>
DB_PASSWORD=<database_password>
```

Here are the properties required for (`docker.mysql.env`):

```
MYSQL_ROOT_PASSWORD=<database_root_password>
MYSQL_DATABASE=<database_username>
```

2. a `appconfig.json` file to set up application configuration within the docker container:

Here is an example of what it should look like:

```json
{
    "development": {
        "id": "development",
        "server": {
            "port": 3000,
            "host": "localhost"
        },
        "client": {
            "port": 8080,
            "host": "localhost"
        },
        "db": {}
    },
    "test": {
        "id": "test",
        "server": {
            "port": 3000,
            "host": "localhost"
        },
        "client": {
            "port": 8080,
            "host": "localhost"
        }
    }
}
```

3. a set of google client API keys that can be downloaded from the GCP console.

## Typescript ##

- Use [tsconfig-paths-webpack-plugin](https://github.com/dividab/tsconfig-paths-webpack-plugin/blob/master/example/webpack.config.js) for production
- ~~been having a bit of issue with typescript type namespace declaration @types, for now I'm just overriding the `any` type for socket.io~~

## Typeorm ##

**How to do migrations**

1. add migration to `migration` folder
2. user `npm run migration:run` script to migrate

---

**Here's a list of examples and snippets that I've played around on how to work with typeorm:**

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
    let schedules = await connection.createQueryBuilder()
        .select("schedule")
        .from(Schedule, "schedule") // using sql parameter
        .where("schedule.day_of_week = :day", { day: "SUN" })
        .andWhere("schedule.open_hour < :hour", { hour: "9:00"})
        .andWhere("schedule.close_hour > :hour", { hour: "9:00"})
        .getMany();
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

---

**Aside!!**

Typeorm doesn't yet support `ON DUPLICATE UPDATE` which leads me to provide my own implementation of such a feature. the `.upsert` static method on both `Restaurant` and `Schedule` are primitive but they work well for now.