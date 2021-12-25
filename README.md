# TEXT-JUSTIFY API

A Simple text justification API, designed with NodeJS, Express and Postgres

### Stack

- Node.js
- Jest
- Postgres

### Getting started

Prerequisites:

#### Node

--install dependencies

```

npm i
```

#### Running development server

```
node index.js
```

### Available Routes

### /api/token(POST)

Allows users to authenticate and retrieve bearer token.
You have to make a Post request with a json body parameter like {email:"foo@bar.com}

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `email` | string | Yes      |

### /api/justify(POST)

Allows users to justify a plain text.
Max limit: 80 000 words per day.

| Body   | Type       | Required |
| ------ | ---------- | -------- |
| 'text' | plain text | Yes      |

Bearer token needed to autenticate

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

[demo][https://onur-text-justify.herokuapp.com/]
