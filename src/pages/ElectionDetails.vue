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
      <v2-table :data="electionDisplay.candidats" border :row-class-name="getRowClassName">
        <v2-table-column label="Numero" prop="lotteryNumber"></v2-table-column>
        <v2-table-column label="Anaran'ny Kandida">
          <template slot-scope="scope">
            {{scope.row.name}} <br/> {{scope.row.firstName}}
          </template>
        </v2-table-column>
        <v2-table-column label="Sarangana" prop="gender"></v2-table-column>
        <v2-table-column v-for="iteration in parseInt(electionDisplay.numberVotePlace)" :render-header="(vueElement, iteration) => renderHeaderPv(vueElement, iteration)" :key="iteration">
          <template slot-scope="scope">
            <input type="number" class="input-votes" name="vote" v-if="(typeof pvElections.pv !== 'undefined' && typeof pvElections.pv[scope.row.id][iteration - 1] === 'undefined') || typeof pvElections.pv === 'undefined'" v-model="pvStat[scope.row.id][iteration - 1]" />
            <p v-if="typeof pvElections.pv !== 'undefined' && typeof pvElections.pv[scope.row.id][iteration - 1] !== 'undefined'">{{pvStat[scope.row.id][iteration - 1]}}</p>
          </template>
        </v2-table-column>
        <v2-table-column label="Isan'ny Vato azo">
          <template slot-scope="scope">
            <p v-html="getResultPvDetails(scope.row.id)"></p>
          </template>
        </v2-table-column>
        <v2-table-column label="Laharana">
          <template slot-scope="scope">
            {{resultDetails[scope.row.id]}}
          </template>
        </v2-table-column>
      </v2-table>
      <section class="btn-content">
        <md-button type="submit" class="md-raised md-primary" @click="savePv">Jerena Valiny</md-button>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ElectionDetails',
  data () {
    return {
      pvStat: {},
      rowTotal: [],
      totalPvVotes: 0,
      resultDetails: {}
    }
  },
  computed: {
    electionDisplay () {
      /* eslint-disable */
      let pvElection = this.pvElections
      const candidats =  this.$store.state.electionDisplay ?  this.$store.state.electionDisplay.candidats : []
      let resultTemp = {}
      this.resultDetails = {}
      candidats.forEach(candidat => {
        const pvSet = pvElection.pv ? Object.assign([], pvElection.pv[candidat.id]) : []
        this.pvStat[candidat.id] = pvSet
        resultTemp[candidat.id] = pvSet.length > 0 ? pvSet.reduce((aggregate, currentValue) => parseInt(aggregate) + parseInt(currentValue)) : 0
      })
      resultTemp = Object.keys(resultTemp).sort((next, previous) => {return resultTemp[previous] - resultTemp[next] })
      resultTemp.forEach((result, index) => {
        this.resultDetails[result] = index + 1
      })
      const pvKeys = Object.keys(this.pvStat)
      const votePlaceNumber = this.$store.state.electionDisplay.numberVotePlace
      this.rowTotal = []
      this.totalPvVotes = 0
      for(let iterate = 0 ; iterate < votePlaceNumber ; iterate++) {
        const rowArray = []
        pvKeys.forEach(key => {
          const value = this.pvStat[key][iterate] ? this.pvStat[key][iterate] : 0
          this.totalPvVotes += parseInt(value)
          rowArray.push(value)
        })
        this.rowTotal.push(rowArray)
      }
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
    getResultPvDetails: function (userId) {
      if (typeof this.pvElections.pv === 'undefined') {
        return 'Tsia mbola manomboka'
      }
      const totalUserVote = this.pvElections.pv[userId].reduce((aggregate, currentValue) => parseInt(aggregate) + parseInt(currentValue))
      const totalVotes = this.totalPvVotes
      const percentVote = ((totalUserVote / totalVotes) * 100).toFixed(2)
      return `${totalUserVote} / ${totalVotes} <br/> <span class="percent-text">(${percentVote}%)</span>`
    },
    renderHeaderPv: function (e, column) {
      const index = column.index - 2
      const columnTotal = typeof this.rowTotal[index - 1] !== 'undefined' ? this.rowTotal[index - 1].reduce((aggregate, currentValue) => parseInt(aggregate) + parseInt(currentValue)) : 0
      return e({name: 'labelHeader', template: `<label>PV Numero ${index} <br/> Isan'ny vato <span class="count-value">(${columnTotal})</span></label>`})
    },
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
      if (rowIndex < this.electionDisplay.voted && this.electionDisplay.type === 'normal') {
        return 'warning-row'
      } else {
        if (this.resultDetails[row.id] <= this.electionDisplay.voted) {
          return 'voted-row '
        }
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
.voted-row {
  background-color: #ff33;

  .input {
    border-width: 0;
  }
}
.btn-content {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0;
}
.percent-text {
  font-size: 16px;
  font-weight: bold;
}
.count-value {
  font-weight: bold;
  color: #35495E;
}
.v2-table__cell,
.v2-table td {
  padding: 5px;
}
.input-votes {
  max-width: 100%;
}
</style>
