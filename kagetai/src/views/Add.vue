<template>
    <div>
        <NavBar />


        <div>
            <div class="register-container">
                <div class="register">
                    <div class="field">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <label class="label">ชื่อสินค้า</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="ชื่อสินค้า">

                                    </div>
                                    <!-- <p class="help is-success">This username is available</p> -->
                                </div>
                                <div class="field">
                                    <label class="label">ประเภทสินค้า</label>
                                    <div class="select">
                                        <select>
                                            <option value="1">กีตาร์โปร่ง</option>
                                            <option value="2">กีตาร์ไฟฟ้า</option>
                                            <option value="3">เอฟเฟค</option>
                                            <option value="4">แอมป์</option>
                                        </select>

                                    </div>


                                </div>


                                <div class="field">
                                    <label class="label">ราคา</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="ระบุราคาของสินค้า" value="">


                                    </div>


                                </div>
                                
                                <div class="field">
                                    <label><strong>รูปสินค้า</strong></label>  
                                <div class="file">
                                    <label class="file-label">
                                        
                                        <input class="file-input" type="file" name="resume">
                                        <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                                <div class="field">
                                    <label class="label">รายละเอียดสินค้า</label>
                                    <div class="control ">
                                        <textarea class="textarea" name="" id="" cols="30" rows="3"></textarea>

                                    </div>

                                </div>


                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" @click="">Submit</button>
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
    </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
export default {
    name: 'Add',
    components: {
        NavBar,

    },
    methods: {

    }
}
</script>