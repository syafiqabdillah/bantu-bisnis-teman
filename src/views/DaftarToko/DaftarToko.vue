<template>
  <div>
    <div class="jumbo bibit-primary">
      <h1 class="jumbo-title">
        Semua Toko
      </h1>
    </div>

    <div class="toko-container">
      <b-card
        class="toko"
        v-on:click="goToStore(toko.id)"
        v-for="toko in listToko"
        :key="toko.id"
      >
        <span class="nama-toko">
          {{ toko.nama_toko }}
        </span>

        <br />
        <span class="nama-user">
          <small>
            <b-icon icon="person-fill"></b-icon> {{ toko.nama_user }}</small
          >
        </span>

        <br />
        <span class="kategori" v-for="kat in toko.list_kategori" :key="kat.id">
          <b-badge class="badge-kategori" variant="info">{{ kat }}</b-badge>
        </span>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config";
export default {
  name: "DaftarToko",
  data() {
    return {
      listToko: [],
      loading: true,
    };
  },
  created() {
    axios.get(`${baseUrl}/toko`).then((res) => {
      const dict = res.data["list_toko"];
      for (const key in dict) {
        this.listToko.push(dict[key]);
      }
    });
  },
  methods: {
    goToStore(toko_id) {
      window.open(`/store/${toko_id}`, "_blank");
    },
  },
};
</script>

<style scoped>
.jumbo {
  padding-left: 128px;
  padding-right: 128px;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.toko-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  row-gap: 8px;
  column-gap: 8px;
  justify-content: space-around;
  margin: 32px;
}
.toko {
  cursor: pointer;
}
.nama-toko {
  font-size: 1.5rem;
}
.nama-user {
  color: grey;
}
.kategori {
  font-size: 0.8rem;
  letter-spacing: 1px;
}
.badge-kategori {
  padding: 4px 8px;
  margin: 0 4px;
}
@media (max-width: 480px) {
  .jumbo {
    padding: 32px;
    padding-top: 0px;
  }
  .toko-container {
    display: grid;
    grid-template-columns: auto;
  }
  .jumbo-title {
    font-size: 2rem;
  }
  .toko-container {
    margin: 8px;
  }
}
</style>
