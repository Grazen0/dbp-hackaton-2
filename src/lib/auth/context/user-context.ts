import { createContext } from 'react';
import type { UserSchema } from '../../user/schemas/user';

export const UserContext = createContext<
  [reload: () => void, user: UserSchema | null]
>([() => {}, null]);
