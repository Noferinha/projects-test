try {
    var configs = JSON.parse(atob(document.getElementById("main-container").attributes.reqhash.value));

    document.getElementById("ac_tgg").checked = configs.iiiiil.i;
    document.getElementById("ac_s1").value = configs.iiiiil.l;
    document.getElementById("ac_bind").value = configs.iiiiil.il;
    document.getElementById("ac_cb1").checked = configs.iiiiil.li;
    document.getElementById("ac_cb2").checked = configs.iiiiil.iil;

    document.getElementById("velocity_tgg").checked = configs.iiiili.i;
    document.getElementById("velocity_s1").value = configs.iiiili.l;
    document.getElementById("velocity_s2").value = configs.iiiili.il;
    document.getElementById("velocity_cb1").checked = configs.iiiili.li;
    document.getElementById("velocity_cb2").checked = configs.iiiili.iil;

    document.getElementById("reach_tgg").checked = configs.iiilii.i;
    document.getElementById("reach_s1").value = configs.iiilii.l * 100;
    document.getElementById("reach_s2").value = configs.iiilii.il * 100;
    document.getElementById("reach_cb1").checked = configs.iiilii.li;

    document.getElementById("visual_cb1").checked = configs.iiliii.i;
    document.getElementById("visual_cb2").checked = configs.iiliii.l;
    document.getElementById("visual_cb3").checked = configs.iiliii.il;
    document.getElementById("visual_cb4").checked = configs.iiliii.li;
    document.getElementById("visual_ic1").value = configs.iiliii.iil;
    document.getElementById("visual_ic1").oninput();

    document.getElementById("aim_tgg").checked = configs.iliiii.i;
    document.getElementById("aim_s1").value = configs.iliiii.l;
    document.getElementById("aim_s2").value = configs.iliiii.il;
    document.getElementById("aim_s3").value = configs.iliiii.li;
    document.getElementById("aim_cb1").checked = configs.iliiii.iil;

    document.getElementById("misc_cb1").checked = configs.liiiii.i;
    document.getElementById("misc_cb2").checked = configs.liiiii.l;
    document.getElementById("misc_cb3").checked = configs.liiiii.il;
} catch {}
try {
document.querySelectorAll('*').forEach(function (node) {
    if (node.id.indexOf("_s") > 1) {
        node.oninput();
    }
});
document.getElementById("main-container").removeAttribute("reqhash");
}catch{}

var changedCfg = 0;
var selfdestructed = 0;

var reqDelay = 100;

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function getConfig() {
    var d = {
        "iiiiil": { // AutoClicker
            "i": document.getElementById("ac_tgg").checked, // Toggle
            "l": document.getElementById("ac_s1").value, // CPS
            "il": document.getElementById("ac_bind").value, // Bind
            "li": document.getElementById("ac_cb1").checked, // Hitblock
            "iil": document.getElementById("ac_cb2").checked // Inventory
        },
        "iiiili": { // Velocity
            "i": document.getElementById("velocity_tgg").checked, // Toggle
            "l": document.getElementById("velocity_s1").value, // Horizontal
            "il": document.getElementById("velocity_s2").value, // Vertical
            "li": document.getElementById("velocity_cb1").checked, // Sprint
            "iil": document.getElementById("velocity_cb2").checked // Inventory
        },
        "iiilii": { // Reach
            "i": document.getElementById("reach_tgg").checked, // Toggle
            "l": (document.getElementById("reach_s1").value / 100), // Min Reach
            "il": (document.getElementById("reach_s2").value / 100), // Max Reach
            "li": document.getElementById("reach_cb1").checked // Sprint Only
        },
        "iiliii": { // Visual
            "i": document.getElementById("visual_cb1").checked, // Hide nickname
            "l": document.getElementById("visual_cb2").checked, // Fullbright
            "il": document.getElementById("visual_cb3").checked, // Array List
            "li": document.getElementById("visual_cb4").checked, // Chroma Theme
            "iil": document.getElementById("visual_ic1").value // Theme Color
        },
        "iliiii": { // AimAssist
            "i": document.getElementById("aim_tgg").checked, // Toggle
            "l": document.getElementById("aim_s1").value, // FOV
            "il": document.getElementById("aim_s2").value, // Speed
            "li": document.getElementById("aim_s3").value, // Range
            "iil": document.getElementById("aim_cb1").checked // Req Click
        },
        "liiiii": { // Misc
            "i": document.getElementById("misc_cb1").checked, // Bridge Assist
            "l": document.getElementById("misc_cb2").checked, // Anti AFK
            "il": document.getElementById("misc_cb3").checked, // Sprint
            "iil": 0 // SelfDestruct
        }

    };

    Array.prototype.shuffle = function () {
        for (var i = 0; i < this.length; i++) {
            var a = this[i];
            var b = Math.floor(Math.random() * this.length);
            this[i] = this[b];
            this[b] = a;
        }
    }

    for (var key in d) {
        d[key] = shuffleProperties(d[key]);
    }

    d = shuffleProperties(d);

    function shuffleProperties(obj) {
        var new_obj = {};
        var keys = getKeys(obj);
        keys.shuffle();
        for (var key in keys) {
            if (key == "shuffle") continue;
            new_obj[keys[key]] = obj[keys[key]];
        }
        return new_obj;
    }

    function getKeys(obj) {
        var arr = new Array();
        for (var key in obj)
            arr.push(key);
        return arr;
    }

    d = JSON.stringify(d);
    d = replaceAll(d, "true", 1);
    d = replaceAll(d, "false", 0);
    d = replaceAll(d, "BIND", 0);
    return replaceAll(replaceAll(btoa(d), "e", "!"), "W", "&");
}

async function b() {
    setInterval(function () {
        if (reqDelay != 100) {
            reqDelay = 100;
        }

        if (changedCfg && !selfdestructed) {
            changedCfg = false;
            reqDelay = 1000;
            $.ajax({
                url: "./api.php",
                type: "post",
                data: {
                    "i": getConfig()
                },
                success: function (data) {
                    if (data.includes("#")) {
                        if (data.includes("#2@")) {
                            window.location.href = "/logout.php";
                        } else {
                            console.log("Error! EC: " + data);
                        }
                    } 
                }
            });
        }

    }, reqDelay);
}

    
b();