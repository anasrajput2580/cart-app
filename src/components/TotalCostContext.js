import React, { createContext, useState } from 'react';

export const TotalCostContext = createContext();


export const TotalCostProvider = ({ children }) => {
    const [totalCost, setTotalCost] = useState(0);
    const initialState = { totalCost: 0 };
    const [selectedOptions, setSelectedOptions] = useState(initialState.totalCost);
    const reset = () => {
        setTotalCost(initialState.totalCost);
         setSelectedOptions(initialState.totalCost); // Reset radio button state
    };
    
    const updateTotalCost = (planTitle, newOption, oldOption) => {
        let adjustment = 0;

        if (oldOption) {
            adjustment -= parseFloat(oldOption.price.substring(1));
        }
        if (newOption) {
            adjustment += parseFloat(newOption.price.substring(1));
        }

        setTotalCost((prev) => prev + adjustment);

        setSelectedOptions((prev) => ({
            ...prev,
            [planTitle]: newOption,
        }));
    };

    return (
        <TotalCostContext.Provider value={{ totalCost, selectedOptions, updateTotalCost, reset }}>
            {children}
        </TotalCostContext.Provider>
    );
};
