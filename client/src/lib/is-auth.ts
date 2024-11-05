export const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem("auth_token") as string);

  return token;
};
