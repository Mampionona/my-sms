<template>
  <tr @click="onClick" :style="style">
    <td><span class="name text-sm">Nom de la campagne</span></td>
    <td>{{ campaign.text }}</td>
    <td>{{ campaign.sender_name }}</td>
    <td>{{ campaign.send_date | full }}</td>
    <td>{{ campaign.name }}</td>
    <td></td>
    <td></td>
  </tr>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  props: {
    campaign: {
      required: true,
      type: Object
    },
    clickCallback: Function
  },
  computed: {
    style () {
      return {
        cursor: 'pointer'
      };
    }
  },
  methods: {
    onClick () {
      if (this.clickCallback) this.clickCallback(this.campaign);
    }
  }
};
</script>
