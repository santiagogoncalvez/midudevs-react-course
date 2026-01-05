import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type Language, SectionType } from '../types.d';

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
      detectedLanguage: string | null;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
      detectedLanguage?: string | null;
    };

const LanguageSelector = ({
  type,
  value,
  onChange,
  detectedLanguage,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      value={value}
      onChange={handleChange}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>
          {detectedLanguage ? `Detectado: ${detectedLanguage}` : 'Detectar idioma'}
        </option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
