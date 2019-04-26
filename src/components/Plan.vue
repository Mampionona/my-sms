<template>
  <tr>
    <th>{{ plan.name }}</th>
    <td>{{ (plan.smsPrice / 1000) | formatCurrency }}</td>
    <td>{{ plan.planPrice | formatCurrency }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    plan: {
      required: true,
      type: Object
    }
  }
}
</script>
