
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={ 
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }  />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
