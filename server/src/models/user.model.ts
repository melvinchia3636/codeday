/**
 * User Model
 * Represents a user in the PocketBase users collection
 */
export interface User {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name?: string;
  avatar?: string;
}

/**
 * User creation data
 */
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  emailVisibility?: boolean;
}

/**
 * User update data
 */
export interface UpdateUserDto {
  username?: string;
  email?: string;
  name?: string;
  emailVisibility?: boolean;
  oldPassword?: string;
  password?: string;
  passwordConfirm?: string;
}
