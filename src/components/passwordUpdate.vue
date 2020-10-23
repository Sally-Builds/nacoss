<template>
    <q-card class="my-card" style="width: 400px">
        <q-card-section>
          <div class="text-h6 text-center">Update Password</div>
        </q-card-section>

        <q-card-section class="col q-pt-none">
          <q-form @submit="submit">
            <q-input
            rounded
            outlined
            type="password"
            label="Current password"
            clearable
            :value="currentPassword"
            @input="$emit('update:currentPassword', $event)"
            lazy-rules
          />
          <q-input
            rounded
            outlined
            type="password"
            label="New Password"
            class="q-pt-lg"
            lazy-rules
            clearable
            :value="password"
            @input="$emit('update:password', $event)"
            :rules="[
                  val => val.length >= 8 || 'please your password must be atleast 8 characters'
                ]"
          />
          <q-input
            rounded
            outlined
            type="password"
            label="Confirm New Password"
            class="q-pt-lg"
            lazy-rules
            clearable
            :value="confirmPassword"
            @input="$emit('update:confirmPassword', $event)"
            :rules="[
                  val => val === password || 'passwords dont match'
                ]"
          />
          <div class="text-center q-pt-lg">
            <q-btn label="update password" type="submit" color="primary"/>
          </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="absolute-bottom bg-white text-red">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
</template>

<script>
export default {
  props: ['password', 'currentPassword', 'confirmPassword'],
    methods: {
      submit() {
        this.$emit('submitted')
      }
    }
}
</script>

<style>
</style>
