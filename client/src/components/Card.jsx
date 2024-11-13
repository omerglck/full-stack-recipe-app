import { Link } from "react-router-dom";
import { TbClockHour8 } from "react-icons/tb";

const Card = ({ recipe }) => {
  console.log(recipe);
  return (
    <Link
      className="bg-white rounded-lg p-4 hover:bg-zinc-100 transition"
      to={`/recipe/${recipe.id}`}
    >
      <div className="relative">
        <img
          className="rounded-lg h-[150px] w-full object-cover"
          src={recipe.image}
          alt=""
        />
        <p className="absolute bottom-1 left-1 bg-white rounded-lg p-1 font-semibold flex items-center gap-2">
          <TbClockHour8 />
          <span>{recipe.recipeTime} dakika</span>
        </p>
      </div>
      <h2 className="font-semibold text-lg my-3">{recipe.recipeName}</h2>
      <p className="text-gray-500">{recipe.category}</p>
      <p className="flex gap-3 mt-3">
        <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
          {recipe.ingredients[0]}
        </span>
        {recipe.ingredients[1] && (
          <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
            {recipe.ingredients[1]}
          </span>
        )}
      </p>
    </Link>
  );
};

export default Card;
