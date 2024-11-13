const express = require("express");
const getData = require("../utils/getData");
const crypto = require("crypto");
const setData = require("../utils/setData");
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
exports.createRecipe = (req, res) => {
  // 1) İsteğin body kısmından gelen veriye erişmeliyiz
  const newRecipe = req.body;
  console.log(newRecipe);
  // 2) Verinin bütün değerleri tanımlanmış mı kontrol edeceğiz
  if (
    !newRecipe.recipeName ||
    !newRecipe.ingredients ||
    !newRecipe.category ||
    !newRecipe.recipeTime ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res
      .status(400)
      .json({ message: "Lütfen bütün değerleri tanımlayın" });
  }
  // 3) Veriye id ekle
  newRecipe.id = crypto.randomUUID();

  // 4) Tarif verisiniz diziye ekle
  data.push(newRecipe);
  // 5) Güncel diziyi json dosyasına aktar
  setData(data);
  // 6) Cevap gönder
  res.status(200).json({
    message: "Yeni tarif oluşturuldu",
    newRecipe,
  });
};

exports.getRecipe = (req, res) => {
  // dizide parametre ile gelen idli elemanı arayacağız
  const found = data.find((i) => i.id === req.params.id);
  // tarif bulunamazsa hata gönder
  if (!found)
    return res.status(404).json({ message: "Aradığınız ürün bulunamadı" });
  // cevap gönder

  res.status(200).json({
    message: "Aranan tarif bulundu",
    recipe: found,
  });
};
exports.deleteRecipe = (req, res) => {
  // silinecek elemanın sırasını bul burada filter ile kullanılıp yapılabilir
  const index = data.findIndex((i) => i.id === req.params.is);
  // elemanı datadan sil
  data.splice(index,1);
  // json dosyasını güncelle
  setData(data);

  res.status(204).json({
    message: "Bir tarif silindi",
  });
};
