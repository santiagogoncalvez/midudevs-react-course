import type { ListOfTodos } from '../types';

type DataJsonBin = {
  id: string;
  record: { todos: ListOfTodos };
  metadata: {
    name: string;
    readCountRemaining: number;
    timeToExpire: number;
    createdAt: string;
  };
};

// Forzamos el tipo como 'any' o un objeto record para que el linter no sospeche
const env = import.meta.env as Record<string, string>;

const MASTER_KEY = env.VITE_MASTER_KEY;
const BIN_ID = env.VITE_BIN_ID;

if (!MASTER_KEY || !BIN_ID) {
  throw new Error('Faltan variables de entorno VITE_MASTER_KEY o VITE_BIN_ID');
}

const API_PATH = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function getTodoData() {
  try {
    const response = await fetch(API_PATH, {
      headers: {
        'X-Master-Key': MASTER_KEY,
      },
    });

    if (!response.ok) throw new Error('Error en la respuesta de red');

    const data = (await response.json()) as DataJsonBin;
    const todos = data.record?.todos ?? [];
    return todos;
  } catch (error) {
    // Verificamos si es un error real para obtener el mensaje
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error fetching todos data from json bin: ${message}`);
  }
}

export async function updateTodoData(todos: ListOfTodos) {
  try {
    const response = await fetch(API_PATH, {
      method: 'PUT',
      body: JSON.stringify({ todos: todos }),
      headers: {
        'X-Master-Key': MASTER_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error al actualizar');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error update todos data from json bin: ${message}`);
  }
}
