<template>
  <tr>
    <td>
      <slot name="foobar"></slot>
    </td>
    <th scope="row">
      <div class="media align-items-center">
        <div class="media-body">
          <span class="name mb-0 text-sm">{{ contact.telephone }}</span>
        </div>
      </div>
    </th>
    <td class="text-right">
      <v-btn icon="fas fa-trash-alt" color="danger"></v-btn>
      <v-btn icon="fas fa-pencil-alt" color="outline-secondary"></v-btn>
    </td>
  </tr>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  // data () {
  //   return {
  //     contact: null
  //   };
  // },
  props: {
    contact: {
      required: true,
      type: Object
    }
  }
};
</script>
