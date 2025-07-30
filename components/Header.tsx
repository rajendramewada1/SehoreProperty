
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { UserRole } from '../types';
import { BuildingStorefrontIcon } from './icons/BuildingStorefrontIcon';

const Header: React.FC = () => {
  const { role, setRole } = useAppContext();

  const navItems = [
    { id: UserRole.Buyer, label: 'Buy / Rent' },
    { id: UserRole.Seller, label: 'Sell Property' },
    { id: UserRole.Admin, label: 'Admin Panel' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800">Sehore Real Estate</span>
          </div>
          <nav className="hidden md:flex space-x-1 bg-gray-200 p-1 rounded-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  role === item.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
           <div className="md:hidden">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {navItems.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
