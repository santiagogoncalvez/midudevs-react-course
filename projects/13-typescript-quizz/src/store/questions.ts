import { create, type StateCreator } from 'zustand';
import type { Question } from '../types';
import confetti from 'canvas-confetti';
import { devtools, persist } from 'zustand/middleware';
import { getAllQuestions } from '../services/getAllQuestions';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

type Logger = <T>(config: StateCreator<T, [], []>) => StateCreator<T, [], []>;


const logger: Logger = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log('  applying', args);
      // @ts-expect-error: Zustand middleware types are deeply nested and incompatible when chaining multiple high-order functions
      set(...args);
      console.log('new state', get());
    },
    get,
    api
  );
};

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logger((set: any, get) => {
        return {
          questions: [],
          currentQuestion: 0, // <- Posición del array de questions
          fetchQuestions: async (limit: number) => {
            const questions = await getAllQuestions(limit);
            //* El nombramiendo de las acciones solo es cuando se usan las devtools de zustand para que salga el nombre de cada acción
            set({ questions }, false, 'FETCH_QUESTIONS');
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();

            const newQuestions = structuredClone(questions);

            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;

            if (isCorrectUserAnswer) confetti();

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };

            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set(
                { currentQuestion: nextQuestion },
                false,
                'GO_NEXT_QUESTIONS'
              );
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                'GO_PREVIOUS_QUESTIONS'
              );
            }
          },

          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET_GAME');
          },
        };
      }),
      {
        name: 'questions',
      }
    )
  )
);
