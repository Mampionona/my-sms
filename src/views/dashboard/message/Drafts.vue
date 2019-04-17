<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'message.redaction' }">Créer une campaigne</router-link>
        </div>
        <div class="card-body">
          <v-table>
            <thead class="thead-light">
              <tr>
                <th scope="col">Message</th>
                <th scope="col">Emetteur</th>
                <th scope="col">Date d'envoi</th>
                <th scope="col">SMS/Destinataires</th>
              </tr>
            </thead>
            <tbody class="list">
              <campaign :click-callback="onClickCallback" v-for="campaign in drafts" :campaign="campaign" :key="campaign.id" />
            </tbody>
          </v-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import Campaign from '@/components/Campaign';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { vTable, Campaign },
  mounted () {
    this.getUserCampaigns();
  },
  computed: {
    ...mapGetters({
      drafts: 'campaign/drafts'
    })
  },
  methods: {
    ...mapActions({
      getUserCampaigns: 'campaign/getUserCampaigns'
    }),
    onClickCallback ({
      id,
      list_id,
      status,
      sender_name
    }) {
      this.$router.push({
        name: 'message.redaction',
        query: { campaign_id: id }
      });
    }
  }
}
</script>
