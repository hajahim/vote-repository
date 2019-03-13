<template>
  <div class="l_candidates_listing">
    <v2-table :data="candidates" border>
      <v2-table-column label="Anarana" prop="name"></v2-table-column>
      <v2-table-column label="Fanampin'anarana" prop="firstName"></v2-table-column>
      <v2-table-column label="Sarangana" prop="gender"></v2-table-column>
    </v2-table>
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
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchCandidates')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l_candidates_listing {
  margin-top: 20px;
}
</style>
