<template>
  <form>
    <h3> Fifidianana {{electionDisplay.description}} </h3>
    <hr/>
    <p v-if="electionDisplay.candidats"> Isan'ny ho fidiana : {{electionDisplay.candidats.length}}</p>
    <p v-if="electionDisplay.voterNumber"> Isan'ny mpifidy : {{electionDisplay.voterNumber}}</p>
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
    RESULT : {{getResult}}
  </form>
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
      return this.$store.state.getResultElection
    }
  },
  mounted () {
    this.$store.dispatch('getElectionByKey', this.$route.params.id)
    this.$store.dispatch('getVotesByElection', this.$route.params.id)
  },
  methods: {
    saveVotes: function (e, value) {
      e.preventDefault()
      const formData = {
        candidat: value.row,
        candidatId: value.row.id,
        electionId: this.electionDisplay.id,
        value: 1
      }
      this.$store.dispatch('saveVotes', formData)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
