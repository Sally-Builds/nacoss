<template>
    <q-page class="q-pa-md">
        <div class="q-pt-lg row justify-center">
            <q-card class="col-12 col-sm-6">
          <q-card-section class="row text-center">
            <div class="text-h6 col-12 text-center"> Enter Email</div>
          </q-card-section>
          <q-separator class="q-mb-lg" />
        <q-card-section class="q-pt-none">
            <q-form @submit="submit">
                <!-- password -->
                <q-input 
                    rounded 
                    outlined 
                    v-model="email" 
                    label="email address"  
                    type="email"
                    class="q-mb-sm"
                    :rules="[val => !!val || 'Field is required']"
                    dense
                    lazy-rules
                    ref="mail"
                    hint="Enter Email address to to send a link"
                />
                <q-card-actions align="center">
                    <q-btn label="Send Link" type="submit" color="positive" />
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
            email: '',
        }
    },
    methods: {
    ...mapActions('auth', ['forgotPassword']),
    submit() {
        this.forgotPassword({email: this.email})
        this.email = ' '
        this.$refs.mail.blur()
    }

    }
}
</script>

<style>

</style>