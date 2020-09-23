<template>
  <div>
    <div class="table-header">
      <h3>Kategori</h3>
      <b-button
        v-on:click="showAddKategoriModal"
        class="mb-3 bibit-btn-small"
      >
        Tambah Kategori
      </b-button>
    </div>

    <b-table
      responsive
      small
      :items="listKategori"
      :fields="fieldTableKategori"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:cell(active)="row">
        <div class="active-cell">
          <b-form-checkbox
            v-model="row.item.active"
            switch
            v-on:change="toggleStatusActive(row.item)"
          >
          </b-form-checkbox>
        </div>
      </template>

      <template v-slot:cell(nama)="row">
        <div align="left">
          {{ row.item.nama }}
          <b-icon
            icon="pencil"
            class="button-edit"
            v-on:click="showEditKategoriModal(row.item)"
          ></b-icon>
        </div>
      </template>

      <template v-slot:head(nama)="data">
        <div align="left">{{ data.label }}</div>
      </template>
    </b-table>

    <b-modal
      @ok="submitNewKategori"
      centered
      ref="modal-add-kategori"
      title="Tambah Kategori"
    >
      <b-form-group label="Nama Kategori" label-for="add-kategori-nama">
        <b-form-input v-model="formAddKategori.nama" id="add-kategori-nama">
        </b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal
      @ok="submitEditKategori"
      ref="modal-edit-kategori"
      title="Edit Nama Kategori"
      centered
    >
      <b-form-group label="Nama Kategori" label-for="edit-kategori-nama">
        <b-form-input v-model="selectedKategori.nama" id="edit-kategori-nama">
        </b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal ref="loading" centered hide-header hide-footer>
      <div align="center">
        <b-spinner></b-spinner>
        Loading...
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config/index.js";
import { getJwtData, getCookie } from "../../mixins/index.js";
export default {
  name: "KategoriManagement",
  data() {
    return {
      listKategori: [],
      fieldTableKategori: [{ key: "nama", sortable: true }, "active"],
      formAddKategori: {
        nama: "",
      },
      selectedKategori: {},
      sortBy: "nama",
      sortDesc: false,
    };
  },
  created() {
    // get kategori data
    axios
      .get(`${baseUrl}/all-kategori`)
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    showAddKategoriModal() {
      this.$refs["modal-add-kategori"].show();
    },
    showEditKategoriModal(item) {
      this.selectedKategori = item;
      this.$refs["modal-edit-kategori"].show();
    },
    toggleStatusActive(item) {
      axios
        .post(`${baseUrl}/update-kategori`, {
          id: item.id,
          active: !item.active,
          nama: item.nama,
        })
        .catch(() => alert("Update failed"));
    },
    submitNewKategori(e) {
      e.preventDefault();
      this.$refs["loading"].show();
      axios
        .post(`${baseUrl}/add-kategori`, this.formAddKategori)
        .then((res) => {})
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["loading"].hide();
          location.reload();
        });
    },
    submitEditKategori(e) {
      e.preventDefault();
      this.$refs["loading"].show();
      axios
        .post(`${baseUrl}/update-kategori`, {
          id: this.selectedKategori.id,
          active: this.selectedKategori.active,
          nama: this.selectedKategori.nama,
        })
        .catch(() => alert("Update failed"))
        .finally(() => {
          this.$refs["loading"].hide();
          location.reload();
        });
    },
  },
};
</script>

<style scoped>
/* header table */
.table-header {
  display: flex;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
}
@media(max-width: 480px){
  .table-header {
    flex-direction: column;
  }
}
.active-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-edit {
  cursor: pointer;
}
</style>
