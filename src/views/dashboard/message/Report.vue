<template>
  <tr>
    <td>{{ message.telephone }}</td>
    <td>{{ $t(message.status) }}</td>
    <td>{{ message.sms_number }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: Object
    }
  }
};
</script>
