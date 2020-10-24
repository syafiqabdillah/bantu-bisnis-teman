<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <div class="login-image bibit-text-dark">
            <h2>Bantuin Bisnis Teman</h2>
            <p>Kalau bisa beli di teman sendiri, kenapa nggak?</p>
            <img :src="imageSource" alt="Donate image" />
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card>
            <div class="form-login bibit-text-dark">
              <div>
                {{ randomDonationText }}
              </div>
              <img :src="imageDeveloper" alt="Developer">
              <span>
                Bank Syariah Mandiri (451) <br> 711 602 4939 <br> a.n. Syafiq Abdillah Umarghanis
              </span>
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

export default {
  name: "Donate",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      imageDonate: require("../../assets/img/donate.png"),
      donationText: [
        "Support this platform. Help us, help others :)",
        "Help us pay our bills ^_^",
        "Your donations keep this platform running :)",
        "Keep this site runs ad-free"
      ],
      imageDeveloper: require("../../assets/img/syafiq.jpg")
    };
  },
  computed: {
    imageSource() {
      return this.imageDonate;
    },
    randomDonationText() {
      const randomIdx = Math.floor(Math.random() * this.donationText.length);
      return this.donationText[randomIdx];
    }
  },
};
</script>

<style lang="css" scoped>
.title {
  margin: 32px;
}
.form-login {
  text-align: center;
  min-height: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form-login img {
  margin: 16px 0px;
  height: 100px;
  border-radius: 50%;
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
.login-image img{
  height: 270px;
}
@media (max-width: 480px) {
  .login-container {
    margin: 4px;
  }
  .login-image {
    margin: 4px;
  }
  .login-image img {
    display: none;
  }
}
.spinner {
  color: #c3aed6;
}
</style>
