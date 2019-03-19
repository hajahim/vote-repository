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
    <section v-if="!loading && electionDisplay.type === 'normal'">
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
    </section>
    <section v-if="!loading && electionDisplay.type !== 'normal'">
      <h3> Fifidianana {{electionDisplay.description}} </h3>
      <hr/>
      <p v-if="electionDisplay.candidats"> Isan'ny nilatsaka : {{electionDisplay.candidats.length}}</p>
      <p v-if="electionDisplay.voterNumber"> Isan'ny mpifidy : {{electionDisplay.voterNumber}}</p>
      <p v-if="electionDisplay.voted"> Isan'ny ho fidiana : {{electionDisplay.voted}}</p>
      <v2-table :data="electionDisplay.candidats" border>
        <v2-table-column label="Anaran'ny Kandida">
          <template slot-scope="scope">
            {{scope.row.name}} {{scope.row.firstName}}
          </template>
        </v2-table-column>
        <v2-table-column label="Sarangana" prop="gender"></v2-table-column>
        <v2-table-column :label="`PV Numero ${column}`" v-for="column in parseInt(electionDisplay.numberVotePlace)" :key="column">
          <template slot-scope="scope">
            <input type="number" name="vote" :disabled="typeof pvElections.pv !== 'undefined' && typeof pvElections.pv[scope.row.id][column - 1] !== 'undefined'" v-model="pvStat[scope.row.id][column - 1]" />
          </template>
        </v2-table-column>
      </v2-table>
      <section class="btn-content">
        <md-button type="submit" class="md-raised md-primary" @click="savePv">Amboarina</md-button>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ElectionDetails',
  data () {
    return {
      pvStat: {}
    }
  },
  computed: {
    electionDisplay () {
      /* eslint-disable */
      let pvElection = this.pvElections
      const candidats =  this.$store.state.electionDisplay ?  this.$store.state.electionDisplay.candidats : []
      candidats.forEach(candidat => {
        this.pvStat[candidat.id] = pvElection.pv? Object.assign({}, pvElection.pv[candidat.id]) : []
      })
      /* eslint-enable */
      return this.$store.state.electionDisplay || {}
    },
    pvElections () {
      return this.$store.state.pvElection || {}
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
    savePv: function (e) {
      e.preventDefault()
      const formData = {}
      formData.electionId = this.electionDisplay.id
      formData.pv = this.pvStat
      this.$store.dispatch('saveProvesVerbal', formData)
    },
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
.btn-content {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0;
}
</style>
