import { useEffect, useRef, useState } from 'react';

interface Props {
  inputValueInit: string;
  onSubmit: (value: string) => void;
  isFocus: boolean;
  onBlur: () => void;
  className: string;
}

const FormInput = ({
  inputValueInit = '',
  onSubmit,
  isFocus = false,
  onBlur,
  className = ''
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(inputValueInit);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // El focus se ejecuta cuando el componente se monta
    if (isFocus) inputRef.current?.focus();
  }, [isFocus]);

  const handleExitInput = () => {
    onBlur();
    setInputValue(inputValueInit);
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit(inputValue);
    }

    if (event.key === 'Escape') {
      handleExitInput();
    }
  };

  return (
    <input
      className={className}
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onBlur={handleExitInput}
      onKeyDown={onKeyDown}
    />
  );
};

export default FormInput;
