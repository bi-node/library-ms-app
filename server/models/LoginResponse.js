let accessTokens = [];
module.exports = class LoginResponse {
    constructor(username, accessToken) {
        this.username = username;
        this.accessToken = accessToken;
    }

    static findToken = (accessToken) => {
        console.log(accessTokens)
        console.log(accessToken)
        return accessTokens.find(x => x.accessToken === accessToken);
    }

    addToken = () => {
        console.log(this);
        accessTokens = accessTokens.filter(x => x.accessToken != this.username);
        accessTokens.push({ "username": this.username, "accessToken": this.accessToken });
        console.log("tokens now")
        console.log(accessTokens)
    }
}