<template>
  <div style="min-height: 1080px">



    <!-- My INFO -->
    <div class="columns is-full-size" id="profile" style="" v-if="user.user_id == this.userinfo.user_id">
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
                >สินค้า</a
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
                :value="this.userinfo.username"
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
            <label class="label has-text-white">อีเมลล์</label>
            <div class="control">
              <input class="input" type="text" v-model="f_email" />
            </div>
          </div>
          <div class="field">
            <label class="label has-text-white">ประเภทผู้ใช้งาน</label>
            <div class="select">
              <select disabled v-model="this.usertype">
                <option value="normal">normal</option>
                <option value="admin">admin</option>
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
          <h1 class="title has-text-light" v-if="user.user_id == this.userinfo.user_id" >สินค้าของฉัน</h1>
          <h1 class="title has-text-light" v-else>สินค้าของ {{this.userinfo.username}}</h1>
          <div class="container is-fullhd mb-6" style="min-height: 600px">
            <h1
              class="title mb-6 mt-6 has-text-white"
              v-if="products.length == 0"
            >
              ยังไม่มีสินค้า
            </h1>
            <div class="is-multiline columns" v-if="products.length != 0">
              <!-- card column -->
              <div
                class="column is-one-third"
                v-for="product in products"
                :key="product.product_id"
              >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1">
                    <img
                      alt="Placeholder image"
                      :src="'http://localhost:3000/' + product.path_image"
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
      <div class="column">
        
      </div>
    </div>


    <!-- Other user INFO -->
    <div class="columns is-full-size" id="profile" style="" v-else>
        <div class="column is-3 pt-6" style="position:relative;">
            <div class="card is-fixed" style="position: fixed; width:20%; margin-left:2rem;">
                <div class="card-image">
                  <figure class="image ">
                    <img class="is-rounded"   :src="'http://localhost:3000/'+ userinfo.avatar" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    
                    <div class="media-content has-text-centered">
                      <p class="title" style="font-size:35px">@{{userinfo.username}}</p>
                      <p class="subtitle is-12">{{userinfo.firstname}} {{userinfo.lastname}}</p>
                      <p class="subtitle is-10">หมายเลขสมาชิก {{ userinfo.user_id }}</p>
                      <p class="subtitle is-10">วันที่เข้าร่วม {{userinfo.join_date}} </p>
                      
                      <div class="box chatbutton" style="cursor:pointer; font-size:20px; color:white" @click="chatwith(userinfo.user_id)" >แชท</div>
                    </div>
                  </div>
              
                  
                </div>
              </div>
        </div>
        <div class="column"></div>
        <div
          class="column is-8 pt-5"
         
        >
          <div id="panel2" >
            <h1 class="title has-text-light" v-if="user.user_id == this.userinfo.user_id" >สินค้าของฉัน</h1>
            <h1 class="title has-text-light" v-else>สินค้าของ {{this.userinfo.username}}</h1>
            <div class="container is-fullhd mb-6" style="min-height: 600px">
              <h1
                class="title mb-6 mt-6 has-text-white"
                v-if="products.length == 0"
              >
                ยังไม่มีสินค้า
              </h1>
              <div class="is-multiline columns" v-if="products.length != 0">
                <!-- card column -->
                <div
                  class="column is-one-third"
                  v-for="product in products"
                  :key="product.product_id"
                >
                <div class="card">
                    <div class="card-image">
                      <figure class="image is-1by1">
                        <img
                          alt="Placeholder image"
                          :src="'http://localhost:3000/' + product.path_image"
                        />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div clas="media">
                        <div class="media-content">
                          <p class="title is-4">{{ product.product_name }}</p>
                          <p style="cursor:pointer;" class="subtitle is-5" @click="gouserprofile(product.user_id)">  @{{product.username}} </p>
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


  </div>
</template>


<script>
// @ is an alias to /src

import axios from "axios";
export default {
  name: "HomeView",
  props: ["user", "token"],
  components: {},
  data() {
    return {
      panel: 1,
      userinfo: "",
      fname: "",
      lname: "",
      phone: "",
      f_fname: "",
      f_lname: "",
      f_phone: "",
      products: [],
      usertype:""
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
       var data = {
        firstname:this.fname,
        lastname:this.lname,
        email:this.email,
        phone:this.phone
       }
        

        axios
          .put(`http://localhost:3000/user/${this.user.user_id}`, data)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => console.log(e.response.data));
        alert("บันทึกข้อมูลสำเร็จ");
        location.reload()
      }
    },
    chatwith(seller_id) {
      if (!this.user) {
        this.showlogin();
      } else {
        console.log(this.user.user_id);
        axios
          .post("http://localhost:3000/chat", {
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
    cancel() {
      this.f_fname = this.fname;
      this.f_lname = this.lname;
      this.f_email = this.email;
      this.f_phone = this.phone;
    },
    getuserproducts(user_id) {
      axios
        .get(`http://localhost:3000/${user_id}/products`, {})
        .then((response) => {
          console.log(response.data);
          this.products = response.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gouserprofile(user_id){
      this.$router.push({ path: `/user/${user_id}` });
    },
    getuserinfo(user_id) {
      axios
        .get(`http://localhost:3000/user/${user_id}`, {})
        .then((response) => {
            console.log(response.data.userinfo)
          
          console.log(response.data);
          this.userinfo = response.data.userinfo;
          this.fname = this.userinfo.firstname;
          this.lname = this.userinfo.lastname;
          this.phone = this.userinfo.phone;
          this.f_fname = this.userinfo.firstname;
          this.f_lname = this.userinfo.lastname;
          this.f_phone = this.userinfo.phone;
          this.f_email = this.userinfo.email
          this.email = this.userinfo.email
          this.usertype = this.userinfo.usertype
        })
        .catch((err) => {
          console.log(err);
          
      this.$router.push({path: '/'})
    
        });
    },
  },
  created() {
    // axios
    //   .get(`http://localhost:3000/${this.$route.params.user_id}}/products`, {})
    //   .then((response) => {
    //     console.log(response.data);
    //     this.products = response.data.products;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.getuserinfo(this.$route.params.user_id);
    this.getuserproducts(this.$route.params.user_id);
  },
  mounted() {},
};
</script>