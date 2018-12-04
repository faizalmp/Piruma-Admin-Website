<template>
  <v-app dark>
    <v-parallax height="100%" src="https://i.ibb.co/Bwrj8xL/classroom-desks-education-256392-2x.png">
    <v-navigation-drawer
      persistent
      :miniVariant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      dark
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" router :to="item.link">
          <v-list-tile-action>
            <v-icon v-html="item.icon" color="white"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-btn icon @click.stop="miniVariant = !miniVariant"><v-icon>chevron_left</v-icon></v-btn>
            <v-list-tile-title v-text="item.title" style="color: white"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="red darken-3"
      dark
      xs12
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items>
        <v-btn flat icon @click="logout" to="/"><v-icon>error</v-icon></v-btn>
      </v-toolbar-items>
      <v-toolbar-title v-text="title">
      <router-link to="/" tag="span" style="cursor: pointer;"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="(item, i) in items" :key="i" router :to="item.link">
          {{item.title}}
        </v-btn> 

      </v-toolbar-items> -->

    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    </v-parallax>
  </v-app>
</template>

<script>
import Masuk from './components/Masuk'
import Admin from './components/Admin'
import Jadwal from './components/Jadwal'
export default {
  name: 'App',
  components: {
    Masuk,
    Jadwal,
    Admin
  },
  data () {
    return {

      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        //{icon: 'meeting_room', title: 'Masuk', link:'/'},
        {icon: 'person', title: 'Admin', link:'/Admin'},
        {icon: 'schedule', title: 'Jadwal', link:'/Jadwal'}
        ],
      miniVariant: true,
      title: 'PIRUMA ADMIN'
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
    }
  }
}
</script>
