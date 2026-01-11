export interface Comment {
  title: string
  message: string
  preview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

const BIN_ID = '6963a7d343b1c97be928bd04'

export const getComments = async (): Promise<any> => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': atob(import.meta.env.VITE_PUBLIC_API_KEY)
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const postComment = async (comment: Comment): Promise<CommentWithId> => {
  // await delay(1000)
  // throw new Error('Not implemented yet')

  const comments = await getComments()

  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': atob(import.meta.env.VITE_PUBLIC_API_KEY)
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}
