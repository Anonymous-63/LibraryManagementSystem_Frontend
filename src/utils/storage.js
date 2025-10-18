// src/utils/storage.js
export const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  },
};
