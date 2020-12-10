<template>
  <v-app class="text-center container">
    <h1 class="my-6 display-4">Log into your account</h1>
        <v-btn class="mt-5" x-large type="button" color="success" @click="google">Google</v-btn>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data() {
    return {
      show: true,
    }
  },
  methods: {
    google(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result)
        this.$router.replace({name: 'List'})
      }).catch(function(error) {
        console.log(error)
      });

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

}
</script>

<style scoped>

</style>