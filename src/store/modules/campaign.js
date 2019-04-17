import { doAsync, createAsyncMutation } from '@/utils';

const CREATE_OR_UPDATE_CAMPAIGN = createAsyncMutation('CREATE_OR_UPDATE_CAMPAIGN');

const state = {
  campaigns: []
};

const getters = {
  campaigns: state => state.campaigns
};

const mutations = {
  [CREATE_OR_UPDATE_CAMPAIGN.PENDING] (state) {
    //
  },
  [CREATE_OR_UPDATE_CAMPAIGN.SUCCESS] (state, payload) {
    //
  },
  [CREATE_OR_UPDATE_CAMPAIGN.FAILURE] (state, payload) {
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
    const url = campaign.action === 'new' ? `/campaigns` : `/campaigns/${campaign.campaignId}`;
    const method = campaign.action === 'new' ? 'post' : 'patch';
    return doAsync(context, {
      url,
      data: { campaign },
      method,
      mutationTypes: CREATE_OR_UPDATE_CAMPAIGN
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
