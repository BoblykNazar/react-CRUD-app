export const validateEmail = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email.toLowerCase());
}

export const setupDefaultCredentials = () => {
  const defaultEmail = 'testUser@gmail.com';
  const defaultPassword = 'Testpass123!';
  const credentials = localStorage.getItem('credentials');

  if (!credentials) {
    localStorage.setItem('credentials', JSON.stringify({ defaultEmail, defaultPassword }));
  }
};