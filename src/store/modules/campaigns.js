import { doAsync, createAsyncMutation } from '@/async-utils';
// import { campaigns } from '@/mock-data';

const CREATE_OR_UPDATE_CAMPAIGN = createAsyncMutation('CREATE_OR_UPDATE_CAMPAIGN');
const GET_USER_CAMPAIGNS = createAsyncMutation('GET_USER_CAMPAIGNS');

const state = {
  campaigns: []
};

const getters = {
  // all campaigns
  campaigns: state => state.campaigns,
  // all campaigns marked as draft
  drafts: state => state.campaigns.filter(campaign => campaign.status === 'draft'),
  // all campaigns marked as sent
  sent: state => state.campaigns.filter(() => false),
  // all campaigns marked as scheduled
  scheduled: state => state.campaigns.filter(() => false)
};

const mutations = {
  // create or update campaign
  [CREATE_OR_UPDATE_CAMPAIGN.PENDING] () {},
  [CREATE_OR_UPDATE_CAMPAIGN.SUCCESS] () {},
  [CREATE_OR_UPDATE_CAMPAIGN.FAILURE] () {},
  // get user's campaign
  [GET_USER_CAMPAIGNS.PENDING] () {},
  [GET_USER_CAMPAIGNS.SUCCESS] (state, payload) {
    state.campaigns = payload;
  },
  [GET_USER_CAMPAIGNS.FAILURE] () {},
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
    let url = '/campaigns';
    if (campaign.action === 'update') {
      url += `/${campaign.campaignId}`;
    }
    const method = campaign.action === 'new' ? 'post' : 'patch';
    delete campaign.action;
    delete campaign.campaignId;
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
