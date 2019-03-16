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
    <form novalidate class="md-layout" @submit.prevent="validateElectionGroup" v-if="!loading">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Sokajy fifidianana vaovao</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('description')">
                <label for="electionGroupDescription">Ny anaran'ny sokajy</label>
                <md-input name="electionGroupDescription" id="electionGroupDescription" autocomplete="electionGroupDescription" v-model="electionGroup.description"/>
                <span class="md-error" v-if="!$v.electionGroup.description.required">Ampidiro ny anaran'ny sokajy</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-subheader>Safidio ny fifidianana tao anatiny</md-subheader>
              <md-list class="list-viewer">
                <md-list-item v-for="(election, index) in elections" :key="index">
                  <md-checkbox v-model="electionGroup.elections" :value="JSON.stringify(election)" />
                  {{election.description}}
                </md-list-item>
              </md-list>
              <md-field class="error-list" :class="getValidationClass('elections')">
                <span class="md-error" v-if="!$v.electionGroup.elections.hasElectionsChoosen">Ampidiro ny fifidianana ao anatiny</span>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-subheader v-if="selectedElections.length > 0">Ny fifidianana ao anatiny</md-subheader>
              <md-list v-if="selectedElections.length > 0">
                <md-list-item v-for="(election, index) in selectedElections" :key="index">
                  <md-avatar>
                    <img src="../assets/avatar-placeholder.png" alt="People">
                  </md-avatar>
                  <span class="md-list-item-text">{{election.description}}</span>
                </md-list-item>
              </md-list>
            </div>
          </div>
        </md-card-content>

        <md-card-actions class="form_action">
          <md-button type="submit" class="md-raised md-primary" :disabled="isSent">Amboarina</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="isElectionGroupSent">Voatahiry ny fifidianana {{ lastElectionGroup }}!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'

export function hasElectionsChoosen (value) {
  return value.length > 0
}

export default {
  name: 'CreateElectionGroup',
  mixins: [validationMixin],
  data () {
    return {
      electionGroup: {
        description: '',
        elections: []
      },
      lastElectionGroup: null
    }
  },
  validations: {
    electionGroup: {
      description: { required },
      elections: { hasElectionsChoosen }
    }
  },
  computed: {
    elections: function () {
      return this.$store.state.elections
    },
    selectedElections: function () {
      const result = []
      this.electionGroup.elections.forEach(function (election) {
        result.push(JSON.parse(election))
      })
      return result
    },
    isSent () {
      return this.$store.state.isSent
    },
    loading () {
      return this.$store.state.loading
    },
    isElectionGroupSent: {
      get: function () {
        return this.$store.state.isSaved
      },
      set: function (newValue) {
        this.$store.dispatch('updateStatusSave', newValue)
      }
    }
  },
  methods: {
    saveElectionGroup: function (e) {
      e.preventDefault()
      this.lastElectionGroup = this.electionGroup.description
      const electionGroupData = Object.assign({}, this.electionGroup)
      electionGroupData.elections = []
      this.electionGroup.elections.forEach(function (election) {
        electionGroupData.elections.push(JSON.parse(election))
      })
      this.$store.dispatch('saveElectionGroup', electionGroupData)
      this.$store.dispatch('updateStatusSave', true)
      this.$store.dispatch('updateStatusSend', true)
      this.clearForm()
    },
    clearForm: function () {
      this.$v.$reset()
      this.electionGroup = {
        description: '',
        elections: []
      }
    },
    validateElectionGroup (e) {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveElectionGroup(e)
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.electionGroup[fieldName]
      if (field) {
        return {
          'md-invalid': (field.$invalid && field.$dirty) || (field.hasElectionsChoosen && field.$dirty)
        }
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('updateLoadingStatus', true)
    this.$store.dispatch('fetchElections')
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
