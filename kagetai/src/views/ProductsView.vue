<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
<template>
    <div>
        <NavBar></NavBar>
        <div class="columns" style="min-height: 100%;">
            <div class="column is-2 pt-6">
                <aside class="menu">
                    <p class="menu-label has-text-white">
                        ประเภทสินค้า
                    </p>
                    <ul class="menu-list">
                        <li>
                            <div class="select">
                                <select v-model="selected_pt">
                                    <option value="0" selected="selected">ทั้งหมด</option>
                                    <option v-for="item in product_type" :key="item.id" :value="item.id">{{item.name}}
                                    </option>
                                </select>
                            </div>
                        </li>
                    </ul>
                    <p class="menu-label has-text-white">
                        ราคา
                    </p>
                    <ul class="menu-list has-background-white">

                    </ul>

                </aside>
            </div>
        <div class="column is-1"></div>
        <div class="column is-8 pt-5">
            <h1 class="is-size-4 mb-4 mt-4 has-text-white">จำนวนสินค้า (products.length)</h1>
            <div class="container is-fullhd mb-6">
                <h1 class="title mb-6 mt-6 has-text-white" v-if="products.length==0">ยังไม่มีสินค้า</h1>
                <div class="is-multiline columns" v-if="products.length!=0">
                    <!-- card column -->
                    <div  class="column is-one-third"> 
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-1by1">
                                    <img  alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div clas="media">

                                    <div class="media-content">
                                        <p class="title is-4">item.name</p>
                                        <p class="subtitle is-7">@username</p>
                                        <p class="subtitle is-5 has-text-success">item.product_price บาท</p>
                                    </div>

                                </div>
                                <div class="content">
                                    <p class="subtitle is-7">item.product_detail</p>
                                  
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
   

</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  data() {
        return {
          products:[{dd:"ss"}],

        }
    },
}
</script>


