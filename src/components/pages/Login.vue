<template>
  <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">User login</h1>
    <label for="inputUsername" class="sr-only">Username</label>
    <input type="text" v-model="user.username" class="form-control" placeholder="Username" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" v-model="user.password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" @click.prevent="loginNow()">Login</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginNow () {
      console.log(this.user)
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/users', this.user).then(res => {
        console.log(res)
      })
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
