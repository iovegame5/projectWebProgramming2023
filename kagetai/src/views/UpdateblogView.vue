<template>
    <div class="container is-widescreen">

        <section class="hero">
            <div class="hero-body">
                <p class="title has-text-white">แก้ไขรายละเอียดสินค้า</p>
            </div>
        </section>
        <section class="px-6">
            <h1 class="is-size-4 has-text-white"> Update Image</h1>

            <div v-if="now_images.length > 0" class="columns is-multiline">
                <div v-for=" image in now_images" :key="image.product_image_id" class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img :src="'http://'+backendIP+':3000' + image.path_image" alt="Placeholder image" />
                            </figure>
                        </div>
                        <footer class="card-footer">
                            <a @click="deleteCurrentImage(image.product_image_id)"
                                class="card-footer-item has-text-danger">Delete</a>
                            <span @click="selectMainId = image.product_image_id" class="icon card-footer-item">
                                <i v-if="selectMainId === image.product_image_id" class="fas fa-star mt-5"></i>
                                <i v-else class="far fa-star mt-5"></i>
                            </span>
                        </footer>
                    </div>
                </div>
            </div>
            <div class="control">
                <button @click="updateMainImage()" class="button is-link mb-2">Update Main</button>
            </div>




            <h1 class="is-size-4 has-text-white">รูปสินค้าใหม่</h1>
            <div class="file">
                <label class="file-label">
                    <input class="file-input" multiple type="file" accept="image/png, image/jpeg, image/webp"
                        @change="selectImages" />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                    </span>
                </label>
            </div>
             
            <div v-if="images" class="columns is-multiline mt-2">
                <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img :src="showSelectImage(image)" alt="Placeholder image" />
                            </figure>
                        </div>
                        <footer class="card-footer">
                            <a @click="deleteSelectImage(index)" class="card-footer-item has-text-white">Delete</a>
                        </footer>
                    </div>
                </div>
            </div>
            <template >
                  <p class="help is-danger" v-if="!$v.images.images">
                    ขนาดไฟล์ใส่ได้ไม่เกิน 3 Mb
                  </p>
                  <p class="help is-danger" v-if="!$v.images.imageLength">
                    ใส่รูปอย่างน้อย 1 รูป
                  </p>
            
                </template>


            <div class="field mt-5">
                <label class="label has-text-white">ชื่อสินค้า</label>
                <div class="control">
                    <input v-model="$v.product_title.$model" :class="{ 'is-danger': $v.product_title.$error }" class="input"
                        type="text" />
              
                </div>
                <template v-if="$v.product_title.$error"> 
                  <p class="help is-danger" v-if="!$v.product_title.required">
                    กรอกช่องนี้
                  </p>

                  <p class="help is-danger" v-if="!$v.product_title.minLength">
                    ชื่อสินค้าต้องมีอย่างน้อย 10 ตัวอักษร
                  </p>
                  <p class="help is-danger" v-if="!$v.product_title.maxLength">
                    ชื่อสินค้ามีได้มากสุด 30 ตัวอักษร
                  </p>
                  </template>
            </div>
            <div class="field mt-5">
                <label class="label has-text-white">ราคาสินค้า</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      value=""
                      v-model="$v.product_price.$model"
                      :class="{ 'is-danger': $v.product_price.$error }"/>
                      
                    <template v-if="$v.product_price.$error"> 
                    <p class="help is-danger" v-if="!$v.product_price.required">
                      กรอกราคาสินค้า
                    </p>
                    <p class="help is-danger" v-if="!$v.product_price.priceWrong">
                      ราคาต้องเป็นตัวเลขเท่านั้น
                    </p>
                  </template>
                  </div>
            </div>

            <div class="field">
                <label class="label has-text-white">รายละเอียดสินค้า</label>
                <div class="control">
                    <textarea v-model="$v.product_detail.$model" :class="{ 'is-danger': $v.product_detail.$error }" class="textarea"
                        type="text" ></textarea>
              
                </div>
                <template  v-if="$v.product_detail.$error">
                    <p
                      class="help is-danger"
                      v-if="!$v.product_detail.required"
                    >
                      กรอกช่องนี้
                    </p>
                    <p
                      class="help is-danger"
                      v-if="!$v.product_detail.minLength"
                    >
                      รายละเอียดต้องมีอย่างน้อย 30 ตัวอักษร
                    </p>
                    <p
                      class="help is-danger"
                      v-if="!$v.product_detail.maxLength"
                    >
                      รายละเอียดมีได้มากสุด 150 ตัวอักษร
                    </p>
                  </template>
            </div>




            <div class="field is-grouped mb-6">
                <div class="control">
                    <button @click="submitBlog()" class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import axios from "axios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import backendIP from "../../backendIP";



