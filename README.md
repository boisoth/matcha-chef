# API

### mongoDB Atlas Cluster

- Sandbox cluster
- test database
- profiles collection
- users collection

### Usage

| Method | Endpoint       | Description                   | Body                                                                                                                                                                                                                                                                                             | Request Headers                                                                        | Sample Response                                 |
| ------ | -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `POST` | `/api/users`   | Creates new user              | `{name: "Ben Gee",email: "bengee@gmail.com",password: 123456}`                                                                                                                                                                                                                                   | N/A                                                                                    | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `POST` | `/api/auth`    | Authenticate user             | `{email: "bengee@gmail.com",password: 123456}`                                                                                                                                                                                                                                                   | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `POST` | `/api/profile` | Create or update user profile | `{company: "Bengee IO", status: "Backend Developer", website: "https://bengee.io", location: "San Francisco", skills: "Java, Spring, AWS", bio: "Senior Developer", githubusername: "bengee", twitter: "https://twitter.com", facebook: "https://facebook.com", youtube: "https://youtube.com"}` | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |

- Pass token in header, then auth middleware decodes and sends passes on the user and matches the credenctials. Signs a new token to use in protected routes

### Create user profile `POST /api/profile`
