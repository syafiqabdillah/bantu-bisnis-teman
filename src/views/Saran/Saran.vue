<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <div class="login-image bibit-text-dark">
            <h2>Punya Saran Buat Bibit?</h2>
            <p>tuliskan saran kamu untuk bibit yang lebih baik</p>
            <br />
            <img :src="imageSource" alt="Two humans" />
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card>
            <div class="form-saran">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="group-email"
                  label="Email"
                  label-for="email-penyaran"
                >
                  <b-form-input
                    placeholder="Email yang dapat kami hubungi..."
                    id="email-penyaran"
                    v-model="form.email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="group-saran"
                  label="Saran"
                  label-for="saran-penyaran"
                >
                  <b-form-textarea
                    placeholder="Apa yang bisa bibit perbaiki?"
                    v-model="form.saran"
                    rows="5"
                    :state="panjangSaranValid() ? null : false"
                  >
                  </b-form-textarea>
                </b-form-group>

                <div
                  align="right"
                  class="mb-2"
                  :style="
                    form.saran.length <= 140 ? 'color:grey;' : 'color:red;'
                  "
                >
                  <small>{{ form.saran.length }}/140</small>
                </div>
                <div align="center" class="captcha">
                  <VueRecaptcha
                    sitekey="6LdKvM0ZAAAAALiQoJsyyQghncarLuI1FAVVt2X5"
                    @verify="onCaptchaVerified"
                  />
                </div>
                <b-button class="btn-saran bibit-btn" block type="submit">Kirim</b-button>
              </b-form>
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
import { parseJwt, setCookie } from "../../mixins";
import { baseUrl } from "../../config";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Saran",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      form: {
        saran: "",
        email: "",
        captchaIsVerified: false,
      },
      imageChoices: [
        require("../../assets/img/saran1.png"),
        require("../../assets/img/saran2.png"),
      ],
      modalText: "Mengirim...",
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
      if (this.panjangSaranValid()) {
        if (this.form.saran === "" || this.form.saran.length === "") {
          alert("Tolong lengkapi formnya dong... :(");
        } else if (!this.form.captchaIsVerified) {
          alert("ARE YOU ROBOTS?!!!");
        } else {
          this.$refs["modal-loading"].show();
          axios
            .post(`${baseUrl}/add-saran`, {
              teks: this.form.saran,
              email: this.form.email,
            })
            .then(() =>
              alert(
                "Saran kamu berhasil kami terima. Terima kasih banyak telah meluangkan waktu."
              )
            )
            .catch(() =>
              alert("Saran gagal terkirim. Coba beberapa menit lagi.")
            )
            .finally(() => location.reload());
        }
      } else {
        alert("Jumlah karakter melebihi batas :(");
      }
    },
    onReset() {},
    getGoogleToken() {
      this.$gAuth
        .getAuthCode()
        .then((res) => {
          console.log(`dari google auth ${res}`);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    panjangSaranValid() {
      return this.form.saran.length <= 140;
    },
    onCaptchaVerified() {
      this.form.captchaIsVerified = true;
    },
  },
};
</script>

<style lang="css" scoped>
.title {
  margin: 32px;
}
.form-saran {
  text-align: left;
  padding: 16px;
  padding-bottom: 0px;
}
.login-container {
  margin: 64px 128px;
}
.btn-saran {
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
.btn-saran:hover {
  background-color: #8675a9;
}
.register-now {
  text-align: center;
  font-size: 14px;
}
.register-now a {
  color: #424874;
}
.login-image {
  padding-top: 16px;
  padding-bottom: 16px;
  color: #424874;
}
.login-image img {
  height: 250px;
}
.captcha {
  margin: 4px 0px;
}
#group-email,
#group-saran {
  margin-bottom: 4px;
}
@media (max-width: 480px) {
  .login-container {
    margin: 4px;
  }
  .login-image {
    margin: 4px;
  }
  .login-image img {
    height: 120px;
  }
}
.spinner {
  color: #c3aed6;
}
</style>
