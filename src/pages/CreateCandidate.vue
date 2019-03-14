<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Mpandray anjara vaovao</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="candidateName">Anarana</label>
              <md-input name="candidateName" id="candidateName" autocomplete="candidateName" v-model="candidate.name"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="candidateFirstNae">Fanampiny ny Anarana</label>
              <md-input name="candidateFirstNae" id="candidateFirstNae" autocomplete="candidateFirstNae" v-model="candidate.firstName"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label for="candidatGender">Sarangana</label>
              <md-select v-model="candidate.gender" name="candidatGender" id="candidatGender">
                <md-option value="Lahy">Lahy</md-option>
                <md-option value="Vavy">Vehivavy</md-option>
              </md-select>
              </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions class="form_action">
        <md-button type="submit" class="md-raised md-primary" v-on:click="saveCandidat">Ampidirina</md-button>
      </md-card-actions>
    </md-card>
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
