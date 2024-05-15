export const useLocalStorage = (key: string) => {
  const setItem = async (value: unknown) => {
    try {
      await window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };

  const getItem = async () => {
    try {
      const item = await window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };
  const removeItem = async () => {
    try {
      await window.localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  };
  return { setItem, getItem, removeItem };
};
