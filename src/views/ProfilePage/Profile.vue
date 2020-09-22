<template>
  <div class="profile">
    <div class="jumbo bibit-primary">
      <h2 class="jumbo-title">
        <b-icon class="seen-icon" icon="shop"></b-icon>
        Profil Toko <br />
        <span class="title-nama-toko"> "{{ profile.nama }}"</span>
      </h2>
    </div>

    <div class="profile-container">
      <b-row>
        <b-col cols="12" md="5" lg="5">
          <ProfileToko :updateToko="updateToko" v-bind:profile="profile" />
        </b-col>

        <b-col cols="12" md="7" lg="7">
          <div v-if="loading" align="center">
            <b-spinner variant="primary"></b-spinner>
          </div>
          <ListProdukToko v-if="!loading" :listProduct="listProduct" :profile="profile" />
        </b-col>
      </b-row>
    </div>

    <b-modal ref="update-toko" centered hide-header hide-footer>
      <div align="center">
        <b-spinner class="spinner">Update Toko...</b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { isLoggedIn, getCookie, parseJwt } from "../../mixins";
import { baseUrl } from "../../config";
import ProfileToko from "./ProfileToko";
import ListProdukToko from "./ListProdukToko";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    ProfileToko,
    ListProdukToko,
  },
  data() {
    return {
      profile: {
        toko_id: "",
        nama: "",
        alamat: "",
        nohp: "",
        tokopedia: "",
        shopee: "",
        instagram: "",
      },
      listProduct: [],
      loading: true,
    };
  },
  mounted() {
    if (!isLoggedIn()) {
      alert("You need to logged in");
      location.href = "/login";
    } else {
      // get data from jwt
      const token = getCookie("token");
      const toko_id = parseJwt(token).toko_id;
      const user_id = parseJwt(token).user_id;
      // get profile data
      axios
        .get(`${baseUrl}/toko/${user_id}`)
        .then((res) => {
          this.profile = res.data.data;
          this.profile.toko_id = toko_id;
          // get list product
          axios
            .get(`${baseUrl}/products/${this.profile.toko_id}`)
            .then((res) => {
              this.listProduct = res.data.data;
            })
            .catch((e) => {
              alert(e);
            })
            .finally(() => (this.loading = false));
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => (this.loading = false));
    }
  },
  methods: {
    updateToko(e) {
      e.preventDefault();
      const data = this.profile;
      this.$refs["update-toko"].show();
      axios
        .post(`${baseUrl}/update-toko`, this.profile)
        .then((res) => {})
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["update-toko"].hide();
          location.reload();
        });
    },

    onReset(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="css" scoped>
.profile-container {
  margin: 32px;
}
/* Modal */

/* Header */
.jumbo {
  background-color: #424874;
  padding-bottom: 16px;
  padding-top: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3rem;
}
.title-nama-toko {
  font-size: 2.75rem;
}
@media (max-width: 480px) {
  #avatar-toko {
    height: 100px;
  }
  .profile-container {
    margin: 4px;
  }
  .jumbo-title {
    font-size: 2rem;
  }
  .title-nama-toko {
    font-size: 1.5rem;
  }
  #kiri {
    margin-bottom: 8px;
  }
  .add-product {
    width: 75%;
    margin: 8px;
    margin-top: 32px;
  }
  .product-container {
    grid-template-columns: repeat(auto-fill, 125px);
    margin-left: 4px;
    margin-right: 4px;
  }
  .profile-toko {
    margin: 4px;
    font-size: 1rem;
  }
}
</style>
