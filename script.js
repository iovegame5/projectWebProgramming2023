
// index
var home = new Vue({
        el:'#app',
        data:{
            login_state:false,
            message:"hello world",
            username:"iovegame5",
            images:[
                "./img/guitarfirst.jpg",
                "./img/guitarsecond.jpg",
                "./img/guitarthird.jpg"
            ],
            index:0
        },
        created () {

            setInterval(this.next, 5000)
        },
        methods:{
            showlogin(){
                document.querySelector(".popup").style.display="flex";
            },
            closelogin(){
                document.querySelector(".popup").style.display="none";
            },
            login(){
                document.querySelector(".popup").style.display="none";
                this.login_state = true;
                // window.location.href ="index.html";
            },
            next(){
                this.index += 1
                if(this.index > this.images.length - 1){
                    this.index = 0
                }
            }
        }
    });
    var regis = new Vue({
        el:'.register',
        data:{
            username:'',
            password:"",
            confirmpassword:"",
            email:"",
            phone:'',
        },
        watch:{
        }  
    })
    

