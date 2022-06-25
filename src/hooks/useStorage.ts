export type StorageItems = Record<string, any>;

export function useStorage(){
    return {
        setItems,
        getItems,
        removeItems
    }
}

function setItems(data: StorageItems) {    
  for (const [key, value] of Object.entries(data)) {    
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function getItems(keys: string[]) {
  const obj: StorageItems = {};

  for (const key of keys) {
    obj[key] = JSON.parse(window.localStorage.getItem(key)!);
  }

  return obj;
}

function removeItems(data: string[]) {
  for (const key of Object.keys(data)) {
    window.localStorage.removeItem(key);
  }
}
