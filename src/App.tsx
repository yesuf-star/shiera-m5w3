import { Outlet, Route, Routes } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductList from "./routes/ProductList";
import ProductDetail from "./routes/ProductDetail";
import CartPage from "./routes/CartPage";
import NotFound from "./routes/NotFound";

function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-violet-200 to-purple-300">
      <Header />

      <main className="mx-auto min-h-[75vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}