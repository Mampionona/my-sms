<template>
  <div class="campaign-form">
    <form @submit.prevent="createCampaign" class="pb-5">
      <div class="row custom-row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><i class="ni ni-chat-round mr-2"></i> Nom de la campagne</div>
            <div class="card-body">
              <input type="text" class="form-control" v-model="name" placeholder="Nom de la campagne">
            </div>
          </div>
          <div class="card">
            <div class="card-header"><i class="fas fa-users mr-2"></i> Destinataires</div>
            <div class="card-body">
              <model-list-select
                :list="lists"
                option-value="id"
                option-text="name"
                v-model="listId"
                placeholder="Sélectionner un fichier"
              ></model-list-select>

              <p v-if="contactsOfList > 0 && listId" class="small mt-4">{{ $tc('redaction.countContacts', contactsOfList) }}</p>
            </div>
          </div>

        </div>
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><i class="fas fa-envelope-open mr-2"></i> Votre message</div>
            <div class="card-body">
              <div class="pt-2 px-2 border">
                <textarea-autosize
                  placeholder="Votre message..."
                  v-model="text"
                  :min-height="150"
                  :max-height="220"
                  class="form-control-plaintext message pt-0"
                ></textarea-autosize>
                <p class="small text-right mb-1">
                  <strong>{{ countSMS }}</strong> SMS - {{ $tc("remainingChars", remainingChars) }} <strong>{{ remainingChars }}</strong>
                </p>
              </div>
              <p class="mb-0 mt-3 mention">La mention légale "STOP au 36105" sera automatiquement incluse lors de l'envoi.</p>
              <div class="mt-4">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="save-as-draft" v-model="status">
                  <label class="custom-control-label" for="save-as-draft">Enregistrer en tant que brouillon</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><i class="fas fa-arrow-right mr-2"></i> Émetteur du message</div>
            <div class="card-body">
              <input type="text" class="form-control" v-model="senderName" placeholder="Nom de l'émetteur">
            </div>
          </div>
          <div class="card">
            <div class="card-header"><i class="fas fa-calendar-alt mr-2"></i> Date d'envoi</div>
            <div class="card-body">
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="sendingMode" value="immediate" type="radio" id="envoi-immediat" name="envoi" class="custom-control-input">
                <label class="custom-control-label" for="envoi-immediat">Envoi immédiat</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="sendingMode" value="delayed" type="radio" id="envoi-differe" name="envoi" class="custom-control-input">
                <label class="custom-control-label" for="envoi-differe">Envoi différé</label>
              </div>
              <date-picker
                v-if="sendingMode === 'delayed'"
                v-model="sendDate"
                lang="fr"
                format="YYYY-MM-DD H:mm"
                :time-picker-options="{ start: '08:00', step: '00:05', end: '18:00' }"
                :not-before="new Date()"
                :first-day-of-week="1"
                type="datetime"
                @input="dateChange"
                :disabled-days="date => date.getDay() === 0"
              ></date-picker>
            </div>
          </div>
        </div>
      </div>
      <div v-if="hasError || created" :class="statusClass" role="alert">
        {{ statusMessage }}
      </div>
      <div class="row">
        <div class="col">
          <div class="text-right pr-3">
            <button class="btn btn-secondary" type="button" @click="$jQuery('#send-test').modal('show')">Envoyer un test</button>
            <button class="btn btn-primary" type="submit">{{ submitButtonLabel }}</button>
          </div>
        </div>
      </div>
    </form>
    <modal id="send-test" title="Envoyer un test" accept-button accept-button-color="secondary" accept-button-label="Envoyer" @accept="sendTest">
      <div class="form-group">
        <label for="tel-input-test" class="form-control-label">Entrez un numéro de téléphone</label>
        <input class="form-control" type="tel" id="tel-input-test" v-model="telephone">
      </div>
      <div v-if="Object.keys(attributes).length > 0" class="form-group mb-0">
        <label for="" class="form-control-label">Définir des variables</label>
        <input
          type="text"
          class="form-control mb-2"
          v-for="(attribute, index) in Object.keys(attributes)"
          :key="index"
          :placeholder="attribute"
          v-model="attributes[attribute]"
        />
      </div>
      <p v-if="testFail || testSuccess" :class="testStatusClass">{{ testStatusMessage }}</p>
    </modal>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';
