<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <div id="app">
    <Header />
    <div class="">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style></style>
