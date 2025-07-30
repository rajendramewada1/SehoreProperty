
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Property, PropertyType, PropertyStatus, SehoreLocality } from '../types';
import PropertyCard from './PropertyCard';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { HomeIcon } from './icons/HomeIcon';
import { TagIcon } from './icons/TagIcon';

const BuyerModule: React.FC = () => {
  const { properties } = useAppContext();
  const [filters, setFilters] = useState({
    locality: 'All',
    type: 'All',
    status: 'All',
    search: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const searchLower = filters.search.toLowerCase();
      return (
        (filters.locality === 'All' || p.locality === filters.locality) &&
        (filters.type === 'All' || p.type === filters.type) &&
        (filters.status === 'All' || p.status === filters.status) &&
        (filters.search === '' ||
          p.address.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower))
      );
    });
  }, [properties, filters]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Find Your Dream Property</h1>
        <p className="mt-2 text-lg text-gray-600">Browse listings in the Sehore region.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by address or keyword..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select name="locality" value={filters.locality} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none">
              <option value="All">All Localities</option>
              {Object.values(SehoreLocality).map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HomeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none">
              <option value="All">All Types</option>
              {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TagIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none">
              <option value="All">For Sale / Rent</option>
              {Object.values(PropertyStatus).map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400"/>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Properties Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find any properties matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default BuyerModule;
