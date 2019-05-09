import { doAsync, createAsyncMutation } from '@/async-utils';
import { dateUTC } from '@/utils';

const CREATE_OR_UPDATE_CAMPAIGN = createAsyncMutation('CREATE_OR_UPDATE_CAMPAIGN');
const GET_USER_CAMPAIGNS = createAsyncMutation('GET_USER_CAMPAIGNS');
const GET_CAMPAIGN_ANSWERS = createAsyncMutation('GET_CAMPAIGN_ANSWERS');
const GET_CAMPAIGNS_STATS = createAsyncMutation('GET_CAMPAIGNS_STATS');

export default {
  namespaced: true,
  state: {
    campaigns: [],
    answers: [],
    stats: []
  },
  getters: {
    // all campaigns
    campaigns: state => state.campaigns,
    // all campaigns marked as draft
    drafts: (state, getters) => getters.campaigns.filter(campaign => campaign.status === 'draft'),
    // all campaigns marked as sent
    sent: (state, getters) => getters.campaigns.filter(campaign => campaign.status === 'sent'),
    // all campaigns marked as scheduled
    scheduled: (state, getters) => getters.campaigns.filter(({ sendDate, status }) => {
      const now = dateUTC(new Date());
      const _sendDate = dateUTC(sendDate);
      return status === 'live' && (_sendDate - now) > 0;
    }),
    answers: state => state.answers,
    stats: state => state.stats,
    lastSentMessage: (state, getters) => getters.sent.sort((a, b) => {
      const sentDateA = dateUTC(a.sentDate);
      const sentDateB = dateUTC(b.sentDate);
      return sentDateB - sentDateA;
    })[0],
    nextScheduledMessage: (state, getters) => getters.scheduled.sort((a, b) => {
      const sentDateA = dateUTC(a.sendDate);
      const sentDateB = dateUTC(b.sendDate);
      return sentDateA - sentDateB;
    })[0]
  },
  mutations: {
    // create or update campaign
    [CREATE_OR_UPDATE_CAMPAIGN.PENDING]() {},
    [CREATE_OR_UPDATE_CAMPAIGN.SUCCESS]() {},
    [CREATE_OR_UPDATE_CAMPAIGN.FAILURE]() {},
    // get user's campaign
    [GET_USER_CAMPAIGNS.PENDING]() {},
    [GET_USER_CAMPAIGNS.SUCCESS](state, payload) {
      state.campaigns = payload;
    },
    [GET_USER_CAMPAIGNS.FAILURE]() {},
    [GET_CAMPAIGN_ANSWERS.PENDING]() {},
    [GET_CAMPAIGN_ANSWERS.SUCCESS](state, payload) {
      state.answers = payload;
    },
    [GET_CAMPAIGN_ANSWERS.FAILURE]() {},
    [GET_CAMPAIGNS_STATS.PENDING]() {
      //
    },
    [GET_CAMPAIGNS_STATS.SUCCESS](state, payload) {
      state.stats = payload;
    },
    [GET_CAMPAIGNS_STATS.FAILURE]() {
      //
    }
  },
  actions: {
    getUserCampaigns(context) {
      return doAsync(context, {
        url: '/campaigns/',
        mutationTypes: GET_USER_CAMPAIGNS
      });
    },
    createNewCampaign(context, campaign) {
      let url = '/campaigns';
      if (campaign.action === 'update') {
        url += `/${campaign.campaignId}`;
      }
      const method = campaign.action === 'new' ? 'post' : 'patch';
      delete campaign.action;
      delete campaign.campaignId;
      return doAsync(context, {
        url,
        data: campaign,
        method,
        mutationTypes: CREATE_OR_UPDATE_CAMPAIGN
      });
    },
    campaignAnswers(context, campaignId) {
      return doAsync(context, {
        url: `/campaigns/${campaignId}/answers/`,
        mutationTypes: GET_CAMPAIGN_ANSWERS
      });
    },
    campaignsStats(context) {
      return doAsync(context, {
        url: '/campaigns/stats/',
        mutationTypes: GET_CAMPAIGNS_STATS,
        sort: false
      });
    }
  }
};
