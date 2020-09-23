<template>
  <div class="login" v-if="validUser">
    <div class="jumbo">
      <h2 class="jumbo-title">
        Admin Lalala~
      </h2>
    </div>
    <div class="body-container">
      <b-row>
        <b-col>
          <div class="user-mgt-container">
            <div class="form-register">
              <b-card class="mb-2">
                <UserManagement />
              </b-card>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="kategori-mgt-container">
            <b-card class="mb-2">
              <KategoriManagement />
            </b-card>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <b-card class="mb-2">
            <SaranManagement />
          </b-card>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card class="mb-2"></b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { getJwtData, getCookie } from "../../mixins/index.js";
import UserManagement from "./UserManagement";
import KategoriManagement from "./KategoriManagement";
import SaranManagement from "./SaranManagement";
export default {
  name: "Admin",
  components: {
    UserManagement,
    KategoriManagement,
    SaranManagement,
  },
  created() {
    // check if admin
    if (getJwtData().email !== "syafiq.abdillah@ui.ac.id") {
      location.href = "/";
    } else {
      this.validUser = true;
    }
  },
  data() {
    return {
      validUser: false,
    };
  },
};
</script>

<style>
.title {
  margin: 32px;
}
.toko-mgt-title {
  text-align: center;
}
.form-register {
  text-align: left;
}
.btn-login {
  background-color: #c3aed6;
  border: 0;
  margin-top: 32px;
  font-size: 1.5rem;
}
.btn-login:hover {
  background-color: #424874;
}
.jumbo {
  background-color: #424874;
  padding: 32px;
  padding-top: 0px;
  color: white;
}
.jumbo-title {
  font-size: 2.5rem;
}
.body-container {
  margin: 32px;
}
@media (max-width: 480px) {
  .body-container {
    margin: 8px;
  }
}
</style>
