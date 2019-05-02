<template>
  <tr>
    <td>{{ user.lastname }}</td>
    <td>{{ user.firstname }}</td>
    <td>{{ user.userRole }}</td>
    <td>{{ user.credits | formatCurrency }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>
