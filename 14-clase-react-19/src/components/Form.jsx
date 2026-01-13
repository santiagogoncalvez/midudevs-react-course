import { useRef } from 'react';

function Input({ ref }) {
  return <input ref={ref} placeholder="Ej. Midudev" type="text" />;
}

export function Form() {
  const inputRef = useRef();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
      />

      <form>
        <Input ref={inputRef} />
        <button type="button" onClick={focusInput}>
          Focus input
        </button>
      </form>
    </>
  );
}
