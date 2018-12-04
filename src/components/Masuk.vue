<template>
<div id="app">
    <v-layout align-center justify-center row fill-height>
    <v-container fluid fill-height>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm6 class="blue-grey darken-2" dark style="opacity: 0.9" order-lg2>
        <v-container style="position: relative;" fill-height>
          <v-layout justify-center align-center>
          <v-flex mr-3>
          <v-layout justify-center>
        <v-card>
          <v-flex xs10 >
            <v-card-title class="display-2">PIRUMA</v-card-title>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs10  >
            <v-card-text>Peminjaman Ruangan Mahasiswa</v-card-text>
          </v-flex>
        </v-card>
        </v-layout>
          </v-flex>
          <v-card>
            <v-flex xs10>
              <v-card-title>
                <h4 style="color:#FFFFFF">Log in admin PIRUMA</h4>
              </v-card-title>
            </v-flex>
            <v-form @submit.prevent ="onSubmit" id="check-login-form">
            <v-flex xs10>
              <v-text-field dark prepend-icon="person" name="Username" label="Username" :rules="[rules.required]" v-model="username"></v-text-field>
            </v-flex>
            <v-flex xs10>
              <v-text-field dark prepend-icon="lock" name="Password" label="Password" :rules="[rules.required]" type="password" v-model="password"></v-text-field>
            </v-flex>
            <v-card-actions>
              <v-btn large block type="submit" color="red darken-3" dark :loading="loading" :disabled="loading" @click.native="loading = true;" form="check-login-form">
                Masuk
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
          </v-layout>
        </v-container>
      </v-flex>
      </v-layout>
        </v-container>
    </v-layout>

</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'Masuk',
  props: {
    msg: String,
  },
  data(){
    return {
      loader: null,
      loading: false,
      username:'',
      password:'',
      rules: {
          required: value => !!value || 'Required.',
        }
    }

  },
/*  watch: {
    loader() {
      this[this.loader] = !this[this.loader]
      setTimeout(() => (this[this.loader] = false), 3000)
      this.loader = null
    }
  }, */
  methods:{
      onSubmit(e) {
          e.preventDefault()
          axios.post('https://dteti.au-syd.mybluemix.net/api/login', {username: this.username, password: this.password})
          .then(function (response) {
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);        
               // window.location = "/"
            if (response.data.result == "Success") {
                window.location = "/#/Admin"
            } else if (response.data.result == "Salah bos q"){
                window.location = "/"
                this.loading = false
            }

          })
          .catch(function(error) {
            console.log(error)
            localStorage.removeItem('user-token')
            this.loader = null
          }) 
        }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>



