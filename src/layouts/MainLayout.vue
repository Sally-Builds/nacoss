<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-11">

    <q-header bordered class="text-grey-11" style="background-color: #282828">
      <q-toolbar>
        <q-toolbar-title class="q-pl-lg">
          <q-avatar>
            <img src="~assets/nacoss.png" alt="" />

          </q-avatar>
          Nacoss
        </q-toolbar-title>
          <q-chip v-if="user">
            <q-avatar>
              <img :src="`/img/users/default.jpg`">
            </q-avatar>
            {{user.name.split(' ')[0]}}
          </q-chip>
        <div class="bg-screen">
          <q-btn label="Home" icon="home" v-if="userRole" :to="userRole === 'user' ? '/dashboard' : '/dashboard/admin'" flat />
          <q-btn label="settings" icon="settings" to="/settings" flat />
          <q-btn label="logout" icon="logout" @click="logout" flat />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-grey-11">
      <q-tabs class="she sm-screen">
        <q-route-tab
          icon="home"
          :to="userRole === 'user' ? '/dashboard' : '/dashboard/admin'"
          label="Home" />
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
          <q-route-tab
          icon="logout"
          to="/"
          @click="logout"
          label="logout" />
      </q-tabs>
      <q-toolbar class="she bg-screen" dense>
        <q-toolbar-title class="text-center">
          2020
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  data () {
    return {
      left: false,
      navs: [
          {
            label: 'Settings',
            icon: 'settings',
            to: '/settings'
          },
        ]
    }
  },
  mounted() {
    this.fetchUser()
    this.getDues()
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['userRole'])
  },
  methods: {
    ...mapActions('auth', ['logout', 'fetchUser']),
    ...mapActions('dues', ['getDues'])
  }
}
</script>

<style scoped>
  @media all and (min-width: 768px){
    .sm-screen{
      display:  none;
    }
  }

@media all and (max-width: 767px){
    .bg-screen{
      display:  none;
    }
  }

 .she {
   background-color: #282828;
 }

</style>