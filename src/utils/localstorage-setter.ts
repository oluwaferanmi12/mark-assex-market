export const localStorageSetter = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const localStorageGetter = (key: string) => {
  return JSON.parse(localStorage.getItem(key) ?? "");
};

export const removeLocalStorageValue = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
