import { Button, Chip, Stack } from '@mui/material';
import { useQuestionData } from './hooks/useQuestionData';
import { useQuestionsStore } from './store/questions';

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: '16px' }}>
      <Stack
        direction="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Chip label={`${correct} correctas`} color="success" />
          <Chip label={`${incorrect} incorrectas`} color="error" />
          <Chip label={`${unanswered} sin responder`} color="info" />
        </Stack>

        <Button onClick={() => reset()}>Resetear juego</Button>
      </Stack>
    </footer>
  );
};
