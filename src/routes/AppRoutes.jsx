import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Pricing from '../pages/Pricing';
import Channels from '../pages/Channels';
import SetupGuide from '../pages/SetupGuide';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="channels" element={<Channels />} />
        <Route path="setup" element={<SetupGuide />} />
        <Route path="guide" element={<SetupGuide />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
