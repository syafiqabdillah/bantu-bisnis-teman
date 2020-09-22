<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <div class="login-image bibit-text-dark">
            <h2>Bantuin Bisnis Teman</h2>
            <p>Kalau bisa beli lewat teman sendiri, kenapa nggak?</p>
            <img :src="imageSource" alt="One person" />
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card>
            <div class="form-login">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-password-confirm"
                  label="Nama:"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.nama"
                    @change="startFillingNama"
                    :state="namaValid"
                    required
                    placeholder="Your name"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-email"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    :state="emailValid"
                    @change="startFillingEmail"
                    type="email"
                    required
                    placeholder="Your email"
                  ></b-form-input>
                  <b-form-invalid-feedback>
                    {{ !emailAvailable ? 'Email sudah terdaftar' : 'Email tidak valid'}}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    @change="startFillingPassword"
                    type="password"
                    required
                    placeholder="Your password"
                    :state="passwordValid"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Password setidaknya 8 karakter
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  id="input-group-password-confirm"
                  label="Confirm Password:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.passwordConfirmation"
                    @change="startFillingPasswordConfirmation"
                    type="password"
                    required
                    placeholder="Confirm password"
                    aria-describedby="input-live-help input-live-feedback"
                    :state="passwordMatches"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Konfirmasi password tidak sesuai
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-button class="btn-login bibit-btn" block type="submit"
                  >Register</b-button
                >
              </b-form>
              <div class="login-now">
                <a class="bibit-link-dark" href="/login">Sudah punya akun? Login sekarang</a>
              </div>
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
  name: "Register",
  data() {
    return {
      form: {
        nama: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      imageChoices: [
        require("../assets/img/register1.png"),
        require("../assets/img/register2.png"),
      ],
      startedFillingNama: false,
      startedFillingEmail: false,
      startedFillingPassword: false,
      startedFillingPasswordConfirmation: false,
      emailAvailable: true,
      awaitingEmailType: false,
    };
  },
  watch: {
    'form.email': function () {
      if (!this.awaitingEmailType) {
        setTimeout(() => {
          axios
            .post(`${baseUrl}/email-available`, {
              email: this.form.email,
            })
            .then((res) => {
              console.log(`email available ${res.data.email_available}`)
              this.emailAvailable = res.data.email_available;
            });
          this.awaitingEmailType = false
        }, 1000);
      }
      this.awaitingEmailType = true;
    },
  },
  computed: {
    imageSource() {
      const randomIdx = Math.floor(Math.random() * this.imageChoices.length);
      return this.imageChoices[randomIdx];
    },
    namaValid() {
      if (this.startedFillingNama) {
        return this.form.nama.length > 0;
      }
      return null;
    },
    emailValid() {
      if (this.startedFillingEmail) {
        return this.form.email.includes("@") && this.emailAvailable;
      }
      return null;
    },
    passwordMatches() {
      if (this.startedFillingPasswordConfirmation) {
        return this.form.password === this.form.passwordConfirmation;
      }
      return null;
    },
    passwordValid() {
      if (this.startedFillingPassword) {
        return this.form.password.length >= 8;
      }
      return null;
    },
  },
  methods: {
    startFillingNama() {
      this.startedFillingNama = true;
    },
    startFillingEmail() {
      this.startedFillingEmail = true;
    },
    startFillingPassword() {
      this.startedFillingPassword = true;
    },
    startFillingPasswordConfirmation() {
      this.startedFillingPasswordConfirmation = true;
    },
    onSubmit(e) {
      e.preventDefault();
      if (
        this.namaValid &&
        this.emailValid &&
        this.passwordValid &&
        this.passwordMatches
      ) {
        this.$refs["modal-loading"].show();
        axios
          .post(`${baseUrl}/register`, {
            nama: this.form.nama,
            email: this.form.email,
            password: this.form.password,
          })
          .then((res) => {
            const jwt = res.data.jwt;
            const data = parseJwt(jwt);
            setCookie("token", jwt, 1);
            location.href = "/";
          })
          .catch((e) => {
            alert("Registrasi gagal");
          })
          .finally(() => {
            this.$refs["modal-loading"].hide();
          });
      } else {
        alert("Lengkapi form");
      }
    },
    onReset() {},
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
.btn-login {
  background-color: #424874;
  border: 0;
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
.btn-login:hover {
  background-color: #8675a9;
}
.login-image {
  padding: 24px;
  color: #424874;
}
.login-image img {
  height: 300px;
}
.login-container {
  margin: 128px;
  margin-top: 64px;
}
@media (max-width: 480px) {
  .login-container {
    margin: 4px;
  }
  .login-image img {
    height: 150px;
  }
}
.spinner {
  color: #c3aed6;
}
.login-now {
  text-align: center;
  font-size: 14px;
}
.login-now a {
  color: #424874;
}
</style>
