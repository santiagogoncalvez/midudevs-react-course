export function Seo({
  title = 'Hola, react 19',
  description = 'Información sobre React 19',
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
