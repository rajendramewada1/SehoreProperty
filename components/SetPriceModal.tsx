
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Property } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface SetPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const SetPriceModal: React.FC<SetPriceModalProps> = ({ isOpen, onClose, property }) => {
  const { updatePropertyPrice } = useAppContext();
  const [basePrice, setBasePrice] = useState<number>(property.basePrice || 0);
  const [commission, setCommission] = useState<number>(property.commission || 0);
  const [finalPrice, setFinalPrice] = useState<number>(property.finalPrice || 0);

  useEffect(() => {
    setFinalPrice(Number(basePrice) + Number(commission));
  }, [basePrice, commission]);

  useEffect(() => {
      if(isOpen) {
        setBasePrice(property.basePrice || 0);
        setCommission(property.commission || 0);
      }
  }, [isOpen, property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePropertyPrice(property.id, basePrice, commission);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Property Price">
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Set the base price from the seller and your commission for the property at <span className="font-semibold">{property.address}</span>.
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
            <input
              type="number"
              id="basePrice"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="commission" className="block text-sm font-medium text-gray-700">Commission (₹)</label>
            <input
              type="number"
              id="commission"
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="pt-2">
              <p className="text-sm text-gray-500">Calculated Final Price</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹ {new Intl.NumberFormat('en-IN').format(finalPrice)}
              </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Price
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SetPriceModal;
