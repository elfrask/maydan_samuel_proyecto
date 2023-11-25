


let go = (id) => document.getElementById(id);
let asi = (a, b) => Object.assign(a, b);
let range = (i, f, s) => {
    i=i||0;
    f=f||1;
    s=s||1;

    let salida = [];

    for (let it = i; it < f; it = it + s) {
        salida.push(it);
    };

    return salida
};
let send = (url, pro) => (new Promise((res, err) => {
    fetch(url, {
        method:"POST",
        body:JSON.stringify(pro||{}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(
            x=> {
                
                if (x.status == 200) {
                    x.json().then(
                        e=>res(e)
                    )
                } else {
                    err(x)
                }
            }
        )
        .catch(
            x=>err(x)
        )
}));
let load = {
    get: (url, json) => {

        json = json||false
        
        const request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);

        if (request.status === 200) {

            let data= request.responseText;

            if (json) try {
                data = JSON.parse(data);
                
            } catch (error) {
                console.error("The content is not a json\nContent:", data);
                data = {};
            };


            return(data);
            
        } else {
            console.error("error status: " + request.status);
            if (json) {
                return {}
            } else {
                return ""
            }
        }

    },
    post: (url, body) => {
        
        const request = new XMLHttpRequest();
        request.open('POST', url, false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));

        if (request.status === 200) {
            return(JSON.parse(request.responseText));
        } else {
            throw ("error status: " + request.status);
        }

    },
};
let storage = {
    load: (name) => {
        let rt = {};
        
        
        try {
            let data = localStorage.getItem(name);
            if (data === null) throw "null Object";
            rt = JSON.parse(data);


        } catch (error) {};

        return rt
    },
    save: (name, data) => {
        let rt = false;
        
        
        try {
            
            localStorage.setItem(name, JSON.stringify(data))
            
            rt = true 

        } catch (error) {};

        return rt
    }
};
let genlink = (l) => {
    let salida = () => {};

    if(typeof(l)=="string"){
        salida = ()=>{
            document.location.assign(l)
        };
    }else if (typeof(l) == "function"){
        salida = l;
    } else if (typeof(l) == "undefined") {
        salida = (()=>{});
    };
    return salida
};
let get_arg = (parse) => {
    let salida = {
        url:"",
        arg:{},
        path:""
    };
    salida.url = parse||document.location.href;
    if (document.location.search.substr(1)) {
        salida.arg = document.location.search.substr(1).split("&").map(x=>[
            x.split("=")[0],
            x.split("=").slice(1).join("=")
        ]);
        
        let array = salida.arg
        salida.arg = {};
        for (let i = 0; i < array.length; i++) {
            const e = array[i];
            salida.arg[e[0]] = e[1];           
        }
    };
    salida.path = document.location.pathname;


    return salida
};
let tokens = [
    ...range(0, 10).map(x=>x+""),
    ...range(97, 97+26).map(x=>(String.fromCharCode(x))),
    ...range(97, 97+26).map(x=>(String.fromCharCode(x).toUpperCase())),
];
let expREG = {
    email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
};
function is_name(n) {
    
    for (let i = 0; i < n.length; i++) {
        const e = n[i];

        if (!tokens.includes(e)) {
            return false
        }
        
    }

    return true
};
let loadscreen = {
    show: () => {
        let b = go("_vinestar_load");
        b.style.display = "block"
        b.style.opacity = "1";
    },
    hidden: () => {
        let b = go("_vinestar_load");
        b.style.opacity = "0";
        
        setTimeout(() => {
            b.style.display = "none"
        }, 1000)
    }
};
let Time = {
    now: () => new Date().getTime(),
    toDate: (ms) => {
        let d = new Date();
        d.setTime(ms);
        return d
    },
    tostr: (ms) => {

        function xd(n) {
            let a = n+""

            if (a.length < 2) {
                a = "0" + a;
            };

            return a 
        };

        let time = Time.toDate(ms);
        let d = (lang.time.date+"")
            .replace("{dd}", (time.getDate()))
            .replace("{mm}", lang.time.month[time.getMonth()])
            .replace("{yyyy}", time.getFullYear());
        let t = (lang.time.time+"")
            .replace("{mi}", xd(time.getMinutes()))
            .replace("{hh}", time.getHours());
        
        return t + " - " + d
    }
};

let post = {
    sendemail: (text, asunt, to, call) => {

        send("/post/email", {
            body: text,
            asunt: asunt,
            to: to
        }).then(x => genlink(call)(x, false)).catch( x => genlink(call)({}, true))
    }
}


class OnLast {

    active = false;
    idObject = "";
    callback = genlink();

    restart() {
        this.active = false
    };

    constructor(id = "", call = ((event = new Event(), restart = ()=>{}) => {}) ) {
        this.idObject = id;
        this.callback = call;
        
    };

    onscroll(e = new Event()) {
        let m = go(this.idObject)||e.target; 
        //console.log(m.scrollTop, (m.scrollHeight - m.offsetHeight))
        if (m.scrollTop > (m.scrollHeight - m.offsetHeight - 100)) {
            if (!this.active) {
                this.active = true;
                genlink(this.callback)(m, this.restart);
            }
        }
    }

};

function onlast(id, call) {
    return (() => {
        let m = go(id||"page")
        //console.log(m.scrollTop, (m.scrollHeight - m.offsetHeight))
        if (m.scrollTop > (m.scrollHeight - m.offsetHeight - 100)) {
            genlink(call)();
        }

    })
}



class Img extends React.Component { // style, className, img, click, size o (x, y)
    render() {
        return (
            <div
                className={"img " + (this.props.className||"")}
                style={asi({
                    backgroundImage:`url('${this.props.img}')`,
                    width:this.props.size||this.props.x||"",
                    height:this.props.size||this.props.y||"",
                }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }
};
class Button extends React.Component { // style, className, img, click, size o (x, y)
    render() {
        return (
            <div
                className={"button " + (this.props.className||"")}
                style={asi({
                    backgroundImage:`url('${this.props.img}')`,
                    width:this.props.size||this.props.x||"",
                    height:this.props.size||this.props.y||"",
                }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }
};
class Panel extends React.Component { // size, style, click, className

    render() {
        let size = (this.props.size + "").split(" ")
        return(
            <div
            className={"Panel " + (this.props.className||"")}
            style={asi({
                "width": (size[0]||"100px"),
                "height": (size[1]||"100px"),
            
            }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }

};
class Box extends React.Component { // style, className, img, click, size o (x, y)
    render() {
        return (
            <div
                className={(this.props.className||"")}
                style={asi({
                    backgroundImage:`url('${this.props.img}')`,
                    width:this.props.size||this.props.x||"",
                    height:this.props.size||this.props.y||"",
                }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }
};