function priceWrong(value) {
    if (!value.match(/^[0-9]/) && value.length > 0) {
        return false;
    }

    return true;
}

function imageSizes(value) {
    if (value != undefined) {
        if (this.imageSize > 3 * 1024 * 1024) {
            return false;
        }
    }
    console.log(value)
    console.log(typeof value);
    return true;
}
function imageLength() {
    if (this.images.length < 1 ) {
        return false;
    }
    return true;
}


export default {
    name: "UpdateView",
    props: ["user", "token"],
    data() {
        return {
            now_images: [],
            images: [],
            product_title: "",
            product_price: '',
            product_detail: "",
            imageSize: 0,
            selectMainId: null,
            product:[],
            backendIP: backendIP

        };
    },
    validations: {
        product_title: {
            required: required,
            minLength: minLength(10),
            maxLength: maxLength(30),
        },
        product_price: {
            required: required,
            priceWrong: priceWrong,
        },
        product_detail: {
            required: required,
            minLength: minLength(30),
            maxLength: maxLength(150),
        },

        images: {
            images: imageSizes,
            imageLength: imageLength,
            
        },
    },
    created() {
        this.getDetail()

    },
    mounted() {
        this.getDetail(this.$route.params.id);
    },
    methods: {
        getDetail(productId) {
            axios
                .get(`http://`+backendIP+`:3000/products/detail/${productId}`)
                .then((response) => {
                    this.product = response.data.product
                    this.now_images = response.data.images;
                    this.product_title = response.data.product.product_name
                    this.product_price = String(response.data.product.product_price)
                    this.product_detail = response.data.product.product_detail
                    this.selectMainId = this.images.filter((x) => x.main === 1)[0].product_image_id;
                    console.log(this.product_price)
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        selectImages(event) {
      this.images = event.target.files;
      this.images = Array.from(this.images);
      let number = 0;
      console.log(this.images);

      this.images.forEach((value) => {
        console.log(value);
        number += value.size;
      });
      this.imageSize = number;
      // this.imageSize = this.images[0].size
      console.log(this.imageSize / (1024 * 1024) + "Mb");
    },
        showSelectImage(image) {
            return URL.createObjectURL(image);
        },
        deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
      let number = 0;
      this.images.forEach((image) => {
        number += image.size;
      });
      this.imageSize = number;
      console.log(this.imageSize / (1024 * 1024));
    },

        updateMainImage() {

            axios
                .put(
                    `http://`+backendIP+`:3000/products/setmain/${this.$route.params.id}/${this.selectMainId}`
                )
                .then((response) => {
                    console.log(response);
                    this.$router.push({ path: "/products" });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteCurrentImage(imageId) {
            console.log(imageId)
            let comfirmDeleteImage = confirm("คุณต้องการลบรูปใช่ไหม");
            if (comfirmDeleteImage == true) {
                axios
                    .delete("http://"+backendIP+":3000/image/" + imageId)
                    .then((response) => {
                        console.log("delete image ", response);
                        location.reload();
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        ownercheck(){
            
            axios
        .post(`http://`+backendIP+`:3000/productcheck/${this.$route.params.id}/${this.user.user_id}`, {
        })
        .then((response) => {
          console.log(response.data);
        
         if(response.data.check == false){
            alert("คุณไม่ได้เป็นเจ้าของสินค้านี้ ไม่สามารถแก้ไขได้")
            this.$router.push({ path: "/" });
        }
        })
        .catch((err) => {
          console.log(err.response.data.check);
          if(err.response.data.check == false){
            alert("ไม่มีสินค้า ID นี้")
            this.$router.push({ path: "/" });
          }
          else{
            alert(err.message)
            this.$router.push({ path: "/" });
            
          }
        });
        },

        submitBlog() {
            if(this.product.user_id != this.user.user_id){
           alert("คุณไม่ได้เป็นเจ้าของสินค้านี้ ไม่สามารถแก้ไขได้")
           this.$router.push({ path: "/" });
           return;
      }
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
    

      if (this.$v.$invalid) {
        alert("กรุณาใส่ข้อมูลให้ถูกต้อง")
        return;
      } else {
        let formData = new FormData();
        formData.append("pd_name", this.product_title);
        formData.append("pd_price", this.product_price);
        formData.append("pd_detail", this.product_detail);
        formData.append("pd_id", this.$route.params.id);
        formData.append("user_id", this.user.user_id);
        this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      console.log(typeof this.images)        
        axios
          .put("http://"+backendIP+":3000/update", formData)
          .then((res) => {
            this.$router.push({ name: "ProductsView" });
            console.log(res);
          })
          .catch((e) => console.log(e.response.data));
      }
        },
    },
};
</script>
  
<style></style>