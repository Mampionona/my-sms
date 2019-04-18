<template>
  <footer class="py-5" id="footer-main">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="copyright text-muted">
            &copy; {{ year }} My SMS
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear();
    }
  }
}
</script>
