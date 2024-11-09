const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  deleteRecipe,
  getRecipe,
} = require("../controllers/recipe");

// route > server.js dosyası dışarısında route tanımlaması yapmamıza olanak sağlar

const router = express.Router();

// oluşturduğumuz router'ın endpoint/route/yol larını ve istek gelince çalışacak fonksiyonları belirleyelim
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);

// serverda kullanmak için routerı export et 
module.exports = router

