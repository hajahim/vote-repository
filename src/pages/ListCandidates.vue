<template>
  <div>
    <skeleton-loading v-if="loading">
      <row
        :gutter="{
          bottom: '15px'
        }"
      >
        <square-skeleton
          :count="1"
          :boxProperties="{
            top: '10px',
            height: '26px'
          }"
        >
        </square-skeleton>
      </row>
      <row>
        <square-skeleton
          :boxProperties="{
            bottom: '10px',
            height: '200px'
          }"
        >
        </square-skeleton>
      </row>
    </skeleton-loading>
    <div class="l_candidates_listing" v-if="!loading">
      <div class="md-title">Lisitry ny ho fidiana</div>
      <v2-table :data="candidates" border>
        <v2-table-column label="Anarana" prop="name"></v2-table-column>
        <v2-table-column label="Fanampin'anarana" prop="firstName"></v2-table-column>
        <v2-table-column label="Sarangana" prop="gender"></v2-table-column>
      </v2-table>
    </div>
  </div>
</template>

<script>
import 'beautify-scrollbar/dist/index.css'
import 'v2-table/dist/index.css'
import V2Table from 'v2-table'
import Vue from 'vue'

Vue.use(V2Table)
export default {
  name: 'ListCandidates',
  computed: {
    candidates () {
      return this.$store.state.candidates
    },
    loading () {
      return this.$store.state.loading
    }
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
    this.$store.dispatch('fetchCandidates')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l_candidates_listing {
  margin-top: 20px;
}
.md-title {
  margin-bottom: 30px;
  color: #fff;
  background-color: #9C27B0;
  padding: 5px;
  margin-bottom: 30px;
}
</style>
