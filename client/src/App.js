import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminCategory from "./pages/Admin/AdminCategory";
import AdminProduct from "./pages/Admin/AdminProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/orders' element={<Orders />} />
      </Route>
      <Route path='/dashboard' element={<AdminRoute />}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<AdminCategory />} />
        <Route path="admin/create-product" element={<AdminProduct />} />
        <Route path="admin/users" element={<Users />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<PageNotFound />} />
     </Routes>
    </>
  );
}

export default App;
