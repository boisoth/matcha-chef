# Matcha Chef API

### mongoDB Atlas Cluster

- Sandbox cluster
- test database
- profiles collection
- users collection
- posts collection

### User Login & Registration

| Method | Endpoint     | Description               | Body/Params                                                    | Request Headers                                                                        | Sample Response                                 |
| ------ | ------------ | ------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `POST` | `/api/users` | Creates new user          | `{name: "Ben Gee",email: "bengee@gmail.com",password: 123456}` | N/A                                                                                    | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `POST` | `/api/auth`  | Authenticate/Sign-in user | `{email: "bengee@gmail.com",password: 123456}`                 | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |

### User Profile

| Method   | Endpoint                          | Description                        | Body/Params                                                                                                                                                   | Request Headers                                                                        | Sample Response                                 |
| -------- | --------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `POST`   | `/api/profile`                    | Create or update user profile      | `{company: "", status: "", website: "", location: "", skills: "", bio: "", githubusername: "", twitter: ", facebook: "", youtube: ""}`                        | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{token: "995fbba524b378b7e5cf7e076168ffd0?s"}` |
| `GET`    | `/api/profile`                    | Gets all profiles                  | N/A                                                                                                                                                           | N/A                                                                                    | `[{...}, {...}]`                                |
| `GET`    | `/api/profile/user/:user_id`      | Get a users profile                | `{ user: req.params.user_id }`                                                                                                                                | N/A                                                                                    | `[{...}]`                                       |
| `DELETE` | `/api/profile`                    | Delete a user and profile          | N/A                                                                                                                                                           | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{ msg: "User deleted"}`                        |
| `PUT`    | `/api/profile/experience`         | Add experience to profile          | `{"title": "Senior Developer", "company": "Google", "location": "Mountain View", "from": "8-10-2010", "current": true, "description": "Web applications"}`    | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                       |
| `DELETE` | `/api/profile/experience/:exp_id` | Delete one experience from profile | N/A                                                                                                                                                           | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                       |
| `PUT`    | `/api/profile/education`          | Add education to profile           | `{"school": "MIT", "degree": "Bachelors of Computer Science", "fieldofstudy": "Computer Science", "from": "12-30-2008", "current": false, "description": ""}` | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                       |
| `DELETE` | `/api/profile/education/:edu_id`  | Delete one education from profile  | N/A                                                                                                                                                           | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                       |

### User Posts

| Method   | Endpoint               | Description       | Body/Params                            | Request Headers                                                                        | Sample Response                                                                                                                                                |
| -------- | ---------------------- | ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/posts`           | Create a post     | `{"text": "This is my post number 1"}` | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{"_id": "5e0e8783a7fc872436b32c4c", "text": "This is my post number 2", "name": "Boi Soth 4", "likes": [],"comments": [],"date": "2020-01-03T00:14:59.915Z"}` |
| `GET`    | `/api/posts`           | Get all posts     | N/A                                    | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                                                                                                                                      |
| `GET`    | `/api/post/:id`        | Get post by Id    | `/api/post/5e0fbbbf105027898903c938`   | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                                                                                                                                      |
| `DELETE` | `/api/post/:id`        | Delete post by Id | `/api/post/5e0fbbbf105027898903c938`   | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                                                                                                                                      |
| `PUT`    | `/api/post/like/:id`   | Like post by Id   | `/api/post/5e0fbbbf105027898903c938`   | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                                                                                                                                      |
| `PUT`    | `/api/post/unlike/:id` | Unlike post by Id | `/api/post/5e0fbbbf105027898903c938`   | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `[{...}]`                                                                                                                                                      |

### Post Comments

| Method   | Endpoint                              | Description       | Body/Params                                                            | Request Headers                                                                        | Sample Response |
| -------- | ------------------------------------- | ----------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------- |
| `POST`   | `/api/posts/comment/:id`              | Comment on a post | `{"text": "I love your post!"}`                                        | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{}`            |
| `DELETE` | `/api/posts/comment/:id/:comment_id)` | Delete a comment  | `/api/posts/comment/5e0e8734a7fc872436b32c4b/5e10ff00ae1e41a075982eac` | `{Content-Type: "application/json, x-auth-token: "995fbba524b378b7e5cf7e076168ffd0" }` | `{}`            |
