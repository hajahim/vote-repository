<template>
  <div class="l_hello">
    <img src="../assets/logo.png" alt="logo" width="150" />
    <h1 class="l_hello_title">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Tongasoa eto aminy fifidianana'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
.l_hello_title {
  margin-left: 30px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
