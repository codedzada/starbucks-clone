import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

import MainLayout from '../components/MainLayout';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Rewards from '../pages/Rewards';
import GiftCards from '../pages/GiftCards';
import CreateGiftCard from '../pages/CreateGiftCard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import StoreLocator from '../pages/StoreLocator';
import GetStarted from '../pages/GetStarted';
import ProductDetail from '../pages/ProductDetail';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/get-started" element={<GetStarted />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/featured" element={<Menu />} />
          <Route path="/menu/previous" element={<Menu />} />
          <Route path="/menu/favorites" element={<Menu />} />
          <Route path="/menu/:categoryId" element={<Menu />} />
          <Route path="/product/:productId/:formCode" element={<ProductDetail />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/giftcards" element={<GiftCards />} />
          <Route path="/giftcards/create" element={<CreateGiftCard />} />
          <Route path="/giftcards/create/:cardId" element={<CreateGiftCard />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/signin" element={<Login />} />
          <Route path="/account/create" element={<Register />} />
          
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;