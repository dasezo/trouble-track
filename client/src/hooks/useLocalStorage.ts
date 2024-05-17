export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  };
  return { setItem, getItem, removeItem };
};
