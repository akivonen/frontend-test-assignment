import getAllPositions from '@src/api/positions';
import { getAllUsers } from '@src/api/users';
import { joinErrors } from '@src/lib/utils';
import { Position, PositionsResponse, User, UsersResponse } from '@src/types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { USERS_COUNT_IN_BLOCK as users_per_block } from '@src/constants/users';

type DataContextType = {
  users: User[];
  positions: Position[];
  usersError: string | null;
  positionsError: string | null;
  isUsersLoading: boolean;
  isPositionsLoading: boolean;
  refetchUsers: () => Promise<void>;
  visibleUsersCount: number;
  setVisibleUsersCount: React.Dispatch<React.SetStateAction<number>>;
};

// Provider component that fetches and supplies users and positions to its children
export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  // State to hold user and position data
  const [users, setUsers] = useState<User[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  // Loading and error states for async fetches
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const [isPositionsLoading, setIsPositionsLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [positionsError, setPositionsError] = useState<string | null>(null);

  // State to track how many users are visible
  const [visibleUsersCount, setVisibleUsersCount] =
    useState<number>(users_per_block);

  const fetchUsers = async () => {
    try {
      setUsersError(null);
      setIsUsersLoading(true);
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
      setIsUsersLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      setPositionsError(null);
      setIsPositionsLoading(true);
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
      setIsPositionsLoading(false);
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
        isUsersLoading,
        isPositionsLoading,
        usersError,
        positionsError,
        refetchUsers: fetchUsers,
        visibleUsersCount,
        setVisibleUsersCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
