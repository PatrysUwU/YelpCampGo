const fs = require("fs");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

const saveToJson = (filename, data) => {
    fs.writeFileSync(`${filename}.json`, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Zapisano ${filename}.json`);
};

saveToJson("cities", cities);
saveToJson("descriptors", descriptors);
saveToJson("places", places);
