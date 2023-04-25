<template>
  <div>
    <div class="register-container">
      <div class="register">
        <div class="field">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="Username" value="bulma" v-model="username">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>

                </div>
                <!-- <p class="help is-success">This username is available</p> -->
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="password" placeholder="Password" v-model="password">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-key"></i>
                  </span>

                </div>


              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="password" placeholder="ConfirmPassword" v-model="confirmpassword">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-key"></i>
                  </span>

                </div>


              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="email" placeholder="Email" v-model="email">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-envelope"></i>
                  </span>
                </div>

                <div class="field-group">
                  <div class="field is-inline-block-desktop">
                    <label class="label">First Name</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="e.g Alex">
                    </div>
                  </div>

                  <div class="field is-inline-block-desktop">
                    <label class="label">Last Name</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="e.g Smith">
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Phone Number</label>
                <div class="control has-icons-left">
                  <input class="input" type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="xxx-xxx-xxxx" maxlength="10" v-model="phone">
                  <span class="icon is-small is-left">
                    <i class="fa-solid fa-phone"></i>
                  </span>
                </div>


              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
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
    <div style="border-top: 1px solid rgb(120, 120, 120);;margin:2rem 2rem 2rem 2rem"></div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Web Programming Project <strong>Kageetai</strong> By <a href="">Thanakorn Amatrawet </a>
          and <a href="#">Chotchda Aupayokin</a>

        </p>
      </div>
    </footer>
  </div>
</template>

<script>


</script>

<style>
/* add your tailwind styles here */
</style>
