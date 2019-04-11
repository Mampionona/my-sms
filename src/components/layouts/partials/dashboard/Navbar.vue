<template>
  <div class="collapse navbar-collapse" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'dashboard.index' }" class="nav-link">
          <i class="ni ni-shop text-primary"></i>
          <span class="nav-link-text">Dashboards</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#navbar-examples" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="navbar-examples">
          <i class="ni ni-ungroup text-orange"></i>
          <span class="nav-link-text">Examples</span>
        </a>
        <div class="collapse" id="navbar-examples" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <a href="../../pages/examples/pricing.html" class="nav-link">Pricing</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/examples/login.html" class="nav-link">Login</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/examples/register.html" class="nav-link">Register</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/examples/lock.html" class="nav-link">Lock</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/examples/timeline.html" class="nav-link">Timeline</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/examples/profile.html" class="nav-link">Profile</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#navbar-components" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="navbar-components">
          <i class="ni ni-ui-04 text-info"></i>
          <span class="nav-link-text">Components</span>
        </a>
        <div class="collapse" id="navbar-components" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <a href="../../pages/components/buttons.html" class="nav-link">Buttons</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/components/cards.html" class="nav-link">Cards</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/components/grid.html" class="nav-link">Grid</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/components/notifications.html" class="nav-link">Notifications</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/components/icons.html" class="nav-link">Icons</a>
            </li>
            <li class="nav-item">
              <a href="../../pages/components/typography.html" class="nav-link">Typography</a>
            </li>
            <li class="nav-item">
              <a href="#navbar-multilevel" class="nav-link collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="navbar-multilevel">Multi level</a>
              <div class="collapse" id="navbar-multilevel" style="">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <a href="#!" class="nav-link ">Third level menu</a>
                  </li>
                  <li class="nav-item">
                    <a href="#!" class="nav-link ">Just another link</a>
                  </li>
                  <li class="nav-item">
                    <a href="#!" class="nav-link ">One last link</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
