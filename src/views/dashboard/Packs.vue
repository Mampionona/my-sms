<template>
  <div class="row">
    <div class="col">
      <div v-if="user.planId === 1" class="card">
        <datatable :columns="columns" :data="selectedPlan" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <plan :plan="row" subscribe-button @subscribe="subscribe"></plan>
          </template>
        </datatable>
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
      <div v-else class="card p-4">
          <p><strong>Vous disposez d'un compte {{ user.planName }}. Créditez votre compte par virement bancaire&nbsp;:</strong></p>

          <div v-if="user.planId === 2">
            <ol>
                <li>Evaluer le montant du virement (ex: <strong>0,034 X</strong> le nombre de crédits souhaité).</li>
                <li>Effectuez le virement du montant du nombre de crédits souhaité.</li>
                <li>Précisez l’email associé à votre compte en référence de virement.</li>
            </ol>
          </div>

          <div v-else>
            <ol>
              <li>Evaluer le montant du virement (ex: <strong>0,033 X</strong> le nombre de crédits souhaité).</li>
              <li>Effectuez le virement du montant du nombre de crédits souhaité.</li>
              <li>Précisez l’email associé à votre compte en référence de virement.</li>
            </ol>
          </div>

          <p><strong>Nos coordonnées bancaires&nbsp;:</strong></p>

          <address>
            <p>
              <strong>IBAN:</strong> FR76 1009 6180 7100 0297 6320 178<br>
              <strong>BIC:</strong> CMCIFRPP
            </p>
            <p>
              <strong>DOMICILIATION</strong><br>
              CIC Aix Les Milles
            </p>
            <p>
              <strong>TITULAIRE DU COMPTE</strong><br>
              S.A.S DELTACOMM - 7 AVENUE ANDRE ROUSSIN - PONANT LITTORAL - 13016 MARSEILLE
            </p>
          </address>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Plan from '@/components/Plan';

export default {
  components: { Plan },
  data() {
    return {
      columns: [
        { label: '', representedAs: () => '' },
        { label: 'P.U', field: 'smsPrice' },
        { label: 'Abonnement', field: 'planPrice' },
        { label: '', representedAs: () => '' }
      ],
      numberOfSMS: null,
      plans: [],
      selectedPlan: [],
      buttonLabel: '',
      displayButton: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      getPlans: 'plans/getPlans',
      getPaymentUrl: 'payment/getPaymentUrl'
    }),
    processPayment() {
      this.subscribe(this.selectedPlan[0]);
    },
    subscribe(plan) {
      let amount;

      if (!plan.planPrice) amount = Math.round((plan.smsPrice * this.numberOfSMS) / 10); // convert in cents
      else amount = plan.planPrice * 100; // convert in cents

      this.getPaymentUrl({ amount }).then((res) => {
        localStorage.setItem('planId', plan.id);
        window.location.replace(res.paymentUrl);
      });
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
