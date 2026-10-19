import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface SelectedDish {
  id: string;
  name: string;
  category: string;
  price?: number;
  isVeg: boolean;
}

interface MenuCartContextType {
  selectedDishes: SelectedDish[];
  toggleDish: (dish: SelectedDish) => void;
  removeDish: (id: string) => void;
  clearSelection: () => void;
  isDishSelected: (id: string) => boolean;
}

const MenuCartContext = createContext<MenuCartContextType | undefined>(undefined);

export const MenuCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>(() => {
    try {
      const saved = localStorage.getItem('ad_selected_dishes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ad_selected_dishes', JSON.stringify(selectedDishes));
    } catch {}
  }, [selectedDishes]);

  const toggleDish = (dish: SelectedDish) => {
    setSelectedDishes(prev => {
      const exists = prev.some(d => d.id === dish.id);
      if (exists) {
        toast('Removed from customized menu', { icon: '🗑️' });
        return prev.filter(d => d.id !== dish.id);
      } else {
        toast.success(`Added "${dish.name}" to menu selection!`);
        return [...prev, dish];
      }
    });
  };

  const removeDish = (id: string) => {
    setSelectedDishes(prev => prev.filter(d => d.id !== id));
  };

  const clearSelection = () => {
    setSelectedDishes([]);
  };

  const isDishSelected = (id: string) => selectedDishes.some(d => d.id === id);

  return (
    <MenuCartContext.Provider
      value={{
        selectedDishes,
        toggleDish,
        removeDish,
        clearSelection,
        isDishSelected,
      }}
    >
      {children}
    </MenuCartContext.Provider>
  );
};

export function useMenuCart() {
  const context = useContext(MenuCartContext);
  if (!context) {
    throw new Error('useMenuCart must be used within a MenuCartProvider');
  }
  return context;
}
