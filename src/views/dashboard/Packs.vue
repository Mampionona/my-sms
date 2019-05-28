<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="selectedPlan" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <plan :plan="row" :subscribe-button="selectedPlan.length > 1" @subscribe="subscribe"></plan>
          </template>
          <div slot="no-results" class="text-center">
            <template v-if="isFetching">
              <loading-progress
                indeterminate
                hide-background
                size="28"
                rotate
                fillDuration="2"
                rotationDuration="1"
              />
            </template>
            <template v-else>
              {{ $t('Aucun formule trouvé') }}
            </template>
          </div>
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

      <modal id="transfer-instructions">
        <p>
            Votre commande de {{ numberOfSMS }} SMS est prise en compte, vous allez recevoir un email pour effectuer votre virement ({{ amount | formatCurrency(2) }}&nbsp;TTC).
            <br>
            Votre compte sera crédité du nombre de SMS dès réception de votre virement bancaire.
        </p>

        <p><strong>Nos coordonnées bancaires&nbsp;:</strong></p>

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
      </modal>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { VAT } from '@/utils';
import Plan from '@/components/Plan';
import Modal from '@/components/Modal';

// TODO: when users already has an account /w id < 3
// if user is willing to buy nbr of SMS higher than account SMS limit
// propose to upgrade

export default {
  components: { Plan, Modal },
  data() {
    return {
      columns: [
        { label: 'Type de plan', representedAs: () => '' },
        { label: 'P.U', field: 'smsPrice' },
        { label: 'Abonnement annuel', field: 'planPrice' },
        { label: '', representedAs: () => '' }
      ],
      numberOfSMS: null,
      plans: [],
      selectedPlan: [],
      amount: 0,
      buttonLabel: '',
      displayButton: false
    };
  },
  mounted() {
    this.getPlans()
      .then((plans) => {
        this.plans = plans;

        if (this.user.planId) {
          this.selectedPlan = plans.filter(plan => plan.id === this.user.planId);
          this.columns[0].label = 'Votre plan';
        }

        else this.selectedPlan = plans;
      })
      .catch(() => this.$eventBus.$emit('fetch-data-error'));
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isFetching: 'plans/isFetching'
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

      if (!plan.planPrice || this.user.planId !== 1) amount = (plan.smsPrice * this.numberOfSMS) / 10; // convert in cents
      else amount = plan.planPrice * 100; // convert in cents

      amount = Math.round(amount + amount * (VAT / 100)); // add taxes

      if (this.user.planId === 1) {
        this.getPaymentUrl({ amount }).then((res) => {
          localStorage.setItem('planId', plan.id);
          window.location.replace(res.paymentUrl);
        });
      }

      else {
        this.amount = amount / 100;
        this.$jQuery('#transfer-instructions').modal('show');
      }
    }
  },
  watch: {
    numberOfSMS(number) {
      const LIBERTE = 1;
      const BUSINESS = 2;
      const GRAND_COMPTE = 3;
      const parsedNumber = parseInt(number, 10);

      if (!this.user.planId) {
        this.selectedPlan = this.plans.filter(({ id }) => {
          if (parsedNumber === 0 || Number.isNaN(parsedNumber)) return true;
          if (parsedNumber < 200000) return id === LIBERTE;
          if (parsedNumber >= 200000 && parsedNumber < 1000000) return id === BUSINESS;
          return id === GRAND_COMPTE;
        });
      }
    },
    selectedPlan(plan) {
      if (plan.length === 1) {
        if (plan[0].planPrice === 0 || this.user.planId) this.buttonLabel = 'Acheter mes SMS';
        else this.buttonLabel = 'Prendre mon abonnement';
        this.displayButton = true;

        return;
      }

      // hide button
      this.displayButton = false;
    }
  }
};
</script>
