
<template>
  <div class="container">
    <h3 class="mt-2 mb-2">Product Manager</h3>
    <div v-if="showMess" class="alert alert-success mess" role="alert">
      Product deleted successfully!
    </div>
    <div class="f-lex justify-content-between">
      <div class="row mt-3 mb-3">
        <div class="col-3">
          <router-link to="/product/create">
            <button type="button" class="btn btn-outline-primary">
              Add Product
            </button>
          </router-link>
        </div>
        <div class="col-5"></div>
        <div class="col-4">
          <div class="d-flex" role="search">
            <input
              v-model="searchQuery"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              @input="searchProduct"
            />
            <button type="button" class="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên</th>
          <th scope="col">Thể loại</th>
          <th scope="col">Giá</th>
          <th scope="col">Tác giả</th>
          <th scope="col">Nhà xuất bản</th>
          <th scope="col">Ngày xuất bản</th>
          <th scope="col">Số quyển</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(product, index) in products">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.author }}</td>
          <td>{{ product.pub }}</td>
          <td>{{ formatDate(product.date)}}</td>
          <td>{{ product.countInStock }}</td>
          <td><img :src="product.image" width="100" height="100" alt="" /></td>
          <td class="d-flex">
            <router-link
              :to="{ name: 'product.edit', params: { id: product._id } }"
            >
              <i class="fa-regular fa-pen-to-square fa-2xl text-primary">
              </i>
            </router-link>
            <i
              class="fa-regular fa-trash-can fa-2xl text-danger"
              @click="confirmDelete(product._id)"
              style="cursor: pointer"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";
import moment from 'moment';
export default {
  data() {
    return {
      products: [],
      showMess: false,
      searchQuery: "",
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      const res = await ProductService.getAll();
      this.products = res.data;
      
    },
    
    formatDate(dateString) {
    return moment(dateString).format('DD/MM/YYYY');
  },
    async confirmDelete(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        await ProductService.delete(productId);
        this.getAll();
        this.showMess = true;
        setTimeout(() => {
          this.showMess = false;
        }, 2000);
      }
    },
    async searchProduct() {
    if (this.searchQuery) {
      const res = await ProductService.searchProduct(this.searchQuery, this.currentPage, this.pageSize);
      this.products = res.data;
      this.totalPages = res.totalPages;
    } else {
      this.getAll();
    }
  },
}
};
</script>

<style>
.mess {
  width: 400px;
}
</style>
