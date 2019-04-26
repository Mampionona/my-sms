import Axios from 'axios';

export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method = 'get', mutationTypes, data = {} }) {
  context.commit(mutationTypes.PENDING);
  return new Promise((resolve, reject) => {
    Axios({ url, data, method })
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
