import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { saveSelection, loadSelection } from '../services/apiService';

export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (authState.userId) {
      handleLoadSelections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.userId]);

  const updateSelection = (planTitle, option) => {
    const previousPrice = selectedOptions[planTitle]
      ? parseFloat(selectedOptions[planTitle].price)
      : 0;
    const newPrice = parseFloat(option.price);
    setSelectedOptions((prev) => ({ ...prev, [planTitle]: option }));
    setTotalCost((prev) => prev - previousPrice + newPrice);
  };

  const resetSelections = () => {
    setSelectedOptions({});
    setTotalCost(0);
  };

  const handleSaveSelections = async () => {
    if (!authState.userId) {
      alert('User not authenticated.');
      return;
    }
    await saveSelection(authState.userId, selectedOptions, totalCost);
  };

  const handleLoadSelections = async () => {
    if (!authState.userId) return;
    const data = await loadSelection(authState.userId);
    setSelectedOptions(data.selectedOptions);
    setTotalCost(data.totalPrice);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedOptions,
        totalCost,
        updateSelection,
        resetSelections,
        handleSaveSelections,
        handleLoadSelections,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};