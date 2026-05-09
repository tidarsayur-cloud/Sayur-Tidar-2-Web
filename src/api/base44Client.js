// Local data store - no backend required

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Bayam Hijau', price: 3000, unit: '/ikat', description: 'Bayam segar berkualitas tinggi', image_url: '', in_stock: true, category: 'Sayuran', sort_order: 1 },
  { id: '2', name: 'Kangkung', price: 2500, unit: '/ikat', description: 'Kangkung segar pilihan', image_url: '', in_stock: true, category: 'Sayuran', sort_order: 2 },
  { id: '3', name: 'Wortel', price: 5000, unit: '/kg', description: 'Wortel segar manis', image_url: '', in_stock: true, category: 'Sayuran', sort_order: 3 },
  { id: '4', name: 'Tomat', price: 6000, unit: '/kg', description: 'Tomat merah segar', image_url: '', in_stock: true, category: 'Buah', sort_order: 4 },
  { id: '5', name: 'Cabai Merah', price: 15000, unit: '/kg', description: 'Cabai merah pedas segar', image_url: '', in_stock: true, category: 'Bumbu', sort_order: 5 },
  { id: '6', name: 'Bawang Merah', price: 20000, unit: '/kg', description: 'Bawang merah pilihan', image_url: '', in_stock: true, category: 'Bumbu', sort_order: 6 },
];

function getStore(key, defaults) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaults;
    const parsed = JSON.parse(stored);
    // Validate: if first item lacks in_stock, reset to defaults
    if (parsed.length > 0 && parsed[0].in_stock === undefined) {
      localStorage.removeItem(key);
      return defaults;
    }
    return parsed;
  } catch {
    return defaults;
  }
}

function setStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function createEntityStore(entityName, defaults = []) {
  const key = `tidar_${entityName}`;
  return {
    list: async () => getStore(key, defaults),
    get: async (id) => {
      const items = getStore(key, defaults);
      return items.find(i => i.id === id) || null;
    },
    create: async (data) => {
      const items = getStore(key, defaults);
      const newItem = { ...data, id: Date.now().toString() };
      setStore(key, [...items, newItem]);
      return newItem;
    },
    update: async (id, data) => {
      const items = getStore(key, defaults);
      const updated = items.map(i => i.id === id ? { ...i, ...data } : i);
      setStore(key, updated);
      return updated.find(i => i.id === id);
    },
    delete: async (id) => {
      const items = getStore(key, defaults);
      setStore(key, items.filter(i => i.id !== id));
      return { id };
    },
  };
}

export const base44 = {
  entities: {
    Product: createEntityStore('Product', DEFAULT_PRODUCTS),
    ContactMessage: createEntityStore('ContactMessage', []),
  },
};
