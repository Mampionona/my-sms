import Axios from 'axios';

// system explained in details here
// https://medium.com/@lachlanmiller_52885/reducing-vuex-boilerplate-for-ajax-calls-1cd4a74cef26
export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method, mutationTypes, data = {}, sort = true }) {
  method = method || 'get';
  context.commit(mutationTypes.PENDING);

  return new Promise((resolve, reject) => {
    Axios({
      url,
      data,
      method,
      responseType: 'text'
    })
      .then((response) => {
        const responseData = response.data;
        let sortedData = responseData;
        if (sort) {
          sortedData = responseData.sort((a, b) => {
            if ('id' in a) return b.id - a.id;
            return 0;
          });
        }
        context.commit(mutationTypes.SUCCESS, sortedData);
        resolve(sortedData);
      })
      .catch(({ response }) => {
        context.commit(mutationTypes.FAILURE, response);
        reject(response);
      });
  });
}
