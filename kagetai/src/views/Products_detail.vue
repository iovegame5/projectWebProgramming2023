
<template>
  <div id="detail">
    <NavBar></NavBar>
    <div class="container is-fullhd" style="padding-top: 5%; min-height: 100%">
      <div class="columns">
        <div class="column">
          <img :src=" 'http://localhost:3000/' +images[imageIndex].path_image" @click="next()"/>
        </div>
        <div class="column">
          <div class="card">
            <header class="card-header">
              <p style="text-align: center" class="card-header-title">
                ข้อมูลสินค้า
              </p>
            </header>
          </div>
          <div class="card" style="margin-top: 5%">
            <div class="card-content">
              <div class="content">
                <p style="margin-left: 5%; padding-top: 5%">
                  <strong>ชื่อสินค้า:  {{ this.product.product_name }} </strong>
                </p>
                <p style="margin-left: 5%">
                  <strong>ราคาสินค้า: {{ this.product.product_price }}  บาท</strong>
                </p>
                <p style="margin-left: 5%">
                  <strong>รายละเอียดสินค้า: {{ this.product.product_detail }}  </strong>
                </p>
                <p style="margin-left: 5%">
                  <strong
                    >ติดต่อ: <i class="fa-solid fa-phone"></i>0922467684
                    <i class="fa-brands fa-facebook"></i> Thanakorn Amatrawet
                  </strong>
                </p>
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
import NavBar from '@/components/NavBar.vue'
import FooterCom from '@/components/FooterCom.vue'
import axios from "axios";
export default {
  name: "ProductDetail",

  data() {
    return {
      product: [],
      images: [],
      imageIndex:0
    };
  },
  components: {
    NavBar,
    FooterCom,
    // images:[
    //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]
  },
  methods: {
    next (){

        this.imageIndex += 1
        if (this.imageIndex > this.images.length - 1) {
            this.imageIndex = 0
        }
    },

    // เอาสินค้าจาก database เข้ามา
    getDetail(productId) {
      axios
        .get(`http://localhost:3000/products/detail/${productId}`)
        .then((response) => {
          this.product = response.data.product;
          this.images = response.data.images;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
  mounted() {
    this.getDetail(this.$route.params.id);
  },
};
</script>