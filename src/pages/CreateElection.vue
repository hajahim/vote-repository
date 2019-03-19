<template>
  <div>
    <skeleton-loading v-if="loading">
      <row
        :gutter="{
          bottom: '15px'
        }"
      >
        <square-skeleton
          :count="5"
          :boxProperties="{
            top: '10px',
            height: '26px'
          }"
        >
        </square-skeleton>
      </row>
    </skeleton-loading>
    <form novalidate class="md-layout" @submit.prevent="validateElection" v-if="!loading">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Fifidianana Vaovao</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('description')">
                <label for="electionDescription">Ny momban'ny fifidianana</label>
                <md-input name="electionDescription" id="electionDescription" autocomplete="electionDescription" v-model="election.description"/>
                <span class="md-error" v-if="!$v.election.description.required">Ampidiro ny momban'ny fifidianana</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('voterNumber')">
                <label for="electionVoterNumber">Isan'ny mpifidy</label>
                <md-input type="number" name="electionVoterNumber" id="electionVoterNumber" autocomplete="electionVoterNumber" v-model="election.voterNumber"/>
                <span class="md-error" v-if="!$v.election.voterNumber.isNumberNotNull">Ampidiro ny isan'ny mpifidy</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('voted')">
                <label for="electionVotedNumber">Isan'ny ho fidiana</label>
                <md-input type="number" name="electionVotedNumber" id="electionVotedNumber" autocomplete="electionVotedNumber" v-model="election.voted"/>
                <span class="md-error" v-if="!$v.election.voted.isNumberNotNull">Ampidiro ny isan'ny ho fidiana</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('type')">
                <label for="candidatGender">Sokajy</label>
                <md-select v-model="election.type" name="candidatGender" id="candidatGender">
                  <md-option value="pv">Fifidianana misy P.V</md-option>
                  <md-option value="normal">Fifidianana mandeha isaky ny vato</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout" v-if="election.type === 'pv'">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('numberVotePlace')">
                <label for="electionVotedNumber">Isan'ny birao fifidianana</label>
                <md-input type="number" name="electionNumberVotePlace" id="electionNumberVotePlace" autocomplete="electionNumberVotePlace" v-model="election.numberVotePlace"/>
                <span class="md-error" v-if="!$v.election.numberVotePlace.isValidVotePlace">Ampidiro ny isan'ny Birao fifidianana</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label for="candidatGenderFilter">Sivano ny sarangan'ny kandida</label>
                <md-select v-model="candidateFilter" name="candidatGenderFilter" id="candidatGenderFilter">
                  <md-option value="default">Izy rehetra</md-option>
                  <md-option value="lahy">Lahy</md-option>
                  <md-option value="vavy">Vavy</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-subheader>Safidio ny olona ho fidiana</md-subheader>
              <md-list class="list-viewer">
                <md-list-item v-for="(candidat, index) in candidates" :key="index">
                  <md-checkbox v-model="election.candidats" :value="candidatToJson(candidat)" />
                  {{candidat.name}} {{candidat.firstName}}
                </md-list-item>
              </md-list>
              <md-field class="error-list" :class="getValidationClass('candidats')">
                <span class="md-error" v-if="!$v.election.candidats.hasCandidatesChoosen">Ampidiro ny kandida</span>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-subheader v-if="selectedCandidates.length > 0">Ny Olona ho fidiana</md-subheader>
              <md-list v-if="selectedCandidates.length > 0">
                <md-list-item v-for="(candidat, index) in selectedCandidates" :key="index">
                  <md-avatar>
                    <img src="../assets/avatar-placeholder.png" alt="People">
                  </md-avatar>
                  <span class="md-list-item-text">
                    {{candidat.name}} {{candidat.firstName}}
                  </span>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </md-card-content>

        <md-card-actions class="form_action">
          <md-button type="submit" class="md-raised md-primary" :disabled="isSent">Amboarina</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="isElectionSent">Voatahiry ny fifidianana {{ lastElection }}!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'

export function isNumberNotNull (value) {
  if (typeof value === 'string' && (value.length === 0 || parseInt(value) === 0)) {
    return false
  }
  return value !== 0
}

export function hasCandidatesChoosen (value) {
  return value.length > 0
}

export function isValidVotePlace (value, currentObject) {
  if (currentObject.type === 'normal') {
    return true
  } else if (typeof value === 'string' && (value.length === 0 || parseInt(value) === 0)) {
    return false
  } else {
    return value !== 0
  }
}

export default {
  name: 'CreateElection',
  mixins: [validationMixin],
  data () {
    return {
      election: {
        description: '',
        candidats: [],
        type: 'normal',
        voterNumber: 0,
        numberVotePlace: 0,
        voted: 0
      },
      candidateFilter: null,
      lastElection: null
    }
  },
  validations: {
    election: {
      description: { required },
      voterNumber: { isNumberNotNull },
      voted: { isNumberNotNull },
      numberVotePlace: { isValidVotePlace },
      candidats: { hasCandidatesChoosen }
    }
  },
  computed: {
    candidates: function () {
      const candidatesStore = Object.assign([], this.$store.state.candidates)
      return this.candidateFilter && this.candidateFilter !== 'default' ? candidatesStore.filter(candidate => candidate.gender.toLowerCase() === this.candidateFilter.toLowerCase()) : candidatesStore
    },
    selectedCandidates: function () {
      const result = []
      this.election.candidats.forEach(function (candidat) {
        const candidatObject = JSON.parse(candidat)
        result.push(candidatObject)
      })
      return result
    },
    isSent () {
      return this.$store.state.isSent
    },
    loading () {
      return this.$store.state.loading
    },
    isElectionSent: {
      get: function () {
        return this.$store.state.isSaved
      },
      set: function (newValue) {
        this.$store.dispatch('updateStatusSave', newValue)
      }
    }
  },
  methods: {
    candidatToJson: function (candidat) {
      let candidatElection = Object.assign({}, candidat)
      candidatElection.lotteryNumber = ''
      return JSON.stringify(candidatElection)
    },
    saveElection: function (e) {
      e.preventDefault()
      this.lastElection = this.election.description
      const electionData = Object.assign({}, this.election)
      electionData.candidats = []
      this.election.candidats.forEach(function (candidat) {
        electionData.candidats.push(JSON.parse(candidat))
      })
      console.warn('OBJ', this.election.candidats)
      // this.$store.dispatch('saveElection', electionData)
      // this.$store.dispatch('updateStatusSave', true)
      // this.$store.dispatch('updateStatusSend', true)
      this.clearForm()
    },
    clearForm: function () {
      this.$v.$reset()
      this.election = {
        description: '',
        candidats: [],
        voterNumber: 0,
        type: 'normal',
        voted: 0
      }
    },
    validateElection (e) {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveElection(e)
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.election[fieldName]
      if (field) {
        const isRequired = (typeof field.$invalid !== 'undefined') && field.$invalid && field.$dirty
        const isNumberNotNull = (typeof field.isNumberNotNull !== 'undefined') && !field.isNumberNotNull && field.$dirty
        const hasValidCandidat = (typeof field.hasCandidatesChoosen !== 'undefined') && !field.hasCandidatesChoosen && field.$dirty
        const isValidVotePlace = (typeof field.isValidVotePlace !== 'undefined') && !field.isValidVotePlace && field.$dirty
        return {
          'md-invalid': isRequired || isNumberNotNull || hasValidCandidat || isValidVotePlace
        }
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
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
.error-list {
  border: none;
  min-height: 0;
  margin: 0;
  padding: 0;

  &::before,
  &::after {
    content: none;
  }
}
</style>
