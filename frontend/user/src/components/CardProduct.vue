<template>
  <div>
    <router-link
      :to="{ name: 'productdetails', params: { id: product._id } }"
      class="nav-link shadow-sm rounded text-dark mb-4"
    >
      <div class="card">
        <img :src="product.image" class="card-img-top color" alt="..." width="100px" height="200px" />
        <div class="card-body">
          <h6 class="card-title">{{ product.name }}</h6>
          <div class="card-text">
            <p class="item">Thể loại: {{ product.type }}</p>
            <p class="item price">Giá: {{ product.price }} VNĐ</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.title-advice {
  text-align: center;
  margin: 10px 0px;
}
.content {
  margin-bottom: 20px;
}
.color {
  background-color: #f5f5f5;
}
.card {
  border: none;
}
.item {
  margin: 0px;
}
.price {
  color: red;
}
</style>
