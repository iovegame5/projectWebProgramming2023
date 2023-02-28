
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
            product_type:[
                {
                    id:1,
                    name:"กีตาร์โปร่ง",

                },
                {
                    id:2,
                    name:"กีตาร์ไฟฟ้า",
                    
                },
                {
                    id:3,
                    name:"เอฟเฟค",
                    
                },
                {
                    id:4,
                    name:"แอมป์",
                    
                }
            ],
            selected_pt:0,
            tmp_producted:null,

            products:null
            ,
           
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
                    if(this.login_username == "test" && this.login_password =="1234"){
                        this.username = this.login_username;
                        this.login_username="";
                        this.login_password="";
                        this.login_state = true;
                        document.querySelector(".popup").style.display="none";
                    }
                    else{
                        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!");
                    }
        
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

        },
        watch:{
            selected_pt(newval){
                if(newval != 0){
                    this.products = this.tmp_producted.filter(value => {
                        return  value.type_id === newval;
             
             })
                }
                else{
                    this.products = this.tmp_producted;
                }
              
            }
        },
        created() {
            console.log("eiei");
            axios
                .get('./data/items.json')
                .then(response => {
                    this.tmp_producted = response.data;
                    this.products = response.data;
                })
                .catch((e) => {
                    console.error(e)
                })
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
    

