export const updateName = (name) => {
  // simula que hacemos una petición
  return new Promise((resolve) => {
    setTimeout(() => {
      if (name.length < 3) {
        resolve('El nombre debe tener al menos 3 caracteres');
        return;
      }
      resolve();
    }, 3000);
  });
};

export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: 'ok',
      });
    }, 2000);
  });
};
