<template>
  <tr>
    <th>{{ plan.name }}</th>
    <td>{{ (plan.smsPrice / 1000) | formatCurrency }}</td>
    <td>{{ plan.planPrice | formatCurrency(2) }}</td>
    <td v-if="button" class="text-right">
      <button class="btn btn-secondary"><i class="fas fa-pencil-alt"></i></button>
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
    button: {
      default: false,
      type: Boolean
    }
  }
};
</script>
