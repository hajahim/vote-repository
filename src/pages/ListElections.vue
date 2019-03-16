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
    <div class="l_elections_listing" v-if="!loading">
      <div class="md-title">Lisitry ny fifidianana</div>
      <v2-table @select-change="selectElections" :data="elections" border>
        <v2-table-column
          type="selection"
          width="45">
        </v2-table-column>
        <v2-table-column label="Momban'ny election" prop="description"></v2-table-column>
        <v2-table-column label="Mariky ny fifidianana" prop="id"></v2-table-column>
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
  name: 'ListElections',
  computed: {
    elections () {
      return this.$store.state.elections
    },
    loading () {
      return this.$store.state.loading
    }
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
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
.md-title {
  color: #fff;
  background-color: var(--md-theme-default-accent, #BBC241);
  padding: 5px;
  margin-bottom: 30px;
}
</style>
