const fs = require("fs");
module.exports = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/../data.json`));
  } catch (error) {
    console.log("Dosya okunurken sorun oluştu!", error);
  }
};
