<template>
  <tr @click="onClick" :style="{cursor: 'pointer'}">
    <th class="name">
      <span class="name mb-0 text-sm">{{ campaign.text }}</span>
    </th>
    <td>{{ campaign.senderName }}</td>
    <td>{{ campaign.sendDate | full }}</td>
    <td>{{ listName }}</td>
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
    clickCallback: Function,
    lists: Array
  },
  computed: {
    listName () {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === this.campaign.list_id) {
          return this.lists[i].name;
        }
      }
    }
  },
  methods: {
    onClick () {
      if (this.clickCallback) this.clickCallback(this.campaign);
    }
  }
};
</script>

