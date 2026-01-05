import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { ArrowsIcons, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';
import TextArea from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  // 3. Usar el hook useReducer
  const {
    fromLanguage,
    toLanguage,
    result,
    fromText,
    loading,
    detectedLanguage,
    setFromText,
    setResult,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 300);

  // App.tsx
  useEffect(() => {
    if (debouncedFromText === '') return;

    // Si el texto que vamos a traducir es exactamente igual al resultado actual,
    // significa que acabamos de hacer un intercambio y no necesitamos traducir de nuevo.
    if (debouncedFromText === result) return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((translatedResult) => {
        if (translatedResult == null) return;
        setResult({
          result: translatedResult.translatedText,
          detectedLanguage: translatedResult.detectedLanguage || null,
        });
      })
      .catch((error) => {
        console.error(error);
        setResult({
          result: 'Error',
          detectedLanguage: null,
        });
      });
  }, [debouncedFromText, fromLanguage, toLanguage, result]); // Añadimos 'result' a las dependencias

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch((error) => {
      throw new Error(error as string);
    });
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
              detectedLanguage={detectedLanguage}
            />
            <TextArea
              loading={loading}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            ></TextArea>
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => interchangeLanguage()}
          >
            <ArrowsIcons />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />

            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={(result) => {
                  setResult({ result, detectedLanguage: null });
                }}
              ></TextArea>

              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  display: 'flex',
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>

                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
