<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-lg-6">les derniers envois effectués et les prochaines campagnes programmées,</div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h6 class="surtitle">Statistiques</h6>
              <h5 class="h3 mb-0">Messages envoyés</h5>
            </div>
            <div class="card-body">
              <stats></stats>
            </div>
          </div>
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
