<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Fifidianana Vaovao</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="electionDescription">Ny momban'ny fifidianana</label>
              <md-input name="electionDescription" id="electionDescription" autocomplete="electionDescription" v-model="election.description"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="electionVoterNumber">Isan'ny mpifidy</label>
              <md-input name="electionVoterNumber" id="electionVoterNumber" autocomplete="electionVoterNumber" v-model="election.voterNumber"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="electionVotedNumber">Isan'ny ho fidiana</label>
              <md-input name="electionVotedNumber" id="electionVotedNumber" autocomplete="electionVotedNumber" v-model="election.voted"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-subheader>Safidio ny olona ho fidiana</md-subheader>
            <md-list class="list-viewer">
              <md-list-item v-for="(candidat, index) in candidates" :key="index">
                <md-checkbox v-model="election.candidats" :value="JSON.stringify(candidat)" />
                {{candidat.name}} {{candidat.firstName}}
              </md-list-item>
            </md-list>
          </div>
          <div class="md-layout-item">
            <md-subheader v-if="selectedCandidates.length > 0">Ny Olona ho fidiana</md-subheader>
            <md-list v-if="selectedCandidates.length > 0">
              <md-list-item v-for="(candidat, index) in selectedCandidates" :key="index">
                <md-avatar>
                  <img src="../assets/avatar-placeholder.png" alt="People">
                </md-avatar>
                <span class="md-list-item-text">{{candidat.name}} {{candidat.firstName}}</span>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </md-card-content>

      <md-card-actions class="form_action">
        <md-button type="submit" class="md-raised md-primary" v-on:click="saveElection">Amboarina</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
export default {
  name: 'CreateElection',
  data () {
    return {
      election: {
        description: '',
        candidats: [],
        voterNumber: 0,
        voted: 0
      }
    }
  },
  computed: {
    candidates: function () {
      return this.$store.state.candidates
    },
    selectedCandidates: function () {
      const result = []
      this.election.candidats.forEach(function (candidat) {
        result.push(JSON.parse(candidat))
      })
      return result
    }
  },
  methods: {
    saveElection: function (e) {
      e.preventDefault()
      const electionData = Object.assign({}, this.election)
      electionData.candidats = []
      this.election.candidats.forEach(function (candidat) {
        electionData.candidats.push(JSON.parse(candidat))
      })
      this.$store.dispatch('saveElection', electionData)
      this.clearForm()
    },
    clearForm: function () {
      this.election = {
        description: '',
        candidats: [],
        voterNumber: 0,
        voted: 0
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchCandidates')
  }
}
</script>

<style lang="scss" scoped>
.spaced {
  margin-top: 20px;
}
.list-viewer {
  border: 1px solid rgba(0, 0, 0, 0.42);
  max-height: 260px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.form_action {
  margin-top: 30px;
}
</style>
