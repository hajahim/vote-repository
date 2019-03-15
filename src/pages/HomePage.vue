<template>
  <div>
    <div class="l_hello">
      <img src="../assets/logo.png" alt="logo" width="150" />
      <h1 class="l_hello_title">{{ msg }}</h1>
    </div>
    <p class="l_text"> {{description}} </p>
    <figure class="quote">
      <blockquote class="curly-quotes" cite="https://www.youtube.com/watch?v=qYLrc9hy0t0">
        Dia toy izany koa amin'izao andro ankehitriny
        izao misy sisa ihany araka ny fifidianana amin'ny fahasoavana.
      </blockquote>
      <figcaption class="quote-by">— Romana 11: 5</figcaption>
    </figure>
    <div class="l_menu">
      <md-card class="md-primary" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Fifidianana vaovao</div>
            <div class="md-subhead">Ampiana</div>
          </md-card-header>
          <md-card-content>
            Raha toa ka hanamboatra fifidianana dia safidio ito.
          </md-card-content>
          <md-card-actions>
            <md-button>
              <router-link class="md-list-item-text" to="/createElection">
                mididtra
              </router-link>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
      <md-card class="md-accent default-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Lisitra ny fifidianana</div>
            <div class="md-subhead">Aseho</div>
          </md-card-header>
          <md-card-content>
            Safidio ito raha hijery ny fifidianana rehetra misy.
          </md-card-content>
          <md-card-actions>
            <md-button>
              <router-link class="md-list-item-text" to="/listElections">
                mididtra
              </router-link>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
      <md-card class="orange-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Olona ho fidiana</div>
            <div class="md-subhead">Ampiana</div>
          </md-card-header>
          <md-card-content>
            Mampiditra olona vaovao izay ilatsaka aminy fifidianana.
          </md-card-content>
          <md-card-actions>
            <md-button>
              <router-link class="md-list-item-text" to="/createCandidate">
               mididtra
              </router-link>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
      <md-card class="purple-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Lisitra ny olona ho fidiana</div>
            <div class="md-subhead">Aseho</div>
          </md-card-header>
          <md-card-content>
            Safidio ito raha hijery ny olona rehetra izay afaka fidiana.
          </md-card-content>
          <md-card-actions>
            <md-button>
              <router-link class="md-list-item-text" to="/listeCandidate">
                mididtra
              </router-link>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'AUMONERIE MALAGASY PRESBYTERIANINA ETO MAORISY',
      description: 'Fitaovana natao anatanterahana ny fifidianana izay tantarehana eto aminy Aumonerie Presbyterianina eto aminy Nosy Maorisy'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.l_hello {
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 769px) {
    flex-direction: row;
  }
}
.l_hello_title {
  font-size: 24px;
  line-height: 32px;
  margin-left: 30px;
  max-width: 450px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.l_text {
  margin: 30px 0;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.md-button-content a {
  color: #fff;
}
.orange-card {
  background-color: #FF9800;
  color: #fff;
}
.l_menu {
  max-width: 680px;
}
.purple-card {
  background-color: #9C27B0;
  color: #fff;
}
.default-card {
  color: #fff !important;
}
.quote {
  font-family: Georgia, serif;
  font-size: 14px;
  max-width: 480px;
}

.curly-quotes:before, .curly-quotes:after {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 48px;
  font-size: 50px;
  opacity: .2;
}

.curly-quotes:before {
  content: '\201C';
  margin-right: 4px;
  margin-left: -8px;
}

.curly-quotes:after {
  content: '\201D';
  margin-left: 4px;
  margin-right: -8px;
}

.quote-by {
  display: block;
  padding-right: 10px;
  text-align: right;
  font-size: 13px;
  font-style: italic;
  color: #84775c;
}

</style>
