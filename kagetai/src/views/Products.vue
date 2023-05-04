<template>
    <h1>dd</h1>
</template>
<script>
    export default{
        name:"ProductView",
        data (){
    return {
        products:[],
        search:"",
    };
  },
  components: {
    NavBar,
    // images:[
    //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]

  },
  methods:{
        // next (){
        
        //     this.index += 1
        //     if (this.index > keep.length - 1) {
        //         this.index = 0
        //     }
        // },

        // เอาสินค้าจาก database เข้ามา
        getProducts(){
            axios
        .get("http://localhost:3000", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
        }
,
  mounted() {
    this.getProducts();
  },
    }
    
</script>