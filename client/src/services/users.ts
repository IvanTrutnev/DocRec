import call from '../api';

const getAllUsers = async () => {
  return await call({ method: 'GET', url: 'users' });
};

export { getAllUsers };
