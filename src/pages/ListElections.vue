<template>
  <div class="l_elections_listing">
    <v2-table @select-change="selectElections" :data="elections" border>
      <v2-table-column
        type="selection"
        width="45">
      </v2-table-column>
      <v2-table-column label="Momban'ny election" prop="description"></v2-table-column>
      <v2-table-column label="Mariky ny fifidianana" prop="id"></v2-table-column>
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
  name: 'ListElections',
  computed: {
    elections () {
      return this.$store.state.elections
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchElections')
  },
  methods: {
    selectElections (election) {
      this.$router.push(`/electionDetails/${election[0].id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l_elections_listing {
  margin-top: 20px;
}
</style>
