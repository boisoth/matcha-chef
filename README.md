# API

### mongoDB Atlas Cluster

- Sandbox cluster
- test database
- profiles collection
- users collection

### Usage

| Method   | Endpoint                     | Description                   | Body/Params                                                                                                                            | Request Headers                                                                        | Sample Response                                 |
| -------- | ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `POST`   | `/api/users`                 | Creates new user              | `{name: "Ben Gee",email: "bengee@gmail.com",password: 123456}`                                                                         | N/A                                                                                    | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `POST`   | `/api/auth`                  | Authenticate/Sign-in user     | `{email: "bengee@gmail.com",password: 123456}`                                                                                         | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `POST`   | `/api/profile`               | Create or update user profile | `{company: "", status: "", website: "", location: "", skills: "", bio: "", githubusername: "", twitter: ", facebook: "", youtube: ""}` | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `GET`    | `/api/profile`               | Gets all profiles             | N/A                                                                                                                                    | N/A                                                                                    | `[{...}, {...}]`                                |
| `GET`    | `/api/profile/user/:user_id` | Get a users profile           | `{ user: req.params.user_id }`                                                                                                         | N/A                                                                                    | `[{...}]`                                       |
| `DELETE` | `/api/profile`               | Delete a user and orofile     | N/A                                                                                                                                    | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{ msg: "User deleted"}`                        |

- Pass token in header, then auth middleware decodes and sends passes on the user and matches the credenctials. Signs a new token to use in protected routes

### Create user profile `POST /api/profile`
