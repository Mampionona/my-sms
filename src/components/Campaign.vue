<template>
  <tr @click="onClick" :style="{cursor: 'pointer'}">
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
      <td>rapport</td>
      <td>reponses</td>
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
    clickCallback: Function,
    lists: Array,
    isDraft: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    listName () {
      const lists = this.lists;
      for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        if (list.id === this.campaign.list_id) {
          return list.name;
        }
      }
    }
  },
  methods: {
    onClick () {
      if (this.clickCallback) {
        this.clickCallback(this.campaign);
      }
    }
  }
};
</script>

