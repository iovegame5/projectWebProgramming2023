<template>
  <div>
    <div class="columns" id="profile" style="min-height: 100%">
      <div class="column is-2 pt-6">
        <aside class="menu has-text-white">
          <ul class="menu-list">
            <li>
              <a
                class="has-text-white"
                :class="{
                  'has-background-light': panel == 1,
                  'has-text-black': panel == 1,
                }"
                @click="panel = 1"
                >ข้อมูลส่วนตัว</a
              >
            </li>
            <li>
              <a
                class="has-text-white"
                :class="{
                  'has-background-light': panel == 2,
                  'has-text-black': panel == 2,
                }"
                @click="panel = 2"
                >สินค้าของฉัน</a
              >
            </li>
          </ul>
        </aside>
      </div>
      <div
        class="column is-5 pt-5"
        :class="{
          'column is-5 pt-5': panel == 1,
          'column is-8 pt-5': panel == 2,
        }"
      >
        <div id="panel1" v-show="panel == 1">
          <h1 class="title has-text-light">ข้อมูลส่วนตัว</h1>
          <div class="field">
            <label class="label has-text-white">ชื่อผู้ใช้งาน</label>
            <div class="control">
              <input
                class="input"
                type="text"
                :value="this.user.username"
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">ชื่อ</label>
            <div class="control">
              <input class="input" type="text" v-model="f_fname" />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">นามสกุล</label>
            <div class="control">
              <input class="input" type="text" v-model="f_lname" />
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">เบอร์โทรศัพท์</label>
            <div class="control">
              <input class="input" type="text" v-model="f_phone" />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">ประเภทผู้ใช้งาน</label>
            <div class="select">
              <select disabled>
                <option value="1">normal</option>
                <option value="2">admin</option>
              </select>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="save()">
                บันทึกข้อมูล
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light" @click="cancel()">
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
        <div id="panel2" v-show="panel == 2">
          <h1 class="title has-text-light">สินค้าของฉัน</h1>
          <div class="container is-fullhd mb-6" style="min-height: 600px">
            <h1 class="title mb-6 mt-6 has-text-white" v-if="products.length == 0">
                ยังไม่มีสินค้า
            </h1>
            <div class="is-multiline columns" v-if="products.length != 0">
                <!-- card column -->
                <div class="column is-one-third" v-for="product in products" :key="product.product_id">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-1by1">
                                <img alt="Placeholder image" :src="'http://localhost:3000/' + product.path_image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div clas="media">
                                <div class="media-content">
                                    <p class="title is-4">{{ product.product_name }}</p>
                                    <p class="subtitle is-7">@username</p>
                                    <p class="subtitle is-5 has-text-success">
                                        {{ product.product_price }} บาท
                                    </p>
                                </div>
                            </div>
                            <div class="content">
                                <p class="subtitle is-7">{{ product.product_detail }}</p>
                            </div>
                            <div style="display: flex; justify-content: space-between">
                                <router-link class="button"
                                    :to="`/products/detail/${product.product_id}`">รายละเอียด</router-link>
                                <div v-if="product.user_id != user.user_id" class="button"
                                    @click="chatwith(product.user_id)">
                                    แชท
                                </div>
                                <div class="icon is-size-4 mt-2"
                                    @click="addfav(`${product.product_id}`, `${user.user_id}`)">
                                    <button class="button "><i class="fa-regular fa-heart has-text-danger"
                                            key="true"></i></button>
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
    <FooterCom></FooterCom>
  </div>
</template>


<script>
// @ is an alias to /src
import FooterCom from "@/components/FooterCom.vue";
import axios from "axios";
export default {
  name: "HomeView",
  props: ["user", 'token'],
  components: {
    FooterCom,
  },
  data() {
    return {
      panel: 1,
      fname: this.user.firstname,
      lname: this.user.lastname,
      phone: this.user.phone,
      f_fname: this.user.firstname,
      f_lname: this.user.lastname,
      f_phone: this.user.phone,
      products: [],
    };
  },
  methods: {
    save() {
      if (
        this.f_fname == "" ||
        this.f_email == "" ||
        this.f_lname == "" ||
        this.f_phone == ""
      ) {
        alert("ใส่ข้อมูลให้ครบก่อนบันทึก");
      } else {
        this.fname = this.f_fname;
        this.lname = this.f_lname;
        this.email = this.f_email;
        this.phone = this.f_phone;

        alert("บันทึกข้อมูลสำเร็จ");
      }
    },
    cancel() {
      this.f_fname = this.fname;
      this.f_lname = this.lname;
      this.f_email = this.email;
      this.f_phone = this.phone;
    },
  },
  created() {
    axios
      .get(`http://localhost:3000/${this.user.user_id}/products`, {})
      .then((response) => {
        console.log(response.data);
        this.products = response.data.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>