<template>
  <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <links></links>
        <user-info></user-info>
      </div>
    </div>
  </nav>
</template>
<script>
import UserInfo from './UserInfo';
import Links from './Links';

export default {
  components: { UserInfo, Links }
}
</script>
