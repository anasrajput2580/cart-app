// src/services/apiService.js

/**
 * Save user selections and total price to the backend.
 * @param {number} userId - The ID of the logged-in user.
 * @param {Object} selectedOptions - Map of plan titles to selected options.
 * @param {number} totalPrice - The total price.
 */
export const saveSelection = async (userId, selectedOptions, totalPrice) => {
    try {
      console.log("Payload being sent:", { userId, selectedOptions, totalPrice }); // Debugging payload
      const response = await fetch('https://membershipserver-v3ogbq0u.b4a.run/api/save-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, selectedOptions, totalPrice }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save selections anasss');
      }
      console.log('Selections saved successfully.');
    } catch (error) {
      console.error('Error saving selections:', error.message);
    }
  };
  
/**
 * Load user selections and total price from the backend.
 * @param {number} userId - The ID of the logged-in user.
 * @returns {Promise<{selectedOptions: Object, totalPrice: number}>}
 */
export const loadSelection = async (userId) => {
    try {
      if (!userId || typeof userId !== "number") {
        throw new Error("Invalid user ID.");
      }
  
      const response = await fetch(`https://membershipserver-v3ogbq0u.b4a.run/api/get-options/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Failed to load selections');
      }
      const data = await response.json();
      console.log('Selections loaded successfully:', data);
  
      return data;
    } catch (error) {
      console.error('Error loading selections:', error.message);
      return { selectedOptions: {}, totalPrice: 0 };
    }
  };
  