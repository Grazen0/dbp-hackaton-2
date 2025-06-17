import { useEffect, useState, type ReactNode } from 'react';
import { UserSchema } from '../../user/schemas/user';
import { UserContext } from '../context/user-context';

export interface Props {
  children?: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [loading, setLoadingUser] = useState(true);
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email !== null) {
      setUser({ email });
    }
    setLoadingUser(false);
  }, []);

  return <UserContext value={[loading, user]}>{children}</UserContext>;
};
