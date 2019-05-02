<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h6 class="surtitle">Overview</h6>
          <h5 class="h3 mb-0">Messages envoyés</h5>
        </div>
        <div class="card-body">
          <stats></stats>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Stats from '@/components/Stats';
export default {
  components: { Stats }
}
</script>
