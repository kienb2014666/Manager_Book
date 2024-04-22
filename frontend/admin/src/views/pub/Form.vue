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
          Pub added successfully!
        </div>
        <div v-if="showAlertEdit" class="alert alert-success" role="alert">
          Pub Edited successfully!
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
              v-model="pub.name"
              v-bind:class="{ 'is-invalid': errormess.name }"
            />
            <span class="invalid-feedback" v-if="errormess.name">{{
              errormess.name
            }}</span>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              id="address"
              class="form-control"
              v-model="pub.address"
              v-bind:class="{ 'is-invalid': errormess.address }"
            />
            <span class="invalid-feedback" v-if="errormess.address">{{
              errormess.address
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
  import PublisherService from "@/services/pub_service";
  export default {
    data() {
      return {
        pub: {
          _id: "",
          name: "",
          address: "",
        },
        errormess: {
          name: "",
          address: "",
        },
        showAlert: false,
        showAlertEdit: false,
        isEditing: false,
        messRes: "",
      };
    },
    computed: {
      formTitle() {
        return this.isEditing ? "Edit Pub" : "Add new Pub";
      },
      buttonTitle() {
        return this.isEditing ? "Update" : "Add";
      },
    },
    created() {
      let pubId = this.$route.params.id;
      if (pubId) {
        this.isEditing = true;
        this.getdetail(pubId);
      }
    },
    methods: {
      validate() {
        let isValid = true;
        this.errormess = {
          name: "",
          address: "",
        };
        if (!this.pub.name) {
          this.errormess.name = "name pub is required";
          isValid = false;
        }
        if (!this.pub.address) {
          this.errormess.address = "address pub is required";
          isValid = false;
        }
        return isValid;
      },
    
      async save() {
        if (this.validate()) {
          if (this.pub._id) {
            await PublisherService.editpub(this.pub._id, this.pub);  
            this.showAlertEdit = true;
            return;
          }
          const res = await PublisherService.create(this.pub);
          if (res.status === "True") {
            this.showAlert = true;
          } else if (res.status === "Err") {
            this.messRes = res.message;
          }
        }
      },
      async getdetail(pubId) {
        const res = await PublisherService.getdetail(pubId);
        this.pub = res.data;
      },
    },
  };
  </script>
  
  <style>
  .button {
    width: 100px;
  }
  </style>
  