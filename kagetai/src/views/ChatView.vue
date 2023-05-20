
<template>
  <div>
    <div class="columns is-mobile" style="">
      <div
        class="column is-paddingless is-3-desktop is-4-tablet is-2-mobile sidebar-user hero"
        style="height: 950px"
      >
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
              class="list-item box mb-4"
              v-for="room in seller_rooms"
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
          <!-- buyer chat list -->

          <div class="list" v-if="chatgroup == 'buyer'">
            <div
              class="list-item box mb-4"
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
                      <br /><small class="has-text-weight-semibold">{{
                        room.lastmsgtxt
                      }}</small>
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
        v-if="this.current_room != null"
        style="height: 900px"
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
        <div class="columns" style="max-height: 825px">
          <div
            class="column is-12 mb-4 is-flex hero  message-window"
          >
            <div
              class="chat-messages"
              ref="chatContainer"
              style="
                width: 100%;
                height: 80%;
                overflow-y: auto;
                overflow-x: hidden;
              "
            >
              <div v-for="message in messages" :key="message.message_id">
                <!-- v-if recive messages -->
                <div
                  class="columns ml-2 mt-2"
                  v-if="message.sender_id != user.user_id"
                >
                  <div class="column is-pulled-left" style="max-width: 40%">
                    <div class="message-text box is-pulled-left">
                      {{ message.message }}
                    </div>
                  </div>
                  <div class="column" style="position: relative">
                    <p
                    class="is-pulled-left"
                      style="
                        color: rgb(205, 205, 205);
                        font-size: 14px;
                        bottom: 10px;
                        left:0px;
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
                  <div class="column is-1 " style="position: relative">
                    <p class="is-pulled-right"
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
                  <div class="column is-full " style="max-width: 40%">
                   
                    <div
                      class="message-text box is-pulled-right"
                      style="background: rgb(194, 240, 194); "
                    >
                      {{ message.message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-item-2 mb-4">
              <form @submit.prevent="sent_message">
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
                    <button style=""
                      type="submit"
                      class="button ml-4"
                      @click="sent_message()"
                    >
                    send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
         
        </div>
      </div>
    </div>

  </div>
</template>
  <script>
// @ is an alias to /src


import axios from "axios";
import io from "socket.io-client";
export default {
  name: "ChatView",
  props: ["user"],

  data() {
    return {
      seller_rooms: null,
      buyer_rooms: [],
      messages: [],
      current_room: null,
      messagetxt: "",
      socket: {},
      eiei: null,
      chatgroup: "buyer",
    };
  },
 
  methods: {
    getRooms() {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/${this.user.user_id}/chat`)
          .then((response) => {
            this.seller_rooms = response.data.seller_rooms;
            this.buyer_rooms = response.data.buyer_rooms;
            resolve(); // ทำให้เสร็จก่อนค่อยไปทำอันอื่น
          })
          .catch((error) => {
            reject(error); // Reject the promise if there is an error
          });
      });
    },

    async select_room(room) {
      this.current_room = room;
      console.log(this.current_room);
      // Emit the 'joinRoom' event to join the chat room
      this.socket.emit("joinRoom", room.room_id, this.user.user_id);
      await new Promise((resolve, reject) => {
        axios
        .get(`http://localhost:3000/chat/${room.room_id}/messages`)
        .then((res) => {
          this.messages = res.data.messages;
          console.log(res.data.messages);
          resolve()
          
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
   
      });
      this.scrollToBottom()

    },
    async sent_message() {
      if (this.messagetxt !== "") {
        let time = new Date();
        time = time.toISOString();
        console.log(time);
        const messageData = {
          roomId: this.current_room.room_id,
          message: {
            sender_id: this.user.user_id,
            receiver_id: this.current_room.target_id,
            content: this.messagetxt,
            room_id: this.current_room.room_id,
            sent_time: time,
          },
        };

        await new Promise((resolve) => {
          this.socket.on("message", (data) => {
            this.messages = data.messages;
            resolve();
            // Handle the received message
          });

          this.socket.emit("message", messageData);
        });

        // Clear the input field
        this.messagetxt = "";
        this.scrollToBottom()
        
      }
    },

    scrollToBottom() {
      const container = this.$refs.chatContainer;
      console.log(container);
      container.scrollTop = container.scrollHeight;
    },
  },
   mounted() {
    this.getRooms()
      .then(async () => {
        let current_room_id = Number(this.$route.query.current_room_id);
        if (current_room_id) {
          console.log("current_room_id:", current_room_id);
          this.socket.emit("joinRoom", current_room_id, this.user.user_id);
          this.current_room = this.seller_rooms.find((value) => {
            return value.room_id === current_room_id;
          });
          await new Promise((resolve, reject) => {
        axios
        .get(`http://localhost:3000/chat/${current_room_id}/messages`)
        .then((res) => {
          this.messages = res.data.messages;
          console.log(res.data.messages);
          resolve()
          
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
   
      });
      this.scrollToBottom()
          console.log("this.current_room:", this.current_room);
        } else {
          console.log("current_room_id not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // show current room in chat page
    let current_room_id = Number(this.$route.query.current_room_id);
    if (current_room_id) {
      console.log("current_room_id:", current_room_id);
      this.socket.emit("joinRoom", current_room_id, this.user.user_id);
      this.current_room = this.seller_rooms.find((value) => {
        return value.room_id === current_room_id;
      });

      console.log("this.current_room:", this.current_room);
    } else {
      console.log("current_room_id not found");
    }
  },
  created() {
    this.socket = io("http://localhost:3000");
   
  },
};
</script>