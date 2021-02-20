<template>
  <div>
    <bookshelf-item :book="books[0]" @returnBook="returnBook" :index="0"></bookshelf-item>
    <bookshelf-item :book="books[1]" @returnBook="returnBook" :index="1"></bookshelf-item>
    <bookshelf-item :book="books[2]" @returnBook="returnBook" :index="2"></bookshelf-item>
  </div>
</template>

<script>
import {SelectBookshelf, returnBook} from '../../network/book'
// import {Selecthistoryshelf, }
import BookshelfItem from '../../components/BookshelfItem'
import { addDate } from '../../common/util.js'
export default {
  name: 'Bookshelf',
  data () {
    return {
      books: [
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
      let history = this.books[index]
      history.isreturn = 1
      returnBook(history).then(res => {
        console.log('归还图书2', res)
        // TODO
        this.books[index].isreturn = 1
        // returnBookChange(this.books[index].historyId)
        if (res) {
          // console.log('changeBookStatus', history.bookId, 2)
          this.$eventBus.$emit('changeBookStatus', history.bookId)
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
      console.log('获取书架请求', res)
      if (!res || !res.data) return
      let len = res.data.length > 3 ? 3 : res.data.length
      for (let i = 0; i < len; i++) {
        if (res.data[i].borrowDate && res.data[i].validityDate)
        res.data[i].returnDate = addDate(res.data[i].borrowDate, res.data[i].validityDate)
        Object.assign(this.books[i], res.data[i])
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