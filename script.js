
// index
var home = new Vue({
    el: '#app',
    data: {
        login_state: false,
        message: "hello world",
        login_username: "",
        login_password: "",
        username: "",
        user_id: 1,
        images: [
            "./img/guitarfirst.jpg",
            "./img/guitarsecond.jpg",
            "./img/guitarthird.jpg"
        ],
        index: 0,
        n: 1,
        product_type: [
            {
                id: 1,
                name: "กีตาร์โปร่ง",

            },
            {
                id: 2,
                name: "กีตาร์ไฟฟ้า",
 
            },
            {
                id: 3,
                name: "เอฟเฟค",

            },
            {
                id: 4,
                name: "แอมป์",

            }
        ],
        selected_pt: 0,
        tmp_producted: [
            {
                "product_id": 1,
                "name": "AGuitar1",
                "type_id": 1,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 2,
                "name": "AGuitar2",
                "type_id": 1,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 3,
                "name": "AGuitar3",
                "type_id": 1,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 4,
                "name": "AGuitar4",
                "type_id": 1,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 5,
                "name": "EGuitar1",
                "type_id": 2,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarsecond.jpg"
            },
            {
                "product_id": 6,
                "name": "EGuitar2",
                "type_id": 2,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarsecond.jpg"
            },
            {
                "product_id": 7,
                "name": "EGuitar3",
                "type_id": 2,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarsecond.jpg"
            },
            {
                "product_id": 8,
                "name": "EGuitar4",
                "type_id": 2,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarsecond.jpg"
            },
            {
                "product_id": 9,
                "name": "Zoom G1XFOUR",
                "type_id": 3,
                "product_price": 4500,
                "product_detail": "สภาพดีมาก ใหม่เหมือนแกะกล่องตัวนี้เสียงดีสุดๆ",
                "user_id": 12,
                "product_img": "./img/effect.jpg"
            },
            {
                "product_id": 10,
                "name": "effect2",
                "type_id": 3,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 11,
                "name": "effect3",
                "type_id": 3,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            },
            {
                "product_id": 12,
                "name": "effect4",
                "type_id": 3,
                "product_price": 7900,
                "product_detail": "กีตาร์สำหรับคนหล่อเท่วัวตายควายล้ม",
                "user_id": 12,
                "product_img": "./img/guitarthird.jpg"
            }
        ],
        products: this.tmp_producted,

        fav_pro: [],
        my_pd: [],

    },
    methods: {
        showlogin() {
            document.querySelector(".popup").style.display = "flex";
        },
        closelogin() {
            document.querySelector(".popup").style.display = "none";
        },
        login() {
            if (this.login_username == "test" && this.login_password == "1234") {
                this.username = this.login_username;
                this.login_username = "";
                this.login_password = "";
                this.login_state = true;
                document.querySelector(".popup").style.display = "none";
                localStorage.setItem("login_state", this.login_state);
                localStorage.setItem("username", this.username);

            }
            else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!");
            }

            // window.location.href ="index.html";
        },
        next() {
            this.index += 1
            if (this.index > this.images.length - 1) {
                this.index = 0
            }
        },
        log() {
            // test
            console.log('eiei')
        },
        gofavorite() {
            if (this.login_state) {
                window.location.href = "favorite.html";
            }
            else {
                this.showlogin()
            }
        },
        logout() {

            this.login_state = false;
            localStorage.setItem("login_state", this.login_state);
            window.location.href = "index.html";
            localStorage.removeItem("username");
        },
        addfav(item) {
            if (!this.fav_pro.includes(item)) {
                this.fav_pro.push(item);
            }
            let myjson = JSON.stringify(this.fav_pro);
            localStorage.setItem("fav", myjson);

        },
        goproducts(num) {
            this.selected_pt = num;
            localStorage.setItem("selected_pt", this.selected_pt);
            window.location.href = "products.html";
        },
        goreport(){
            if(this.login_state){
                window.location.href="watch_report.html";
            }
            else{
                this.showlogin()
            }
        },
        gosell() {
            if (this.login_state) {
                window.location.href = "add.html";
            }
            else {
                this.showlogin()
            }

        },
        adddetail(items) {
            let all = {
                'detail_img': items.product_img,
                'detail_name': items.name,
                'detail_price': items.product_price,
                'detail_prodetail': items.product_detail
            }
            localStorage.setItem("all", JSON.stringify(all))
            window.location.href = "productdetail.html";

        }




    },
 

    watch: {
        selected_pt(newval) {
            if (newval != 0) {
                this.products = this.tmp_producted.filter(value => {
                    return value.type_id === newval;

                })
            }
            else {
                this.products = this.tmp_producted;
            }

        },
        tmp_producted() {

            profile.$data.my_pd = this.tmp_producted.filter(value => {
                return value.user_id === home.$data.user_id;
            })

        }
    },
    created() {
        setInterval(this.next, 5000)
        this.username = localStorage.getItem("username");
        if (localStorage.getItem("login_state") != null) {
            console.log('eiei');
            this.login_state = JSON.parse(localStorage.getItem("login_state"));
        };
        if (localStorage.getItem("products") != null) {
            this.tmp_producted = JSON.parse(localStorage.getItem("products"));
            this.products = this.tmp_producted;
        };


        if (localStorage.getItem("fav") != null) {
            this.fav_pro = JSON.parse(localStorage.getItem("fav"));
        };

        if (localStorage.getItem("selected_pt") != null) {
            this.selected_pt = JSON.parse(localStorage.getItem("selected_pt"));
        }

        // axios
        //     .get('./data/items.json')
        //     .then(response => {
        //         this.tmp_producted = response.data;
        //         this.products = response.data;
        //     })
        //     .catch((e) => {
        //         console.error(e)
        //     })
    },

});
var form = new Vue({
    el: '.register',
    data: {
        username: '',
        password: "",
        confirmpassword: "",
        email: "",
        phone: '',

        pd_name: "",
        pd_type: "",
        pd_price: "",
        pd_img: "./img/guitarthird.jpg",
        pd_detail: "",

    },
    methods: {
        submit_pd() {

            if (this.pd_name != "" && this.pd_price != "" && this.pd_type != "" && this.pd_detail != "") {
                home.$data.tmp_producted.push({
                    "product_id": home.$data.tmp_producted.length + 1,
                    "name": this.pd_name,
                    "type_id": parseInt(this.pd_type),
                    "product_price": this.pd_price,
                    "product_detail": this.pd_detail,
                    "user_id": home.$data.user_id,
                    "product_img": "./img/test.jpg"
                });
                localStorage.setItem("products", JSON.stringify(home.$data.tmp_producted));
                alert("ลงขายสินค้าเรียบร้อย");
            }
            else {
                alert("ใส่ข้อมูลให้ครบก่อนลงขายสินค้า");
            }
        }


    },
    watch: {
    }
});











