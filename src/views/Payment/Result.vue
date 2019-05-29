<template>
  <div class="payment-result">
    <div class="card">
      <div class="card-body">
        <div v-if="fail" class="card-text mb-0">
            <h1>Le paiement a échoué</h1>
            <p>Vous pouvez <router-link :to="{ name: 'packs' }">essayer une nouvelle fois</router-link> ou régler par virement bancaire.</p>

            <p>
                Votre commande est prise en compte, vous allez recevoir un email pour effectuer votre virement.
                <br>
                Votre compte sera crédité du nombre de SMS dès réception de votre virement bancaire.
            </p>

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

        <div v-if="success">
          <h1>Paiement effectué avec succès</h1>

          <p v-if="!isLiberty">Votre plan a été mis à jour et vous pouvez dès à présent <router-link to="{ name: 'packs' }">acheter vos crédits</router-link>.</p>
          <p v-else class="mb-0">Votre compte a été crédité</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    fail() {
      return this.paymentStatus === 'failure';
    },
    success() {
      return this.paymentStatus === 'success';
    },
    isLiberty() {
      return localStorage.getItem('planId') === '1';
    }
  },
  data() {
    return { paymentStatus: '' };
  },
  mounted() {
    this.checkPaymentStatus(this.$route.query.paylinetoken)
      .then(({ paymentStatus }) => {
        if (paymentStatus === 'success') {
          this.paymentStatus = 'success';
          setTimeout(() => this.getUser(), 2000);
        }

        else if (paymentStatus === 'failure') this.paymentStatus = 'failure';
        else if (paymentStatus === 'pending') this.paymentStatus = 'pending';
        else this.paymentStatus = 'server error';
      });
  },
  methods: {
    ...mapActions({
      checkPaymentStatus: 'payment/checkPaymentStatus',
      getUser: 'auth/getUser'
    })
  }
};
</script>
