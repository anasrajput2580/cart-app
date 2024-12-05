import { BACKEND_URL } from '../config';

/**
 * Save user selections and total price to the backend.
 * @param {number} userId - The ID of the logged-in user.
 * @param {Object} selectedOptions - Map of plan titles to selected options.
 * @param {number} totalPrice - The total price.
 */
export const saveSelection = async (userId, selectedOptions, totalPrice) => {
  try {
    const response = await fetch(`${BACKEND_URL}/save-options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, selectedOptions, totalPrice }),
    });

    if (!response.ok) {
      throw new Error('Failed to save selections.');
    }

    console.log('Selections saved successfully.');
    alert('Selections saved successfully.');
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
    const response = await fetch(`${BACKEND_URL}/get-options/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to load selections.');
    }

    const data = await response.json();
    console.log('Selections loaded successfully:', data);

    return data;
  } catch (error) {
    console.error('Error loading selections:', error.message);
    return { selectedOptions: {}, totalPrice: 0 };
  }
};