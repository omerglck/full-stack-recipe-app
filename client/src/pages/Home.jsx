import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: "recipes",
    queryFn: () => api.get("/api/recipes").then((res) => res.data),
  });
  console.log(data);
  return (
    <main className="flex-1 bg-gray-200 p-4 overflow-auto">
      <section className="">
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input type="text" className="w-full outline-none" />
        </div>
      </section>
      <section>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.results} tarif bulundu</h1>

              <select className="rounded-md p-2">
                <option selected disabled>
                  Süreye Göre
                </option>
                <option value="asc">Artan</option>
                <option value="desc">Azalan</option>
              </select>
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data.recipes.map((recipe) => (
                <div>KART</div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