var profile = new Vue({
    el: "#profile",
    data: {
        username: "test",
        password: "1234",
        email: "game2999@hotmail.co.th",
        phone: "0991234567",
        fname: "Thanakorn",
        lname: "Amatrawet",
        user_type: 1,
    
        f_username: "test",
        f_password: "1234",
        f_fname: "Thanakorn",
        f_lname: "Amatrawet",
        f_email: "game2999@hotmail.co.th",
        f_phone: "0991234567",

        panel: 1,


    },
    created() {
        if (localStorage.getItem("fname") != null) {
            this.fname = localStorage.getItem("fname");
            this.f_fname = localStorage.getItem("fname");
        }
        if (localStorage.getItem("lname") != null) {
            this.lname = localStorage.getItem("lname");
            this.f_lname = localStorage.getItem("lname");
        }
        if (localStorage.getItem("phone") != null) {
            this.phone = localStorage.getItem("phone");
            this.f_phone = localStorage.getItem("phone");
        }
        if (localStorage.getItem("email") != null) {
            this.email = localStorage.getItem("email");
            this.f_email = localStorage.getItem("email");
        }

    },
    methods: {
        save() {

          
                if(this.f_fname == "" || this.f_email == "" || this.f_lname == "" || this.f_phone == ""){
                    alert("ใส่ข้อมูลให้ครบก่อนบันทึก");
                }
                else{
                this.fname = this.f_fname;
                this.lname = this.f_lname;
                this.email = this.f_email;
                this.phone = this.f_phone;

                localStorage.setItem("fname", this.fname);
                localStorage.setItem("email", this.email);
                localStorage.setItem("lname", this.lname);
                localStorage.setItem("phone", this.phone);
                alert("บันทึกข้อมูลสำเร็จ");
                }

          


        },
        cancel() {
            this.f_fname = this.fname;
            this.f_lname = this.lname;
            this.f_email = this.email;
            this.f_phone = this.phone;
        },
        adddetail(items) {
            let all = {
                'detail_img': items.product_img,
                'detail_name': items.name,
                'detail_price': items.product_price,
                'detail_prodetail': items.product_detail
            }
            localStorage.setItem("all", JSON.stringify(all))
            window.location.href = "productdetail.html";

        }


    },
   
});

    var detail = new Vue({
        el:'#detail',
        data:{
            use:"",
            report_name:"",
            report_header:"",
            report_detail:"",
            reports:[]

        },
        methods:{
            addreport(){ 
                this.reports.push({"name": this.report_name, "header":this.report_header, "detail":this.report_detail})
                localStorage.setItem("reports", JSON.stringify(this.reports))
            }
        },

    created() {
        if(localStorage.getItem("all") != null){}
        this.use = JSON.parse(localStorage.getItem("all"));
        
        if(localStorage.getItem("reports") != null){
            this.reports = JSON.parse(localStorage.getItem("reports"))
        }
    }
    })
    



