
import React, { useState } from 'react';
import { Property } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import PriceRequestModal from './PriceRequestModal';
import { TagIcon } from './icons/TagIcon';
import { HomeIcon } from './icons/HomeIcon';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
        <div className="relative">
          <img src={property.images[currentImageIndex]} alt={property.type} className="w-full h-56 object-cover" />
          {property.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity">
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity">
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}
           <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                property.status === 'For Sale'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <TagIcon className="w-4 h-4 mr-1.5" />
              {property.status}
            </span>
             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                <HomeIcon className="w-4 h-4 mr-1.5" />
                {property.type}
            </span>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="font-semibold truncate">{property.locality}</p>
          </div>
          
          <p className="text-gray-600 text-sm flex-grow min-h-[60px]">
            {property.description.substring(0, 100)}{property.description.length > 100 && '...'}
          </p>

          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Request Price
            </button>
          </div>
        </div>
      </div>
      <PriceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />
    </>
  );
};

export default PropertyCard;
