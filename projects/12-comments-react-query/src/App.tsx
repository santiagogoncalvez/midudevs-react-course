import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getComments, postComment, type CommentWithId } from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App (): JSX.Element {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'],
    getComments
  )
  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] })

      // Esto lo hacemo para guardar el estado previo por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])

      queryClient.setQueryData<CommentWithId[]>(['comments'], (oldData) => {
        const newCommentToAdd = { ...newComment, id: crypto.randomUUID(), preview: true }

        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      return { previousComments }
    },
    onError: (error, _, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (isLoadingMutation) return

    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (message !== '' && title !== '') {
      mutate({ message, title })
    }
  }

  return (
    <main className='grid grid-cols-2 h-screen'>
      <div className='col-span-1 bg-white p-8'>
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />
      </div>
      <div className='col-span-1 bg-black p-8'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} max-w-xl m-auto block px-4`} onSubmit={handleSubmit}>
          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit'
            className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
