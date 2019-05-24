<template>
  <tr @click="$emit('show', campaign)" :style="{cursor: 'pointer'}">
    <template v-if="isDraft">
      <td>
        <span class="text-sm">{{ campaign.text }}</span>
      </td>
      <td>{{ campaign.senderName }}</td>
      <td>{{ campaign.sendDate | full }}</td>
      <td>{{ listName }}</td>
    </template>
    <template v-else>
      <td><span class="text-sm">{{ campaign.name }}</span></td>
      <td>{{ campaign.text }}</td>
      <td>{{ campaign.senderName }}</td>
      <td>{{ campaign.sendDate | full }}</td>
      <td>{{ listName }}</td>
      <td class="text-center">
        <button class="btn btn-secondary"><i class="fas fa-bars"></i></button>
      </td>
    </template>
  </tr>
</template>
<script>
export default {
  props: {
    campaign: {
      required: true,
      type: Object
    },
    lists: Array,
    isDraft: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    listName() { // eslint-disable-line
      const { lists } = this;

      for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        if (list.id === this.campaign.list_id) {
          return list.name;
        }
      }
    }
  }
};
</script>
