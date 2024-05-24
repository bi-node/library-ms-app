let users = [{ "id": "1", "username": "kush", "password": "1234"},
{ "id": "2", "username": "tina", "password": "1234" },
{ "id": "3", "username": "abdun", "password": "1234" },
{ "id": "4", "username": "batman", "password": "x" }
]
module.exports = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static findByUsername = (username) => {
        return users.find(x => x.username === username);
    }

}