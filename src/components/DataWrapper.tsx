import useData from '@src/hooks/useData';
import { ReactNode } from 'react';
import Preloader from './common/Preloader/Preloader';

export default function DataWrapper({ children }: { children: ReactNode }) {
  const { isLoading } = useData();

  if (isLoading) {
    return <Preloader />;
  }

  return <>{children}</>;
}
