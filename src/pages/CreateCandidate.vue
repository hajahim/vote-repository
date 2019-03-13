<template>
  <form>
    <h3> Ampiana mpandray anjara </h3>
    <hr/>
    <fieldset class="form-group">
      <label for="candidateName" class="bmd-label-floating">Anarana</label>
      <input type="text" class="form-control" id="candidateName" v-model="candidate.name" aria-describedby="candidateNameHelp">
      <span id="candidateNameHelp" class="bmd-help">Ampidiro eto ny anaran ny candidat.</span>
    </fieldset>
    <fieldset class="form-group">
      <label for="candidateFirstNae" class="bmd-label-floating">Fanampin' Anarana</label>
      <input type="text" class="form-control" id="candidateFirstNae" v-model="candidate.firstName" aria-describedby="candidateFirstNameHelp">
      <span id="candidateFirstNameHelp" class="bmd-help">Ampidiro eto ny fanampiny anarana ny candidat.</span>
    </fieldset>
    <fieldset class="form-group">
      <select class="custom-select" size="3" v-model="candidate.gender">
        <option value="" disabled selected>Ny sarangany</option>
        <option value="M">Lahy</option>
        <option value="F">Vehivavy</option>
      </select>
    </fieldset>
    <button type="submit" class="btn btn-primary submit-button" v-on:click="saveCandidat">Ampidirina</button>
  </form>
</template>

<script>
export default {
  name: 'CreateCandidate',
  data () {
    return {
      candidate: {
        name: '',
        firstName: '',
        gender: ''
      }
    }
  },
  methods: {
    saveCandidat: function (e) {
      e.preventDefault()
      this.$store.dispatch('saveCandidate', this.candidate)
      this.clearForm()
    },
    clearForm: function () {
      this.candidate = {
        name: '',
        firstName: '',
        gender: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
