export type StorageItems = Record<string, any>;

export function useStorage() {
  return {
    setItem,
    setItems,
    getItem,
    getItems,
    removeItems,
  };
}

function getItem( keyParent: string, key: string) {
  const item = getItems(keyParent);
  return item[key];
}

function setItem(keyParent: string, items: StorageItems) {
  const parent = getItems(keyParent)

  setItems({ ...parent, ...items })
}

function setItems(data: StorageItems) {
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function getItems(keys: string | string[]) {
  const obj: StorageItems = {};

  for (const key of ([] as string[]).concat(keys)) {
    obj[key] = JSON.parse(window.localStorage.getItem(key)!);
  }

  return obj;
}

function removeItems(data: string[]) {
  for (const key of Object.keys(data)) {
    window.localStorage.removeItem(key);
  }
}
