import { doAsync, createAsyncMutation } from '@/utils';

const CREATE_NEW_CAMPAIGN = createAsyncMutation('CREATE_NEW_CAMPAIGN');

const state = {
  campaigns: []
};

const getters = {
  campaigns: state => state.campaigns
};

const mutations = {
  [CREATE_NEW_CAMPAIGN.PENDING] (state) {
    //
  },
  [CREATE_NEW_CAMPAIGN.SUCCESS] (state, payload) {
    //
  },
  [CREATE_NEW_CAMPAIGN.FAILURE] (state, payload) {
    // console.log(payload)
  }
};

const actions = {
  getUserCampaigns (context) {
    // ajax
  },

  /**
   * @param {Object} context 
   * @param {Object} campaign
   * @return {Promise}
   */
  createNewCampaign (context, campaign) {
    return doAsync(context, {
      url: '/campaigns',
      data: { campaign },
      method: 'post',
      mutationTypes: CREATE_NEW_CAMPAIGN
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
