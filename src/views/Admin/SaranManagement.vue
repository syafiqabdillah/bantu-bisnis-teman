<template>
  <div>
    <h3 class="saran-title">Saran</h3>
    <b-table
      fixed
      class="table"
      small
      responsive
      :items="listSaran"
      :fields="fieldTableSaran"
    >
      <template v-slot:cell(action)="row">
        <div>
          <b-form-checkbox
            v-model="row.item.dibaca"
            switch
            v-on:change="toggleStatusActive(row.item)"
          >
          </b-form-checkbox>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: field.key === 'action' ? '70px' : 'auto' }"
        />
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config";
import { getJwtData, getCookie } from "../../mixins";

export default {
  name: "SaranManagement",
  data() {
    return {
      listSaran: [],
      fieldTableSaran: [
        { key: "teks", label: "Teks" },
        "email",
        { label: "Dibaca", key: "action" },
      ],
    };
  },
  created() {
    axios
      .get(`${baseUrl}/saran`)
      .then((res) => (this.listSaran = res.data.data))
      .catch((e) => alert(e));
  },
  methods: {
    toggleStatusActive(item) {
      axios
        .post(`${baseUrl}/update-saran-status`, {
          id: item.id,
          dibaca: !item.dibaca,
        })
        .catch((e) => alert(e));
    },
  },
};
</script>

<style scoped>
.table {
  text-align: start;
}
</style>
