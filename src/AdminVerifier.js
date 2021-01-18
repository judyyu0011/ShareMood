class AdminVerifier {
    adminAccounts = {
        "judy": "admin",
        "jen": "admin"
    };

    constructor(){} 

    // verifies if 
    isAdmin(input) {
        var username = input.username;
        var password = input.password;
        console.log(input);
        console.log(input.username);
        if (this.adminAccounts.hasOwnProperty(username)){
            console.log("is adminAccount");
            console.log(this.adminAccounts[username] == password);
            if (this.adminAccounts[username] == password){
                console.log("success");
                return true;
            }
            console.log("boo boo");
            return false;
        }
        console.log("hoo hoo");
        return false;
    }
}

module.exports = {
    AdminVerifier: AdminVerifier
}