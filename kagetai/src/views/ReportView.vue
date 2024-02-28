<template>
    <div class="container">
        <div class="columns" style="height: 1200px;">
            <div class="column">
                <div class="tile mb-6">
                    <article class="tile is-child notification " style="justify-content: center; text-align: center;">
                        <p class="is-size-2 ">
                            <strong>ร้องเรียน</strong>
                        </p>
                    </article>

                </div>

                <form class="box">
                    <div class="field mb-6">
                        <label class="label">Title</label>
                        <div class="control">
                            <input v-model='$v.title.$model' :class="{ 'is-danager': $v.title.$error }"
                                class="input is-info" type="text" />
                        </div>


                        <template v-if="$v.title.$error">
                            <p class="help is-danger" v-if="!$v.title.required"> โปรดกรอกหัวข้อ</p>
                            <p class="help is-danger" v-if="!$v.title.minLength"> หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร</p>
                            <p class="help is-danger" v-if="!$v.title.maxLength"> หัวข้อมีได้มากสุด 20 ตัวอักษร </p>

                        </template>

                    </div>


                    <div class="field mb-6">
                    <label class="label"> Report type </label>
                    <div class="select is-rounded " >
                        
                        <select class="is-focused"  v-model='$v.report_type.$model' :class="{ 'is-danager': $v.report_type.$error }" >
                            <option selected value>เลือก</option>
                            <option v-for="item in loop_type" :key="item.report_type_id" :value="item.report_type_id">{{item.report_type_name}}</option>
                        </select>

                        <template v-if="$v.report_type.$error">
                            <p class="help is-danger" v-if="!$v.report_type.required"> โปรดเลือกประเภท</p>


                        </template>
                    </div>

                </div>

                    <div class="field">
                        <label class="label">Detail</label>
                        <div class="control">
                            <textarea v-model='$v.detail.$model' :class="{ 'is-danager': $v.detail.$error }" type="text"
                                class="textarea is-info"></textarea>
                        </div>

                        <template v-if="$v.detail.$error">
                            <p class="help is-danger" v-if="!$v.detail.required"> โปรดกรอกรายละเอียด</p>
                            <p class="help is-danger" v-if="!$v.detail.minLength"> รายละเอียดต้องมีอย่างน้อย 5 ตัวอักษร </p>
                            <p class="help is-danger" v-if="!$v.detail.maxLength"> รายละเอียดมีได้มากสุด 100  ตัวอักษร
                            </p>

                        </template>
                    </div>

                    <button class="button is-info" @click="report()">ส่งคำร้องเรียน</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "@/plugins/axios";
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import backendIP from "../../backendIP";

export default {
    props: ['user'],
    data() {
        return {
            title: "",
            detail: '',
            report_type: '',
            loop_type:[]

            
        }
    },
    created(){
            this.gettype()
    },
    validations: {
        title: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(20)
        },
        detail: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(100)

        },
        report_type: {
            required
        }

    },
    methods: {
        report() {
            // Validate all fields
            this.$v.$touch();

            // เช็คว่าในฟอร์มไม่มี error
            if (!this.$v.$invalid) {
                var data = {
                    title: this.title,
                    detail: this.detail,
                    report_type: this.report_type,
                    
                }

                console.log(this.title)
                console.log(this.detail)
                console.log(this.report_type)
                console.log(this.user.user_id)


                axios.post(`http://`+backendIP+`:3000/report/?user_id=${this.user.user_id} `, data)
                    .then((res) => {
                        alert("report success");
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)


                    })
            }
            else {
                alert("ข้อมูลไม่ถูกต้อง")
            }
        },
        gettype(){

            axios
        .get("http://"+backendIP+":3000/report", {})
        .then((response) => {
          console.log(response.data);
          this.loop_type = response.data.report_type;

        })
        .catch((err) => {
          console.log(err);
        });

        }
    },

}
</script>