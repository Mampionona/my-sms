<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-lg-3">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Derniers envois</h5>
            </div>
            <div class="card-body"></div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Prochaines campagnes</h5>
            </div>
            <div class="card-body">
              <div class="text-right mt-4">
                <router-link class="btn btn-icon btn-info" :to="{name: 'create_campaign'}">
                  <span class="btn-inner--icon"><i class="fas fa-envelope-open"></i></span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Statistiques des envois</h5>
            </div>
            <div class="card-body">
              <stats></stats>
              <div class="text-right mt-4">
                <router-link class="btn btn-icon btn-info" :to="{name: 'stats'}">
                  <span class="btn-inner--icon"><i class="fas fa-chart-bar"></i></span>
                    <span class="btn-inner--text">Voir les statistiques</span>
                </router-link>
              </div>
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
