<template>
  <div>
    <bookshelf-item :book="books[0]" @returnBook="returnBook" :index="0"></bookshelf-item>
    <bookshelf-item :book="books[1]" @returnBook="returnBook" :index="1"></bookshelf-item>
    <bookshelf-item :book="books[2]" @returnBook="returnBook" :index="2"></bookshelf-item>
  </div>
</template>

<script>
import {SelectBookshelf, returnBook} from '../../network/book'
import BookshelfItem from '../../components/BookshelfItem'
import { addDate } from '../../common/util.js'
export default {
  name: '',
  data () {
    return {
      books: [
        {
          historyId: '',
          bookId: '',
          bookName: '',
          borrowDate: '2020-11-20',
          validityDate: 20,
          returnDate: ''
        },
        {
          historyId: '',
          bookId: '',
          bookName: '',
          borrowDate: '',
          validityDate: '',
          returnDate: ''
        },
        {
          historyId: '',
          bookId: '',
          bookName: '',
          borrowDate: '',
          validityDate: '',
          returnDate: ''
        }
      ]
    }
  },
  methods: {
    returnBook(bookId, index) {
      console.log('归还图书' , bookId, index)
      returnBook(bookId).then(res => {
        console.log('归还图书2', res)
        if (res) {
          Object.assign(this.books[index], {
          historyId: '',
          bookId: '',
          bookName: '',
          borrowDate: '',
          validityDate: '',
          returnDate: ''
        })
          this.$message({
            type: 'success',
            message: '归还成功!',
            center: true
          })
        } else {
          this.$message({
            type: 'error',
            message: '归还失败!',
            center: true
          })
        }
      })
    }
  },
  components: {
    BookshelfItem
  },
  created () {
    SelectBookshelf(this.$user.userId).then(res => {
      for(let i = 0; i < res.length; i++) {
        Object.assign(this.books[i], res[i])
        if (this.books[i].borrowDate && this.books[i].validityDate) {
          this.books[i].returnDate = addDate(this.books[i].borrowDate, this.books[i].validityDate)
        }
      }
      
      console.log('书架', res, this.books)
    })
  }
}
</script>

<style scoped>
#wrapper:nth-child(2) {
  border-top:1px dashed #dadada;
  border-bottom:1px dashed #dadada;
}
</style>