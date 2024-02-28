<template>
    <div>
      <div>
  
  
  
      </div>
      <div class="register-container">
        <div class="register">
          <div class="field">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  
                </div>


                <div class="field">
                  <label class="label">Username</label>
                <div class="control has-icons-left">
                  <input v-model='$v.username.$model' :class="{ 'is-danager': $v.username.$error }" class="input"
                    type="text" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
             
                  <p class="help is-danger" v-if="!$v.username.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.username.minLength"> Username must be at least 5 letters </p>
                  <p class="help is-danger" v-if="!$v.username.maxLength"> Username must not more than 20 letters </p>

            
                </div>
  
                <div class="field">
                  <label class="label">New Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input  v-model='$v.password.$model' :class="{ 'is-danager': $v.password.$error }" class="input"
                      type="password" />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
            
                    <p class="help is-danger" v-if="!$v.password.required"> This field is required</p>
                    <p class="help is-danger" v-if="!$v.password.minLength"> Password must be at least 8 letters </p>
                    <p class="help is-danger" v-if="!$v.password.complexPassword"> Password is too easy </p>
  
        
                </div>
  
  
                <div class="field">
                  <label class="label">Confirm Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input 
                    v-model='$v.confirm_password.$model' :class="{ 'is-danager': $v.confirm_password.$error }" class="input" type="password" />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
               
                    <p class="help is-danger" v-if="!$v.confirm_password.sameAS"> Password does not match</p>
  
  
        
                </div>
  

  
  
  
                
  
  
                
  
                
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" @click="submit()">Submit</button>
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
import { required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
import backendIP from "../../backendIP";
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false
  }
  return true
}
export default {
  props: ['user'],
  data() {
    return {
      
      username: "",
      password: '',
      confirm_password: '',
      backendIP: backendIP


    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20)
    },

    password: {
      required,
      minLength: minLength(8),
      complexPassword
    },
    confirm_password: {
      sameAS: sameAs('password')
    }
   
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        var data = {
            username:this.username,
            password:this.password,
            confirm_password:this.confirm_password
        }
        
        axios.put("http://"+backendIP+":3000/updatepassword", data)
          .then((res) => {
            alert("Change Password Success");
            console.log(res);
           
          })
          .catch((err) => {
            console.log(err);
            alert("Username incorrect")
            
            
            
          })
        }
        else{
          alert("ข้อมูลไม่ถูกต้อง")
        }
    },
  },

}
</script>