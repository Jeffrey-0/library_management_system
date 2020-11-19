<template>
  <div>
    <bookshelf-item></bookshelf-item>
    <bookshelf-item></bookshelf-item>
    <bookshelf-item></bookshelf-item>
  </div>
</template>

<script>
import BookshelfItem from '../../components/BookshelfItem'
export default {
  name: '',
  data () {
    return {
      books: []
    }
  },
  methods: {
  },
  components: {
    BookshelfItem
  }
}
</script>

<style scoped>
#wrapper:nth-child(2) {
  border-top:1px dashed #dadada;
  border-bottom:1px dashed #dadada;
}
</style>