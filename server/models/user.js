let users=[{id: 1, username:'super', password: '1234'}];


module.exports=class User{
    constructor(username, password)
    {
        this.username=username;
        this.password=password;
    }

    static findUsername(username){
        return users.find(user=>user.username===username);
    }
}







