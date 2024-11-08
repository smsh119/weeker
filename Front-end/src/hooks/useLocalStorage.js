const useLocalStorage = () => {
  const setStorage = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  };
  const getStorage = (key) => {
    const storageString = localStorage.getItem(key);
    if (storageString) {
      return JSON.parse(storageString);
    }
    return null;
  };
  const removeStorage = (key) => {
    localStorage.removeItem(key);
  };

  return { getStorage, removeStorage, setStorage };
};

export default useLocalStorage;
