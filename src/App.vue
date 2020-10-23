<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
   mounted() {
    //get dues on mounted
    // this.fetchUser()
    // this.getDues()
  },
  methods: {
    ...mapActions('auth', ['fetchUser']),
    ...mapActions('dues', ['getDues']),
  }
}
</script>
