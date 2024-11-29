// src/components/TotalCostContext.js
import React, { createContext, useState } from 'react';

export const TotalCostContext = createContext();

export const TotalCostProvider = ({ children }) => {
    const [totalCost, setTotalCost] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    const reset = () => {
        setTotalCost(0);
        setSelectedOptions({});
    };

    const updateTotalCost = (planTitle, newOption, previousSelection) => {
        if (!newOption || !newOption.label || !newOption.price) {
            console.error(`Invalid option provided: ${newOption}`);
            return;
        }
        const price = typeof newOption.price === 'string' ? parseFloat(newOption.price.substring(1)) : newOption.price;
        const previousPrice = typeof previousSelection === 'string' ? parseFloat(previousSelection.substring(1)) : previousSelection || 0;
    
        setTotalCost(totalCost - previousPrice + price);
        setSelectedOptions({ ...selectedOptions, [planTitle]: newOption });
    };
    

    return (
        <TotalCostContext.Provider value={{ totalCost, selectedOptions, updateTotalCost, reset }}>
            {children}
        </TotalCostContext.Provider>
    );
};
