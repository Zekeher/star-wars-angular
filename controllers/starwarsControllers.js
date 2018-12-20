'use strict'
let fs = require("fs");
class StarwarsControllers {
// Read All File JSON
async getAll() {
    let sw = fs.readFileSync("./json/starwars.json");
    sw = JSON.parse(sw);
    return sw;
}
// Read ONE PJ File JSON
async getOnePj(params) {
    let name = params.name;
    let sw = fs.readFileSync("./json/starwars.json");
    sw = JSON.parse(sw);
    let i = 0;
    while (i < sw.length && name != sw[i].name) {
        i++;
    }
    if (sw[i].name) {
        return sw[i];
    } else {
        return null;
    }
}
// Update ONE PJ File JSON
async setOnePj(data) {
    let sw = fs.readFileSync("./json/starwars.json");
    sw = JSON.parse(sw);
    for (let i = 0; i < sw.length; i++) {
        if (data.name === sw[i].name) {
            sw[i] = data;
            fs.writeFile("./json/starwars.json", JSON.stringify(sw), (err) => {
                return err;
            });
            return sw[i];
        }
    }
}
// Create ONE PJ File JSON
async createOnePj(data) {
    if (!data.img) {
        if (data.force === "Light") {
            data.img = "http://localhost:3977/api/starwars/img/unknown_lightside.png";
        } else {
            data.img = "http://localhost:3977/api/starwars/img/unknown_darkside.png";
        }
    }
    let sw = fs.readFileSync("./json/starwars.json");
    sw = JSON.parse(sw);
    let i = sw.length;
    sw[i] = data;
    fs.writeFile("./json/starwars.json", JSON.stringify(sw), (err) => {
        return err;
    });
   return sw[i];
}
// Delete ONE PJ File JSON
async deleteOnePj(params) {
    let name = params.name;
    let sw = fs.readFileSync("./json/starwars.json");
    sw = JSON.parse(sw);
    for (let i = 0; i < sw.length; i++) {
        if (name === sw[i].name) {
            sw.splice(i, 1);
            fs.writeFile("./json/starwars.json", JSON.stringify(sw), (err) => {
                return err;
            });
            return sw;
        }
    }
}
}
module.exports = new StarwarsControllers();