
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Property, UserRole, PriceRequest, ToastMessage } from '../types';
import { INITIAL_PROPERTIES } from '../constants';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'listedDate'>) => void;
  updatePropertyPrice: (propertyId: string, basePrice: number, commission: number) => void;
  requests: PriceRequest[];
  addRequest: (request: Omit<PriceRequest, 'id' | 'requestDate' | 'status'>) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(UserRole.Buyer);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [requests, setRequests] = useState<PriceRequest[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addProperty = (propertyData: Omit<Property, 'id' | 'listedDate'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: `prop${Date.now()}`,
      listedDate: new Date().toISOString(),
    };
    setProperties(prev => [newProperty, ...prev]);
    addToast('Property listed successfully! The admin will review it shortly.');
  };

  const updatePropertyPrice = (propertyId: string, basePrice: number, commission: number) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === propertyId
          ? { ...p, basePrice, commission, finalPrice: basePrice + commission }
          : p
      )
    );
    
    setRequests(prev => prev.map(r => r.propertyId === propertyId ? {...r, status: 'Responded'} : r))

    addToast('Property price updated and pending requests marked as responded.');
  };

  const addRequest = (requestData: Omit<PriceRequest, 'id' | 'requestDate' | 'status'>) => {
    const newRequest: PriceRequest = {
      ...requestData,
      id: `req${Date.now()}`,
      requestDate: new Date().toISOString(),
      status: 'Pending',
    };
    setRequests(prev => [...prev, newRequest]);
    addToast('Price request sent! The admin will respond soon.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        properties,
        addProperty,
        updatePropertyPrice,
        requests,
        addRequest,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
