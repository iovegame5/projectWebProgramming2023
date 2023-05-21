
<template>
    <div>
        <div>
        </div>

        <div class="hero" style="height:1000px">
            <div></div>
            <img class="slideimg" style="height:100%" @click="next()" :src="slideimg[index]">
           
        </div>
        <div class="container is-widescreen mt-6">
            <div class="is-multiline columns">
                <div class="column is-half">
                    <section class="hero is-small is-link" id="eguitar">
                        <div class="hero-body" @click="goproducts(2)">
                            <p class="title">
                                กีตาร์ไฟฟ้า
                            </p>
                            <p class="subtitle">
                                Electric Guitar
                            </p>
                        </div>
                    </section>
                </div>
                <div class="column is-half">
                    <section class="hero is-small is-link" id="guitar">
                        <div class="hero-body" @click="goproducts(1)">
                            <p class="title">
                                กีตาร์โปร่ง
                            </p>
                            <p class="subtitle">
                                Acoustic Guitar
                            </p>
                        </div>
                    </section>
                </div>
                <div class="column is-half">
                    <section class="hero is-small is-link" id="effect">
                        <div class="hero-body" @click="goproducts(3)">
                            <p class="title">
                                เอฟเฟคก้อนและมัลติเอฟเฟค
                            </p>
                            <p class="subtitle">
                                Effects
                            </p>
                        </div>
                    </section>
                </div>
                <div class="column is-half">
                    <section class="hero is-small is-link" id="amplifier">
                        <div class="hero-body" @click="goproducts(4)">
                            <p class="title">
                                ตู้แอมป์
                            </p>
                            <p class="subtitle">
                                Ampifiers
                            </p>
                        </div>
                    </section>
                </div>
  
            </div>
        </div>




       
    </div>
</template>
<style>
.slideimg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
    align-items: center;
    margin-bottom: 2%;
}
</style>
<script>
// @ is an alias to /src

export default {
    name: 'HomeView',
    props: ['user'],
    data() {
        return {
            slideimg: ['../assets/img/guitarone.png', "../assets/img/guitarsecond.png", '../assets/img/guitarthird.png',],
            index: 0
        };
    },
    components: {

        // images:[
        //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]

    },
    methods: {
        goproducts(num) {
      this.$router.push({ path: '/products', query: { selected_pt:num } });
    },

        next() {

            this.index += 1
            if (this.index > this.slideimg.length - 1) {
                this.index = 0
            }
        }
    },
    mounted() {
        this.next()
    },
    created() {

        setInterval(this.next, 5000)
    }
}

</script>
