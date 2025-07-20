export const localStorageSetter = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const localStorageGetter = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "");
  } catch (e) {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorageValue = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
