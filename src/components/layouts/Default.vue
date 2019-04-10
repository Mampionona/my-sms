<template>
  <div class="default-layout">
    <app-header></app-header>
    <div class="main-content">
      <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                <h1 class="text-white">
                  <slot name="title"></slot>
                </h1>
                <p class="text-lead text-white">
                  <slot name="intro"></slot>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <slot></slot>
        </div>
      </div>
    </div>    
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './partials/Header';
import Footer from './partials/Footer';
export default {
  components: {
    AppHeader: Header,
    AppFooter: Footer
  }
}
</script>
