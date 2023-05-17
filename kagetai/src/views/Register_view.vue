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
                <label class="label">Username</label>
                <div class="control has-icons-left">
                  <input v-model='$v.username.$model' :class="{ 'is-danager': $v.username.$error }" class="input"
                    type="text" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <template v-if="$v.username.$error">
                  <p class="help is-danger" v-if="!$v.username.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.username.minLength"> Username must be at least 5 letters </p>
                  <p class="help is-danger" v-if="!$v.username.maxLength"> Username must not more than 20 letters </p>

                </template>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.password.$model' :class="{ 'is-danager': $v.password.$error }" class="input"
                    type="password" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
                <template v-if="$v.password.$error">
                  <p class="help is-danger" v-if="!$v.password.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.password.minLength"> Password must be at least 8 letters </p>
                  <p class="help is-danger" v-if="!$v.password.complexPassword"> Password is too easy </p>

                </template>
              </div>


              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.confirm_password.$model' :class="{ 'is-danager': $v.confirm_password.$error }"
                    class="input" type="password" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
                <template v-if="$v.confirm_password.$error">
                  <p class="help is-danger" v-if="!$v.confirm_password.sameAS"> Password does not match</p>


                </template>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.email.$model' :class="{ 'is-danager': $v.email.$error }" type="email"
                    class="input" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <template v-if="$v.email.$error">
                  <p class="help is-danger" v-if="!$v.email.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.email.email"> This email format is incorrect </p>

                </template>
              </div>



              <div class="field">
                <label class="label">First Name</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.first_name.$model' :class="{ 'is-danager': $v.first_name.$error }" class="input"
                    type="text" />
                </div>
                <template v-if="$v.first_name.$error">
                  <p class="help is-danger" v-if="!$v.first_name.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.first_name.maxLength"> First_name must not more than 150 letters
                  </p>

                </template>
              </div>


              <div class="field">
                <label class="label">Last Name</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.last_name.$model' :class="{ 'is-danager': $v.last_name.$error }" class="input"
                    type="text" />
                </div>
                <template v-if="$v.last_name.$error">
                  <p class="help is-danger" v-if="!$v.last_name.required"> This field is required</p>
                  <p class="help is-danger" v-if="!$v.last_name.maxLength"> Last_name must not more than 150 letters
                  </p>

                </template>
              </div>

              <div class="field">
                <label class="label">Mobile Number</label>
                <div class="control has-icons-left has-icons-right">
                  <input v-model='$v.mobile.$model' :class="{ 'is-danager': $v.mobile.$error }" class="input" type="text" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-mobile"></i>
                  </span>
                </div>


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
import { required, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'


function mobile(value) {
  return !!value.match(/0[0-9]{9}/)
}


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
      email: "",
      mobile: "",
      first_name: "",
      last_name: ""

    }
  },
  components: {

  },
  validations: {
    email: {
      required,
      email
    },
    mobile: {
      required,
      mobile
    },
    password: {
      required,
      minLength: minLength(8),
      complexPassword
    },
    confirm_password: {
      sameAS: sameAs('password')
    },
    username: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20)
    },
    first_name: {

      required,
      maxLength: maxLength(150)
    },
    last_name: {
      required,
      maxLength: maxLength(150)
    }
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        var data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          email: this.email,
          phone: this.mobile,
          firstname: this.first_name,
          lastname: this.last_name,
        }

        console.log(this.username)
        

          axios.post("http://localhost:3000/signup", data)
          .then((res) => {
            alert("Sign up Success");
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
            
            
          })
        }
    },
  },

}
</script>
