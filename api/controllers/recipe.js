const getData = require("../utils/getData");

const data = getData();

exports.getAllRecipes = (req, res) => {
  // tariflerin bir kopyasını oluştur
  let recipes = [...data];
  // bunu döngünün dışarsına alma sebebimiz döngü her çalıştığında 15 ya da kaç tane veri varsa her zaman çalışacaktı bu da gereksiz yere çalışmasına sebep olacaktı
  const search = req.query?.search?.toLowerCase();

  // eğer search params eklendiyse filtreleme işlemi yap
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }
  // eğer order parametresi eklendiyse sırala
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }
  res.status(200).json({
    message: "Bütün tarifler alındı",
    results: recipes.length,
    recipes: recipes,
  });
};
exports.getRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir tarif alındı",
  });
};
exports.deleteRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir tarif silindi",
  });
};
exports.createRecipe = (req, res) => {
  res.status(200).json({
    message: "Yeni tarif oluşturuldu",
  });
};
