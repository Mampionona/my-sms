<template>
  <tr>
    <td>{{ data.lastname }}</td>
    <td>{{ data.firstname }}</td>
    <td>{{ data.company }}</td>
    <td>{{ data.email }}</td>
    <td>{{ data.amount / 100 | formatCurrency(2) }}</td>
    <td>{{ data.date | full }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    data: {
      required: true,
      type: Object
    }
  }
};
</script>
