<template>
  <div class="container">
    <h3 class="mt-2 mb-2">Orders Manager</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Sách</th>
          <th scope="col">Người mượn</th>
          <th scope="col">Tổng tiền thuê</th>
          <th scope="col">Hình thức thanh toán</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ngày mượn</th>
          <th scope="col">Ngày trả</th>
          <th scope="col">Xác nhận</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(order, index) in orders">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <div
              :key="indexitem"
              v-for="(orderItems, indexitem) in order.orderItems"
            >
              <div class="row">
                <div class="col-3">
                  <img
                    :src="orderItems.image"
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <div class="col-6">
                  <p>Tên: {{ orderItems.name }}</p>
                  <p>Số lượngx{{ orderItems.amount }}</p>
                </div>
              </div>
            </div>
          </td>
          <td>
            <p>{{ order.shippingAddress.email }}</p>
            <p>{{ order.shippingAddress.phone }}</p>
            <p>{{ order.shippingAddress.address }}</p>
          </td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>{{ order.isDelivered }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>{{ formatDate(order.endDate) }}</td>
          <td>
            <button
              :disabled="order.isDelivered"
              type="button"
              @click="confirmOrder(order._id)"
              class="btn btn-outline-primary"
            >
              Confirm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from "@/services/order_service";
import moment from 'moment';

export default {
  data() {
    return {
      orders: [],
      showMess: false,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    formatDate(dateString) {
    return moment(dateString).format('DD/MM/YYYY');
  },
    async getAll() {
      const res = await OrderService.getAll();
      this.orders = res.data;
    },
    async confirmOrder(id) {
      const res = await OrderService.updateOrder(id);
      if (res.status === "OK") {
        alert("Confirm Successfuly!");
        this.getAll();
      }
    },
  },
};
</script>

<style>
.mess {
  width: 400px;
}
</style>
