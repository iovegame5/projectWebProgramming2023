
<template>
  <div id="detail">

    <div class="container is-fullhd" style="padding-top: 5%; min-height: 100%">
      <div class="columns">
        <div class="column">
          <figure class="image is-1by1" style="background:white; box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);">
            <img :src="'http://'+backendIP+':3000/' + images[imageIndex].path_image"  />
          </figure>
          <div class="preview-images">
            <div v-for="(image, index) in images" :key="index" class="preview-image"  :class="{ selected: imageIndex == index}">
              <img :src="'http://'+ backendIP +':3000/' + image.path_image" @click="selectImage(index)" />
            </div>
          </div>
        </div>
        <div class="column" style="" >
      
          <div class="card" style="margin-top: 5%">
            <header class="card-header">
              <p style="text-align: center; justify-content: center;" class="card-header-title is-size-2">
                ข้อมูลสินค้า
              </p>
              
            </header>
            <div class="card-content">
              <div class="content">
                <div class="tile mb-6">
                  <article class="tile is-child notification has-text-centered">
                    <p style="" class="is-size-2 ">
                      <strong>{{ this.product.product_name }} </strong>
                    </p>
                  </article>

                </div>

                <p style="margin-left: 5%" class="is-size-5">
                  <strong>ราคาสินค้า:</strong> {{ this.product.product_price }} บาท
                </p>
               
                <p style="margin-left: 5%" class="is-size-5">
                  <strong>รายละเอียดสินค้า:</strong> {{ this.product.product_detail }}
                </p>
                <p style="margin-left: 5%" class="is-size-5">
                  <strong>ติดต่อ: <i class="fa-solid fa-phone"></i> {{ product.phone }}
                  </strong>
                </p>
              </div>
              <div class="card mt-5 chatbutton" style="cursor: pointer;" @click="chatwith(product.user_id)" v-if="this.user.user_id != product.user_id">
                <header class="card-header">
                  <p style="text-align: center; justify-content: center; color:white" class="card-header-title is-size-2">
                    แชท
                  </p>
                 
                        
                </header>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// @ is an alias to /src


import axios from "axios";
import backendIP from "../../backendIP";
export default {
  name: "ProductDetail",
  props: ['user'],

  data() {
    return {
      product: [],
      images: [],
      imageIndex: 0,
      backendIP: backendIP
    };
  },
  
  methods: {
    chatwith(seller_id) {
      if (!this.user) {
        this.showlogin();
      } else {
        console.log(this.user.user_id);
        axios
          .post("http://"+backendIP+":3000/chat", {
            buyer_id: this.user.user_id,
            seller_id: seller_id,
          })
          .then((res) => {
            // this.$router.push({ path: '/products', query: { selected_pt:num } });

            this.$router.push({
              path: "/chat",
              query: { current_room_id: res.data.room_id },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    showlogin() {
      document.querySelector(".popup").style.display = "flex";
    },
    // next() {

    //   this.imageIndex += 1
    //   if (this.imageIndex > this.images.length - 1) {
    //     this.imageIndex = 0
    //   }
    // },
    selectImage(index) {
    this.imageIndex = index;
  },

    // เอาสินค้าจาก database เข้ามา
    getDetail(productId) {
      axios
        .get(`http://`+backendIP+`:3000/products/detail/${productId}`)
        .then((response) => {
          this.product = response.data.product;
          this.images = response.data.images;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    gouserprofile(user_id){
      this.$router.push({ path: `/user/${user_id}` });
    }
  },
  mounted() {
    this.getDetail(this.$route.params.id);
  },
};
</script>