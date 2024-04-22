<template>
    <div class="container">
      <h3 class="mt-2 mb-2">PubLisher Manager</h3>
      <div v-if="showMess" class="alert alert-success mess" role="alert">
        Pub deleted successfully!
      </div>
      <div class="f-lex justify-content-between">
        <div class="row mt-3 mb-3">
          <div class="col-3">
            <router-link to="/pub/create">
              <button type="button" class="btn btn-outline-primary">
                Add Publisher
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
                @input="searchPub"
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
            <th scope="col">Địa chỉ</th>
            <th scope="col">Action</th>
            
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(pub, index) in pubs">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pub.name }}</td>
            <td>{{ pub.address }}</td>
            <td>
              <router-link
                :to="{ name: 'pub.edit', params: { id: pub._id } }"
              >
                <i class="fa-regular fa-pen-to-square fa-2xl mx-2 text-primary">
                </i>
              </router-link>
              <i
                class="fa-regular fa-trash-can fa-2xl text-danger"
                @click="confirmDelete(pub._id)"
                style="cursor: pointer"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import PublisherService from "@/services/pub_service";
  export default {
    data() {
      return {
        pubs: [],
        showMess: false,
        searchQuery: "",
      };
    },
    created() {
      this.getAll();
    },
    methods: {
      async getAll() {
        const res = await PublisherService.getAll();
        this.pubs = res.data;
      },
      async confirmDelete(pubId) {
        if (confirm("Are you sure you want to delete this pub?")) {
          await PublisherService.delete(pubId);
          this.getAll();
          this.showMess = true;
          setTimeout(() => {
            this.showMess = false;
          }, 2000);
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
  