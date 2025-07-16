import { useContext } from 'react';
import { DataContext } from '@src/context/DataContext';

export default function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
