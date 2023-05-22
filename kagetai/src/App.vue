<script setup>
import { RouterView } from 'vue-router'


</script>
<script>
import FooterCom from "@/components/FooterCom.vue";
import axios from "@/plugins/axios";
export default {
  name: "NavBar",
  components:{
    FooterCom
  }
  ,
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
  },
  async created() {
    await new Promise((resolve) => {
      this.token = localStorage.getItem('token')
    this.onAuthChange()
    console.log(this.token)
            resolve();
          });
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
    gorememberpass(){
      this.$router.push({ path: '/updatepassword' })
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
      this.closelogin()
      this.$router
          .push({ path: '/register' })
          .then(() => { this.$router.go() })

    },
    gofavorite() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push({ path: '/favorite' })
      }
      else {
        this.showlogin()
      }
    },
    gouser(userid){
      this.$router.push({ path: `/user/${userid}` })
    },
    goadmin(){
      this.$router.push({ path: `/admin` })
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
    goreport(){
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push({ path: '/report' })
      }
      else {
        this.showlogin()
      }

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

        <h1 class="title has-text-white">LOG IN</h1>
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
         
            <a @click="goregister()" class="linktxt">ยังไม่มีบัญชีหรอ? สมัครเลย</a>
            
        </div>
        <div>
          <a @click="gorememberpass()" class="linktxt">ลืมรหัสผ่าน</a>
        </div>
        <div>
        
        </div>
      </div>
 

    </div>
  </div>
  <nav class="navbar is-fixed-top is-hide-mobile" role="navigation" aria-label="main navigation">
    <!-- logo -->
    <div class="navbar-brand ml-6">
      <router-link class="navbar-item" to="/">
        <img src="../public/assets/img/logo5.png">
      </router-link>
       
      
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

      <div class="navbar-item" @click="gofavorite()">
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="navbar-item" @click="gosell()">ลงขาย</div>
      <div v-if="token" class="navbar-item" @click="gochat()">แชท</div>
      <div class="navbar-item has-dropdown is-hoverable" v-if="token">
        <div class="navbar-link">{{user.username}}</div>
        <div class="navbar-dropdown">
          <div class="navbar-item" @click="goadmin" v-show="this.user.usertype == 'admin'">
            admin 
           </div>
          <div class="navbar-item" @click="gouser(user.user_id)" >
           ข้อมูลส่วนตัว
          </div>
          <div class="navbar-item" @click="gofavorite" >
            รายการโปรด
          </div>
          <div class="navbar-item" v-show="this.user.usertype == 'normal'">
            <a  @click="goreport()">ร้องเรียน</a>
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
  <footer-com></footer-com>
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
  background: var(--seconddary-color);
background-size: cover;
  
  


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
  transition: 0.3s !important; 
}

.navbar-item a{
  color:white;
}

.navbar-link{
  color:white;
}
.navbar-link :hover{
  background: var(--seconddary-color) !important;
  transition: 0.3s !important; 
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
  cursor:pointer


}
.btn:hover{
  background-color: var(--primary-color);
  color: var(--grey);
  transition: 0.3s !important; 
}
.popup{
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left:0;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;

}
.popup-content{
  height:330px;
  width:500px;
  background:url('https://media.istockphoto.com/id/1322201765/photo/classical-guitar-on-a-dark-wood-background.jpg?b=1&s=170667a&w=0&k=20&c=1rd9sYTcoOu0CGrP83FQAB90bpzjuuywSM6ueKxGRDc=');
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
  background-image: url('../public/assets/img/elecguitar.png');
  background-size: cover;
  cursor:pointer;
}
#guitar{
  background-image: url('../public/assets/img/guitar.png');
  cursor:pointer;
}
#effect{
  background-image: url('../public/assets/img/effects.png');
  cursor:pointer;
}
#amplifier{
  background-image: url('../public/assets/img/amplifier.png');
  cursor:pointer;
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
  transition: .4s;
}

.sidebar-user .list {
	max-height: calc(100vh - 120px);
	overflow-y: hidden;
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
.chatbutton{
  background:var(--primary-color);
  transition: 0.3s !important; 
}
.chatbutton :hover{
  background: var(--grey);
  transition: 0.3s !important; 
}
.box chatbutton :hover{

    background: var(--grey);
    transition: 0.3s !important; 
}
li :hover{
  background:#b8bcc0 !important;
  color:black !important;
}
li :hover .tab{
  background:#b8bcc0 !important;
  color:black !important
  ;
}
.linktxt :hover{
  color:rgb(147, 147, 147)

}
.linktxt{
  color:white
}
.chat-container{
  background:var(--seconddary-color)
}
#chat-box.active{
  background:var(--grey)!important;
} 

.report-element {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  margin:auto !important;
}

.report-user {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
}

.report-title {
  font-size: 50px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 15px;
}

.report-detail {
  font-size: 30px;
  color: #666666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.report-date {
  font-size: 20px;
  color: #999999;
  font-style: italic;
}
.preview-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;

}

.preview-image {
  width: 100px;
  height: 100px;
  margin-right: 2%;
  margin-top:2em;
  cursor: pointer;
  background:white;
flex-shrink: 0; /* Prevent image from shrinking */
}
.preview-image:hover img{
  transition: .4s;
  transform: scale(1.2);
}
.preview-image:hover {
  opacity: 0.6;

}
.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.preview-image.selected img {
  transform: scale(1.2);
}

.card{
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

</style>
