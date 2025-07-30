
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { PropertyType, PropertyStatus, SehoreLocality } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

const PropertyForm: React.FC = () => {
  const { addProperty } = useAppContext();
  const [type, setType] = useState<PropertyType>(PropertyType.House);
  const [status, setStatus] = useState<PropertyStatus>(PropertyStatus.ForSale);
  const [locality, setLocality] = useState<SehoreLocality>(SehoreLocality.SehoreTown);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageFiles = [...imageFiles, ...filesArray];
      setImageFiles(newImageFiles);

      const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && description && images.length > 0) {
      addProperty({
        type,
        status,
        locality,
        address,
        description,
        images,
      });
      // Reset form
      setType(PropertyType.House);
      setStatus(PropertyStatus.ForSale);
      setLocality(SehoreLocality.SehoreTown);
      setAddress('');
      setDescription('');
      setImages([]);
      setImageFiles([]);
    } else {
        alert('Please fill all fields and upload at least one image.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <select value={type} onChange={e => setType(e.target.value as PropertyType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Listing Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as PropertyStatus)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                {Object.values(PropertyStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Locality in Sehore</label>
        <select value={locality} onChange={e => setLocality(e.target.value as SehoreLocality)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          {Object.values(SehoreLocality).map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Property Description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Property Images</label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload files</span>
                <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img src={image} alt={`preview ${index}`} className="h-32 w-full object-cover rounded-md" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-right">
        <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Submit Property
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
