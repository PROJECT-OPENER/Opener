import useSWR from 'swr';
import { myPageApi } from '../api/userApi';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data: session } = useSession();
  const { data, isLoading, error, mutate } = useSWR(
    session ? '/auth/members/myinfo' : null,
    myPageApi,
  );

  const removeUserChatStorage = () => {
    localStorage.removeItem('chatRoom');
    localStorage.removeItem('waitRoom');
  };

  return {
    user: data,
    isLoading,
    error,
    mutate,
    removeUserChatStorage,
  };
};

export default useUser;
