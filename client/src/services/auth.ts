import call from '../api';

type Data = {
  data: object;
};

const signUp = (data: Data) => {
  return call({ method: 'POST', url: 'sign-up', data });
};

const signIn = (data: Data) => {
  return call({ method: 'POST', url: 'sign-in', data });
};

export { signUp, signIn };
