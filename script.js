
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
            if(localStorage.getItem("selected_pt") != null){
                this.selected_pt = localStorage.getItem("selected_pt");
            }

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
                localStorage.removeItem("username");
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
                localStorage.setItem("selected_pt", this.selected_pt);
            },
            gosell(){
                if(this.login_state){
                    window.location.href="add.html";
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
    });
    var profile = new Vue({
        el:"#profile",
        data:{
            username:"test",
            password:"1234",
            email:"game2999@hotmail.co.th",
            phone:"0991234567",
            fname:"Thanakorn",
            lname:"Amatrawet",
            user_type:2,

            f_username:"test",
            f_password:"1234",
            f_fname:"Thanakorn",
            f_lname:"Amatrawet",
            f_email:"game2999@hotmail.co.th",
            f_phone:"0991234567",

            panel:1,


        },
        created(){
            if(localStorage.getItem("fname") != null){
                this.fname = localStorage.getItem("fname");
                this.f_fname = localStorage.getItem("fname");
            }
            if(localStorage.getItem("lname") != null){
                this.lname = localStorage.getItem("lname");
                this.f_lname = localStorage.getItem("lname");
            }
            if(localStorage.getItem("phone") != null){
                this.phone = localStorage.getItem("phone");
                this.f_phone = localStorage.getItem("phone");
            }
             if(localStorage.getItem("email") != null){
                this.email = localStorage.getItem("email");
                this.f_email = localStorage.getItem("email");
            }
            
        },
        methods:{
            save(){

                try {
                    this.fname = this.f_fname;
                this.lname = this.f_lname;
                this.email = this.f_email;
                this.phone = this.f_phone;

                localStorage.setItem("fmame", this.fname);
                localStorage.setItem("email", this.email);
                localStorage.setItem("lname", this.lname);
                localStorage.setItem("phone", this.phone);
                alert("บันทึกข้อมูลสำเร็จ");
                    
                } catch (error) {
                    console.error(error);
                }

                
            },
            cancel(){
                this.f_fname = this.fname;
                this.f_lname = this.lname;
                this.f_email = this.email;
                this.f_phone = this.phone;
            },
            showp1(){
                document.getElementById("panel1").style.display = "inline";
                document.getElementById("panel2").style.display = "none";
            },
            showp2(){
                document.getElementById('panel1').style.display = "none";
                document.getElementById("panel2").style.display = "box";
            },
           
        }
    })
    

