<template>
  <PostsList />
</template>

<script>
import PostsList  from "@/components/Posts-list.vue";
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    PostsList
  },
  methods: {
    ...mapActions(['fetchData'])
  },
  created() {
    this.fetchData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(220,220,255,0.3) 50%, rgba(100,150,255,0.4) 100%);
  color: #2c3e50;
  padding: 60px 0;
}
</style>
