import config from './config';

const { rootApi } = config;

type Call = {
  method: string;
  url: string;
  data?: object;
  params?: object;
};

const call = async ({ method = 'get', url, data, params }: Call) => {
  try {
    const response = await fetch(`${rootApi}/api/${url}`, {
      method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      const error = await response.json();
      const errorPayload = {
        status: response.status,
        statusText: response.statusText,
        error,
      };
      return Promise.reject(errorPayload);
    }
    const responsedData = await response.json();
    return Promise.resolve(responsedData);
  } catch (e) {
    console.log(e);
    Promise.reject(e);
  }
};

export default call;
