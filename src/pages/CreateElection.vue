<template>
  <form>
    <h3> Fifidianana Vaovao </h3>
    <hr/>
    <fieldset class="form-group">
      <label for="electionDescription" class="bmd-label-floating">Ny momban'ny fifidianana</label>
      <input type="text" class="form-control" id="electionDescription" v-model="election.description" aria-describedby="electionDescriptionHelp">
      <span id="electionDescriptionHelp" class="bmd-help">Ampidiro eto ny momban'ny fifidianana.</span>
    </fieldset>
    <fieldset class="form-group">
      <label for="electionVoterNumber" class="bmd-label-floating">Isan'ny mpifidy</label>
      <input type="number" class="form-control" id="electionVoterNumber" v-model="election.voterNumber" aria-describedby="electionVoterNumberHelp">
      <span id="electionVoterNumberHelp" class="bmd-help">Ampidiro eto ny isan'ny mpifidy.</span>
    </fieldset>
    <div class="row">
      <div class="col">
        <div class="md-form mt-0">
          <select class="custom-select js-candidates-origin" size="10" v-on:change="chooseCandidate">
            <option value="" disabled selected>Ny olona ao anaty lisitra</option>
            <option v-for="(candidat, index) in candidates" :key="index" :value="candidat.id" :data-collection="JSON.stringify(candidat)">
              {{candidat.name}} {{candidat.firstName}}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="md-form mt-0">
          <select class="custom-select js-candidates-target" size="10" v-on:change="removeCandidate">
            <option value="" class="default" disabled selected>Ny olona ho fidiana</option>
          </select>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary submit-button" v-on:click="saveElection">Aroso</button>
  </form>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'CreateElection',
  data () {
    return {
      election: {
        description: '',
        candidats: [],
        voterNumber: 0
      }
    }
  },
  computed: {
    candidates () {
      return this.$store.state.candidates
    }
  },
  methods: {
    chooseCandidate: function (e) {
      const target = $(e.currentTarget).find(':selected')
      const targetOption = $('.js-candidates-target')
      targetOption.append(target.detach())
    },
    removeCandidate: function (e) {
      const target = $(e.currentTarget).find(':selected')
      const targetOption = $('.js-candidates-origin')
      targetOption.append(target.detach())
    },
    saveElection: function (e) {
      e.preventDefault()
      const selectedCandidate = $('.js-candidates-target option:not(.default)')
      $.each(selectedCandidate, (index, candidate) => {
        this.election.candidats.push(JSON.parse($(candidate).attr('data-collection')))
      })
      this.$store.dispatch('saveElection', this.election)
      this.clearForm()
    },
    clearForm: function () {
      this.election = {
        description: '',
        candidats: []
      }
      const selectedCandidates = $('.js-candidates-target option:not(.default)').detach()
      $('.js-candidates-origin').append(selectedCandidates)
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchCandidates')
  }
}
</script>

<style lang="scss" scoped>
</style>
