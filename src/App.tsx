import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, faTrash, faCheck,
    faXmark, faChevronRight,
    faChevronLeft, faEllipsisVertical,
    faGear, faUser, faMagnifyingGlass,
    faFloppyDisk, faCircleXmark,
    faRightToBracket,
    faSignIn,
    faCaretRight,
    faCaretLeft,
    faUpRightFromSquare,
    faArrowUpRightFromSquare,
    faRightFromBracket,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GuestLayout from './components/layouts/GuestLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import Login from './views/guest/Login';
import ProfilePage from './views/user/ProfilePage';
import ProductsPage from './views/user/ProductsPage';
import ProductPage from './views/user/ProductPage';
import { useUserStore } from './core/stores/userStore';
import { useEffect } from 'react';
import NotFound from './views/guest/NotFound';
import TwoFactorLoginPage from './views/guest/TwoFactorLoginPage';
import ProductBrandsPage from './views/user/ProductBrandsPage';
import ProductBrandPage from './views/user/ProdutBrandPage';

library.add(
    faPlus, faTrash, faCheck,
    faXmark, faChevronRight, faChevronLeft,
    faEllipsisVertical, faGear, faUser,
    faMagnifyingGlass, faFloppyDisk, faCircleXmark,
    faRightToBracket, faSignIn, faCaretRight,
    faCaretLeft, faUpRightFromSquare,
    faArrowUpRightFromSquare, faRightFromBracket,
    faSpinner
);

function App() {
    const verifyUser = useUserStore((state) => state.verifyUser);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/auth/2fa/:token" element={<TwoFactorLoginPage />} />
                </Route>

                <Route element={<DashboardLayout />}>
                    <Route path="/user/profile" element={<ProfilePage />} />
                    <Route path="/user/brands" element={<ProductBrandsPage />} />
                    <Route path="/user/brand" element={<ProductBrandPage />} />
                    <Route path="/user/products" element={<ProductsPage />} />
                    <Route path="/user/product" element={<ProductPage />} />
                    <Route path="/user/product/:id" element={<ProductPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;