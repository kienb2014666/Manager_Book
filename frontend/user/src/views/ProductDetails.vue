<template>
  <div class="container mt-5 bg-light p-5 rounded shadow-sm">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4">
        <img :src="product.image" class="card-img-top color" />
      </div>
      <div class="col-3">
        <h3 class="mb-4">{{ product.name }}</h3>
        <h5 class="mb-4">Thể loại: {{ product.type }}</h5>
        <p class="text-danger fs-5 mb-4">Giá: {{ product.price }}</p>
        <p class="text-dark fs-5 mb-4">Tác giả: {{ product.author }}</p>
        <p class="text-dark fs-5 mb-4">Nhà xuất bản: {{ pub.name }}</p>
        <p class="text-dark fs-5 mb-4">Ngày xuất bản: {{ formatDate(product.date) }}</p>
        <div class="d-flex align-items-center mb-4">
          <div class="click">
            <i
              @click="handleChangeCount('decrease')"
              class="fa-solid fa-minus fa-xl"
            ></i>
          </div>
          <input
            disabled
            min="1"
            :max="product.countInStock"
            class="input text-center"
            type="number"
            v-model="count"
          />
          <div class="click">
            <i
              @click="handleChangeCount('increase')"
              class="fa-solid fa-plus fa-xl"
            ></i>
          </div>
        </div>
        <div>
          <button
            @click="handleAddcart()"
            type="button"
            class="btn btn-outline-dark button"
          >
            add to cart
          </button>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product_service";
import PublisherService from "@/services/pub_service";
import moment from 'moment';


export default {
  data() {
    return {
      product: {},
      count: 1,
      pub:{},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatDate(dateString) {
    return moment(dateString).format('DD/MM/YYYY');
  },
    async fetchData() {
      try {
        const idProduct = this.$route.params.id;
        if (idProduct) {
          const res = await ProductService.getdetail(idProduct);
          this.product = res.data;
          await this.getNamePub();
          console.log(this.product);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getNamePub() {
  try {
    const res = await PublisherService.getdetail(this.product.pub);
    this.pub = res.data;
  } catch (error) {
    console.error("Error fetching publisher:", error);
  }
},
    handleChangeCount(type) {
      if (type === "increase") {
        if (this.count < this.product.countInStock) {
          this.count += 1;
        }
      } else {
        if (this.count > 1) {
          this.count -= 1;
        }
      }
    },
    handleAddcart() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.$router.push({ name: "signin" });
      } else {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        let productExists = false;
        existingOrders.forEach((existingOrder) => {
          if (
            existingOrder.orderItems.some(
              (item) => item.product === this.product._id
            )
          ) {
            existingOrder.orderItems.forEach((item) => {
              if (item.product === this.product._id) {
                item.amount += this.count;
              }
            });
            productExists = true;
          }
        });
        if (!productExists) {
          existingOrders.push({
            orderItems: [
              {
                name: this.product.name,
                amount: this.count,
                image: this.product.image,
                type: this.product.type,
                price: this.product.price,
                product: this.product._id,
                countInStock: this.product.countInStock,
              },
            ],
          });
        }
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        this.$router.push({ name: "cartpage" });
      }
    },
  },
  watch: {
    "$route.params.id": "fetchData",
  },
};
</script>

<style scoped>
.input {
  background-color: #fff;
  font-size: 20px;
  border: none;
}
.click {
  cursor: pointer;
}

.button {
  width: 50%;
}
</style>
