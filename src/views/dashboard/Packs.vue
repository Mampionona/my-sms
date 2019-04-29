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
import { mapActions } from 'vuex';
import vTable from '@/components/vTable';
import Plan from '@/components/Plan';

export default {
  components: { vTable, Plan },
  data() {
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
      getPlans: 'plans/getPlans',
      getPaymentUrl: 'payment/getPaymentUrl'
    }),
    processPayment() {
      let amount;

      if (!this.selectedPlan[0].planPrice) amount = Math.round((this.selectedPlan[0].smsPrice * this.numberOfSMS) / 10); // convert in cents
      else amount = this.selectedPlan[0].planPrice * 100; // convert in cents

      this.getPaymentUrl({ amount }).then(res => window.location.replace(res.paymentUrl));
    }
  },
  mounted() {
    this.getPlans().then((plans) => {
      this.plans = this.selectedPlan = plans; // eslint-disable-line
    });
  },
  watch: {
    numberOfSMS(number) {
      const LIBERTE = 1;
      const BUSINESS = 2;
      const GRAND_COMPTE = 3;
      const parsedNumber = parseInt(number, 10);

      this.selectedPlan = this.plans.filter(({ id }) => {
        if (parsedNumber === 0 || Number.isNaN(parsedNumber)) return true;
        if (parsedNumber < 200000) return id === LIBERTE;
        if (parsedNumber >= 200000 && parsedNumber < 1000000) return id === BUSINESS;
        return id === GRAND_COMPTE;
      });
    },
    selectedPlan(plan) {
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
};
</script>
