<template>
  <q-card class="column" style="width: 400px; height: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Update Account</div>
        </q-card-section>

        <q-card-section class="col q-pt-none">
          <q-form @submit="submit">
            <q-input
            rounded
            outlined
            type="text"
            :value="name"
            label="Name"
            clearable
            @input="$emit('update:name', $event)"
          />
          <q-input
            rounded
            outlined
            type="text"
            :value="email"
            label="Email"
            class="q-pt-lg"
            clearable
            @input="$emit('update:email', $event)"
          />
          <q-file 
            @input="$emit('update:photo', $event)"
            :value="photo"
            label="Upload profile Photo"
            rounded
            class="q-pt-lg" 
            outlined >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <div class="text-center q-pt-lg">
            <q-btn label="update" type="submit" color="primary"/>
          </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
</template>

<script>
export default {
    props: {
      name: String,
      email: String,
      photo: File,
    },
    methods: {
      submit() {
        this.$emit('submitted')
      }
    }
}
</script>

<style>
</style>