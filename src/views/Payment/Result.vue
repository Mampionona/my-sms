<template>
  <div class="payment-result">
    <div class="card">
      <div class="card-body">
        <p v-if="fail" class="card-text mb-0">Le paiement a échoué. Vous pouvez essayer une nouvelle fois ou nous <a :href="`mailto:${mailTo}`">contacter directement.</a></p>
        <p v-if="success">success</p>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/layouts/partials/PageHeader';
import { mapActions } from 'vuex';
import { MAIL_TO } from '@/utils';

export default {
  components: { PageHeader },
  computed: {
    mailTo() {
      return MAIL_TO;
    },
    fail() {
      return this.paymentStatus === 'failure';
    },
    success() {
      return this.paymentStatus === 'success';
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
      })
      .catch(error => console.log(error));
  },
  methods: {
    ...mapActions({
      checkPaymentStatus: 'payment/checkPaymentStatus'
    })
  }
};
</script>
