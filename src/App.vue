<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" class="mr-5">Otto Klaus</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="out">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('traerData'); 
  },
  methods: {
     out(){
      let _this = this;
      firebase.auth().signOut().then(function() {
        console.log('Sign-out successful.')
        _this.$router.replace({name: 'Login'})
      }).catch(function(error) {
        console.log(error)
      });
    },
  },
}
</script>

<style>

</style>
