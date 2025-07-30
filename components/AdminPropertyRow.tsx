
import React, { useState } from 'react';
import { Property } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import SetPriceModal from './SetPriceModal';

interface AdminPropertyRowProps {
  property: Property;
}

const formatCurrency = (amount?: number) => {
    if (amount === undefined) return <span className="text-gray-400">Not Set</span>;
    return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
}

const AdminPropertyRow: React.FC<AdminPropertyRowProps> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { requests } = useAppContext();
  
  const pendingRequestsCount = requests.filter(r => r.propertyId === property.id && r.status === 'Pending').length;

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-16">
              <img className="h-12 w-16 rounded-md object-cover" src={property.images[0]} alt="" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{property.address}</div>
              <div className="text-sm text-gray-500">{property.locality}, {property.type}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              property.status === 'For Sale' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}>
            {property.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           <div>Base: {formatCurrency(property.basePrice)}</div>
           <div>Comm: {formatCurrency(property.commission)}</div>
           <div className="font-bold text-gray-800">Final: {formatCurrency(property.finalPrice)}</div>
        </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {pendingRequestsCount > 0 ? (
                <span className="font-bold text-yellow-600">{pendingRequestsCount} Pending</span>
            ) : (
                <span>None</span>
            )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full"
          >
            Set Price
          </button>
        </td>
      </tr>
      <SetPriceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />
    </>
  );
};

export default AdminPropertyRow;
