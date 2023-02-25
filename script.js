
// navbar
var home = new Vue({
        el:'#app',
        data:{
            login_state:false,
            message:"hello world",
            username:"iovegame5"
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
            }
        }
    });

