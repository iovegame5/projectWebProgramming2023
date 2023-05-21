<template>
  <div>
    

    <div>
      <div class="register-container">
        <div class="register">
          <div class="field">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <label class="label">ชื่อสินค้า</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="ชื่อสินค้า"
                      v-model="$v.pd_name.$model"
                    />
                  </div>
                  <template > 
                  <p class="help is-danger" v-if="!$v.pd_name.required">
                    กรอกช่องนี้
                  </p>

                  <p class="help is-danger" v-if="!$v.pd_name.minLength">
                    ชื่อสินค้าต้องมีอย่างน้อย 10 ตัวอักษร
                  </p>
                  <p class="help is-danger" v-if="!$v.pd_name.maxLength">
                    ชื่อสินค้ามีได้มากสุด 30 ตัวอักษร
                  </p>
                  </template>

                  <!-- <p class="help is-success">This username is available</p> -->
                </div>
                <div class="field">
                  <label class="label">ประเภทสินค้า</label>
                  <div class="select" >
                    <select v-model='$v.pd_type.$model' :class="{ 'is-danager': $v.pd_type.$error }">>
                      <option selected value="0">ประเภท</option>
                      <option value="1">กีตาร์โปร่ง</option>
                      <option value="2">กีตาร์ไฟฟ้า</option>
                      <option value="3">เอฟเฟค</option>
                      <option value="4">แอมป์</option>
                    </select>
                  </div>
                  
              
                            <p class="help is-danger" v-if="!$v.pd_type.pdtypecor"> โปรดเลือกประเภท</p>


                
                </div>

                <div class="field">
                  <label class="label">ราคา</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="ระบุราคาของสินค้า"
                      value=""
                      v-model="$v.pd_price.$model"
                    />
                      
                    <template > 
                    <p class="help is-danger" v-if="!$v.pd_price.required">
                      กรอกราคาสินค้า
                    </p>
                    <p class="help is-danger" v-if="!$v.pd_price.pd_price">
                      ราคาต้องเป็นตัวเลขเท่านั้น
                    </p>
                  </template>
                  </div>
                </div>

                <div class="field">
                  <label class="label">รายละเอียดสินค้า</label>
                  <div class="control">
                    <textarea
                      class="textarea"
                      name=""
                      id=""
                      cols="30"
                      rows="3"
                      v-model="$v.pd_description.$model"
                    ></textarea>

                    <template>
                    <p
                      class="help is-danger"
                      v-if="!$v.pd_description.required"
                    >
                      กรอกช่องนี้
                    </p>
                    <p
                      class="help is-danger"
                      v-if="!$v.pd_description.minLength"
                    >
                      รายละเอียดต้องมีอย่างน้อย 30 ตัวอักษร
                    </p>
                    <p
                      class="help is-danger"
                      v-if="!$v.pd_description.maxLength"
                    >
                      รายละเอียดมีได้มากสุด 150 ตัวอักษร
                    </p>
                  </template>
                  </div>
                </div>

                <div class="field">
                  <label><strong>รูปสินค้า</strong></label>


                  <div class="file">
                    <label class="file-label">
                      <input
                        class="file-input"
                        multiple
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        @change="selectImages"
                      />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div class="field mb-2">
                  <div v-if="images" class="columns is-multiline">
                    <div
                      v-for="(image, index) in images"
                      :key="image.id"
                      class="column is-one-quarter"
                    >
                      <div class="card">
                        <div class="card-image">
                          <figure class="image is-4by3">
                            <img
                              :src="showSelectImage(image)"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <footer class="card-footer">
                          <a
                            @click="deleteSelectImage(index)"
                            class="card-footer-item has-text-danger is-size-7"
                            >Delete</a
                          >
                        </footer>
                      </div>
                    </div>
                  </div>
                  <template>
                  <p class="help is-danger" v-if="!$v.images.images">
                    ขนาดไฟล์ใส่ได้ไม่เกิน 3 Mb
                  </p>
                  <p class="help is-danger" v-if="!$v.images.imageLength">
                    ใส่รูปอย่างน้อย 3 รูป
                  </p>
                </template>
                </div>
                <br>
                <div class="field is-grouped">
                  <div class="control">
                    <button @click="submitProduct" class="button is-link">
                      Submit
                    </button>
                  </div>
                  <div class="control">
                    <a href="index.html">
                      <button class="button is-link is-light">Cancel</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <footer class="footer is-fixed-bottom">
            <div class="columns">
                <div class="column is-one-quarter">test</div>
                <div class="column is-one-quarter">test</div>
                <div class="column is-one-quarter">test</div>
                <div class="column is-one-quarter">test</div>
            </div>
        </footer> -->
      <div
        style="
          border-top: 1px solid rgb(120, 120, 120);
          margin: 2rem 2rem 2rem 2rem;
        "
      ></div>
     
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
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
  console.log(value);
  return true;
}
function imageLength() {
  if (this.images.length < 3) {
    return false;
  }
  return true;
}
function pdtypecor(){
  if (this.pd_type == 0){
    return false
  }
  else return true
}

export default {
  name: "AddProduct",
  props: ['user'],
  data() {
    return {
      pd_name: "",
      pd_type: 0,
      pd_price: "",
      pd_description: "",
      images: [],
      imageSize: 0,
    };
  },
  validations: {
    pd_name: {
      required: required,
      minLength: minLength(10),
      maxLength: maxLength(30),
    },
    pd_price: {
      required: required,
      pd_price: priceWrong,
    },
    pd_description: {
      required: required,
      minLength: minLength(30),
      maxLength: maxLength(150),
    },

    images: {
      images: imageSizes,
      imageLength: imageLength,
    },
    pd_type:{
      required,
      pdtypecor: pdtypecor
    }
  },
  methods: {
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
      // for preview only
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
  submitProduct() {
    console.log(this.user.isbanned)
    if(this.user.isbanned == 1){
      return alert("คุณถูกแบนไม่สามารถเพิ่มสินค้าได้")
    }
    else{
  
      if (this.$v.$invalid) {
        alert("กรุณาใส่ข้อมูลให้ถูกต้อง")
        return;
      } else {
        let formData = new FormData();
        formData.append("pd_name", this.pd_name);
        formData.append("pd_type", this.pd_type);
        formData.append("pd_price", this.pd_price);
        formData.append("pd_detail", this.pd_description);
        formData.append("user_id", this.user.user_id);
        this.images.forEach((image) => {
          formData.append("myImage", image);
        });

        axios
          .post("http://localhost:3000/add", formData)
          .then((res) => {
            this.$router.push({ name: "home" });
            console.log(res);
          })
          .catch((e) => console.log(e.response.data));
      }
    }
  },
  },
};
</script>