<template>
  <div class="row">
    <div class="col">
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
            </div>
          </div>
          <div class="card">
            <div class="card-header"><i class="fas fa-arrow-right mr-2"></i> Émetteur du message</div>
            <div class="card-body">
              <input type="text" class="form-control" v-model="senderName">
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header"><i class="fas fa-envelope-open mr-2"></i> Votre message</div>
            <div class="card-body">
              <div class="p-2 border">
                <textarea class="form-control-plaintext small no-resize" placeholder="Votre message" v-model="text" rows="6"></textarea>
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
              ></date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-right pr-3">
            <button class="btn btn-secondary">Envoyer un test</button>
            <button class="btn btn-primary">Terminer</button>
          </div>
        </div>
      </div>
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
      selectedList: null
    };
  },
  mounted () {
    // Get a user's lists
    this.getUserLists();
  },
  watch: {
    text (newText) {
      let len = newText.length;
      this.countSMS = computeNumberOfSMS(this.text);
      this.remainingChars = computeRemainingChars(this.countSMS, len);
    },
    to (id) {
      const list = this.lists.filter(list => list.id === id);
      if (list.length > 0) {
        this.selectedList = list[0];
      }
    }
  },
  computed: {
    ...mapGetters({ lists:'lists/lists' })
  },
  methods: {
    ...mapActions({ getUserLists: 'lists/getUserLists' })
  }
}
</script>
<style>
.mx-input {
  height: calc(2.75rem + 2px);
  line-height: 1.5;
}
</style>
