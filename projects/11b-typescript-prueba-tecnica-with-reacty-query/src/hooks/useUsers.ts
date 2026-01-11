import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/users';

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        // Desactivar el refetch cuando se sale del window actual y se vuelve a entrar
      refetchOnWindowFocus: false,
      // Al cuanto tiempo considerar caducados los datos
      staleTime: 1000 * 10
    });

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
