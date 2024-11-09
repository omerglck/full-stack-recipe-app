import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Undefined from "./pages/Undefined";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<Undefined />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
