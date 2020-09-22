<template>
  <div>
    <div class="jumbo bibit-primary" v-if="!loading">
      <h2 class="jumbo-title">
        <b-icon font-scale="2" icon="shop"></b-icon>
        <br />
        <span class="title-nama-toko"> {{ toko.nama }}</span>
      </h2>
    </div>

    <div v-if="loading" align="center">
      <b-spinner class="mt-4" variant="primary"></b-spinner>
    </div>

    <div class="profile-container" v-if="!loading">
      <b-row>
        <b-col cols="12" md="12" lg="5">
          <StoreProfile :profile="toko" :namaToko="toko.nama" />
        </b-col>
        <b-col cols="12" md="12" lg="7">
          <StoreListProduct :listProduct="listProduct" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../config/index.js";
import { isMobile } from "../../mixins";
import axios from "axios";
import StoreProfile from "./StoreProfile";
import StoreListProduct from "./StoreListProduct";
export default {
  name: "Store",
  components: {
    StoreProfile,
    StoreListProduct,
  },
  data() {
    return {
      toko: {
        nama: "",
        id: "",
      },
      listProduct: [],
      loading: true,
    };
  },
  created() {
    axios
      .get(`${baseUrl}/view-toko/${this.$route.params.id}`)
      .then((res) => (this.toko = res.data.data))
      .finally(() => {
        if (this.toko.nama === "") {
          alert("Toko tidak ditemukan. Mengalihkan ke halaman Beranda...")
          location.href = "/";
        } else {
          axios
            .get(`${baseUrl}/products/${this.$route.params.id}`)
            .then((res) => {
              this.listProduct = res.data.data;
            })
            .catch((e) => {
              alert(e);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
  },
  computed: {
    isMobileScreen() {
      return isMobile();
    },
  },
};
</script>

<style scoped>
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
