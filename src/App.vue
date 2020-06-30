<template>
  <div id="app">
    <router-link to="/" class="main-title"><h1>TO DO リスト</h1></router-link>
    <header>
      <router-link to="/" class="header-item">一覧</router-link>
      <router-link to="/lists/done" class="header-item">実行済み</router-link>
      <router-link to="/create" class="header-item">作成</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-bottom: 200px;
  }

  .main-title {
    text-decoration: none;
  }

  .main-title:first-child:hover {
    color: #42b983;
  }

  .main-title:visited {
    color: #2c3e50;
  }

  header {
    margin: 50px 0;
  }

  .header-item {
    padding: 10px 30px;
    margin: 0 20px;
    border: #2c3e50 1px solid;
    border-radius: 5px;
    text-decoration: none;
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
  }

  .header-item:hover {
    color: #42b983;
  }
</style>
