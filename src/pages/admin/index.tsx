import { Outlet, Route, Routes } from "react-router-dom";
import DashboardPage from "./dashboard";
import UsersPage from "./users";
import Sidebar from "../../components/sidebar";
import MapPage from "./map";

export default function AdminPage() {

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="w-full overflow-y-auto px-2">
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    {/* Можно добавить другие страницы */}
                </Routes>
            </div>

            <Outlet /> {/* Рендерит выбранный маршрут */}
        </div>
    )

}