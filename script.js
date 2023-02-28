
// index
var home = new Vue({
        el:'#app',
        data:{
            login_state:false,
            message:"hello world",
            login_username:"",
            login_password:"",
            username:"",
            images:[
                "./img/guitarfirst.jpg",
                "./img/guitarsecond.jpg",
                "./img/guitarthird.jpg"
            ],
            index:0,
            n:1,
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
                this.username = this.login_username;
                this.login_username="";
                this.login_password="";
                document.querySelector(".popup").style.display="none";
               
                this.login_state = true;
                // window.location.href ="index.html";
            },
            next(){
                this.index += 1
                if(this.index > this.images.length - 1){
                    this.index = 0
                }
            },
            log(){
                // test
                console.log('eiei')
            },
            gofavorite(){
                if(this.login_state){
                    window.location.href="favorite.html";
                }
                else{
                    this.showlogin()
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
    

