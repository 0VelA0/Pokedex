
import { useSelector } from "react-redux";
import type { RootState } from "../src/store";
import { Login_screen } from './pages/login';
import Initial_Page from "./pages/initial_page";
import DetailPage from "./pages/detail_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login_screen />} />
        ) : (
          <>
            <Route path="/" element={<Initial_Page />} />
            <Route path="/pokemon/:name" element={<DetailPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
