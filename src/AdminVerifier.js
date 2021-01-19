class AdminVerifier {
    adminAccounts = {
        "judy": "admin",
        "jen": "123"
    };

    constructor(){} 

    // verifies if 
    isAdmin(input) {
        var username = input.username;
        var password = input.password;
        if (this.adminAccounts.hasOwnProperty(username)){
            if (this.adminAccounts[username] == password){
                return true;
            }
            return false;
        }
        return false;
    }
}

module.exports = {
    AdminVerifier: AdminVerifier
}