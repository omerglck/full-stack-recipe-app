const express = require("express");
const cors = require("cors");
const recipeRouter = require("./routes/recipe");

const app = express();

// cors hatalarını önleyen middleware(oto headerlar ekler)
app.use(cors());
// bodydeki json verilerini js verilerine çevireecek middleware
app.use(express.json())

// servera tarif ile alakalı routerları tanımladık
app.use(recipeRouter);

// dinlenilecek port
app.listen(4000, () => {
  console.log("Server 4000 portunu dinlemeye başladı");
});
