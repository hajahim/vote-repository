<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Mpandray anjara vaovao</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('name')">
              <label for="candidateName">Anarana</label>
              <md-input name="candidateName" id="candidateName" autocomplete="candidateName" v-model="candidate.name"/>
              <span class="md-error" v-if="!$v.candidate.name.required">Ampidiro ny anarana</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('firstName')">
              <label for="candidateFirstName">Fanampiny ny Anarana</label>
              <md-input name="candidateFirstName" id="candidateFirstName" autocomplete="candidateFirstName" v-model="candidate.firstName"/>
              <span class="md-error" v-if="!$v.candidate.firstName.required">Ampidiro fanampiny ny anarana</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('gender')">
              <label for="candidatGender">Sarangana</label>
              <md-select v-model="candidate.gender" name="candidatGender" id="candidatGender">
                <md-option value="Lahy">Lahy</md-option>
                <md-option value="Vavy">Vehivavy</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.candidate.gender.required">Ampidiro ny sarangana</span>
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions class="form_action">
        <md-button type="submit" class="md-raised md-primary" :disabled="isSent">Ampidirina</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="isCandidatSaved">Voaray tsara i {{ lastCandidate }} ho fidiana!</md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'CreateCandidate',
  mixins: [validationMixin],
  data () {
    return {
      candidate: {
        name: '',
        firstName: '',
        gender: ''
      },
      lastCandidate: null
    }
  },
  validations: {
    candidate: {
      name: { required },
      firstName: { required },
      gender: { required }
    }
  },
  computed: {
    isSent () {
      return this.$store.state.isSent
    },
    isCandidatSaved: {
      get: function () {
        return this.$store.state.isSaved
      },
      set: function (newValue) {
        this.$store.dispatch('updateStatusSave', newValue)
      }
    }
  },
  methods: {
    saveCandidat: function (e) {
      e.preventDefault()
      this.lastCandidate = `${this.candidate.name} ${this.candidate.firstName}`
      this.$store.dispatch('saveCandidate', this.candidate)
      this.$store.dispatch('updateStatusSave', true)
      this.$store.dispatch('updateStatusSend', true)
      this.clearForm()
    },
    clearForm: function () {
      this.$v.$reset()
      this.candidate = {
        name: '',
        firstName: '',
        gender: ''
      }
    },
    validateUser (e) {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveCandidat(e)
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.candidate[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
