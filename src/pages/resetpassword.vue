<template>
    <q-page class="q-pa-md">
        <div class="q-pt-lg row justify-center">
            <q-card class="col-12 col-sm-6">
          <q-card-section class="row text-center">
            <div class="text-h6 col-12 text-center"> Reset Password</div>
          </q-card-section>
          <q-separator class="q-mb-lg" />
        <q-card-section class="q-pt-none">
            <q-form @submit="submit($route.params.id)">
                <!-- password -->
                <q-input 
                    rounded 
                    outlined 
                    v-model="password" 
                    label="New Password"  
                    type="password"
                    class="q-mb-sm"
                    :rules="[val => val.length >= 8 || 'Password must be greater than 8 characters']"
                    dense
                    lazy-rules
                />
                <!-- confirm Password -->
                <q-input 
                    rounded 
                    outlined 
                    v-model="confirmPassword" 
                    label="Confirm password"  
                    type="password"
                    class="q-mb-sm"
                    :rules="[val => val === password || 'passwords dont match']"
                    dense
                    lazy-rules
                />
                <q-card-actions align="center">
                    <q-btn label="Reset password" type="submit" color="positive" />
                </q-card-actions>
            </q-form>
        </q-card-section>

      </q-card>
        </div>
    </q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            password: '', 
            confirmPassword: ''
        }
    },
    methods: {
    ...mapActions('auth', ['resetPassword']),
        submit(token){
            console.log(token)
            const data = {
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            this.resetPassword({data, token})
        }
    }
}
</script>

<style>

</style>