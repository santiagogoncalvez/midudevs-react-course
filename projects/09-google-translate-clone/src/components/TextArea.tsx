import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';

interface Props {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: '200px', resize: 'none' };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return 'Introducir texto';
  if (loading) return 'Cargando...';
  return 'Traducción';
};

const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' };

  const placeholder = getPlaceholder({ type, loading });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      disabled={type === SectionType.To}
      placeholder={placeholder}
      style={styles}
      value={value}
      onChange={handleChange}
    ></Form.Control>
  );
};

export default TextArea;
