<script setup>

import FooterCom from '@/components/FooterCom.vue'
</script>
<template>
    <div>

        <div class="columns" style="min-height: 100%;">
            <div class="column is-2 pt-6">
                <aside class="menu">
                    <p class="menu-label has-text-white">
                        ประเภทสินค้า
                    </p>
                    <ul class="menu-list">
                        <li>
                            <div class="select">
                                <select v-model="selected_pt">
                                    <option value="0" selected="selected">ทั้งหมด</option>
                                    <option v-for="item in products_type" :key="item.id" :value="item.type_id">{{item.type_name}}
                                    </option>
                                </select>
                            </div>
                        </li>
                    </ul>
                    <p class="menu-label has-text-white">
                        ราคา
                    </p>
                    <ul class="menu-list has-background-white">

                    </ul>

                </aside>
            </div>
        <div class="column is-1"></div>
        <div class="column is-8 pt-5">
            <h1 class="is-size-4 mb-4 mt-4 has-text-white">จำนวนสินค้า ({{this.products.length}})</h1>
            <div class="container is-fullhd mb-6" style="min-height:600px">
                <h1 class="title mb-6 mt-6 has-text-white" v-if="products.length==0">ยังไม่มีสินค้า</h1>
                <div class="is-multiline columns" v-if="products.length!=0">
                    <!-- card column -->
                    <div  class="column is-one-third" v-for="product in products" :key="product.product_id"> 
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-1by1">
                                    <img  alt="Placeholder image" :src="'http://localhost:3000/' +product.path_image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div clas="media">

                                    <div class="media-content">
                                        <p class="title is-4">{{product.product_name}}</p>
                                        <p class="subtitle is-7">@username</p>
                                        <p class="subtitle is-5 has-text-success">{{product.product_price}} บาท</p>
                                    </div>

                                </div>
                                <div class="content">
                                    <p class="subtitle is-7">{{product.product_detail}}</p>
                                  
                                </div>
                                <div style="display:flex; justify-content: space-between;">
                                    <router-link class="button" :to="`/products/detail/${product.product_id}`">รายละเอียด</router-link>
                                
                                    <div class="icon is-size-4" @click="test">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <FooterCom></FooterCom>
    </div>
   

</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: 'HomeView',
  props: ['user'],

  data (){
    return {
        products:[],
        search:"",
        products_type :[],
        selected_pt:0
    };
  },
  components: {

    FooterCom
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
        .get("http://localhost:3000/products", {
          
        })
        .then((response) => {
            console.log(response.data)
          this.products = response.data.products;
          this.products_type = response.data.products_type
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shortDetail(detail) {
      if (detail.length > 100) {
        return detail.substring(0, 97) + "...";
      }
      return detail;
    },
    test(){
        console.log(this.user)
    }
        }
,
  mounted() {
    this.getProducts();
  },
}
</script>


