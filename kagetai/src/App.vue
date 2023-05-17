<script setup>
import { RouterView } from 'vue-router'



</script>
<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
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
  background-color: var(--seconddary-color);
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
	background-color: #dedede !important;
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
