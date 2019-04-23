<template>
  <campaign-form :complete="onComplete" :fail="onFail"></campaign-form>
</template>
<script>
import CampaignForm from '@/components/form/Campaign.vue';
export default {
  components: { CampaignForm },
  methods: {
    onComplete (data) {
      console.log(data);
    },
    onFail (error) {
      console.log(error);
    }
  }
}
</script>
