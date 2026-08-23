/* ============================================================
   Duck's Night Fly — salaovi
   Liitä tämä tiedosto sivustolle ja lisää sivun loppuun:
       <script src="salaovi.js"></script>

   Kolme tapaa löytää peli:
     1. Näppäile sivulla sana:  nightfly
     2. Konami-koodi:  ↑ ↑ ↓ ↓ ← → ← → B A
     3. Napauta sivun ankkalogoa 5 kertaa (toimii puhelimella)

   Kun jokin laukeaa, ruutu pimenee, ajovalot pyyhkäisevät
   ja peli avautuu.
   ============================================================ */
(function () {
  "use strict";

  var PELI = "dnf.html";          // pelin polku sivustolla
  var LOGO = ".logo, #logo, .brand img, header img";  // mitä napautetaan

  /* ---------- pikku vihje konsoliin ---------- */
  try {
    console.log(
      "%c🦆 Outlaw Ducks TC",
      "font:800 20px/1.4 system-ui;color:#ffb32e"
    );
    console.log(
      "%cYöllä Oulussa ajellaan. Ne jotka tietävät, tietävät.\n" +
      "Vihje: kirjoita tähän sivuun se mitä ankat tekevät öisin.",
      "color:#9aa6bb;font:14px/1.5 system-ui"
    );
  } catch (e) {}

  /* ---------- avausanimaatio ---------- */
  function avaa() {
    if (document.getElementById("salaovi")) return;

    var el = document.createElement("div");
    el.id = "salaovi";
    el.innerHTML =
      '<div class="so-tie"></div>' +
      '<div class="so-valo so-v1"></div>' +
      '<div class="so-valo so-v2"></div>' +
      '<div class="so-teksti">' +
        '<div class="so-ankka">🦆</div>' +
        "<div class=\"so-nimi\">Duck's Night <em>Fly</em></div>" +
        '<div class="so-alle">käynnistetään…</div>' +
      "</div>";

    var css = document.createElement("style");
    css.textContent =
      "#salaovi{position:fixed;inset:0;z-index:99999;background:#05070c;" +
      "display:grid;place-items:center;overflow:hidden;animation:soSisaan .4s ease}" +
      "@keyframes soSisaan{from{opacity:0}to{opacity:1}}" +
      "#salaovi .so-tie{position:absolute;left:0;right:0;bottom:0;height:34%;" +
      "background:linear-gradient(180deg,#1a1f28,#0d1015);border-top:3px solid #39424f}" +
      "#salaovi .so-tie::after{content:'';position:absolute;left:0;right:0;top:46%;height:8px;" +
      "background:repeating-linear-gradient(90deg,#f0c14a 0 70px,transparent 70px 170px);" +
      "animation:soViivat .5s linear infinite}" +
      "@keyframes soViivat{to{background-position:170px 0}}" +
      "#salaovi .so-valo{position:absolute;bottom:26%;width:46vw;height:22vh;border-radius:50%;" +
      "background:radial-gradient(closest-side,rgba(255,225,170,.55),transparent);" +
      "filter:blur(12px);animation:soPyyhkaisy 1.6s ease-out forwards}" +
      "#salaovi .so-v1{left:-30vw}#salaovi .so-v2{left:-14vw;animation-delay:.12s}" +
      "@keyframes soPyyhkaisy{to{transform:translateX(150vw)}}" +
      "#salaovi .so-teksti{position:relative;text-align:center;color:#eef2f8;" +
      "font-family:system-ui,sans-serif;animation:soNousu .8s .5s both}" +
      "@keyframes soNousu{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}" +
      "#salaovi .so-ankka{font-size:64px;animation:soPomppu 1.4s ease-in-out infinite}" +
      "@keyframes soPomppu{0%,100%{transform:translateY(0) rotate(-8deg)}" +
      "50%{transform:translateY(-14px) rotate(8deg)}}" +
      "#salaovi .so-nimi{font-size:clamp(28px,6vw,54px);font-weight:800;letter-spacing:-.02em}" +
      "#salaovi .so-nimi em{font-style:normal;color:#ffb32e}" +
      "#salaovi .so-alle{color:#9aa6bb;margin-top:6px;font-size:15px}";

    document.head.appendChild(css);
    document.body.appendChild(el);

    /* pieni moottoriääni, jos selain sallii */
    try {
      var ac = new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(80, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 1.2);
      g.gain.setValueAtTime(0.0001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.06, ac.currentTime + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 1.4);
      o.connect(g); g.connect(ac.destination);
      o.start(); o.stop(ac.currentTime + 1.5);
    } catch (e) {}

    setTimeout(function () { window.location.href = PELI; }, 1700);
  }

  /* ---------- 1. salasana: nightfly ---------- */
  var sana = "nightfly", puskuri = "";
  document.addEventListener("keydown", function (e) {
    if (e.key.length !== 1) return;
    puskuri = (puskuri + e.key.toLowerCase()).slice(-sana.length);
    if (puskuri === sana) avaa();
  });

  /* ---------- 2. Konami ---------- */
  var konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown",
                "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  var kohta = 0;
  document.addEventListener("keydown", function (e) {
    var n = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kohta = (n === konami[kohta]) ? kohta + 1 : (n === konami[0] ? 1 : 0);
    if (kohta === konami.length) { kohta = 0; avaa(); }
  });

  /* ---------- 3. logon napautus 5 kertaa ---------- */
  function sidoLogo() {
    var kohteet = document.querySelectorAll(LOGO);
    if (!kohteet.length) return;
    var kpl = 0, ajastin = null;
    Array.prototype.forEach.call(kohteet, function (el) {
      el.style.webkitTapHighlightColor = "transparent";
      el.addEventListener("click", function () {
        kpl++;
        clearTimeout(ajastin);
        ajastin = setTimeout(function () { kpl = 0; }, 2500);
        /* pieni nytkähdys palautteeksi kolmannesta lähtien */
        if (kpl >= 3 && kpl < 5) {
          el.style.transition = "transform .12s";
          el.style.transform = "rotate(" + (kpl % 2 ? -6 : 6) + "deg)";
          setTimeout(function () { el.style.transform = ""; }, 130);
        }
        if (kpl >= 5) { kpl = 0; avaa(); }
      });
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", sidoLogo);
  else sidoLogo();
})();
