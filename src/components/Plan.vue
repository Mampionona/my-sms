<template>
  <tr>
    <th>{{ plan.name }}</th>
    <td>{{ (plan.smsPrice / 1000) | formatCurrency }}</td>
    <td>{{ plan.planPrice | formatCurrency(2) }}</td>
    <td class="text-right">
      <button v-if="editButton" class="btn btn-secondary"><i class="fas fa-pencil-alt"></i></button>
      <button v-if="subscribeButton && plan.planPrice > 0" class="btn btn-primary" @click="$emit('subscribe', plan)">Je m'abonne</button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    plan: {
      required: true,
      type: Object
    },
    editButton: {
      default: false,
      type: Boolean
    },
    subscribeButton: {
      default: false,
      type: Boolean
    }
  }
};
</script>
