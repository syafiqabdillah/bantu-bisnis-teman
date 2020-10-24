<template>
  <div class="footer bibit-footer">
    <div id="copyright">
      ©2020, Bantuin Bisnis Teman.
    </div>
    <router-link v-if="isAdmin" class="bibit-link" to="/bukan-admin"
        >Admin</router-link
      >
    <div id="contact">
      Contact us at abdillah.syafiq@gmail.com
    </div>
  </div>
</template>

<script>
import { getJwtData, isLoggedIn } from "../mixins";
export default {
  name: "Footer",
  computed: {
    isAdmin() {
      if (!isLoggedIn()) {
        return false;
      } else {
        return getJwtData().email === "syafiq.abdillah@ui.ac.id";
      }
    },
  },
};
// f3e6e3
</script>

<style lang="css" scoped>
.footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding-top: 4px;
  padding-bottom: 4px;
}
#copyright,
#contact {
  flex-grow: 1;
}

@media (max-width: 480px) {
  .footer {
    flex-direction: column;
    height: 75px;
  }
}
</style>
