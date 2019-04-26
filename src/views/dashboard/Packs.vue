<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <tr>
              <th></th>
              <th>P.U</th>
              <th>Abonnement</th>
            </tr>
          </thead>
          <tbody class="list">
            <plan v-for="plan in selectedPlan" :key="plan.id" :plan="plan"></plan>
          </tbody>
        </v-table>
        <hr v-if="selectedPlan.length > 0">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group">
                <label for="number-of-sms" class="form-control-label">Combien de SMS désirez-vous envoyer ?</label>
                <input class="form-control" type="number" id="number-of-sms" min="0" placeholder="Nombre de SMS" v-model="numberOfSMS">
              </div>
              <button v-if="displayButton" class="btn btn-primary" @click.prevent="processPayment">{{ buttonLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import Plan from '@/components/Plan';
import { mapActions } from 'vuex';
export default {
  components: { vTable, Plan },
  data () {
    return {
      numberOfSMS: null,
      plans: [],
      selectedPlan: [],
      buttonLabel: '',
      displayButton: false
    };
  },
  methods: {
    ...mapActions({
      getPlans: 'plans/getPlans'
    }),
    processPayment () {
      alert('redirection vers la page de paiement');
    }
  },
  mounted () {
    this.getPlans().then(plans => {
      this.plans = this.selectedPlan = plans;
    });
  },
  watch: {
    numberOfSMS (number) {
      const LIBERTE = 1;
      const BUSINESS = 2;
      const GRAND_COMPTE = 3;
      number = parseInt(number);
      this.selectedPlan = this.plans.filter(({ id }) => {
        if (number === 0 || isNaN(number)) {
          return true;
        } else if (number < 200000) {
          return id === LIBERTE;
        } else if (number >= 200000 && number < 1000000) {
          return id === BUSINESS;
        } else {
          return id === GRAND_COMPTE;
        }
      });
    },
    selectedPlan (plan) {
      if (plan.length === 1) {
        if (plan[0].planPrice === 0) {
          this.buttonLabel = 'Acheter mes SMS';
          // show button
          this.displayButton = true;
          return;
        }
        this.buttonLabel = 'Prendre mon abonnement';
        // show button
        this.displayButton = true;
        return;
      }
      // hide button
      this.displayButton = false;
    }
  }
}
</script>
