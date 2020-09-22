<template>
  <div>
    <div id="product-detail">
      <div class="product-img-container">
        <img :src="product.imageUrl" :alt="product.namaProduk" />
      </div>
      <h5 id="nama-produk">{{ product.namaProduk }}</h5>
      <div class="product-price">
        {{
          product.harga > 0
            ? "Rp " + priceFormat(product.harga)
            : "Tanya penjual"
        }}
      </div>
    </div>
    <hr />
    <router-link :to="'/store/' + toko.id"
      ><p>{{ toko.nama }}</p></router-link
    >

    <p>
      <b-icon icon="person-fill" /> {{ product.namaSeller }}
      <b-icon icon="geo-alt" /> {{ toko.alamat }}
    </p>
    <p>
      <b-icon icon="telephone-fill"></b-icon>
      <span id="nohp">
        {{ toko.nohp }}
      </span>
    </p>
    <div class="social-media">
      <div id="tokopedia" v-if="linkValid('tokopedia', toko.tokopedia)">
        <img
          v-on:click="open('tokopedia', toko.tokopedia)"
          class="logo"
          :src="imgTokopedia"
          alt="tokopedia logo"
        />
      </div>
      <div id="shopee" v-if="linkValid('shopee', toko.shopee)">
        <img
          v-on:click="open('shopee', toko.shopee)"
          class="logo"
          :src="imgShopee"
          alt="shopee logo"
        />
      </div>
      <div id="instagram" v-if="linkValid('instagram', toko.instagram)">
        <img
          v-on:click="open('instagram', toko.instagram)"
          class="logo"
          :src="imgInstagram"
          alt="instagram logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "@/config";

export default {
  name: "KontakToko",
  data() {
    return {
      imgTokopedia: require("@/assets/img/tokopedia.png"),
      imgShopee: require("@/assets/img/shopee.png"),
      imgInstagram: require("@/assets/img/instagram.png"),
      baseOlshopUrl: {
        tokopedia: "https://tokopedia.com/",
        shopee: "https://shopee.co.id/",
        instagram: "https://instagram.com/",
      },
    };
  },
  props: {
    toko: Object,
    product: Object,
  },
  methods: {
    linkValid(olshop, username) {
      if (username === "" || username === "-") {
        return false;
      }
      try {
        new URL(`${this.baseOlshopUrl[olshop]}${username}`);
      } catch {
        return false;
      }
      return true;
    },
    open(olshop, username) {
      // add ecom view to database
      axios.post(`${baseUrl}/add-ecom-view/${this.toko.id}`).finally(() => {
        if (username.includes("@")) {
          username = username.substring(1);
        }
        window.open(`${this.baseOlshopUrl[olshop]}${username}`, "_blank");
      });
    },
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat(["ban", "id"]).format(price);
      }
      return "Tanya penjual";
    },
  },
  computed: {
    imageFromUrl() {
      return require(this.product.imageUrl);
    },
  },
};
</script>

<style lang="css" scoped>
.social-media {
  display: flex;
  justify-content: space-around;
}
.logo {
  width: 40px;
  object-fit: fill;
}
.logo:hover {
  cursor: pointer;
}
.detail-product img {
  height: 150px;
  width: auto;
}
#product-detail {
  padding-top: 10px;
}
#nama-produk {
  margin-top: 4px;
}
.card-body {
  padding: 0px;
}
.product-img-container {
  display: flex;
  justify-content: center;
  height: 200px;
  background-color: white;
}
.product-img-container img {
  object-fit: cover;
  height: 100%;
}
.product-price {
  margin-top: 4px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fa591d;
  line-height: 22px;
}
#tokopedia {
  display: flex;
  align-items: center;
}
#shopee {
  display: flex;
  align-items: center;
}
#instagram {
  display: flex;
  align-items: center;
}
</style>
