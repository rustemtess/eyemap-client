import { Outlet, Route, Routes } from "react-router-dom";
import DashboardPage from "./dashboard";
import UsersPage from "./users";
import Sidebar from "../../components/sidebar";
import MapPage from "./map";
import type { Application } from "../../general.types";


interface IAdminPage {
  applications: Application[]
}

export default function AdminPage({ applications }: IAdminPage) {

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="w-full overflow-y-auto px-2">
                <Routes>
                    <Route path="/" element={<DashboardPage applications={applications} />} />
                    <Route path="/map" element={<MapPage applications={applications} />} />
                    <Route path="/users" element={<UsersPage />} />
                    {/* Можно добавить другие страницы */}
                </Routes>
            </div>

            <Outlet /> {/* Рендерит выбранный маршрут */}
        </div>
    )

}