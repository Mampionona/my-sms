import { doAsync, createAsyncMutation } from '@/utils';
import { campaigns } from '@/mock-data';

const CREATE_OR_UPDATE_CAMPAIGN = createAsyncMutation('CREATE_OR_UPDATE_CAMPAIGN');
const GET_USER_CAMPAIGNS = createAsyncMutation('GET_USER_CAMPAIGNS');

const state = {
  campaigns: []
};

const getters = {
  campaigns: state => state.campaigns,
  drafts: state => state.campaigns.filter(campaign => campaign.status === 'draft')
};

const mutations = {
  // create or update campaign
  [CREATE_OR_UPDATE_CAMPAIGN.PENDING] (state) {
    //
  },
  [CREATE_OR_UPDATE_CAMPAIGN.SUCCESS] (state, payload) {
    //
  },
  [CREATE_OR_UPDATE_CAMPAIGN.FAILURE] (state, payload) {
    // console.log(payload)
  },
  // get user's campaign
  [GET_USER_CAMPAIGNS.PENDING] (state) {

  },
  [GET_USER_CAMPAIGNS.SUCCESS] (state, payload) {
    // state.campaigns = payload;
    state.campaigns = campaigns;
  },
  [GET_USER_CAMPAIGNS.FAILURE] (state) {

  },
};

const actions = {
  getUserCampaigns (context) {
    return doAsync(context, {
      url: '/campaigns/',
      mutationTypes: GET_USER_CAMPAIGNS
    });
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
