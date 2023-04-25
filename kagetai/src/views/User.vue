<template>
    <div>
    <NavBar></NavBar>
    
    <div class="columns" id="profile" style="min-height:100%" >
        <div class="column is-2 pt-6">
            <aside class="menu has-text-white">
                <ul class="menu-list">
                    <li><a class="has-text-white" :class="{'has-background-light' : panel==1, 'has-text-black' : panel==1}" @click="panel=1">ข้อมูลส่วนตัว</a></li>
                    <li><a class="has-text-white" :class="{'has-background-light' : panel==2, 'has-text-black' : panel==2}" @click="panel = 2"  >สินค้าของฉัน</a></li>
                </ul>

            </aside>
        </div>
        <div class="column is-5 pt-5"  :class="{'column is-5 pt-5' : panel==1, 'column is-8 pt-5' : panel==2}">
            <div id="panel1" v-show="panel==1">
                <h1 class="title has-text-light"> ข้อมูลส่วนตัว </h1>
                <div class="field">
                    <label class="label has-text-white">ชื่อผู้ใช้งาน</label>
                    <div class="control">
                        <input class="input" type="text" value="test" disabled>
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">ชื่อ</label>
                    <div class="control">
                        <input class="input" type="text" v-model="f_fname">
                    </div>
                </div>

                <div class="field">
                    <label class="label has-text-white">นามสกุล</label>
                    <div class="control">
                        <input class="input" type="text" v-model="f_lname">
                    </div>
                </div>

                <div class="field">
                    <label class="label has-text-white">เบอร์โทรศัพท์</label>
                    <div class="control">
                        <input class="input" type="text" v-model="f_phone">
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-white">ประเภทผู้ใช้งาน</label>
                    <div class="select">
                        <select v-model="user_type" disabled>
                            <option value="1">ผู้ใช้งาน</option>
                            <option value="2">แอดมิน</option>

                        </select>

                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="save()">บันทึกข้อมูล</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click="cancel()">ยกเลิก</button>


                    </div>
                </div>
            </div>
            <div id="panel2" v-show="panel==2">
                <h1 class="title has-text-light">สินค้าของฉัน</h1>
                <div class="container is-full-desktop">
                <div class="is-multiline columns" >
                    <!-- card column -->
                  
                    <div  class="column is-one-third">   <!-- loop hear -->
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-1by1">
                                    <img  alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div clas="media">

                                    <div class="media-content">
                                        <p class="title is-4">itemname</p>
                                        <p class="subtitle is-7">@username</p>
                                        <p class="subtitle is-5 has-text-success">item.product_price บาท</p>
                                    </div>

                                </div>
                                <div class="content">
                                    <p class="subtitle is-7"> item.product_detail </p>
                                </div>
                                <div style="display:flex; justify-content: space-between;">
                                    <button class="button" @click="adddetail(item)">รายละเอียด</button>
                                    <div class="icon is-size-4" @click="addfav(item)">
                                        <i class="fa-regular fa-heart"></i>
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
import FooterCom from '@/components/FooterCom.vue'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'HomeView',
  components: {
    NavBar,
    FooterCom

  },
  data() {
        return {
          panel:1,

        }
    },
  
}
</script>