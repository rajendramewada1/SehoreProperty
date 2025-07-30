
import React, { useState } from 'react';
import Modal from './Modal';
import { Property } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface PriceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const PriceRequestModal: React.FC<PriceRequestModalProps> = ({ isOpen, onClose, property }) => {
  const { addRequest, requests } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const existingRequest = requests.find(r => r.propertyId === property.id && r.buyerEmail === email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      if (!existingRequest) {
        addRequest({
          propertyId: property.id,
          buyerName: name,
          buyerEmail: email,
        });
      }
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after a short delay to allow closing animation
    setTimeout(() => {
        setName('');
        setEmail('');
        setIsSubmitted(false);
    }, 300);
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request Property Price">
      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              You are requesting the price for property at <span className="font-semibold">{property.address}, {property.locality}</span>.
              Please provide your details below. Our team will contact you shortly with the final price.
            </p>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
      {isSubmitted && (
         <div className="text-center py-4">
            <h3 className="text-lg font-medium text-gray-900">Thank You!</h3>
            {existingRequest?.status === 'Responded' && property.finalPrice ? (
                 <div className="mt-2 text-sm text-gray-600">
                    <p>Great news! The price for this property is ready.</p>
                    <p className="mt-4 text-3xl font-bold text-blue-600">
                        ₹ {new Intl.NumberFormat('en-IN').format(property.finalPrice)}
                    </p>
                 </div>
            ) : (
                <p className="mt-2 text-sm text-gray-600">
                Your request has been received. Our admin will process it and get back to you soon.
              </p>
            )}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
      )}
    </Modal>
  );
};

export default PriceRequestModal;
