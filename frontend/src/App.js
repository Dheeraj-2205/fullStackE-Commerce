import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Product.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignup from "./component/User/LoginSignup";
import store from "./store";
import { loadUser } from "./component/actions/userAction";
import UserOption from "./component/layout/UserOption.jsx";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.jsx";

function App() {
  const { user ,loading } = useSelector((state) => state);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        {user.isAuthenticated && <UserOption user={user} />}
        <Routes>
          
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:q" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignup />} />

            {/* <Route
            path="/account"
            element={
              <ProtectedRoute><Profile/></ProtectedRoute>
            }
          /> */}
            {user.isAuthenticated && !loading && <Route
              path="/account"
              element = {<Profile/>}
            />
            }
            
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
