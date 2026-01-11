import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData, // 1. Importar el hook correcto
} from '@tanstack/react-query';
import { fetchUsers } from '../services/users';
import type { Data } from '../types';

export const useUsers = () => {
  const queryClient = useQueryClient(); // 2. Usar la instancia global

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 10,
    });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (email: string) => {
      // Si tuvieras API de borrado, la llamarías aquí
      return Promise.resolve(email);
    },
    onMutate: async (email: string) => {
      // Cancelar cualquier fetch para que no pise el borrado
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Guardar snapshot para rollback
      const previousData = queryClient.getQueryData(['users']);

      // 3. ACTUALIZAR LA CACHÉ PARA INFINITE QUERY
      queryClient.setQueryData(['users'], (oldData: InfiniteData<Data>) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            // Filtramos el usuario dentro de cada página
            users: page.users.filter((user) => user.email !== email),
          })),
        };
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      console.error(err);
      if (context?.previousData) {
        queryClient.setQueryData(['users'], context.previousData);
      }
    },
  });

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
    deleteUser, // Cambié el nombre para que sea más claro
  };
};
