import type { APIResults } from '../types';

export const fetchUsers = ({ pageParam = 1 }: { pageParam?: number }) => {
  return (
    fetch(
      `https://randomuser.me/api/?results=10&seed=midudev&page=${pageParam}`
    )
      .then((response) => {
        if (!response.ok) throw new Error('Error en la petición de usuarios');
        return response.json();
      })
      // Sacar la información de la página actual de la API
      .then((result: APIResults) => {
        const currentPage = Number(result.info.page);
        const nextCursor = currentPage > 3 ? undefined : currentPage + 1;

        return {
          users: result.results,
          nextCursor,
        };
      })
  );
};
