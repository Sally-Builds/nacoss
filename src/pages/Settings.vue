<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>User Settings</q-item-label>

      <q-item clickable v-ripple @click="[fullHeight = true, mode = 'account']">
        <q-item-section>
          <q-item-label>Account</q-item-label>
          <q-item-label caption>
            Set and edit your account details and 
            profile picture
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="[fullHeight = true, mode = 'password']">
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption>
            reset your password
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>More</q-item-label>

      <q-item tag="label" clickable @click="help" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-icon name="chevron_right" size="md" color="primary"/>
        </q-item-section>
      </q-item>

      <q-item tag="label" clickable @click="vistOurWebsite" v-ripple>
        <q-item-section>
          <q-item-label>Visit Our Website</q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-icon name="chevron_right" size="md" color="primary" />
        </q-item-section>
      </q-item>

      <q-item tag="label" clickable @click="emailUs" v-ripple>
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-icon name="chevron_right" size="md" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>

          <q-dialog
            v-model="fullHeight"
            full-height
      >
      <account v-if="mode === 'account'" @submitted="updateUser({name,email,photo})" :photo.sync="photo" :name.sync="name" :email.sync="email" />
      <password 
        :password.sync="password"
        :confirmPassword.sync="confirmPassword"
        :currentPassword.sync="currentPassword"
        @submitted="updatePassword({password,confirmPassword,currentPassword})"
        v-if="mode === 'password'" />
    </q-dialog>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    'account': require('src/components/account').default,
    'password': require('src/components/passwordUpdate').default,
  },
  data () {
    return {
      mode: '',
      check1: true,
      check2: false,
      fullHeight: false,
      name: '',
      email: '',
      photo: null,
      password: '',
      confirmPassword: '',
      currentPassword: ''
    }
  },
  computed: {
    ...mapGetters('settings', ['currencyConverter']),
    converter: {
      get() {
        return this.currencyConverter
      },
      set(val) {
        return this.getCurrencyConverterStatus(val)
      }
    },
  },
  methods: {
    ...mapActions('settings', ['updateUser', 'updatePassword','getCurrencyConverterStatus']),
    vistOurWebsite() {
      openURL('http://www.stackoverflow.com')
    },
    emailUs() {
      window.location.href = 'mailto:uzoagulujoshua@gmail.com?subject= '
    },
    help() {
      window.location.href = 'mailto:uzoagulujoshua@gmail.com?subject=What can we help you with'
    }
  }
}
</script>