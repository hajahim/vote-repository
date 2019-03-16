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
      <h3> Fifidianana {{electionDisplay.description}} </h3>
      <hr/>
      <p v-if="electionDisplay.candidats"> Isan'ny nilatsaka : {{electionDisplay.candidats.length}}</p>
      <p v-if="electionDisplay.voterNumber"> Isan'ny mpifidy : {{electionDisplay.voterNumber}}</p>
      <p v-if="electionDisplay.voted"> Isan'ny ho fidiana : {{electionDisplay.voted}}</p>
      <p v-if="getNumberVotesVictory"> Atsasan'manila : {{getNumberVotesVictory}}</p>
      <v2-table :data="electionDisplay.candidats" border>
        <v2-table-column label="Anarana" prop="name"></v2-table-column>
        <v2-table-column label="Fanampin'anarana" prop="firstName"></v2-table-column>
        <v2-table-column label="Sarangana" prop="gender"></v2-table-column>
        <v2-table-column label="Vote">
          <template slot-scope="scope">
            <button type="submit" class="btn btn-primary" @click="(event) => { saveVotes(event, scope) }">Fidiko</button>
          </template>
        </v2-table-column>
      </v2-table>
      <hr/>
      <h3> Valim'mpifidianana  </h3>
      <v2-table :data="getResult" border v-if="getResult" :row-class-name="getRowClassName">
        <v2-table-column label="Laharana">
          <template slot-scope="scope">
            {{scope.row.order}}
          </template>
        </v2-table-column>
        <v2-table-column label="Vato Azo">
          <template slot-scope="scope">
            {{scope.row.numberVote}}
          </template>
        </v2-table-column>
        <v2-table-column label="Anarana">
          <template slot-scope="scope">
            {{scope.row.candidat.name}}
          </template>
        </v2-table-column>
        <v2-table-column label="Fanampin'anarana">
          <template slot-scope="scope">
            {{scope.row.candidat.firstName}}
          </template>
        </v2-table-column>
      </v2-table>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ElectionDetails',
  computed: {
    electionDisplay () {
      return this.$store.state.electionDisplay || {}
    },
    getNumberVotesVictory () {
      return this.$store.getters.getNumberVotesVictory
    },
    getResult () {
      return this.$store.getters.getResultElection
    },
    loading () {
      return this.$store.state.loading
    }
  },
  mounted () {
    this.$store.dispatch('getElectionByKey', this.$route.params.id)
    this.$store.dispatch('getVotesByElection', this.$route.params.id)
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
  },
  methods: {
    saveVotes: function (e, value) {
      e.preventDefault()
      const formData = {
        candidat: value.row,
        electionId: this.electionDisplay.id,
        value: 1
      }
      this.$store.dispatch('saveVotes', formData)
    },
    getRowClassName ({row, rowIndex}) {
      if (rowIndex < this.electionDisplay.voted) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
.warning-row {
  background-color: #ff33;
}
</style>
