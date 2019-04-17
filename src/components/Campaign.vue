<template>
  <tr @click="onClick" :style="style">
    <th scope="row">
      <div class="media align-items-center">                    
        <div class="media-body">
          <span class="name mb-0 text-sm">{{ campaign.text }}</span>
        </div>
      </div>
    </th>
    <td class="budget">{{ campaign.sender_name }}</td>
    <td>{{ campaign.send_date | full }}</td>
    <td>{{ campaign.name }}</td>
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
