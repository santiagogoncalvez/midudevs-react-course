import { useOptimistic, useState, useRef } from 'react';

async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));

  return message;
}

export function UseOptimisticExample() {
  const formRef = useRef();
  const [messages, setMessages] = useState([
    { text: '¡Hola mundo!', sending: false, key: 1 },
  ]);

  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }]
  );

  async function formAction(formData) {
    formRef.current.reset;
    addOptimisticMessages(formData.get('message'));
    try {
      const sentMessage = await deliverMessage(formData.get('message'));
      setMessages((messages) => [...messages, { text: sentMessage }]);
    } catch {
      setMessages(messages);
    }
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Enviando...)</small>}
        </div>
      ))}

      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
