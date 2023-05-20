
<template>
  <div>
  <div>
  </div>

<div class="hero">
            <div></div>
            <img class="slideimg" style="height:100%" @click="next()" src="../assets/img/guitarfirst.jpg">
        </div>
  <div class="container is-widescreen ">
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
                    <section class="hero is-small is-link">
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
                    <section class="hero is-small is-link">
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
                    <section class="hero is-small is-link">
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
  
    <div style="border-top: 1px solid rgb(120, 120, 120);;margin:2rem 2rem 2rem 2rem">
   
  </div>
</div>

</template>
<style>
.slideimg{
    display:block;
    margin-left: auto;
     margin-right:auto; 
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
  components: {
    
    // images:[
    //         "../assets/guitarfirst.jpg", "../assets/guitarsecond.jpg", "../assets/guitarthird.jpg"]

  },
  methods:{
        // next (){
        
        //     this.index += 1
        //     if (this.index > keep.length - 1) {
        //         this.index = 0
        //     }
        // }
  }
}
</script>
