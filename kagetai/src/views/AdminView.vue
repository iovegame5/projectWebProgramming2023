<template>
  <div style="min-height: 900px">
    <div class="columns is-full-size">
      <div class="column is-2 pt-6 ml-2">
        <aside class="menu has-text-white">
          <ul class="menu-list">
            <li>
              <a 
                class="has-text-white tab"
                :class="{
                  'has-background-light': panel == 1,
                  'has-text-black': panel == 1,
                }"
                @click="panel = 1"
                >ผู้ใช้ทั้งหมด</a
              >
            </li>
            <li>
              <a
                class="has-text-white tab"
                :class="{
                  'has-background-light': panel == 2,
                  'has-text-black': panel == 2,
                }"
                @click="panel = 2"
                >ผู้ใช้ที่โดนแบน</a
              >
            </li>
            <li>
              <a
                class="has-text-white tab"
                :class="{
                  'has-background-light': panel == 3,
                  'has-text-black': panel == 3,
                }"
                @click="panel = 3"
                >รวมรีพอร์ท</a
              >
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-1 sidebar-user"></div>

      <!-- panel 1 -->
      <div class="column is-8" v-if="panel == 1">
        <div class="columns">
          <div class="column is-4 is-offset-2">
            <input class="input" type="text" name="search" placeholder="ค้นหาผู้ใช้งาน" v-model="search">
          </div>
          <div class="column is-2">
            <input class="button" type="submit" value="Search" @click="getallusers()">
          </div>
        
        </div>

        <div
          style="
            height: 70%;
            min-height: 800px;
            overflow-y: auto;
            overflow-x: hidden;
          "
        >
          <table class="table">
            <thead>
              <tr>
                <th>User_id</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Join date</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>User_id</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Join date</th>
                <th></th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="user in allusers" :key="user.user_id">
                <td>{{ user.user_id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.join_date }}</td>
                <td>
                  <div
                    class="button is-danger"
                    @click="banuser(user.user_id)"
                    v-if="user.isbanned == 0"
                  >
                    แบนผู้ใช้นี้
                  </div>
                  <div
                    class="button is-link"
                    @click="unbanuser(user.user_id)"
                    v-else-if="user.isbanned == 1"
                  >
                    ปลดแบนผู้ใช้นี้
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <!-- panel 2 -->
      <div class="column is-8" v-if="panel == 2">
        <div class="columns">
          <div class="column is-4 is-offset-2">
            <input class="input" type="text" name="search" placeholder="ค้นหาผู้ใช้งาน" v-model="search">
          </div>
          <div class="column is-2">
            <input class="button" type="submit" value="Search" @click="getbannedusers">
          </div>
        
        </div>

        <div
          style="
            height: 70%;
            min-height: 800px;
            overflow-y: auto;
            overflow-x: hidden;
          "
        >
          <table class="table">
            <thead>
              <tr>
                <th>User_id</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Join date</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>User_id</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Join date</th>
                <th></th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="user in bannedusers" :key="user.user_id">
                <td>{{ user.user_id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.join_date }}</td>
                <td>
                  <div
                    class="button is-danger"
                    @click="banuser(user.user_id)"
                    v-if="user.isbanned == 0"
                  >
                    แบนผู้ใช้นี้
                  </div>
                  <div
                    class="button is-link"
                    @click="unbanuser(user.user_id)"
                    v-else-if="user.isbanned == 1"
                  >
                    ปลดแบนผู้ใช้นี้
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- panel 3 -->
      <div class="column is-8" v-if="panel == 3">
        <div
        class="column is-paddingless is-3-desktop is-4-tablet is-2-mobile sidebar-user hero"
        style="height: 950px"
      >
        <div class="columns top-field">
          <div
            class="column is-half chatgroup"
            style="color: white; cursor:pointer;"
            @click="reportgroup = 'product'"
            :class="{ active: reportgroup == 'product'}"
          >
            สินค้่า
          </div>
          <div
            class="column is-half chatgroup"
            style="color: white ;cursor:pointer;"
            @click="reportgroup = 'system'"
            :class="{ active: reportgroup == 'system' }"
          >
            ระบบ
          </div>
        </div>

        <!-- report list  -->
        <div style="overflow: auto; max-height:90%">
          <!-- product group -->
          <div class="list" v-if="reportgroup == 'product'">
            <div style="cursor:pointer;"
              class="list-item box mb-4"
              v-for="report in productreports" :key="report.report_id"
              @click="select_report(report)"
            >
              <div class="media">
                <div class="media-left">
                 
                </div>
                <div class="media-content is-hidden-mobile">
                  <div class="content">
                    <p>
                      <strong>{{report.report_title }}</strong>
                      <br /><small class="has-text-weight-semibold">@{{
                        report.username
                      }}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- system group-->
          <div class="list" v-if="reportgroup == 'system'">
            <div style="cursor:pointer;"
              class="list-item box mb-4"
              v-for="report in systemreports" :key="report.report_id"
              @click="select_report(report)"
            >
              <div class="media">
                <div class="media-left">
                 
                </div>
                <div class="media-content is-hidden-mobile">
                  <div class="content">
                    <p>
                      <strong>{{report.report_title }}</strong>
                      <br /><small class="has-text-weight-semibold">@{{
                        report.username
                      }}</small>
                    </p>
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
import axios from "axios";
export default {
  name: "AdminView",
  data() {
    return {
      panel: 1,
      allusers: [],
      bannedusers: [],
      search: "",
      systemreports:[],
      productreports:[],
      reportgroup:'product'
      
    };
  },
  created() {
    this.getallusers();
    this.getbannedusers();
    this.getproductreports();
    this.getsystemreports()
  },
  methods: {
    getallusers() {
      console.log("test");
      axios
        .get(`http://localhost:3000/getuser/allusers`, {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.allusers = response.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getbannedusers() {
      axios
        .get(`http://localhost:3000/getuser/bannedusers`, {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.bannedusers = response.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getsystemreports(){
      axios.get('http://localhost:3000/reports/1',{})
      .then((response)=>{
        this.systemreports = response.data.reports
        console.log("get system reports")

      })
      .catch((err) => {
          console.log(err);
        });
    },
    getproductreports(){
      axios.get('http://localhost:3000/reports/2',{})
      .then((response)=>{
        this.productreports = response.data.reports

      })
      .catch((err) => {
          console.log(err);
       
        });
    },
    banuser(userid) {
      axios
        .put(`http://localhost:3000/ban/${userid}`)
        .then((res) => {
          console.log(res);
          this.getbannedusers();
          this.getallusers();
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert("แบนผู้ใช้ไอดี : " + userid + " ไม่สำเร็จ");
        });
    },
    unbanuser(userid) {
      axios
        .put(`http://localhost:3000/unban/${userid}`)
        .then((res) => {
          console.log(res);
          this.getbannedusers();
          this.getallusers();
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert("แบนผู้ใช้ไอดี : " + userid + " ไม่สำเร็จ");
        });
    },
  },
};
</script>
    
    <style>
</style>
    