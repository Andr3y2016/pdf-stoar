<template id="pagination">
  <ul class="pagination" aria-label="Page navigation">
   <!-- <li>
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage" aria-label="Go to the first page">First</button>
    </li>-->
    <li>
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage" aria-label="Previous">«</button>
    </li>
    <li v-for="page in pages">
      <button type="button" @click="onClickPage(page.name)"  :disabled="page.isDisabled" :class="{active: isPageActive(page.name)}" :aria-label="`Go to page number ${page.name}`"> {{ page.name }}</button>
    </li>
    <li>
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage" aria-label="Next"> »</button>
    </li>
   <!-- <li>
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage" aria-label="Go to the last page">Last</button>
    </li>-->
  </ul>
</template>

<script type="text/javascript">
   export default {
  name:'pagination',
  template: '#pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 4
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInFirstPage: function () {
      return this.currentPage === 1
    },
    isInLastPage: function () {
      return this.currentPage === this.totalPages
    },
    startPage: function () {
      /*debugger*/
      if (this.currentPage === 1) {
        return 1
      }
      if ((this.currentPage === this.totalPages) || (this.currentPage === this.totalPages-1)) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
        return this.currentPage - 1
      },
      endPage: function () {
        return Math.min(this.startPage + this.maxVisibleButtons -1, this.totalPages)
      },
      pages: function () {
        const range = []
        for (let i = this.startPage; i <= this.endPage; i+=1) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          })
        }
        return range
      }
  },
  methods: {
    onClickFirstPage: function () {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage: function () {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage: function (page) {
      console.log(this.pages)
      this.$emit('pagechanged', page)
    },
    onClickNextPage: function () {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage: function () {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive: function (page) {
      return this.currentPage === page;
    }
  }
}
/*
let app = new Vue({
  el: '#app',
  data () {
    return {
      currentPage: 2
    }
  },
  methods: {
   onPageChange: function (page) {
      console.log(page)
      this.currentPage = page;
    }
  }
})*/

</script scoped>

 <style lang="scss" scoped >

 html *
{
   font-size: xx-small;
  /*color: #000 ;
   font-family: Arial;*/
}


@import url('https://fonts.googleapis.com/css?family=Lato|Roboto:700');

body {
  background-color: #777;
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAU0lEQVQIHQXBwRGDIBAAwO2/AMcCDHAcPjIRxjJ8Je1kl1uqUgphsWu6w0sIG6npLpcUBql4e/wsVRKabrkNTacIYbMrwsF06rqUhsnXVKVT+Hj+Ue4rPSONk4kAAAAASUVORK5CYII=);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: #fff;
  font-family: 'Lato', sans-serif;
  line-height: 1.4;
  margin: 1rem;

}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination {
  margin: 0;
  padding: 0;
  list-style: none outside none;
  display: flex;
  justify-content: center;
  align-items: center;
  
  li {
    margin: 0 4px;
    padding: 0;
    list-style: none outside none;
    line-height: 25px;
  }
  
  button {
    display: block;
    border: none 0;
    color: #f2f2f2;
    text-shadow: 1px 0 0 #101011;
    padding: .5em 1.5em;
    border-radius: 2px;
    box-shadow: 0 1px 0 #5a5b5c inset, 0 1px 0 #080808;
    background: linear-gradient(to top,#434345,#2f3032);
    text-decoration: none;
    cursor: pointer;
    
    &:hover,
    &:active,
    &:focus,
    &.active{
      text-decoration: none;
      box-shadow: 0 1px 0 #f9bd71 inset, 0 1px 0 #0a0a0a;
      background: linear-gradient(to top,#f48b03,#c87100);
    }
  }
}

.pagination li{
    margin: 0 1px;

    /*margin-top: 0px;
    margin-right: 2px;
    margin-bottom: 0px;
    margin-left: 2px;*/
}
.pagination button {
    padding: .7em .0em;
    width :20px

  }
  button {
   line-height: 1.2;
  }

 </style>