import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { MainPage } from "../view/MainPage";
import { AboutProjectPage } from "../view/AboutProjectPage";
import { AboutUsPage } from "../view/AboutUsPage";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.MainPage} element={<MainPage />} />
      <Route path={routes.AboutProjectPage} element={<AboutProjectPage />} />
      <Route path={routes.AboutUsPage} element={<AboutUsPage />} />
    </Routes>
  </BrowserRouter>
);
