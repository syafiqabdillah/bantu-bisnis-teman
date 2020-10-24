<template>
  <div>
    <div align="center">
      <b-button class="add-product bibit-btn-small" block v-on:click="showFormAddProduct()">
        <b-icon class="add-product-icon" icon="plus"></b-icon>Add Product
      </b-button>
    </div>

    <b-modal
      ref="modal-add-product"
      title="Add Product"
      @ok="onSubmit"
      @hidden="onReset"
      centered
    >
      <div align="center">
        <b-form>
          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Product Name"
            label-for="add-produk-nama"
          >
            <b-form-input
              id="add-produk-nama"
              v-model="formAddProduct.namaProduk"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Category"
            label-for="add-produk-kategori"
          >
            <b-form-select
              v-model="formAddProduct.kategori_id"
              :options="computedListKategori"
              required
            >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Price"
            label-for="add-produk-harga"
            description="Enter 0 if the price changes frequently"
          >
            <b-form-input
              id="add-produk-harga"
              type="number"
              v-model="formAddProduct.harga"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Image"
            label-for="add-produk-image"
          >
            <b-form-file
              class="upload-file text-nowrap text-truncate"
              id="add-produk-image"
              v-model="formAddProduct.image"
              placeholder="Choose an image..."
              drop-placeholder="Put image..."
              accept="image/*"
              required
            ></b-form-file>
            <div id="image-preview">
              <img
                :src="imagePreviewUrl"
                v-if="formAddProduct.image !== null"
                alt="Image preview"
              />
            </div>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>

    <b-modal ref="modal-uploading" centered hide-header hide-footer>
      <div align="center">
        <b-spinner class="spinner">{{ uploadProgress.state }}</b-spinner>
        <p v-if="uploadProgress.state === 'Uploading Image'">
          Uploaded {{ uploadProgress.percentage }}%
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { storage } from "../../firebase/index";
import { baseUrl } from "../../config/index.js";
export default {
  name: "ModalAddProduct",
  data() {
    return {
      formAddProduct: {
        namaProduk: "",
        kategori_id: "",
        harga: "",
        image: null,
      },
      uploadProgress: {
        state: "",
        percentage: 0,
        imageUrl: "",
      },
      listKategori: [],
    };
  },
  props: {
    profile: Object,
  },
  mounted() {
    // get kategori
    axios
      .get(`${baseUrl}/kategori`)
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    showFormAddProduct() {
      this.$refs["modal-add-product"].show();
    },
    onReset() {
      this.formAddProduct.namaProduk = "";
      this.formAddProduct.harga = "";
      this.formAddProduct.image = null;
      this.formAddProduct.kategori_id = "";
    },
    onSubmit(e) {
      e.preventDefault();
      if (
        this.formAddProduct.namaProduk !== "" &&
        this.formAddProduct.harga !== "" &&
        this.formAddProduct.image !== null &&
        this.formAddProduct.kategori_id !== ""
      ) {
        // show modal spinner for uploading image
        this.uploadProgress.state = "Uploading Image";
        this.$refs["modal-uploading"].show();

        const imageName = `${Date.now()}-${this.formAddProduct.image.name}`;
        const uploadTask = storage
          .ref(`images/${imageName}`)
          .put(this.formAddProduct.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            this.uploadProgress.percentage =
              (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
          },
          (error) => {
            alert(error);
          },
          () => {
            storage
              .ref("images")
              .child(imageName)
              .getDownloadURL()
              .then((url) => {
                this.uploadProgress.state = "Adding Product to Database";
                this.uploadProgress.imageUrl = url;
                // add product to database
                axios
                  .post(`${baseUrl}/add-product`, {
                    toko_id: this.profile.toko_id,
                    nama: this.formAddProduct.namaProduk,
                    harga: this.formAddProduct.harga,
                    kategori_id: this.formAddProduct.kategori_id,
                    imageUrl: url,
                  })
                  .then((res) => {})
                  .catch((e) => {
                    alert(e);
                  })
                  .finally(() => {
                    this.$refs["modal-uploading"].hide();
                    location.reload();
                  });
              });
          }
        );
      } else {
        alert("Lengkapi form");
      }
    },
  },
  computed: {
    computedListKategori() {
      return this.listKategori.map((kategori) => {
        return {
          value: kategori.id,
          text: kategori.nama,
        };
      });
    },
    imagePreviewUrl() {
      if (this.formAddProduct.image) {
        return URL.createObjectURL(this.formAddProduct.image);
      }
      return null;
    },
  },
};
</script>

<style lang="css" scoped>
.add-product,
.add-product:active,
.add-product:active,
.add-product:focus {
  width: 50%;
  background-color: #424874;
  color: white;
  margin-top: 32px;
  border: 0px;
}
.add-product:hover {
  background-color: #e11d74;
}
#image-preview {
  display: flex;
  margin-top: 8px;
}
#image-preview img {
  height: 150px;
  width: auto;
}
.upload-file {
  text-align: left;
}
</style>
