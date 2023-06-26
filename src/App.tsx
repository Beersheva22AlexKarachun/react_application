import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import Navigator, { RouteType } from "./components/navigators/Navigator"
import Customers from "./components/pages/Customers"
import Orders from "./components/pages/Orders"
import Products from "./components/pages/Products"
import ShoppingCart from "./components/pages/ShoppingCart"
import SignIn from "./components/pages/SignIn"
import SignOut from "./components/pages/SignOut"
import './App.css'
import routesConfig from "./config/routes-config.json"
import { useMemo } from "react"
import { useSelectorAuth } from "./redux/store"

const { always, authenticated, admin, noadmin, noauthenticated } = routesConfig;

function getRoutes(username: string): RouteType[] {
  const res: RouteType[] = [];
  res.push(...always);
  username && res.push(...authenticated);
  username.startsWith('admin') && res.push(...admin);
  username && !username.startsWith('admin') && res.push(...noadmin);
  !username && res.push(...noauthenticated);
  return res;
}

const App: React.FC = () => {
  const username = useSelectorAuth();
  const routes = useMemo(() => getRoutes(username), [username])

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigator routes={routes} />}>
        <Route index element={<Home />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="shoppingcart" element={<ShoppingCart />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signout" element={<SignOut />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App


