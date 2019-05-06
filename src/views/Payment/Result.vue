<template>
  <div class="payment-result">
    <page-header></page-header>
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center">
                <p class="mb-0">paymentStatus : {{ paymentStatus }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/layouts/partials/PageHeader';
import { mapActions } from 'vuex';

export default {
  components: { PageHeader },
  data() {
    return {
      paymentStatus: ''
    };
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
