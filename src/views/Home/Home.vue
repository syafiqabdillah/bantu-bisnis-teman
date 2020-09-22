<template>
  <div class="home">
    <div class="jumbo bibit-primary">
      <h1 class="jumbo-title">
        <b-icon class="title-icon" icon="cart3"></b-icon>Bantuin Bisnis Teman
      </h1>
      <p class="jumbo-nama-komunitas">
        -Keluarga Besar Asy Syaamil & DHBS Bontang-
      </p>
      <p class="jumbo-subtitle">
        Kalau bisa beli lewat teman sendiri, kenapa nggak?
      </p>
      <b-form>
        <b-form-input
          id="search-query"
          v-model="searchQuery"
          placeholder="Cari produk, toko, atau nama teman kamu"
        ></b-form-input>
      </b-form>

      <div class="categories">
        <span v-for="category in computedCategoryList" :key="category.id">
          <a
            v-if="selectedCategory === category.id"
            class="selected-category bibit-selected-link"
            v-on:click="searchByCategory(category.id)"
            >{{ category.nama }}</a
          >

          <a
            v-else
            class="category bibit-link"
            v-on:click="searchByCategory(category.id)"
            >{{ category.nama }}</a
          >
        </span>
      </div>
    </div>

    <div
      class="empty-product"
      align="center"
      v-if="!loading && computedProductList.length === 0"
    >
      Data kosong, peluang bisnis nih :>
    </div>

    <div class="product-container">
      <b-card
        class="product-item"
        v-for="product in computedProductList"
        :key="product.key"
        v-on:click="showDetail(product)"
      >
        <ProductItem :product="product" />
      </b-card>

      <b-modal ref="popup-kontak-toko" hide-header hide-footer centered>
        <div align="center">
          <KontakToko :product="selectedProduct" :toko="selectedToko" />
        </div>
      </b-modal>
    </div>

    <div v-if="loading">
      <b-spinner>Loading...</b-spinner>
    </div>
    <div class="mt-2 mb-4" align="center">
      <a
        class="bibit-link-dark"
        href="javascript:void(0);"
        id="see-more"
        v-on:click="seeMore"
        >see more</a
      >
    </div>
  </div>
</template>

<script>
import KontakToko from "@/components/KontakToko.vue";
import ProductItem from "./ProductItem";
import axios from "axios";
import { baseUrl } from "../../config";

export default {
  name: "Home",
  components: {
    KontakToko,
    ProductItem,
  },
  data() {
    return {
      searchQuery: "",
      awaitingSearch: false,
      productList: [],
      categoryList: [],
      selectedToko: {
        id: null,
        nama: null,
        alamat: null,
        nohp: null,
        shopee: null,
        tokopedia: null,
        instagram: null,
      },
      selectedProduct: null,
      loading: true,
      selectedCategory: 0,
    };
  },
  watch: {
    searchQuery() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          if (this.searchQuery !== "") {
            this.loading = true;
            this.productList = [];
            // kalo udah ada category yang dipilih, masukin juga

            axios
              .post(
                `${baseUrl}/search-products-by-category/${this.selectedCategory}`,
                { search_query: this.searchQuery }
              )
              .then((res) => {
                this.productList = res.data.data;
              })
              .catch((e) => {
                alert(e);
              })
              .finally(() => (this.loading = false));
          } else {
            this.loading = true;
            axios
              .get(`${baseUrl}/products`)
              .then((res) => {
                this.productList = res.data.data;
              })
              .catch((e) => {
                alert(e);
              })
              .finally(() => (this.loading = false));
          }
          this.awaitingSearch = false;
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
  },
  created() {
    // get all kategori
    axios
      .get(`${baseUrl}/kategori`)
      .then((res) => {
        this.categoryList = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
    // get all products
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        this.productList = res.data.data;
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => (this.loading = false));
  },
  computed: {
    computedProductList() {
      if (this.productList == null) return [];
      return this.productList.filter((product) => {
        const lowerSearchQuery = this.searchQuery.toLowerCase();
        const queryInNamaProduk = product.namaProduk
          .toLowerCase()
          .includes(lowerSearchQuery);
        const queryInNamaToko = product.namaToko
          .toLowerCase()
          .includes(lowerSearchQuery);
        const queryInNamaSeller = product.namaSeller
          .toLowerCase()
          .includes(lowerSearchQuery);
        return queryInNamaProduk || queryInNamaToko || queryInNamaSeller;
      });
    },
    computedCategoryList() {
      var newList = [
        {
          id: 0,
          nama: "All",
        },
      ];
      newList = newList.concat(this.categoryList);
      return newList;
    },
  },
  methods: {
    showDetail(product) {
      this.selectedProduct = product;
      // show toko detail in a modal
      this.$refs["popup-kontak-toko"].show();
      // play spinner while sending request
      axios
        .get(`${baseUrl}/kontak-toko/${product.idToko}`)
        .then((res) => {
          this.selectedToko = res.data.data;

          // update the view of this item
          axios.post(`${baseUrl}/add-view/${product.id}`);
        })
        .catch((e) => {
          alert(e);
        });
    },
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat(["ban", "id"]).format(price);
      }
      return "Tanya penjual";
    },
    seeMore() {
      this.loading = true;
      // load more products
      axios
        .get(`${baseUrl}/search-products-by-category/${this.selectedCategory}`)
        .then((res) => {
          this.productList = this.productList.concat(res.data.data);
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => (this.loading = false));
    },
    searchByCategory(category_id) {
      this.loading = true;
      this.selectedCategory = category_id;
      axios
        .post(`${baseUrl}/search-products-by-category/${category_id}`, {
          search_query: this.searchQuery,
        })
        .then((res) => {
          this.productList = res.data.data;
        })
        .catch((e) => alert(e))
        .finally((e) => (this.loading = false));
    },
  },
};
</script>

<style lang="css" scoped>
.empty-product {
  text-align: center;
  margin-top: 32px;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-around;
  margin-left: 108px;
  margin-right: 108px;
  margin-top: 32px;
}
.product-item {
  margin-bottom: 20px;
}
.card-body {
  padding: 0px;
}
.product-item:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.category,
.selected-category {
  margin-right: 12px;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 0.5px;
  color: #c3aed6;
}

.category:hover {
  color: #dea5a4;
  cursor: pointer;
}
a:link {
  color: white;
}
a:visited {
  color: white;
}
/* Header */
.jumbo {
  background-color: #424874;
  padding-left: 128px;
  padding-right: 128px;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.title-icon {
  margin-right: 10px;
}
.jumbo-nama-komunitas {
  font-size: 1.25rem;
  margin-bottom: 4px;
}
.jumbo-subtitle {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
}
#see-more {
  color: #424874;
  font-size: 1rem;
}
#search-query {
  font-size: 1rem;
}
@media (max-width: 480px) {
  .jumbo {
    padding: 32px;
    padding-top: 0px;
  }
  .jumbo-title {
    font-size: 2rem;
  }
  .jumbo-subtitle {
    font-size: 0.75rem;
  }
  .product-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 170px);
    justify-content: space-around;
    margin: 8px;
    margin-top: 16px;
  }
  #search-query {
    font-size: 0.75rem;
  }
}
</style>
