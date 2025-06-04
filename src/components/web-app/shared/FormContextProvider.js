"use client";

import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function useFormData() {
  return useContext(FormContext);
}

export function FormContextProvider({ children }) {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const clearFormData = () => setFormData({});

  return (
    <FormContext.Provider value={{ formData, updateFormData, clearFormData }}>
      {children}
    </FormContext.Provider>
  );
}
