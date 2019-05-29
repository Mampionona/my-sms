<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="plans" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <plan :plan="row" @click.native="showEditForm(row)" edit-button />
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
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
      <modal v-if="isVisible" id="edit-plan" :title="`Formule ${planName}`" accept-button @accept="update" :accept-button-label="`${$t('Mettre à jour')}`">
        <div class="form-group">
          <label for="input-nom" class="form-control-label">{{ $t('Nom du formule') }}</label>
          <input class="form-control" type="text" v-model="name" id="input-nom">
        </div>
        <div class="form-group">
          <label for="input-sms-unitaire" class="form-control-label">{{ $t('Prix des SMS unitaire') }}</label>
          <input class="form-control" type="number" v-model="smsPrice" id="input-sms-unitaire">
        </div>
        <div class="form-group">
          <label for="input-plan" class="form-control-label">{{ $t('Abonnement') }}</label>
          <input class="form-control" type="number" v-model="planPrice" id="input-plan">
        </div>
        <div class="form-group mb-0">
          <label for="input-max-volume" class="form-control-label">{{ $t('Volume max.') }}</label>
          <input class="form-control" type="number" v-model="maxVolume" id="input-max-volume">
        </div>
        <p v-if="hasError || updated" :class="errorClasses">{{ $t(statusMessage) }}</p>
      </modal>
    </div>
  </div>
</template>
<script>
import Plan from '@/components/Plan';
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/components/Modal';

export default {
  components: { Plan, Modal },
  computed: {
    ...mapGetters({
      plans: 'plans/plans',
      isFetching: 'plans/isFetching'
    }),
    errorClasses() {
      return {
        'mb-0': true,
        'mt-3': true,
        'font-weight-bold': true,
        small: true,
        'text-danger': this.hasError,
        'text-success': this.updated
      };
    }
  },
  created() {
    this.getPlans();
    this.$jQuery(document).on('hide.bs.modal', () => {
      this.hasError = false;
      this.updated = false;
      this.statusMessage = '';
    });
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: '', representedAs: () => '' },
        { label: 'P.U', field: 'smsPrice' },
        { label: 'Abonnement', field: 'planPrice' },
        { label: '', representedAs: () => '' }
      ],
      plan: null,
      planName: '',
      name: '',
      smsPrice: 0,
      planPrice: 0,
      maxVolume: 0,
      isVisible: false,
      statusMessage: '',
      hasError: false,
      updated: false
    };
  },
  methods: {
    ...mapActions({
      getPlans: 'plans/getPlans',
      updatePlan: 'plans/updatePlan'
    }),
    showEditForm(plan) {
      const { id, name, smsPrice, planPrice, maxVolume } = plan;

      this.isVisible = true;
      this.$planId = id;
      this.planName = name;
      this.name = name;
      this.smsPrice = smsPrice;
      this.planPrice = planPrice;
      this.maxVolume = maxVolume;
      this.$nextTick(() => this.$jQuery('#edit-plan').modal('show'));
    },
    update() {
      const planId = this.$planId;
      const { name, smsPrice, planPrice, maxVolume } = this;
      this.updatePlan({ planId, name, smsPrice, planPrice, maxVolume })
        .then(() => {
          this.statusMessage = 'Modification enregistrée !';
          this.updated = true;
          this.hasError = false;
        })
        .catch((error) => {
          this.statusMessage = error.data.error;
          this.hasError = true;
          this.updated = false;
        });
    }
  }
};
</script>
