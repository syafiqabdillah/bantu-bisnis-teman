<template>
  <div class="bibit-nav">
    <b-navbar class="navbar" toggleable="sm" type="dark">
      <b-navbar-brand>{{ navBrand }}</b-navbar-brand>

      <b-navbar-toggle
        class="navbar-toggle"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="greetings" v-if="isLoggedIn()">
            <router-link to="/profile">My Store</router-link>
          </b-nav-item>

          <b-nav-item id="divider" v-if="isLoggedIn() && !isMobileSreen"
            >|</b-nav-item
          >

          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/stores">Stores</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/stores">Donate</router-link>
          </b-nav-item>

          <b-nav-item v-if="!isLoggedIn()">
            <router-link to="/register">Register</router-link>
          </b-nav-item>

          <b-nav-item v-if="!isLoggedIn()">
            <router-link to="/login">Login</router-link>
          </b-nav-item>

          <b-nav-item v-on:click="logout" v-else>
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  getCookie,
  checkCookie,
  parseJwt,
  setCookie,
  isLoggedIn,
  isMobile,
  getJwtData,
} from "../mixins/index";
export default {
  name: "Navbar",
  computed: {
    nama() {
      if (isLoggedIn()) {
        return parseJwt(getCookie("token"))["nama"];
      }
    },
    navBrand() {
      const path = this.$route.path;
      if (path.includes("login") || path.includes("register")) {
        return path.charAt(1).toUpperCase() + path.slice(2);
      }
      return "";
    },
    isMobileSreen() {
      return isMobile();
    },
  },
  methods: {
    logout() {
      setCookie("token", "", new Date());
      location.href = "/";
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<style scoped>
.greetings {
  color: #f3e6e3;
}
</style>
