<template>
  <div>
    <h2 class="text-center border-bottom mb-5 pb-3 mt-0 text-uppercase">Lista postów</h2>
    <p v-if="getData.length === 0" class="text-center">
      Brak danych do wyświetlenia
    </p>
    <div v-if="getData.length > 0" class="container">
      <ul class="row g-3 p-0">
        <li v-for="item in getData" :key="item.id" class="col-12 col-sm-6 col-md-6 list-unstyled">
          <div class="card p-0 rounded h-100">
            <h3 class="card-title text-capitalize text-bg-light rounded rounded-bottom-5 p-2 px-3">
              {{ shortenTitle(item.title) }}
              <button type="button" class="btn-close" aria-label="Close" @click="deletePost(item.id)"></button>
            </h3>
            <div class="card-body bg-light pt-1 rounded rounded-top-5 d-flex flex-column justify-content-between">
              <p class="text-start mt-0 mb-3 text-muted border-bottom">
                <span>
                  <strong>Autor:</strong> {{ item.userName }}
                </span>
              </p>
              <div class="text-start">
                {{ shortenText(item.body, item.id) }}
              </div>
              <p class="text-end mt-3 mb-0">
                <a href="#" @click="toggleText(item.id)">
                  {{ expandedPosts.has(item.id) ? 'Zwiń' : 'Zobacz więcej' }}
                </a>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination-container">
        <button @click="prevPage" class="pagination-button" :disabled="currentPage === 1">Poprzednia</button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="pagination-button d-none d-md-block"
            :disabled="page === currentPage"
            :class="{ 'active': page === currentPage }"
        >
          {{ page }}
        </button>
        <select v-model="currentPage" class="pagination-select d-md-none d-lg-none" @change="changePage($event.target.value)">
          <option v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page }}</option>
        </select>
        <button @click="nextPage" class="pagination-button" :disabled="currentPage === totalPages">Następna</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getData', 'totalPages']),
    ...mapState(['currentPage'])
  },
  data() {
    return {
      expandedPosts: new Set()
    };
  },
  methods: {
    ...mapActions(['changePage', 'nextPage', 'prevPage']),
    shortenText(text, id) {
      if (this.expandedPosts.has(id)) {
        return text;
      }
      return text.length > 100 ? text.slice(0, 100) + '...' : text;
    },
    toggleText(id) {
      if (this.expandedPosts.has(id)) {
        this.expandedPosts.delete(id);
      } else {
        this.expandedPosts.add(id);
      }
    },
    shortenTitle(title) {
      return title.length > 20 ? title.slice(0, 20) + '...' : title;
    },
    deletePost(itemId) {
      this.$store.dispatch('deletePost', itemId);
    }
  },
}
</script>

<style lang="scss" scoped>
 @import "@/components/styles/styles";
</style>
