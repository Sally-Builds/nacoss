<template>
    <q-page class="q-pa-md">
        <div class="q-pt-lg row justify-center">
            <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"> 
                    <q-card class="col-12 col-sm-6" style="width: 400px">
                        <q-card-section class="row text-center">
                            <div class="text-h6 col-12 text-center">
                                <q-avatar>
                                    <!-- <img src="~assets/nacoss.png" alt="" /> -->
                                    <img src="~assets/caritas.png" alt="" />
                                </q-avatar>
                            </div>
                        </q-card-section>
                        <q-card-section class="row text-center">
                            <div class="text-h6 col-12 text-center"> Sign Up</div>
                        </q-card-section>
                        <q-separator class="q-mb-lg" />
                        <q-card-section class="q-pt-none">
                            <q-form @submit="signup(formData)">
                        <!-- user Name -->
                        <q-input 
                            rounded 
                            outlined 
                            v-model="formData.name" 
                            label="Full Name" 
                            type="text" 
                            class="q-mb-sm"
                            :rules="[val => !!val || 'Field is required']"
                            lazy-rules
                            dense
                        />
                        <!-- user email -->
                        <q-input 
                            rounded 
                            outlined 
                            v-model="formData.email" 
                            label="email" 
                            type="email" 
                            class="q-mb-sm"
                            :rules="[val => !!val || 'Field is required']"
                            dense
                            lazy-rules
                        />
                    <q-select
                        label="year of study"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        rounded
                        outlined
                        v-model="formData.level"
                        :options="levelOptions"
                        :rules="[val => !!val || 'Field is required']"
                        class="q-mb-sm"
                        lazy-rules
                        dense
                        />
                        <!-- password -->
                        <q-input 
                            rounded 
                            outlined 
                            v-model="formData.password" 
                            label="Password"  
                            :type="isPwd ? 'password' : 'text'"
                            class="q-mb-sm"
                            :rules="[val => val.length >= 8 || 'Password must be greater than 8 characters']"
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
                        <!-- confirm Password -->
                        <q-input 
                            rounded 
                            outlined 
                            v-model="formData.confirmPassword" 
                            label="Confirm password"  
                            :type="isConfPwd ? 'password' : 'text'"
                            class="q-mb-sm"
                            :rules="[val => val === formData.password || 'passwords dont match']"
                            dense
                            lazy-rules
                        >
                            <template v-slot:append>
                                <q-icon
                                :name="isConfPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isConfPwd = !isConfPwd"
                                />
                            </template>
                        </q-input>
                        <q-card-actions align="center">
                            <q-btn label="Sign Up" type="submit" color="positive" />
                            </q-card-actions>
                        </q-form>
                    </q-card-section>
                    <q-card-section align="center">
                        Already have an account?
                        <q-btn flat label="Login" to="/" color="positive" />
                    </q-card-section>
                </q-card>
            </transition>
        </div>
    </q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            isPwd: true,
            isConfPwd: true,
            formData: {
                level: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
           levelOptions: ['first', 'second', 'third', 'fourth']
        }
    },
    methods: {
        ...mapActions('auth', ['signup'])
    }
}
</script>

<style>

</style>