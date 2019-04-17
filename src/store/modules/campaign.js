import { doAsync, createAsyncMutation } from '@/utils';

const CREATE_OR_UPDATE_CAMPAIGN = createAsyncMutation('CREATE_OR_UPDATE_CAMPAIGN');
const GET_USER_CAMPAIGNS = createAsyncMutation('GET_USER_CAMPAIGNS');

const state = {
  campaigns: []
};

const getters = {
  campaigns: state => state.campaigns
};

let nextCampaignId = 0;

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
    for (let i = 1; i < 10; i++) {
      state.campaigns.push({
        "id": nextCampaignId++,
        "user_id": 1,
        "list_id": 2,
        "name": "Campgne de Ouf",
        "text": "lol 😎",
        "send_date": "2022-10-21T01:24:15.000Z",
        "sender_name": "Buzut",
        "messages": null,
        "sms": null,
        "net_err": null,
        "waiting": null,
        "npai": null,
        "expired": null,
        "received": null,
        "status": "draft"
      });
    }
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
