<template>
  <section class="m-sidebar">
    <button v-on:click="toggle" class="m-sidebar-close-trigger">
      <i class="fa fa-toggle-on m-sidebar-close" aria-hidden="true"></i>
    </button>
    <h2> Loha hevitra </h2>
    <md-list class="menu_list">
      <md-list-item>
        <md-icon>menu</md-icon>
        <router-link class="md-list-item-text" to="/">
          Pejy fandraisana
        </router-link>
      </md-list-item>
      <md-list-item>
        <md-icon>menu</md-icon>
        <router-link class="md-list-item-text" to="/createElection">
          Fifidianana vaovao
        </router-link>
      </md-list-item>
      <md-list-item>
        <md-icon>menu</md-icon>
        <router-link class="md-list-item-text" to="/listElections">
          Lisitry ny fifidianana
        </router-link>
      </md-list-item>
      <md-list-item>
        <md-icon>menu</md-icon>
        <router-link class="md-list-item-text" to="/createCandidate">
          Mampiditra Olona ho fidiana
        </router-link>
      </md-list-item>
      <md-list-item>
        <md-icon>menu</md-icon>
        <router-link class="md-list-item-text" to="/listeCandidate">
          Lisitra ny olona ho fidiana
        </router-link>
      </md-list-item>
    </md-list>
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
    right: -27px;
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

  .menu_list {
    background: none;
  }

  .m-sidebar-close {
    color: #35495E;
  }

  .l-page-wrapper.toggled .m-sidebar {
    margin-left: 0 !important;
  }
</style>
