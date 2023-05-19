<script setup>
import { RouterView } from 'vue-router'



</script>
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
    gochat(){
      this.$router.push({ path: '/chat' })
    },
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
      this.$router
          .push({ path: '/register' })
          .then(() => { this.$router.go() })

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

    },
    goproducts(num) {
      this.$router.push({ path: '/products', query: { selected_pt:num } });
    },




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
  

  

};
</script>
<template>
  <div id="app">
  <div >
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
         
            <a @click="goregister()">ยังไม่มีบัญชีหรอ? สมัรเลย</a>
        
          
          
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
        <img src="./assets/img/logo5.png">
      </a>
    </div>

    <!-- เมนู nav -->
    <div class="navbar-start">
      <div class="navbar-item" @click="goproducts(1)">
        กีตาร์โปร่ง
      </div>
      <div class="navbar-item" @click="goproducts(2)">
        กีตาร์ไฟฟ้า
      </div>
      <div class="navbar-item" @click="goproducts(3)">
        กีตาร์เอฟเฟค
      </div>
      <div class="navbar-item" @click="goproducts(4)">
        แอมป์
      </div>




    </div>

    <!-- ขอบขวา nav -->
    <div class="navbar-end mr-6">

      <a class="navbar-item" @click="gofavorite()">
        <i class="fa-regular fa-heart"></i>
      </a>
      <div class="navbar-item" @click="gosell()">ลงขาย</div>
      <div v-if="token" class="navbar-item" @click="gochat()">แชท</div>
      <div class="navbar-item has-dropdown is-hoverable" v-if="token">
        <div class="navbar-link">{{user.username}}</div>
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
  <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" :token="token" />
</div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


:root {
  --primary-color:#14274E;
  --seconddary-color:#394867;
  --grey:#9BA4B4;

}
*{
  margin: 0;
  /* box-sizing: border-box; */
}
body{
  padding:20px;
  margin:0;
  padding-top:90px;
  /* background-color:var(--grey); */
  background-color: var(--seconddary-color);
  


}

.navbar{
  background-color: var(--primary-color);

  height: 75px;
}

.navbar-dropdown{
  background-color: var(--primary-color);
  color:white;
}
.navbar-item{
  font-size: 20px;
  color:white;

}
.navbar-item:hover {
  background: var(--seconddary-color);
  cursor: pointer;
}

.navbar-item a{
  color:white;
}

.navbar-link{
  color:white;
}
.navbar-link :hover{
  background: var(--seconddary-color) !important;
}
.btn{
  background:var(--grey);
  padding: 10px 15px;
  color: var(--primary-color);
  font-size:18px;
  border-radius: 5px;
  /* box-shadow:6px 6px 20px -4px rgba(0,0,0, 0.7); */
  text-decoration: none;
  transition: 0.4s;


}
.btn:hover{
  background-color: var(--primary-color);
  color: var(--grey)
}
.popup{
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;

}
.popup-content{
  height:370px;
  width:500px;
  background-color:rgb(143, 143, 143);
  position: relative;
  padding-top: 20px;
  border-radius: 5px;
  color:white;
}
.popup-content input{
  margin:20px auto;
  display:block;
  width:50%;
  padding:8px;
  border:1px solid;
}
.close{
 text-decoration: none;
 position:absolute;
 top: 2px;
 right:2px;
 height:20px;
 width:20px;
 cursor: pointer;
  
}
/* register.html */
.register{
  width:30%;
  padding: 20px;
  position: relative;
  margin: auto;

  
}
.register-container{
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  margin:auto;
  padding:30px;
  

}
.noacc{
  color:white;
  margin-top: 20px;
}
.slideimg{
  display:block;
  margin-left: auto;
   margin-right:auto; 
   width: 100%;
    height: 100%;
    object-fit: cover;
     align-items: center;
}
/* footer{
 
  bottom: 0;

  background: black;
  
  padding: 2em;
  height:300px;
  margin-top:2em;
} */

/* .content{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-image: url('./img/guitar_4_1.jpg');
  background-size: cover;
  color: white;
  font-size: 100px;
} */

#eguitar{
  background-image: url('./assets/img/elecguitar.png');
  background-size: cover;
}
.subtitle{
  text-overflow: ellipsis;
}

\\chat


html, body {
	overflow: hidden;
}

*::-webkit-scrollbar {
	width: 10px;
}

*::-webkit-scrollbar-track {
	box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 23111998px;
}

*::-webkit-scrollbar-thumb {
	background-color: #ccc;
	outline: 1px solid #bbb;
	border-radius: 23111998px;
}

.sidebar-user {
	display: block;
	border-right: 1px solid #dedede;
}

.sidebar-user .top-field {
	padding: 25px 30px 15px 35px;
}

.sidebar-user .top-field .input {
	background-color: #f9f9f9;
	border-radius: 23111998px;
}

.sidebar-user .top-field .input::placeholder {
	color: #ccc;
}

.sidebar-user .list {
	margin-left: 25px;
	border: none !important;
	box-shadow: none;
}

@media screen and (max-width: 768px) {
	.sidebar-user .list {
		margin-top: 25px;
	}
}

.sidebar-user .list .box {
	margin-bottom: 0;
	margin-right: 15px;
	box-shadow: none;
	border-radius: none;
	background-color: #fff;
	border: none !important;
}

.sidebar-user .list .box.active {
	background-color: #dedede !important;
}
.chatgroup.active {
	background-color: var(--primary-color)
}
.chatgroup {
  border-radius: 10px;
}

.sidebar-user .list a.box:hover,
.sidebar-user .list a.box:focus,
.sidebar-user .list a.box:active {
	box-shadow: none;
	background-color: #f9f9f9;
}

.sidebar-user .list {
	max-height: calc(100vh - 120px);
	overflow-y: auto;
	overflow-x: hidden;
}

.user-nav {
	padding-top: 20px;
	padding-bottom: 8px;
	padding-left: 12px;
	padding-right: 20px;
	z-index: 29;
	display: flex;
	align-items: stretch;
}

.user-nav .navbar-start {
	justify-content: flex-start;
	margin-right: auto;
}

.user-nav .navbar-end {
	justify-content: flex-end;
	margin-left: auto;
}

.user-nav .navbar-start,
.user-nav .navbar-end {
	align-items: stretch;
	display: flex;
}

.user-nav .navbar-item:hover {
	color: currentColor;
}

.message-window {
	min-height: calc(100vh - 76px) !important;
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
}

.flex-item-1 {
    flex-grow: 1;
}
  
.flex-item-2 {
	width: 100%;
    height: 80px;
    padding: 10px 12px;
}

.flex-item-2 .field.has-addons .control:first-child {
	width: 100%;
}

.flex-item-2 .input {
	border-radius: 23111998px !important;
	background-color: #f9f9f9;
}

.flex-item-2 .button {
	padding: 0 5px;
	border: none;
}

@media screen and (max-width: 690px) {
	.is-32x32-mobile {
		height: 32px !important;
		width: 32px !important;
		margin-left: -8px;
	}
}

.sidebar-profile {
	border-left: 1px solid #dedede;
}

.mainnav{
  z-index: 1;
}


</style>
