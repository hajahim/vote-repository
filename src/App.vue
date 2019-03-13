<template>
  <div id="app">
    <div class="l-page-wrapper toggled">
      <SideBar></SideBar>
      <div class="l-page-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }

  .l-page-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100vw;

    @media screen and (min-width: 769px) {
      flex-direction: row;
    }
  }

  .l-page-content {
    padding: 20px;
    width: 100%;
  }

  .skeleton {
    display: none !important;
  }

  .btn-primary {
    background-color: #41B883 !important;
    border-color: #41B883 !important;
    color: #fff !important;
  }

  .submit-button {
    margin-top: 30px;
  }
</style>
