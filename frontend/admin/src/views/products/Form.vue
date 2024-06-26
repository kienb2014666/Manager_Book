<template>
  <div class="row">
    <div class="col-4 text-end mt-3">
      <router-link to="/">
        <i class="fa-solid fa-arrow-left fa-2xl"></i
      ></router-link>
    </div>
    <div class="col-4">
      <h3 class="mt-2 mb-2">{{ formTitle }}</h3>
      <div v-if="showAlert" class="alert alert-success" role="alert">
        Product added successfully!
      </div>
      <div v-if="showAlertEdit" class="alert alert-success" role="alert">
        Product Edited successfully!
      </div>
      <div v-if="messRes" class="alert alert-danger" role="alert">
        {{ messRes }}
      </div>
      <form @submit.prevent="save()">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="product.name"
            v-bind:class="{ 'is-invalid': errormess.name }"
          />
          <span class="invalid-feedback" v-if="errormess.name">{{
            errormess.name
          }}</span>
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">Thể loại</label>
          <select
            v-bind:class="{ 'is-invalid': errormess.type }"
            v-model="product.type"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="Truyện Tranh">Truyện Tranh</option>
            <option value="Tiểu Thuyết">Tiểu thuyết</option>
            <option value="Sách Văn Học">Sách Văn Học</option>
            <option value="Sách Giáo Khoa">Sách Giáo Khoa</option>
            <option value="Sách Lịch Sử">Sách Lịch Sử</option>
          </select>

          <span class="invalid-feedback" v-if="errormess.type">{{
            errormess.type
          }}</span>
        </div>
        <div class="mb-3">
          <label for="pub" class="form-label">Nhà xuất bản</label>
          <select
            v-bind:class="{ 'is-invalid': errormess.pub }"
            v-model="product.pub"
            class="form-select"
            aria-label="Default select example"
          >
            <option :value="pub._id" v-for="(pub, index) in pubs" :key="index">{{ pub.name }}</option>
          </select>

          <span class="invalid-feedback" v-if="errormess.pub">{{
            errormess.pub
          }}</span>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Giá thuê</label>
          <input
            type="number"
            id="price"
            class="form-control"
            v-model="product.price"
            v-bind:class="{ 'is-invalid': errormess.price }"
          />
          <span class="invalid-feedback" v-if="errormess.price">{{
            errormess.price
          }}</span>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Tác giả</label>
          <input
            type="text"
            id="author"
            class="form-control"
            v-model="product.author"
            v-bind:class="{ 'is-invalid': errormess.author }"
          />
          <span class="invalid-feedback" v-if="errormess.author">{{
            errormess.author
          }}</span>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Năm xuất bản</label>
          <input
            type="date"
            id="date"
            class="form-control"
            v-model="product.date"
            v-bind:class="{ 'is-invalid': errormess.date }"
          />
          <span class="invalid-feedback" v-if="errormess.date">{{
            errormess.date
          }}</span>
        </div>
        <div class="mb-3">
          <label for="countInStock" class="form-label">Số quyển</label>
          <input
            type="number"
            id="countInStock"
            class="form-control"
            v-model="product.countInStock"
            v-bind:class="{ 'is-invalid': errormess.countInStock }"
          />
          <span class="invalid-feedback" v-if="errormess.countInStock">{{
            errormess.countInStock
          }}</span>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Hình ảnh</label>
          <input
            type="file"
            id="image"
            @change="handleImageChange"
            class="form-control"
            v-bind:class="{ 'is-invalid': errormess.image }"
          />
          <div v-if="product.image" class="mt-2 mb-2">
            <img :src="product.image" width="100" height="100" alt="" />
          </div>
          <span class="invalid-feedback" v-if="errormess.image">{{
            errormess.image
          }}</span>
        </div>

        <button type="submit" class="btn btn-outline-info button">
          {{ buttonTitle }}
        </button>
      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";
import PublisherService from "@/services/pub_service";
export default {
  data() {
    return {
      pubs: [],
      product: {
        _id: "",
        name: "",
        type: "",
        price: "",
        countInStock: "",
        image: "",
        author: "",
        date: "",
        pub: "",
      },
      errormess: {
        name: "",
        type: "",
        price: "",
        countInStock: "",
        image: "",
        author: "",
        date:"",
        pub: "",
      },
      showAlert: false,
      showAlertEdit: false,
      isEditing: false,
      messRes: "",
    };
  },
  computed: {
    formTitle() {
      return this.isEditing ? "Edit Product" : "Add new Product";
    },
    buttonTitle() {
      return this.isEditing ? "Update" : "Add";
    },
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.isEditing = true;
      this.getdetail(productId);
    }
    this.getAllPub();
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.convertImageToBase64(file);
      }
    },
    convertImageToBase64(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.product.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    validate() {
      let isValid = true;
      this.errormess = {
        name: "",
        type: "",
        price: "",
        countInStock: "",
        image: "",
        author: "",
        date:"",
        pub: "",
      };
      if (!this.product.name) {
        this.errormess.name = "name product is required";
        isValid = false;
      }
      if (!this.product.type) {
        this.errormess.type = "type product is required";
        isValid = false;
      }
      if (!this.product.author) {
        this.errormess.author = "author product is required";
        isValid = false;
      }
      if (!this.product.date) {
        this.errormess.date = "date product is required";
        isValid = false;
      }
      if (!this.product.pub) {
        this.errormess.pub = "pub product is required";
        isValid = false;
      }
      if (!this.product.price) {
        this.errormess.price = "price product is required";
        isValid = false;
      } else if (!this.isNumber(this.product.price)) {
        this.errormess.price = "price product must is number";
        isValid = false;
      }
      if (!this.product.countInStock) {
        this.errormess.countInStock = "countInStock product is required";
        isValid = false;
      }
      if (!this.product.image) {
        this.errormess.image = "image product is required";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    async save() {
      if (this.validate()) {
        if (this.product._id) {
          await ProductService.editProduct(this.product._id, this.product);
          this.showAlertEdit = true;
          return;
        }
        const res = await ProductService.create(this.product);
        if (res.status === "True") {
          this.showAlert = true;
        } else if (res.status === "Err") {
          this.messRes = res.message;
        }
      }
    },
    async getdetail(productId) {
      const res = await ProductService.getdetail(productId);
      this.product = res.data;
    },
    async getAllPub(){
      const res = await  PublisherService.getAll();
      this.pubs = res.data;
    }
  },
};
</script>

<style>
.button {
  width: 100px;
}
</style>
