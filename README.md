## Description

Simple todo list api

## Step to step to run

First of all is necessary to install all projects dependencies

```bash
$ npm install
```

After that it is necessary to create a .env file, you can just duplicate sample.env and rename it to .env, now, to instantiate a postgres instance is up to you, to facilitate a docker-compose file was created and you can simply run the command bellow to get your postgres up and running

```bash
$ docker compose up -d
```

Now we can just run the migrations so our database schema is up to date

```bash
$ npm run typeorm migration:run -- -d data-source.ts
```

Finally, to run the api just run this command:

```bash
$ npm run start:dev
```

> To test the api you can just import the insomnia.json into your insomnia application

## Routes

- POST /tasks | Create task
  - Body schema:
    ```ts
    interface CreateTask {
      name: string;
    }
    ```
- GET /tasks | List tasks
- GET /tasks/:id | Retrieve task
  - Query params schema
    ```ts
    interface TasksFilters {
      page: number = 1;
      amount: number = 10;
    }
    ```
- PATCH /tasks/:id | Update task
  - Body schema:
    ```ts
    interface UpdateTask {
      name?: string;
      isComplete?: boolean;
    }
    ```
- DELETE /tasks/:id | Delete task