import Modal from '@/components/Modal';
import { computeNumberOfSMS, computeRemainingChars, MESSAGE } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { ModelListSelect, DatePicker, Modal },
  props: {
    campaign: {
      type: Object
    }
  },
  data() {
    return {
      text: '',
      senderName: '',
      sendDate: '',
      remainingChars: MESSAGE.firstMaxLength,
      countSMS: 1,
      sendingMode: 'immediate',
      status: false,
      listId: '',
      name: '',
      statusMessage: '',
      hasError: false,
      created: false,
      telephone: '',
      testStatusMessage: '',
      testFail: false,
      testSuccess: false,
      attributes: {}
    };
  },
  mounted() {
    // Get a user's lists
    this.getUserLists().then(() => {
      if (this.$route.query.listId) {
        this.listId = parseInt(this.$route.query.listId, 10);
      }
    });
    this.populateCampainFields();
  },
  watch: {
    text(newText) {
      this.countSMS = computeNumberOfSMS(newText);
      this.remainingChars = computeRemainingChars(this.countSMS, newText.length);
    },
    listId(newListId) {
      this.getContactsOfList(newListId);
      this.lists.forEach(({ id, attributes }) => {
        if (id === newListId) {
          attributes.forEach((attribute) => {
            this.attributes[attribute] = '';
          });
        }
        if (attributes.length === 0) this.attributes = {};
      });
    },
    $route: 'populateCampainFields'
  },
  computed: {
    ...mapGetters({
      lists: 'lists/lists',
      drafts: 'campaigns/drafts'
    }),
    statusClass() {
      return {
        alert: true,
        'mb-5': true,
        'alert-danger': this.hasError,
        'alert-success': this.created
      };
    },
    testStatusClass() {
      return {
        'mb-0': true,
        'mt-4': true,
        'text-danger': this.testFail,
        'text-primary': this.testSuccess
      };
    },
    submitButtonLabel() {
      return this.sendingMode === 'immediate' ? 'Envoyer' : 'Programmer l’envoi';
    },
    contactsOfList() {
      const match = this.lists.find(list => this.listId === list.id);
      if (!match) return 0;
      return match.contacts;
    }
  },
  methods: {
    ...mapActions({
      getUserLists: 'lists/getUserLists',
      createOrUpdateCampaign: 'campaigns/createNewCampaign',
      getUserCampaigns: 'campaigns/getUserCampaigns',
      sendTestMessage: 'campaigns/sendTestMessage'
    }),
    dateChange(currentValue) {
      this.sendDate = currentValue.toISOString();
    },
    createCampaign() {
      this.saveCampaign()
        .then(() => {
          this.name = '';
          this.text = '';
          this.status = false;
          this.hasError = false;
          this.created = true;
          this.statusMessage = 'Campagne créée';
        })
        .catch((error) => {
          this.statusMessage = error.data.error;
          this.hasError = true;
          this.created = false;
        });
    },
    saveCampaign() {
      const { listId, name, text, senderName, sendingMode } = this;
      let { sendDate, status } = this;
      const action = 'campaign_id' in this.$route.query ? 'update' : 'new';
      const campaignId = this.$route.query.campaign_id || null;
      sendDate = (sendingMode === 'immediate') ? '' : sendDate;
      status = status ? 'draft' : 'live';
      // return a promise
      return this.createOrUpdateCampaign({ action, listId, name, text, senderName, sendDate, status, campaignId });
    },
    populateCampainFields() {
      // Fetch user's campaigns
      this.getUserCampaigns().then(() => {
        if (!!this.drafts.length && 'campaign_id' in this.$route.query) {
          this.drafts.forEach(({ id, senderName, list_id: listId, text, name }) => {
            if (id === parseInt(this.$route.query.campaign_id, 10)) {
              this.senderName = senderName;
              this.listId = listId;
              this.text = text;
              this.name = name;
            }
          });
        }
      });
    },
    sendTest() {
      const { text, telephone, senderName, attributes } = this;
      this.sendTestMessage({ text, telephone, senderName, attributes })
        .then(() => {
          this.testSuccess = true;
          this.testFail = false;
          this.testStatusMessage = 'Test envoyé !';
        })
        .catch(({ data }) => {
          this.testSuccess = false;
          this.testFail = true;
          this.testStatusMessage = data.error;
        });
    }
  }
};
</script>
<style>
.mx-input {
  height: calc(2.75rem + 2px);
  line-height: 1.5;
}

.message {
  font-size: 14px;
}

.mention {
  font-size: 14px;
  line-height: 1.5;
}
</style>
