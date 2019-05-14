<template>
  <div class="payment-result">
    <div class="card">
      <div class="card-body">
        <p v-if="fail" class="card-text mb-0">Le paiement a échoué.<br>Vous pouvez essayer une nouvelle fois ou nous <a :href="`mailto:${mailTo}`">contacter directement.</a></p>
        <div v-if="success">
          <div v-if="!isLiberty">
            <p><strong>Créditez votre compte par virement bancaire:</strong></p>
            <ol>
              <li><p>Effectuez un virement du montant du nombre de crédit souhaité.</p></li>
              <li><p>Précisez l'email associé à votre compte en référence de virement.</p></li>
            </ol>
            <p><strong>Nos coordonnées bancaires:</strong></p>
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
          <p v-else class="mb-0">Paiement effectué avec succès</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { MAIL_TO } from '@/utils';

export default {
  computed: {
    mailTo() {
      return MAIL_TO;
    },
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
        if (paymentStatus === 'success') this.paymentStatus = 'success';
        else if (paymentStatus === 'failure') this.paymentStatus = 'failure';
        else if (paymentStatus === 'pending') this.paymentStatus = 'pending';
        else this.paymentStatus = 'server error';
      });
  },
  methods: {
    ...mapActions({
      checkPaymentStatus: 'payment/checkPaymentStatus'
    })
  }
};
</script>
