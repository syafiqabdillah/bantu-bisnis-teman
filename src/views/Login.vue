<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <div class="login-image bibit-text-dark">
            <h2>Bantuin Bisnis Teman</h2>
            <p>Kalau bisa beli lewat teman sendiri, kenapa nggak?</p>
            <br>
            <img :src="imageSource" alt="Two humans" />
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card>
            <div class="form-login">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-email"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Your email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Your password"
                  ></b-form-input>
                </b-form-group>
                <b-button class="bibit-btn btn-login" block type="submit">Login</b-button>
              </b-form>
              <div class="register-now">
                <a class="bibit-link-dark" href="/register">Belum punya akun? Daftar sekarang</a>
              </div>
              <!-- <hr>
              <div align="center" v-on:click="getGoogleToken">
                Login with Google
              </div> -->
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-modal ref="modal-loading" centered hide-footer hide-header>
      <div align="center">
        <b-spinner label="Spinning" class="spinner"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { parseJwt, setCookie } from "../mixins/index.js";
import { baseUrl } from "../config/index.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      imageChoices: [
        require("../assets/img/login1.png"),
        require("../assets/img/login2.png"),
      ],
    };
  },
  computed: {
    imageSource() {
      const randomIdx = Math.floor(Math.random() * this.imageChoices.length);
      return this.imageChoices[randomIdx];
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$refs["modal-loading"].show();
      axios
        .post(`${ baseUrl }/login`, this.form)
        .then((res) => {
          const jwt = res.data.jwt;
          const data = parseJwt(jwt);
          setCookie("token", jwt, 1);
          location.href = "/";
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["modal-loading"].hide();
        });
    },
    onReset() {},
    getGoogleToken() {
      this.$gAuth.getAuthCode()
      .then(res => {
        console.log(`dari google auth ${res}`)
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
};
</script>

<style lang="css" scoped>
.title {
  margin: 32px;
}
.form-login {
  text-align: left;
  padding: 16px;
}
.login-container {
  margin: 128px;
}
.btn-login {
  margin-top: 32px;
  margin-bottom: 16px;
}

.register-now {
  text-align: center;
  font-size: 14px;
}

.login-image {
  padding-top: 16px;
  padding-bottom: 8px;
}
@media (max-width: 480px) {
  .login-container {
    margin: 4px;
  }
  .login-image {
    margin: 4px;
  }
  .login-image img {
    height: 150px;
  }
}
.spinner {
  color: #c3aed6;
}
</style>
