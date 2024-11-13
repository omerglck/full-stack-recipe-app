import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";

const Title = ({ children }) => {
  return <h1 className="text-2xl font-bold text-red-400 mb-4">{children}</h1>;
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // veri çekme query
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get(`api/recipes/${id}`).then((res) => res.data.recipe),
  });
  // silme işlemi için mutate kullanacağız
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`api/recipes/${id}`),
    onSuccess: () => {
      navigate("/");
      toast.success("Ürün Başarılı Bir Şekilde Silindi ");
    },
    onError: () => {
      toast.error("Bir şeyler ters gitti");
    },
  });
  return (
    <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto ">
      <div className="flex justify-between">
        <Link
          className="flex items-center gap-2 text-xl hover:bg-gray-300 p-1 rounded-md"
          to={-1}
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>
        <button
          disabled={isLoading}
          onClick={() => deleteMut.mutate()}
          className="flex bg-red-500 items-center px-4 py-2 transition gap-2 text-xl hover:bg-red-600 rounded-md text-white"
        >
          <FaTrash size={18} />
          {isLoading ? "Yükleniyor..." : "Sil"}
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="max-w-5xl m-auto my-10 flex flex-col gap-10">
          <Title>{data.recipeName}</Title>
          <div className="flex gap-4">
            <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold ">
              {data.category}
            </span>
            <span className="flex items-center gap-2 bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold ">
              <FaRegClock />
              {data.recipeTime}
            </span>
          </div>
          <img
            src={data.image}
            alt={data.recipeName}
            className="rounded-lg max-h-[400px] "
          />
          <div>
            <Title>Malzemeler</Title>
            <ul className="font-semibold text-lg">
              {data.ingredients.map((i) => (
                <li>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <Title>Tarif</Title>

            <ol className="font-semibold text-lg list-decimal ps-5">
              {data.instructions.map((i) => (
                <li>{i}</li>
              ))}
            </ol>
          </div>
          <div>
            <Title>Sunum Önerisi</Title>
            <p>{data.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
