<template>
  <tr>
    <th>{{ plan.name }}</th>
    <td>{{ plan.sms_price | formatCurrency }}</td>
    <td>{{ plan.plan_price | formatCurrency }}</td>
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
