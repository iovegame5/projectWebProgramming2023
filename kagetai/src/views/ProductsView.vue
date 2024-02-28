<script setup>

</script>
<template>
  <div>
    <div class="columns" style="min-height: 100%">
      <div class="column is-2 pt-6">
        <aside class="menu">
          <p class="menu-label has-text-white">ประเภทสินค้า</p>
          <ul class="menu-list">
            <li>
              <div class="select">
                <select v-model="selected_pt">
                  <option value="0" selected="selected">ทั้งหมด</option>
                  <option
                    v-for="item in products_type"
                    :key="item.id"
                    :value="item.product_type_id"
                  >
                    {{ item.type_name }}
                  </option>
                </select>
              </div>
            </li>
          </ul>

          <ul class="menu-list has-background-white"></ul>
        </aside>
      </div>
      <div class="column is-1"></div>
      <div class="column is-8 pt-5">
        <h1 class="is-size-4 mb-4 mt-4 has-text-white">
          จำนวนสินค้า ({{ this.filteredProducts.length }})
        </h1>
        <div class="container is-fullhd mb-6" style="min-height: 950px">
          <h1
            class="title mb-6 mt-6 has-text-white"
            v-if="filteredProducts.length == 0"
          >
            ยังไม่มีสินค้า
          </h1>
          <div class="is-multiline columns" v-if="filteredProducts.length != 0">
            <!-- card column -->
            <div
              class="column is-one-third"
              v-for="product in filteredProducts"
              :key="product.product_id"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img
                      alt="Placeholder image"
                      :src="'http://'+backendIP+':3000/' + product.path_image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div clas="media">
                    <div class="media-content">
                      <p class="title is-4">{{ product.product_name }}</p>
                      <p style="cursor:pointer;" class="subtitle is-5" @click="gouserprofile(product.user_id)"> @{{product.username}} </p>
                      <p class="subtitle is-5 has-text-success">
                        {{ product.product_price }} บาท
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <p class="subtitle is-6">{{ product.product_detail }}</p>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <router-link
                      class="button"
                      :to="`/products/detail/${product.product_id}`"
                      >รายละเอียด</router-link
                    >
                    <div
                      v-if="product.user_id != user.user_id"
                      class="button"
                      @click="chatwith(product.user_id)"
                    >
                      แชท
                    </div>
                    <router-link
                    v-if="product.user_id == user.user_id"
                      class="button"
                      :to="`/products/update/${product.product_id}`"
                      >แก้ไข</router-link
                    >
                    <div
                      v-if="product.user_id == user.user_id"
                      class="button has-background-danger has-text-white"
                      @click="removeproduct(product.product_id)"
                    >
                      ลบ
                    </div>
                    <div   v-if="product.user_id != user.user_id"
                      class="icon is-size-4 mt-2"
                      @click="
                        addfav(`${product.product_id}`, `${user.user_id}`)
                      "
                    >
                      <button class="button">
                        <i
                          class="fa-regular fa-heart has-text-danger"
                          key="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
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
  name: "HomeView",
  props: ["user", "token"],

  data() {
    return {
      products: [],
      search: "",
      products_type: [],
      selected_pt: 0,
      tmp_producted: [],
      backendIP: backendIP
    };
  },
  
  created() {
    this.getProducts();
    const productType = this.$route.query.selected_pt;
    if (productType) {
      this.selected_pt = parseInt(productType);
      if (this.selected_pt != 0) {
        this.products = this.tmp_producted.filter((value) => {
          return value.product_type === this.selected_pt;
        });
      } else {
        this.products = this.tmp_producted;
      }
    }
  },
  methods: {
    // next (){

    //     this.index += 1
    //     if (this.index > keep.length - 1) {
    //         this.index = 0
    //     }
    // },

    // เอาสินค้าจาก database เข้ามา
    getProducts() {
      axios
        .get("http://" + backendIP+":3000/products", {})
        .then((response) => {
          console.log(response.data);
          this.tmp_producted = response.data.products;
          this.products = this.tmp_producted;
          this.products_type = response.data.products_type;
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
    test() {
      console.log(this.user);
    },
    removeproduct(product_id) {
      if (window.confirm(`ต้องการที่จะลบสินค้านี้ใช่หรือไม่?`)) {
        // User clicked "OK"
        axios
        .delete(`http://` + backendIP+`:3000/products/${product_id}`)
        .then((res) => {
          console.log(res);
          this.getProducts()
        })
        .catch((err) => console.log(err));
      } else {
        // User clicked "Cancel"
        
      }
    },
    chatwith(seller_id) {
      if (!this.user) {
        this.showlogin();
      } 
      else {
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
    addfav(proid, id) {
      if (!this.user) {
        console.log("ยังไม่ได้ล้อคอิน");
        this.showlogin();
      } else {
        console.log(proid);
        console.log(id);
        axios
          .post(`http://`+backendIP+`:3000/favorite/${proid}/${id}`)
          .then((res) => {
            console.log(res);
            alert('เพิ่มสินค้านี่เข้าสิ่งที่ชื่นชอบแล้ว');
          })
          .catch(() => alert('คุณมีสินค้านี้ในสิ่งที่ชื่นชอบแล้ว'));
      }
    },
    showlogin() {
      document.querySelector(".popup").style.display = "flex";
    },
    gouserprofile(user_id){
      this.$router.push({ path: `/user/${user_id}` });
    }
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    selected_pt(newval) {
      if (newval != 0) {
        console.log(newval);
        this.products = this.tmp_producted.filter((value) => {
          return value.product_type === newval;
        });
      } else {
        console.log(newval);
        this.products = this.tmp_producted;
      }
    },
  },
  computed: {
    filteredProducts() {
      if (this.selected_pt != 0) {
        return this.tmp_producted.filter((value) => {
          return value.product_type === this.selected_pt;
        });
      } else {
        return this.tmp_producted;
      }
    },
  },
};
</script>


