<template>
  <div class="q-pa-md infoi absolute-center">
    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"> 
        <q-card style="width: 300px">
          <q-card-section class="row text-center">
            <div class="text-h6 col-12 text-center">
                <q-avatar>
                    <!-- <img src="~assets/nacoss.png" alt="" /> -->
                    <img src="~assets/caritas.png" alt="" />
                </q-avatar>
            </div>
          </q-card-section>
          <q-card-section class="row text-center">
            <div class="text-h6 col-12 text-center"> Login</div>
          </q-card-section>
          <q-separator class="q-mb-lg" />
        <q-card-section class="q-pt-none">
            <q-form @submit="login({email, password})">
                <!-- product description -->
                <q-input 
                    rounded 
                    outlined 
                    v-model="email" 
                    label="email"  
                    type="email"
                    class="q-mb-sm"
                    :rules="[val => !!val || 'Field is required']"
                    lazy-rules
                    dense
                />
                <!-- product description -->
                <q-input 
                    rounded 
                    outlined 
                    v-model="password" 
                    label="Password"  
                    :type="isPwd ? 'password' : 'text'"
                    class="q-mb-sm"
                    :rules="[val => !!val || 'Field is required']"
                    dense
                    lazy-rules
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                     />
                  </template>
                </q-input>
                <q-card-actions align="center">
                    <q-btn label="Login" type="submit" color="positive" />
                </q-card-actions>
            </q-form>
        </q-card-section>
        <q-card-section>
          <span clickable class="text-primary" @click="$router.push('/forgotpassword')" style="cursor: pointer;">forgot password?</span><br />
          Dont have an account?
            <q-btn flat label="Signup" to="/signup" color="positive" />
        </q-card-section>
        </q-card>
    </transition>
        </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    ...mapActions('auth', ['login'])
  }
}
</script>

<style>

</style>