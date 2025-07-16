export type Position = {
  id: number;
  name: string;
};

export type BaseUser = {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
};

export type User = BaseUser & {
  id: number;
  position: string;
  position_id: number;
  registration_timestamp: number;
};

export type UserSignUpData = BaseUser & {
  position_id: number | null;
};

export type ApiSuccess = { success: true };

export type ApiFailure = {
  success: false;
  message: string;
  fails?: Record<
    'name' | 'email' | 'phone' | 'photo' | 'position_id',
    string[]
  >;
};

export type ApiResponse<T> = (T & ApiSuccess) | ApiFailure;

export type PositionsResponse = ApiResponse<{ positions: Position[] }>;

export type TokenResponse =
  | { success: true; token: string }
  | { success: false };

export type UsersResponse = ApiResponse<{
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  users: User[];
}>;

export type UsersRegistrationResponse = ApiResponse<{
  user_id: number;
  message: string;
}>;
