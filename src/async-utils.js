import Axios from 'axios';

// system explained in details here
// https://medium.com/@lachlanmiller_52885/reducing-vuex-boilerplate-for-ajax-calls-1cd4a74cef26
export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method = 'get', mutationTypes = null, data = {} }) {
  context.commit(mutationTypes.PENDING);

  return new Promise((resolve, reject) => {
    Axios[method](`${url}?timestamp=${new Date().getTime()}`, data)
      .then((response) => {
        context.commit(mutationTypes.SUCCESS, response.data);
        resolve(response.data);
      })
      .catch(({ response }) => {
        context.commit(mutationTypes.FAILURE, response);
        reject(response);
      });
  });
}
