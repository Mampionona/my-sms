import Axios from 'axios';

export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method = 'get', mutationTypes = null, data = {} }) {
  context.commit(mutationTypes.PENDING);

  return new Promise((resolve, reject) => {
    url = `${url}?timestamp=${new Date().getTime()}`;

    Axios[method](url, data)
      .then(({ data }) => {
        context.commit(mutationTypes.SUCCESS, data);
        resolve(data);
      })
      .catch(({ response }) => {
        context.commit(mutationTypes.FAILURE, response);
        reject(response);
      });
  });
}
