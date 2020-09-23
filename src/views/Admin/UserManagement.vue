<template>
  <div>
    <h3 class="user-mgt-title">Users</h3>
    <b-table small responsive :items="listUser" :fields="fieldTableUser">
      <template v-slot:cell(action)="row">
        <div>
          <b-form-checkbox
            v-model="row.item.active"
            switch
            v-on:change="toggleStatusActive(row.item)"
          >
          </b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config";
import { getJwtData, getCookie } from "../../mixins";

export default {
  name: "UserManagement",
  data() {
    return {
      listUser: [],
      fieldTableUser: ["nama", "email", { label: "Active", key: "action" }],
    };
  },
  created() {
    const jwt = getCookie("token");
    axios
      .get(`${baseUrl}/users/${jwt}`)
      .then((res) => (this.listUser = res.data.data))
      .catch((e) => alert(e));
  },
  methods: {
    toggleStatusActive(item) {
      axios.post(`${baseUrl}/update-user-status`, {
        email: item.email,
        active: !item.active,
      });
    },
  },
};
</script>

<style scoped>
.user-mgt-title {
  text-align: center;
}

</style>
