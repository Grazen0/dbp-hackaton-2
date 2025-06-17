import { useEffect, useState, type ReactNode } from 'react';
import { resetAxiosInstance } from '../../api/util/axios-instance';
import { UserSchema } from '../../user/schemas/user';
import { UserContext } from '../context/user-context';

export interface Props {
  children?: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email !== null) {
      setUser({ email });
    }
  }, []);

  const reload = () => {
    const email = localStorage.getItem('email');
    if (email !== null) {
      setUser({ email });
    }
    resetAxiosInstance();
  };

  return <UserContext value={[reload, user]}>{children}</UserContext>;
};
