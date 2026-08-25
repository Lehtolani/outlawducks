# Energialabra - Outlaw Ducks TC:n energiajuomatestit

Piilotettu testisivu. Ei linkkia muualta - avautuu klikkaamalla paasivun
alinta "Outlaw Ducks TC" -tekstia 5 kertaa.

## Kansiot
- index.html  - itse sovellus (yksi tiedosto, toimii sellaisenaan)
- ikonit/     - jokaisen juoman pieni kuvake (ks. ikonit/LUEMINUT.txt)
- kuvat/      - testikertojen valokuvat (ks. kuvat/LUEMINUT.txt)
- outlaw-ducks-piilolinkki.txt - piilolinkki-patka paasivulle

## Kayttoonotto GitHub Pagesissa
1. Kopioi tama "energiatestit"-kansio repon juureen (Lehtolani/outlawducks).
2. Lisaa paasivun loppuun outlaw-ducks-piilolinkki.txt:n sisalto
   (saada TARGET-polku, esim. energiatestit/index.html).
3. Commit + push. Sivu loytyy: https://outlawducks.com/energiatestit/

## Juomien kuvakkeet (ikonit/)
Pudota kuva nimella ikonit/<slug>.jpg (tai .png). Kuvake nakyy
automaattisesti ja avautuu isoksi klikkaamalla. Taydellinen nimilista:
ikonit/LUEMINUT.txt. Voit myos lisata kuvan sovelluksen Muokkaa-lomakkeesta,
joka nayttaa oikean tiedostonimen jokaiselle juomalle.

## Testikuvat (kuvat/)
Pudota valokuvat kuvat/-kansioon ja liita tiedostonimet testin
Muokkaa-lomakkeen "Testikuvat"-kenttaan (pilkulla). Ne nakyvat testin alla.

## Data
Kaikki testidata on index.html:n sisalla. Selaimessa tehdyt muutokset
tallentuvat localStorageen. Varmuuskopio: "Vie JSON".
