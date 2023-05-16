<template>
  <div id="app">
    <div class="popup">
      <div class="popup-content">
        <i
          class="fa-sharp fa-solid fa-circle-xmark close"
          @click="closelogin()"
        ></i>

        <h1>LOG IN</h1>
        <input type="text" placeholder="Username" v-model="login_username" />
        <input
          type="password"
          placeholder="Password"
          v-model="login_password"
        />
        <a @click="login()" class="btn" href="#">LOGIN</a>
        <div class="noacc">
          <a href="register.html">
            <span>ยังไม่มีบัญชี? สมัครเลย</span>
          </a>
        </div>
      </div>
    </div>
    <nav
      class="navbar is-fixed-top mainnav"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- logo -->
      <div class="navbar-brand ml-6">
        <router-link class="navbar-item" :to="`/`">
          <img src="../assets/logo.png" />
        </router-link>
      </div>

      <!-- เมนู nav -->
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link :to="`/products`"> กีตาร์โปร่ง </router-link>
        </div>

        <div class="navbar-item">
          <router-link :to="`/products`"> กีตาร์ไฟฟ้า </router-link>
        </div>
        <div class="navbar-item">
          <router-link :to="`/products`"> เอฟเฟค </router-link>
        </div>
        <div class="navbar-item">
          <router-link :to="`/products`"> แอมป์</router-link>
        </div>
      </div>

      <!-- ขอบขวา nav -->
      <div class="navbar-end mr-6">
        <a @click="goreport()" v-show="login_state == true" class="navbar-item"
          >ดูreport</a
        >

        <div class="navbar-item" @click="gofavorite">
            <i class="fa-regular fa-heart"></i>
        </div>

        <div class="navbar-item" @click="gosell"> ลงขาย</div>
       
        <div
          class="navbar-item has-dropdown is-hoverable"
          v-if="login_state == true"
        >
          <a class="navbar-link">{{ username }}</a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <a href="user.html">ข้อมูลส่วนตัว</a>
            </div>
            <div class="navbar-item">
              <a href="./favorite.html">รายการโปรด</a>
            </div>
            <div class="navbar-item">
              <a href="./report.html">ร้องเรียน</a>
            </div>
            <div class="navbar-item">
              <p @click="logout()">ออกจากระบบ</p>
            </div>
          </div>
        </div>
        <div
          class="navbar-item"
       
          @click="showlogin()"
          v-if="login_state == false"
          >login</div
        >
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      login_state: false,
      message: "hello world",
      login_username: "",
      login_password: "",
      username: "",
      user_id: 1,
    };
  },
  methods: {
    showlogin() {
      document.querySelector(".popup").style.display = "flex";
    },
    closelogin() {
      document.querySelector(".popup").style.display = "none";
    },
    login() {
      if (this.login_username == "test" && this.login_password == "1234") {
        this.username = this.login_username;
        this.login_username = "";
        this.login_password = "";
        this.login_state = true;
        document.querySelector(".popup").style.display = "none";
        localStorage.setItem("login_state", this.login_state);
        localStorage.setItem("username", this.username);
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!");
      }

      // window.location.href ="index.html";
    },
    next() {
      this.index += 1;
      if (this.index > this.images.length - 1) {
        this.index = 0;
      }
    },
    log() {
      // test
      console.log("eiei");
    },
    gofavorite() {
      if (this.login_state) {
        window.location.href = "favorite.html";
      } else {
        this.showlogin();
      }
    },
    logout() {
      this.login_state = false;
      localStorage.setItem("login_state", this.login_state);
      window.location.href = "index.html";
      localStorage.removeItem("username");
    },
    addfav(item) {
      if (!this.fav_pro.includes(item)) {
        this.fav_pro.push(item);
      }
      let myjson = JSON.stringify(this.fav_pro);
      localStorage.setItem("fav", myjson);
    },
    goproducts(num) {
      this.selected_pt = num;
      localStorage.setItem("selected_pt", this.selected_pt);
      window.location.href = "products.html";
    },
    goreport() {
      if (this.login_state) {
        window.location.href = "watch_report.html";
      } else {
        this.showlogin();
      }
    },
    gosell() {
      if (this.login_state) {
        window.location.href = "add.html";
      } else {
        this.showlogin();
      }
    },
    adddetail(items) {
      let all = {
        detail_img: items.product_img,
        detail_name: items.name,
        detail_price: items.product_price,
        detail_prodetail: items.product_detail,
      };
      localStorage.setItem("all", JSON.stringify(all));
      window.location.href = "productdetail.html";
    },
  },
};
</script>