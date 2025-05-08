import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Conversion = {
  id: string | null;
  binary: string;
  decimal: number;
  note: string;
};

interface ConversionState {
  conversions: Conversion[];
  addConversion: (conversion: Omit<Conversion, 'id'>) => void;
  deleteConversion: (id: string) => void;
}

export const useConversionStore = create<ConversionState>()(
  persist(
    (set) => ({
      conversions: [],
      addConversion: async (conversion) => {
        set((state) => ({
          conversions: [
            ...state.conversions,
            { ...conversion, id: Crypto.randomUUID() },
          ],
        }));
      },
      deleteConversion: (id: string) =>
        set((state) => ({
          conversions: state.conversions.filter(
            (conversion) => conversion.id !== id
          ),
        })),
    }),
    {
      name: 'conversion-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
