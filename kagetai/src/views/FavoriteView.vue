<template>
  <div>
    <div class="column is-12 pt-5">
      <h1 class="is-size-4 mb-4 mt-4 has-text-white">
        รายการโปรด ({{ this.favorite.length }})
      </h1>
      <div class="container is-fullhd mb-6" style="min-height: 600px">
        <h1
          class="title mb-6 mt-6 has-text-white"
          style="justify-content: center; text-align: center"
          v-if="favorite.length == 0"
        >
          ยังไม่มีรายการสิ่งที่ชอบ
        </h1>
        <div class="is-multiline columns">
          <!-- card column -->
          <div
            class="column is-one-third"
            v-for="fav in favorite"
            :key="fav.id"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-1by1">
                  <img
                    alt="Placeholder image"
                    :src="'http://localhost:3000/' + fav.path_image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div clas="media">
                  <div class="media-content">
                    <p class="title is-4">{{ fav.product_name }}</p>
                    <p class="subtitle is-7">@{{fav.username}}</p>
                    <p class="subtitle is-5 has-text-success">
                      {{ fav.product_price }} บาท
                    </p>
                  </div>
                </div>
                <div class="content">
                  <p class="subtitle is-7">{{ fav.product_detail }}</p>
                </div>

                <div style="display: flex; justify-content: space-between">
                  <button
                    class="button is-danger"
                    @click="deletefav(`${fav.product_id}`, `${user.user_id}`)"
                  >
                    ลบรายการโปรด
                  </button>

                  <div
                      v-if="fav.user_id != user.user_id"
                      class="button"
                      @click="chatwith(fav.user_id)"
                    >
                      แชท
                    </div>



                  <router-link class="button" :to="`/products/detail/${fav.product_id}`">รายละเอียด</router-link>

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
import axios from "@/plugins/axios";

export default {
  name: "HomeView",
  props: ["user"],
  data() {
    return {
      favorite: [],
    };
  },

  methods: {
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
    getfav(id) {
      axios
        .get(`http://localhost:3000/favorite/${id}`)
        .then((response) => {
          console.log(response.data.favorites);
          this.favorite = response.data.favorites;
          console.log(this.favorite.product_detail);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletefav(proid, userid) {
      axios
        .delete(`http://localhost:3000/favorite/${proid}/${userid}`)
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shortDetail(detail) {
      if (detail.length > 100) {
        return detail.substring(0, 97) + "...";
      }
      return detail;
    },
  },
  mounted() {
    // this.getfav(this.$route.params.user_id);
    this.getfav(this.user.user_id)
  },
};
</script>