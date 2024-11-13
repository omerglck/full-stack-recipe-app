const fs = require("fs");
module.exports = (data) => {
  try {
    fs.writeFylSync(
      fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(data))
    );
  } catch (error) {
    console.log("Dosya yazarken hata oluştu!", error);
  }
};
