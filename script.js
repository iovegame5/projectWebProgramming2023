
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
            products:null,
            fav_pro:[],
           
        },
        created () {
            setInterval(this.next, 5000)
            this.username = localStorage.getItem("username");
            if(localStorage.getItem("login_state") != null){
                console.log('eiei');
                this.login_state = JSON.parse(localStorage.getItem("login_state"));
            };


            if(localStorage.getItem("fav") != null){
            this.fav_pro = JSON.parse(localStorage.getItem("fav"));
            };
         
            axios
                .get('./data/items.json')
                .then(response => {
                    this.tmp_producted = response.data;
                    this.products = response.data;
                })
                .catch((e) => {
                    console.error(e)
                })
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
                        localStorage.setItem("login_state", this.login_state);
                        localStorage.setItem("username", this.username);

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
            },
            logout(){

                this.login_state = false;
                localStorage.setItem("login_state", this.login_state);
                window.location.href="index.html";
                localStorage.clear();
            },
            addfav(item){
                if(!this.fav_pro.includes(item)){
                    this.fav_pro.push(item);
                }
                let myjson = JSON.stringify(this.fav_pro);
                localStorage.setItem("fav", myjson);
                
            },
            goproducts(num){
                window.location.href="products.html";
                this.selected_pt = num;
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
       
    });
    var form = new Vue({
        el:'.register',
        data:{
            username:'',
            password:"",
            confirmpassword:"",
            email:"",
            phone:'',

            pd_name:"",
            pd_price:"",
            pd_img:"",
            pd_detail:"", 
            pd_type:""

        },
        watch:{
        }  
    })
    

