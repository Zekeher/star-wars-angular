'use strict'
let fs = require("fs");

class LoginController {
    async login(body) {
        let name = body.name;
        let pass = body.pass;
        let status = false;
        let i = 0;
        let login = fs.readFileSync("./json/login.json");
        login = JSON.parse(login);
        while (i < login.length && status === false) {
            if (login[i].name === name && login[i].pass === pass) {
                status = true;
            }
            i++;
        }
        if (status) {
            return { msg: "Login success", status: status };
        } else {
            return { msg: "User o Pass incorrect", status: status };
        }
    };
};
module.exports = new LoginController();