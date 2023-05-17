
<template>
  <div>
    <NavBar></NavBar>

    <div class="columns is-mobile" style="max-height:900px;">
      <div
        class="column is-paddingless is-3-desktop is-4-tablet is-2-mobile sidebar-user hero "
      style="height:900px">
        <div class="columns top-field">
          <div
            class="column is-half chatgroup"
            style="color: white"
            @click="chatgroup = 'buyer'"
            :class="{ active: chatgroup == 'buyer' }"
          >
            ผู้ซื้อ
          </div>
          <div
            class="column is-half chatgroup"
            style="color: white"
            @click="chatgroup = 'seller'"
            :class="{ active: chatgroup == 'seller' }"
          >
            ผู้ขาย
          </div>
        </div>

        <!-- chat list  -->
        <div style="overflow: auto">
          <!-- seller chat list -->
          <div class="list" v-if="chatgroup == 'seller'">
            <div
              class="list-item box mb-2"
              v-for="room in seller_rooms"
              :key="room.room_id "
              @click="select_room(room)"
            >
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48 is-32x32-mobile">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Image"
                      class="is-rounded"
                    />
                  </figure>
                </div>
                <div class="media-content is-hidden-mobile">
                  <div class="content">
                    <p>
                      <strong>{{ room.target_name }}</strong>
                      <br /><small class="has-text-weight-semibold"
                        >1 new message</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- buyer chat list -->

          <div class="list" v-if="chatgroup == 'buyer'">
            <div
              class="list-item box"
              v-for="room in buyer_rooms"
              :key="room.room_id"
              @click="select_room(room)"
            >
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48 is-32x32-mobile">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Image"
                      class="is-rounded"
                    />
                  </figure>
                </div>
                <div class="media-content is-hidden-mobile">
                  <div class="content">
                    <p>
                      <strong>{{ room.target_name }}</strong>
                      <br /><small class="has-text-weight-semibold"
                        >1 new message</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="column is-9-desktop is-8-tablet is-10-mobile is-paddingless"
        v-if="this.current_room != null" style="max-height:900px"
      >
        <nav class="navbar has-shadow user-nav">
          <div class="navbar-start">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Image"
                    class="is-rounded"
                  />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong
                      style="color: white"
                      v-if="this.current_room != null"
                      >{{ this.current_room.target_name }}</strong
                    >
                    <br />
                    <small>{{ this.current_room.target_username }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <a class="navbar-item">
              <span class="icon is-size-2">
                <svg
                  class="bi bi-gear-fill"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 100-5.86 2.929 2.929 0 000 5.858z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <a class="navbar-item">
              <span class="icon is-size-2">
                <svg
                  class="bi bi-info-circle-fill"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
          </div>
        </nav>

        <!-- Main Content columns: One for chat window another for profile -->
        <div class="columns"  style="max-height:825px;">
          <div
            class="column is-8 is-12-mobile is-flex hero is-fullheight message-window"
          >
            <div
              class="chat-messages"
              ref="chat"
              style="width: 100%; height:80%; overflow-y: auto; overflow-x: hidden"
            >
              <div v-for="message in messages" :key="message.message_id">
                <!-- v-if recive messages -->
                <div class="columns ml-2 mt-2" v-if="message.sender_id != user_id">
                  <div class="column is-6" style="max-width: 40%">
                    <div class="message-text box">
                      {{ message.message }}
                    </div>
                  </div>
                  <div class="column is-2" style="position: relative">
                    <p
                      style="
                        color: rgb(205, 205, 205);
                        font-size: 14px;
                        bottom: 10px;
                        position: absolute;
                      "
                    >
                      {{ message.sent_time }}
                    </p>
                  </div>
                </div>

                <!-- v-if sent message -->
                <div class="columns ml-2 mt-2" style="align-items: end" v-else>
                  <div class="column is-6"></div>
                  <div class="column is-1" style="position: relative">
                    <p
                      style="
                        color: rgb(205, 205, 205);
                        font-size: 14px;
                        bottom: 10px;
                        position: absolute;
                      "
                    >
                    {{ message.sent_time }}
                    </p>
                  </div>
                  <div class="column is-5" style="max-width: 40%">
                    <div
                      class="message-text box"
                      style="background: rgb(194, 240, 194); width: auto"
                    >
                      {{ message.message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-item-2">
              <form>
                <div class="field has-addons">
                  <div class="control">
                    <input
                      v-model="messagetxt"
                      class="input"
                      type="text"
                      placeholder="Type your message..."
                    />
                  </div>
                  <div class="control">
                    <button type="submit" class="button" @click="sent_message()">
                      <svg height="36px" width="36px" viewBox="0 0 36 36">
                        <g fill="none" fill-rule="evenodd">
                          <g>
                            <polygon points="0 36 36 36 36 0 0 0"></polygon>
                            <path
                              d="M31.1059281,19.4468693 L10.3449666,29.8224462 C8.94594087,30.5217547 7.49043432,29.0215929 8.17420251,27.6529892 C8.17420251,27.6529892 10.7473302,22.456697 11.4550902,21.0955966 C12.1628503,19.7344961 12.9730756,19.4988922 20.4970248,18.5264632 C20.7754304,18.4904474 21.0033531,18.2803547 21.0033531,17.9997309 C21.0033531,17.7196073 20.7754304,17.5095146 20.4970248,17.4734988 C12.9730756,16.5010698 12.1628503,16.2654659 11.4550902,14.9043654 C10.7473302,13.5437652 8.17420251,8.34697281 8.17420251,8.34697281 C7.49043432,6.9788693 8.94594087,5.47820732 10.3449666,6.1775158 L31.1059281,16.553593 C32.298024,17.1488555 32.298024,18.8511065 31.1059281,19.4468693"
                              fill="#363636"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="column is-hidden-mobile sidebar-profile pt-2" >
            <div class="card">
                <div class="card-image">
                    <figure class="image is-1by1">
                        <img  alt="Placeholder image" src="">
                    </figure>
                </div>
                <div class="card-content">
                    <div clas="media">

                        <div class="media-content">
                            <p class="title is-4">product_name</p>
                            <p class="subtitle is-7">@username</p>
                            <p class="subtitle is-5 has-text-success">product.product_price บาท</p>
                        </div>

                    </div>
                    <div class="content">
                        <p class="subtitle is-7">product.product_detail</p>
                      
                    </div>
                    <div style="display:flex; justify-content: space-between;">
                        <router-link class="button" :to="``">รายละเอียด</router-link>
                    
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
    <FooterCom></FooterCom>
  </div>
</template>
  <script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FooterCom.vue";
import axios from "axios";
import io from 'socket.io-client';
export default {
  name: "ChatView",

  data() {
    return {
      seller_rooms: [],
      buyer_rooms: [],
      messages: [],
      current_room: null,
      messagetxt: "",
      socket: {},
      eiei: null,
      chatgroup: "seller",
      user_id:null,
    };
  },
  components: {
    NavBar,
    FooterCom,
    // images:[
    //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]
  },
  methods: {
    getRooms() {
      // mockup user_id = 2
      axios
        .get(`http://localhost:3000/${this.user_id}/chat`, {})
        .then((response) => {
          this.seller_rooms = response.data.seller_rooms;
          this.buyer_rooms = response.data.buyer_rooms;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    select_room(room) {
        this.current_room = room;
      console.log(this.current_room);
          // Emit the 'joinRoom' event to join the chat room
      this.socket.emit('joinRoom', room.room_id, this.user_id);
      axios
        .get(`http://localhost:3000/chat/${room.room_id}/messages`)
        .then((res) => {
          this.messages = res.data.messages;
          console.log(res.data.messages);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sent_message(){
        let time = new Date()
        time = time.toISOString()
        console.log(time)
        const messageData = {
        roomId: this.current_room.room_id,
        message: {
          sender_id: this.user_id,
          receiver_id: this.current_room.target_id,
          content: this.messagetxt,
          room_id :this.current_room.room_id,
          sent_time: time,
        },
      };

      this.socket.emit('message', messageData);
      this.socket.on('message', (data) => {
        this.messages = data.messages
  // Handle the received message
});
      // Clear the input field
      this.messagetxt = '';
    },
  },
  mounted() {
    this.user_id = this.$route.params.userid;
    this.getRooms();
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on('message', (data) => {
        this.messages = data.messages
  // Handle the received message
});
  },
};
</script>