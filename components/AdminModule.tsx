
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Property, PriceRequest } from '../types';
import AdminPropertyRow from './AdminPropertyRow';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { HomeModernIcon } from './icons/HomeModernIcon';

const AdminModule: React.FC = () => {
  const { properties, requests } = useAppContext();

  const totalCommission = properties.reduce((acc, p) => acc + (p.commission || 0), 0);
  const totalProperties = properties.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;

  const stats = [
    { name: 'Total Properties', stat: totalProperties, icon: HomeModernIcon },
    { name: 'Total Commission Earned', stat: `₹${new Intl.NumberFormat('en-IN').format(totalCommission)}`, icon: BanknotesIcon },
    { name: 'Pending Price Requests', stat: pendingRequests, icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Manage properties, prices, and requests.</p>
      </div>

      {/* Stats */}
      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-8 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>


      {/* Properties Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Property Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Base/Comm/Final)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map(property => (
                <AdminPropertyRow key={property.id} property={property} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Requests Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Buyer Requests</h2>
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map(request => {
                const property = properties.find(p => p.id === request.propertyId);
                return (
                    <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.buyerName}</div>
                            <div className="text-sm text-gray-500">{request.buyerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property?.address || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.requestDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {request.status}
                            </span>
                        </td>
                    </tr>
                );
              })}
               {requests.length === 0 && (
                    <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-500">No price requests yet.</td>
                    </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminModule;
