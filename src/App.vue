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

<style lang="scss">
#app {
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

</style>