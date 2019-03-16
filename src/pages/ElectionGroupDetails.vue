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
    <form v-if="!loading">
      <h3> Sokajin fifidianana {{electionGroupDisplay.description}} </h3>
      <hr/>
      <v2-table :data="electionGroupDisplay.elections" border>
        <v2-table-column label="lohateny" prop="description"></v2-table-column>
        <v2-table-column label="nandresy" prop="result"></v2-table-column>
      </v2-table>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ElectionGroupDetails',
  computed: {
    electionGroupDisplay () {
      return this.$store.state.electionGroupDisplay || {}
    },
    loading () {
      return this.$store.state.loading
    }
  },
  mounted () {
    this.$store.dispatch('getElectionGroupByKey', this.$route.params.id)
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
  }
}
</script>

<style lang="scss">
</style>
