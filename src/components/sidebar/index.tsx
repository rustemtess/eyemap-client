import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // удалить токен
    navigate("/"); // перенаправить на логин
  };

  return (
    <nav className="h-full bg-[#f5f5f7] max-w-[260px] w-full gap-4 border-r-gray-300 flex flex-col justify-between py-5">
      <div className="flex flex-col items-center">
        <img src={logo} width={60} />
        <h1 className="font-semibold text-[#5d7388] mb-4">Eye Map</h1>
        <button onClick={() => navigate("/admin/")} className="w-full flex px-5 py-2 text-black/70 text-sm cursor-pointer">
          Dashboard
        </button>
        <button onClick={() => navigate("/admin/map")} className="w-full flex px-5 py-2 text-black/70 text-sm cursor-pointer">
          Map
        </button>
        <button onClick={() => navigate("/admin/users")} className="w-full flex px-5 py-2 text-black/70 text-sm cursor-pointer">
          Users
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="w-full flex px-5 py-2 text-black/70 text-sm cursor-pointer hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
