<template>
  <section class="m-sidebar">
    <button v-on:click="toggle" class="m-sidebar-close-trigger">
      <i class="fa fa-toggle-on m-sidebar-close" aria-hidden="true"></i>
    </button>
    <h2> Fifidianana </h2>
    <div class="m-page-manager">
      <div class="card-header" id="headingOne">
        <router-link class="btn btn-link" to="/createElection">
          Fifidianana vaovao
        </router-link>
      </div>
    </div>
    <div class="m-page-manager">
      <div class="card-header" id="headingOne">
        <router-link class="btn btn-link" to="/listElections">
          Lisitry ny fifidianana
        </router-link>
      </div>
    </div>
    <div class="m-page-manager">
      <div class="card-header" id="headingOne">
        <router-link class="btn btn-link" to="/createCandidate">
          Mampiditra Olona ho fidiana
        </router-link>
      </div>
    </div>
    <div class="m-tag-manager">
      <div class="card-header" id="headingOne">
        <router-link class="btn btn-link" to="/listeCandidate">
          Lisitra ny olona ho fidiana
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    toggle: function (event) {
      event.preventDefault()
      var pageWrapper = document.querySelector('.l-page-wrapper')
      pageWrapper.classList.toggle('toggled')
      var icon = event.currentTarget.querySelector('.fa')
      if (pageWrapper.classList.contains('toggled')) {
        icon.classList.remove('fa-toggle-off')
        icon.classList.add('fa-toggle-on')
      } else {
        icon.classList.remove('fa-toggle-on')
        icon.classList.add('fa-toggle-off')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-sidebar {
    background-color: #dee2e6;
    transition: margin .25s ease-out;
    position: relative;
    padding: 20px;
    margin-left: -350px;
    width: 100%;

    @media screen and (min-width: 769px) {
     max-width: 350px;
    }
  }

  .m-sidebar .card-header {
    background-color: #dee2e6;
  }

  .m-sidebar-close-trigger {
    border-color: transparent;
    position: absolute;
    display: none;
    padding: 0 4px;
    right: -30px;
    top: 0;

    @media screen and (min-width: 769px) {
      display: block;
    }

    &:focus,
    &:active,
    &:hover {
      outline: none;
    }
  }

  .m-sidebar-close {
    color: #35495E;
  }

  .l-page-wrapper.toggled .m-sidebar {
    margin-left: 0 !important;
  }
</style>
