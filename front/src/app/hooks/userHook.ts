import useSWR from 'swr';
import { myPageApi } from '../api/userApi';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR(
    session ? '/auth/members/myinfo' : null,
    myPageApi,
  );

  return {
    user: data,
    isLoading,
  };
};

export default useUser;
