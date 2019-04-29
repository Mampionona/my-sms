<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <th></th>
            <th>P.U</th>
            <th>Abonnement</th>
          </thead>
          <tbody class="list">
            <plan
              v-for="plan in plans"
              :key="plan.id"
              :plan="plan"
              @click.native="showEditForm(plan)"
            />
          </tbody>
        </v-table>
      </div>
      <div v-if="isVisible" class="modal fade" id="edit-plan" tabindex="-1" role="dialog" aria-labelledby="edit-plan-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="edit-plan-label">Formule {{ planName }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="input-nom" class="form-control-label">Nom du formule</label>
                <input class="form-control" type="text" v-model="name" id="input-nom">
              </div>
              <div class="form-group">
                <label for="input-sms-unitaire" class="form-control-label">Prix des SMS unitaire</label>
                <input class="form-control" type="number" v-model="smsPrice" id="input-sms-unitaire">
              </div>
              <div class="form-group">
                <label for="input-plan" class="form-control-label">Abonnement</label>
                <input class="form-control" type="number" v-model="planPrice" id="input-plan">
              </div>
              <div class="form-group mb-0">
                <label for="input-max-volume" class="form-control-label">Volume max.</label>
                <input class="form-control" type="number" v-model="maxVolume" id="input-max-volume">
              </div>
              <p v-if="hasError || updated" :class="errorClasses">{{ statusMessage }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click.prevent="update">Mettre à jour</button>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { vTable, Plan },
  computed: {
    ...mapGetters({
      plans: 'plans/plans'
    }),
    errorClasses () {
      return {
        'mb-0': true,
        'mt-3': true,
        'font-weight-bold': true,
        'small': true,
        'text-danger': this.hasError,
        'text-success': this.updated
      }
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
  data () {
    return {
      plan: null,
      planId: null,
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
      this.planId = id;
      this.planName = this.name = name;
      this.smsPrice = smsPrice;
      this.planPrice = planPrice;
      this.maxVolume = maxVolume;
      this.$nextTick(() => this.$jQuery('#edit-plan').modal('show'));
    },
    update() {
      const { planId, name, smsPrice, planPrice, maxVolume } = this;
      this.updatePlan({ planId, name, smsPrice, planPrice, maxVolume })
        .then(() => {
          this.statusMessage = 'Modification enregistrée !';
          this.updated = true;
          this.hasError = false;
        })
        .catch(error => {
          this.statusMessage = error.data.error;
          this.hasError = true;
          this.updated = false;
        });
    }
  }
};
</script>
