
import React from 'react';
import PropertyForm from './PropertyForm';

const SellerModule: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">List Your Property</h1>
        <p className="mt-2 text-lg text-gray-600">
          Fill out the form below to get your property listed. Our team will handle the pricing.
        </p>
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <PropertyForm />
      </div>
    </div>
  );
};

export default SellerModule;
