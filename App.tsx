
import React from 'react';
import { useAppContext } from './hooks/useAppContext';
import Header from './components/Header';
import BuyerModule from './components/BuyerModule';
import SellerModule from './components/SellerModule';
import AdminModule from './components/AdminModule';
import ToastContainer from './components/ToastContainer';
import { UserRole } from './types';

const App: React.FC = () => {
  const { role } = useAppContext();

  const renderModule = () => {
    switch (role) {
      case UserRole.Seller:
        return <SellerModule />;
      case UserRole.Admin:
        return <AdminModule />;
      case UserRole.Buyer:
      default:
        return <BuyerModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {renderModule()}
      </main>
      <footer className="bg-white mt-12 py-6 text-center text-gray-500 border-t">
        <p>&copy; 2024 Sehore Real Estate. All rights reserved.</p>
        <p className="text-sm">Your trusted partner in property.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default App;
