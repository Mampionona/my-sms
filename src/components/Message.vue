<template>
  <tr @click="onClick" :style="{cursor: 'pointer'}">
    <td><span class="name text-sm">{{ campaign.name }}</span></td>
    <td>{{ campaign.text }}</td>
    <td>{{ campaign.senderName }}</td>
    <td>{{ campaign.sendDate | full }}</td>
    <td>{{ campaign.name }}</td>
    <td></td>
    <td></td>
  </tr>
</template>
<script>
export default {
  props: {
    campaign: {
      required: true,
      type: Object
    },
    clickCallback: Function,
    lists: Array
  },
  methods: {
    onClick () {
      if (this.clickCallback) this.clickCallback(this.campaign);
    }
  }
};
</script>
