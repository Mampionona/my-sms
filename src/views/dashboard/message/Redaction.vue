<template>
  <div class="row">
    <div class="col">
      <form @submit.prevent="submitCampaign" class="pb-5">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header"><i class="fas fa-users mr-2"></i> Destinataires</div>
              <div class="card-body">
                <model-list-select
                  :list="lists" 
                  option-value="id" 
                  option-text="name" 
                  v-model="to" 
                  placeholder="Sélectionner un fichier"
                ></model-list-select>
                <p v-if="countContacts > 0" class="small mt-4">{{ $tc('redaction.countContacts', countContacts) }}</p>
              </div>
            </div>
            <div class="card">
              <div class="card-header"><i class="fas fa-arrow-right mr-2"></i> Émetteur du message</div>
              <div class="card-body">
                <input type="text" class="form-control" v-model="senderName" placeholder="Nom de l'émetteur">
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header"><i class="fas fa-envelope-open mr-2"></i> Votre message</div>
              <div class="card-body">
                <div class="p-2 border">
                  <textarea-autosize
                    placeholder="Votre message..."
                    v-model="text"
                    :min-height="178"
                    :max-height="300"
                    class="form-control-plaintext small"
                  ></textarea-autosize>
                  <p class="small text-right">
                    <strong>{{ countSMS }}</strong> SMS - {{ $tc("remainingChars", remainingChars) }} <strong>{{ remainingChars }}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
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
                  class="mt-4"
                  @input="dateChange"
                  :disabled-days="date => date.getDay() === 0"
                ></date-picker>
              </div>
            </div>
            <div class="card">
              <div class="card-body">                
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="save-as-draft" v-model="status">
                  <label class="custom-control-label" for="save-as-draft">Enregistrer en tant que brouillon</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-right pr-3">
              <button class="btn btn-secondary">Envoyer un test</button>
              <button class="btn btn-primary" type="submit">Terminer</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';
import { computeNumberOfSMS, computeRemainingChars, MESSAGE } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { ModelListSelect, DatePicker },
  data () {
    return {
      to: '',
      text: '',
      senderName:'',
      sendDate: '',
      remainingChars: MESSAGE.firstMaxLength,
      countSMS: 1,
      sendingMode: 'immediate',
      status: false,
      listId: null,
      name: ''
    };
  },
  mounted () {
    // Get a user's lists
    this.getUserLists();
  },
  watch: {
    text (newText) {
      this.countSMS = computeNumberOfSMS(newText);
      this.remainingChars = computeRemainingChars(this.countSMS, newText.length);
    },
    to (listId) {
      const vm = this;
      this.lists.forEach(list => {
        if (list.id === listId) {
          vm.listId = listId;
          vm.name = list.name;
        }
      });

      this.getContactsOfList(listId);
    }
  },
  computed: {
    ...mapGetters({
      lists:'lists/lists',
      countContacts: 'contacts/count'
    })
  },
  methods: {
    ...mapActions({
      getUserLists: 'lists/getUserLists',
      createNewCampaign: 'campaign/createNewCampaign',
      getContactsOfList: 'contacts/getContactsOfList'
    }),
    dateChange (currentValue) {
      this.sendDate = currentValue.toISOString();
    },
    submitCampaign () {
      const {
        listId,
        name,
        text,
        sendDate,
        senderName,
        status
      } = this;

      this.createNewCampaign({
        listId,
        name,
        text,
        senderName,
        sendDate: (this.sendingMode === 'immediate') ? '' : sendDate,
        status: this.status ? 'draft': 'live'
      })
        .then(data => {
          this.listId = null;
          this.name = '';
          this.text = '';
          this.to = '';
          this.status = false;
        })
        .catch(error => alert(error.data.error));
    }
  }
}
</script>
<style>
.mx-input {
  height: calc(2.75rem + 2px);
  line-height: 1.5;
}
</style>
