
<template>
  <div id="detail">

    <div class="container is-fullhd" style="padding-top: 5%; min-height: 100%">
      <div class="columns">
        <div class="column">
          <img :src="'http://localhost:3000/' + images[imageIndex].path_image" @click="next()" />
        </div>
        <div class="column">
          <div class="card">
            <header class="card-header">
              <p style="text-align: center; justify-content: center;" class="card-header-title is-size-2">
                ข้อมูลสินค้า
              </p>
            </header>
          </div>
          <div class="card" style="margin-top: 5%">
            <div class="card-content">
              <div class="content">
                <div class="tile mb-6">
                  <article class="tile is-child notification is-info">
                    <p style="margin-left: 25%; padding-top: 2%" class="is-size-2 ">
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
                  <strong>ติดต่อ: <i class="fa-solid fa-phone"></i> 0922467684

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

import FooterCom from '@/components/FooterCom.vue'
import axios from "axios";
export default {
  name: "ProductDetail",
  props: ['user'],

  data() {
    return {
      product: [],
      images: [],
      imageIndex: 0
    };
  },
  components: {

    FooterCom,
    // images:[
    //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]
  },
  methods: {
    next() {

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