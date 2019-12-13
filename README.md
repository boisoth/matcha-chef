# API

### mongoDB Atlas Cluster

- Sandbox cluster
- test database
- profiles collection
- users collection

### Usage

| Method | Endpoint     | Description      | Sample Response                              |
| ------ | ------------ | ---------------- | -------------------------------------------- |
| ```POST ```   | `/api/users` | Creates new user | `{ token: r93jajfk21423182sdhHGdfd4343ssdf}` |

### Register new user `POST /api/users`

- Responds with token

### Login user `POST /api/auth`

- Pass token in header, then auth middleware decodes and sends passes on the user and matches the credenctials. Signs a new token to use in protected routes

### Create user profile `POST /api/profile`
