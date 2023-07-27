import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../../pages/dashboard/Dashboard';
import Orders from '../../pages/orders/Orders';
import Products from '../../pages/products/Products';
import Inventory from '../../pages/inventory/Inventory';
import Account from '../../pages/account/Account';
import Users from '../../pages/users/Users';
import NewProduct from '../../pages/products/components/NewProduct';
import ProductDetails from '../../pages/products/components/ProductDetails';
import InventoryDetails from '../../pages/inventory/components/InventoryDetails';
import NewUser from '../../pages/users/components/NewUser';
import UserDetails from '../../pages/users/components/UserDetails';
import NewOrder from '../../pages/orders/components/NewOrder';


const RoutesPage = () => {

    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/new" element={<NewOrder />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<NewProduct />} />
                <Route path="/products/:productID" element={<ProductDetails />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory/:inventoryID" element={<InventoryDetails />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/new" element={<NewUser />} />
                <Route path="/users/details/:userID" element={<UserDetails />} />
                <Route path="/account" element={<Account />} />
            </Route>
        </Routes>
    )
};
export default RoutesPage