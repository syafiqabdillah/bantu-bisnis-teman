<template>
  <div>
    <div class="jumbo bibit-primary">
      <h2 class="jumbo-title">
        <b-icon class="seen-icon" icon="shop"></b-icon>
        Para Pejuang
      </h2>
    </div>

    <div align="center" class="bibit-spinner mt-4" v-if="loading">
      <b-spinner>Loading...</b-spinner>
    </div>

    <div class="toko-container">
      <b-card
        v-on:click="goToStore(toko.id)"
        v-for="toko in listToko"
        :key="toko.id"
      >
        <div class="toko">
          <div class="nama-toko">
            {{ toko.nama_toko }}
          </div>
          <div>
            <div class="nama-user">
              <small>
                <b-icon icon="person-fill"></b-icon> {{ toko.nama_user }}</small
              >
            </div>
            <div class="kategori-container">
              <div
                class="kategori"
                v-for="kat in toko.list_kategori"
                :key="kat.id"
              >
                <b-badge class="badge-kategori bibit-secondary">{{
                  kat
                }}</b-badge>
              </div>
            </div>
          </div>
        </div>
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
    axios
      .get(`${baseUrl}/toko`)
      .then((res) => {
        const dict = res.data["list_toko"];
        for (const key in dict) {
          this.listToko.push(dict[key]);
        }
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    goToStore(toko_id) {
      window.open(`/store/${toko_id}`, "_blank");
    },
  },
};
</script>

<style scoped>
.card-body {
  padding: 8px;
}
.jumbo {
  padding-left: 128px;
  padding-right: 128px;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3rem;
}
.toko-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  justify-content: center;
  row-gap: 8px;
  column-gap: 8px;
  margin: 32px 128px;
}
.toko {
  cursor: pointer;
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: center;
}
.nama-toko {
  font-size: 1.1rem;
  max-lines: 2;
  overflow: hidden;
}
.nama-user {
  color: grey;
}
.kategori-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4px;
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
    padding: 0 32px 16px;
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
