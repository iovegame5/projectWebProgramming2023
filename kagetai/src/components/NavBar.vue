<template>
  <div>
  <div id="app">
    <div class="popup">
      <div class="popup-content">
        <i class="fa-sharp fa-solid fa-circle-xmark close" @click="closelogin()"></i>

        <h1>LOG IN</h1>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <p
          v-if="error"
          class="px-3 py-4 mb-1  has-text-danger-dark"
        >
          {{ error}}
      </p>
        <button @click="login()" class="btn " href="#">LOGIN</button>
        <div class="noacc">
          <a @click="goregister()">
            <span>ยังไม่มีบัญชี? สมัครเลย</span>
          </a>
          
          
        </div>
        <div>
          <a @click="gopass()">
            <span>ลืมรหัสผ่าน</span>
          </a>
        </div>
      </div>
 

    </div>
  </div>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <!-- logo -->
    <div class="navbar-brand ml-6">
      <a class="navbar-item" href="index.html">
        <img src="../assets/img/logo5.png">
      </a>
    </div>

    <!-- เมนู nav -->
    <div class="navbar-start">
      <div class="navbar-item">
        <router-link :to="`/products`">กีตาร์โปร่ง</router-link>
      </div>
      <div class="navbar-item">
        <router-link :to="`/products`">กีตาร์ไฟฟ้า</router-link>
      </div>
      <div class="navbar-item">
        <router-link :to="`/products`">เอฟเฟค</router-link>
      </div>
      <div class="navbar-item">
        <router-link :to="`/products`">แอมป์</router-link>
      </div>




    </div>

    <!-- ขอบขวา nav -->
    <div class="navbar-end mr-6">

      <a class="navbar-item" @click="gofavorite()">
        <i class="fa-regular fa-heart"></i>
      </a>
      <a class="navbar-item" @click="gosell()" href="#">ลงขาย</a>
      <a class="navbar-item" v-if="token">{{ user.username}}</a>
      <div class="navbar-item has-dropdown is-hoverable" v-if="token">
        <a class="navbar-link"></a>
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
            <a @click="logout()">ออกจากระบบ</a>
          </div>
        </div>
      </div>
      <a class="navbar-item" href="#" @click="showlogin()" v-if="!token">login</a>
    </div>

  </nav>
</div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
  name: "NavBar",
  
  data() {
    return {
      username: '',
      password: '',
      error: '',
      token: null,
      user: ''
    }
  },
  mounted() {
    this.onAuthChange()
  },
  created() {
    this.token = localStorage.getItem('token')
    console.log(this.token)
  },
  methods: {
    showlogin() {
      document.querySelector(".popup").style.display = "flex";
    },
    closelogin() {
      document.querySelector(".popup").style.display = "none";
    },
    async login() {

      const data = {
        username: this.username,
        password: this.password
      }
      console.log(data)
      try {
        let res = await axios.post('/user/login', data)
        const token = res.data.token
        localStorage.setItem('token', token)
        this.$emit('auth-change')
        
        window.location.href = ('/')
       
      }
      catch (error) {
        this.error = error.response.data
        console.log(error.response.data)
      }



    },
    onAuthChange() {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser() {
      axios.get('/user/me').then(res => {
        console.log(res.data)
        this.user = res.data
      })
    },
    next() {
      this.index += 1
      if (this.index > this.images.length - 1) {
        this.index = 0
      }
    },
    goregister() {
      this.$router.push({ path: '/register' })

    },
    gofavorite() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push({ path: '/favourite/:id' })
      }
      else {
        this.showlogin()
      }
    },
    logout() {
      localStorage.removeItem('token')
      window.location.href = ('/')
    },
    goproducts(num) {
      this.selected_pt = num;
      localStorage.setItem("selected_pt", this.selected_pt);
      window.location.href = "products.html";
    },
    gosell() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push({ path: '/add' })
      }
      else {
        this.showlogin()
      }

    },
    adddetail(items) {
      let all = {
        'detail_img': items.product_img,
        'detail_name': items.name,
        'detail_price': items.product_price,
        'detail_prodetail': items.product_detail
      }
      localStorage.setItem("all", JSON.stringify(all))
      window.location.href = "productdetail.html";

    }




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

};
</script>