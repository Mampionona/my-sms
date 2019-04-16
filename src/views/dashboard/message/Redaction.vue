<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header"><i class="fas fa-users mr-2"></i> Destinataires</div>
            <div class="card-body">
              <model-select :options="options" v-model="to" placeholder="Sélectionner un fichier"></model-select>
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
              <div class="p-3 border">
                <textarea class="form-control-plaintext small no-resize" v-model="text" rows="6"></textarea>
                <p class="small text-right">{{ countSMS }}</p>
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
import { ModelSelect } from 'vue-search-select';
import DatePicker from 'vue2-datepicker';

export default {
  components: { ModelSelect, DatePicker },
  data () {
    return {
      to: '',
      text: '',
      senderName:'',
      sendDate: '',
      countSMS: '1 SMS - caractères restants 149',
      sendingMode: 'immediate',
      options: [
        // { value, text }
      ]
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
