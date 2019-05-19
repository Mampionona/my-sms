<template>
  <div class="payment-result">
    <div class="card">
      <div class="card-body">
        <p v-if="fail" class="card-text mb-0">Le paiement a échoué.<br>Vous pouvez essayer une nouvelle fois ou nous <a :href="`mailto:${mailTo}`">contacter directement.</a></p>
        <div v-if="success">
          <div v-if="!isLiberty">
            <p><strong>Créditez votre compte par virement bancaire&nbsp;:</strong></p>

            <p><strong>BUSINESS</strong></p>
            <ol>
                <li>Evaluer le montant du virement (ex: <strong>0,034 X</strong> le nombre de crédits souhaité).</li>
                <li>Effectuez le virement du montant du nombre de crédits souhaité.</li>
                <li>Précisez l’email associé à votre compte en référence de virement.</li>
            </ol>

            <p><strong>GRAND COMPTE</strong></p>
            <ol>
                <li>Evaluer le montant du virement (ex: <strong>0,033 X</strong> le nombre de crédits souhaité).</li>
                <li>Effectuez le virement du montant du nombre de crédits souhaité.</li>
                <li>Précisez l’email associé à votre compte en référence de virement.</li>
            </ol>

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
          <p v-else class="mb-0">Paiement effectué avec succès<br>Votre compte a été crédité</p>
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
