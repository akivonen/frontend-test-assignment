import getAllPositions from '@src/api/positions';
import { getAllUsers } from '@src/api/users';
import { joinErrors } from '@src/lib/utils';
import { Position, PositionsResponse, User, UsersResponse } from '@src/types';
import { createContext, ReactNode, useEffect, useState } from 'react';

type DataContextType = {
  users: User[];
  positions: Position[];
  usersError: string | null;
  positionsError: string | null;
  isLoading: boolean;
  refetchUsers: () => Promise<void>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [positionsError, setPositionsError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setUsersError(null);
      setIsLoading(true);
      const response: UsersResponse = await getAllUsers();
      if (response.success) {
        setUsers(response.users);
        return;
      }
      const { message, fails } = response;
      const errorMessage = fails ? joinErrors(message, fails) : message;
      setUsersError(errorMessage);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unexpected error. Failed to fetch users.';
      setUsersError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      setPositionsError(null);
      setIsLoading(true);
      const response: PositionsResponse = await getAllPositions();
      if (response.success) {
        setPositions(response.positions);
        return;
      }
      setPositionsError(response.message);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unexpected error. Failed to fetch positions.';
      setPositionsError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchUsers(), fetchPositions()]);
  }, []);

  return (
    <DataContext.Provider
      value={{
        users,
        positions,
        isLoading,
        usersError,
        positionsError,
        refetchUsers: fetchUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
