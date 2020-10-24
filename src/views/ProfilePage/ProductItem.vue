<template>
  <div>
    <div class="product-img-container">
      <img
        :class="product.status !== 'active' ? 'grey-img' : ''"
        :src="product.imageUrl"
        :alt="product.nama"
      />
    </div>

    <div align="left" id="product-detail">
      <div v-b-tooltip.hover :title="product.nama">
        <div class="product-name">
          {{ product.nama }}
        </div>
      </div>

      <div class="product-price">
        {{
          product.harga > 0
            ? "Rp " + priceFormat(product.harga)
            : "Tanya penjual"
        }}
      </div>
      <div class="product-seen">
        <b-icon class="seen-icon" icon="eye-fill"></b-icon>Seen
        {{ view_sum }} times
      </div>
    </div>
  </div>
</template>

<script>
import { priceFormat } from "../../mixins/index.js";
import { baseUrl } from "@/config";
import axios from "axios";

export default {
  name: "ProductItem",
  props: {
    product: Object,
  },
  data() {
    return {
      view_sum: 0,
    };
  },
  mounted() {
    // initial retrieve
    axios
      .get(`${baseUrl}/view-sum/${this.product.id}`)
      .then((res) => (this.view_sum = res.data.view_sum));
    // retrieve view data every 5 seconds
    setInterval(() => {
      axios
        .get(`${baseUrl}/view-sum/${this.product.id}`)
        .then((res) => (this.view_sum = res.data.view_sum));
    }, 5000);
  },
  methods: {
    priceFormat(price) {
      return priceFormat(price);
    },
  },
};
</script>

<style lang="css" scoped>
.product-price {
  font-size: 0.875rem;
  color: #fa591d;
  line-height: 22px;
}
.product-store {
  font-size: 12px;
  color: #6c757d;
}
.product-seen {
  font-size: 12px;
  color: #6c757d;
}
.product-name {
  width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.seen-icon {
  margin-right: 3px;
}
.product-img-container {
  display: flex;
  justify-content: center;
  height: 150px;
  background-color: white;
}
.product-img-container img {
  object-fit: cover;
  width: 100%;
  max-height: 150px;
}
.product-img-container-grey img {
  filter: grayscale(100%);
  object-fit: cover;
  width: 100%;
}
.grey-img {
  filter: grayscale(100%);
}
#product-detail {
  padding: 10px;
}
</style>
