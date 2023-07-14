import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../../pages/dashboard/Dashboard';
import Orders from '../../pages/orders/Orders';
import Products from '../../pages/products/Products';
import Inventory from '../../pages/inventory/Inventory';
import Account from '../../pages/account/Account';
import Users from '../../pages/users/Users';
import NewProduct from '../../pages/products/components/NewProduct';


const RoutesPage = () => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
};
export default RoutesPage