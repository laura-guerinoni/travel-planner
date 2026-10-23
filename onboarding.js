/* Travel Planner: what a new person sees, and the owner's test corner.
   - The sign-in picture: a little vote between two places in Florence.
   - Sign-up steps, right after the first sign-in: name, avatar, style, done.
   - The first-trip guide: Where / When / Who, "What do you like?" (when the
     Apps Script has an OpenTripMap key), three pointers, a Get started list.
   - What's new: once per release for everyone else.
   - The cheat corner: the owner hovers the bottom-left corner for 2 seconds.
   Talks to the app only through window.TP (see the end of index.html). */
(function(){
  'use strict';
  var A = window.TPAvatar;
  if(!A) return;
  var VERSION = '2026-10-21';

  // ---- words ----------------------------------------------------------
  var T = {
    en: { voteFor:'Vote', voted:'Your vote', or:'or', votes:'votes', vote:'vote', heroA:'Can’t decide? Vote.', heroAs:'Put two places side by side and let everyone pick.', heroAdone:'That’s it: everyone sees your vote straight away.',
      f_added:'added', f_sat:'to Saturday', f_vote:'started a vote:', f_voteSub:'Tap to vote', f_star:'starred', f_ideas:'in the idea box', f_assign:'asked you to book', f_assignSub:'Friday · Florence', now:'now', notes:'Notes',
      q1:'What’s your name?', q1s:'This is how the others see you on plans and votes.', nameph:'Your name', cont:'Continue', skip:'Skip for now',
      q2:'Make your avatar', q2s:'It shows next to everything you add.', random:'Surprise me',
      q3:'Pick your style', q3s:'Only for you: the others keep theirs.', colours:'Colours', fonts:'Font', mode:'Mode', light:'Light', dark:'Dark', shuffle:'Shuffle',
      f_neutral:'Neutral', f_rounded:'Rounded', f_elegant:'Elegant', f_mono:'Mono', f_dyslexia:'Dyslexia',
      doneT:'Nice to meet you, ', doneS:'You can change all of this later from the menu.', start:'Start planning', saveErr:'Couldn’t save your avatar. You can set it later from the menu.',
      preview:'Preview: nothing is saved', close:'Close',
      w1:'Where to?', w1s:'A city, a country, or a few. You can change it later.', w1ph:'Florence, Portugal…',
      w2:'When?', w2s:'Pick the days, or a month if it’s not decided yet.', w2a:'I know the dates', w2as:'Pick the first and last day', w2b:'Not sure yet', w2bs:'Pick a month',
      w3:'Who’s coming?', w3s:'They get an email with a link. Or start alone and invite later.', w3ph:'Their email, then Enter', you:'you', justMe:'Just me for now', create:'Create trip', back:'Back',
      likeT:'What do you like?', likeS:'Pick a few: they go to the idea box, so you can put them on a day later.', likeLoad:'Finding places…', likeAdd:'Add to the idea box', likeSkip:'Skip',
      c1:'Your days', c1p:'Click a day to add the first thing you want to do. @ finds the place and puts it on the map.',
      c2:'Notes and ideas', c2p:'Not sure yet? Drop ideas in the idea box here: everyone can heart them.',
      c3:'Bring the others', c3p:'Share the trip: they see the same plan and can vote with you.', next:'Next', gotIt:'Got it',
      gs:'Get started', gs1:'Add your first activity', gs2:'Invite someone', gs3:'Save an idea for later', gs4:'Start a “this or that”', doIt:'Do it', allSet:'All set. Have a great trip!', voteHint:'Open an activity, then “This or that…”',
      newK:'What’s new', newT:'A fresh look', newDone:'Nice',
      n1:'New faces', n1s:'Hair styles, bangs, textures, glasses, a hat. Menu → Edit avatar.', n2:'Dark mode', n2s:'Menu → Mode.', n3:'A calmer page', n3s:'Flat is the new standard. Starry and Gradient are in Menu → Background.', n4:'A friendlier start', n4s:'New people get a short welcome and a guided first trip.' },
    it: { voteFor:'Vota', voted:'Il tuo voto', or:'oppure', votes:'voti', vote:'voto', heroA:'Indecisi? Votate.', heroAs:'Due posti a confronto, e ognuno sceglie.', heroAdone:'Fatto: tutti vedono subito il tuo voto.',
      f_added:'ha aggiunto', f_sat:'a sabato', f_vote:'ha aperto un voto:', f_voteSub:'Tocca per votare', f_star:'ha messo una stella a', f_ideas:'nella scatola delle idee', f_assign:'ti ha chiesto di prenotare', f_assignSub:'Venerdì · Firenze', now:'ora', notes:'Note',
      q1:'Come ti chiami?', q1s:'È così che ti vedono gli altri su piani e voti.', nameph:'Il tuo nome', cont:'Continua', skip:'Salta per ora',
      q2:'Crea il tuo avatar', q2s:'Appare accanto a tutto quello che aggiungi.', random:'Sorprendimi',
      q3:'Scegli il tuo stile', q3s:'Solo per te: gli altri tengono il loro.', colours:'Colori', fonts:'Carattere', mode:'Modalità', light:'Chiara', dark:'Scura', shuffle:'Mescola',
      f_neutral:'Neutro', f_rounded:'Tondo', f_elegant:'Elegante', f_mono:'Mono', f_dyslexia:'Dislessia',
      doneT:'Piacere di conoscerti, ', doneS:'Puoi cambiare tutto più tardi dal menu.', start:'Inizia a pianificare', saveErr:'Non sono riuscita a salvare l’avatar. Puoi farlo più tardi dal menu.',
      preview:'Anteprima: non si salva niente', close:'Chiudi',
      w1:'Dove si va?', w1s:'Una città, un paese, o più di uno. Puoi cambiarlo dopo.', w1ph:'Firenze, Portogallo…',
      w2:'Quando?', w2s:'Scegli i giorni, o un mese se non è ancora deciso.', w2a:'So le date', w2as:'Primo e ultimo giorno', w2b:'Non ancora', w2bs:'Scegli un mese',
      w3:'Chi viene?', w3s:'Ricevono un’email con il link. Oppure inizia da sola e invita dopo.', w3ph:'La sua email, poi Invio', you:'tu', justMe:'Per ora solo io', create:'Crea il viaggio', back:'Indietro',
      likeT:'Cosa ti piace?', likeS:'Scegline qualcuno: finiscono nella scatola delle idee, da mettere su un giorno più tardi.', likeLoad:'Cerco posti…', likeAdd:'Aggiungi alle idee', likeSkip:'Salta',
      c1:'I tuoi giorni', c1p:'Clicca un giorno per aggiungere la prima cosa da fare. @ trova il posto e lo mette sulla mappa.',
      c2:'Note e idee', c2p:'Non sei sicura? Metti le idee nella scatola qui: tutti possono dare un cuore.',
      c3:'Porta gli altri', c3p:'Condividi il viaggio: vedono lo stesso piano e votano con te.', next:'Avanti', gotIt:'Capito',
      gs:'Per iniziare', gs1:'Aggiungi la prima attività', gs2:'Invita qualcuno', gs3:'Salva un’idea per dopo', gs4:'Apri un “questo o quello”', doIt:'Fallo', allSet:'Tutto pronto. Buon viaggio!', voteHint:'Apri un’attività, poi “Questo o quello…”',
      newK:'Novità', newT:'Un look nuovo', newDone:'Bello',
      n1:'Facce nuove', n1s:'Acconciature, frangia, tipi di capelli, occhiali, un cappello. Menu → Modifica avatar.', n2:'Modalità scura', n2s:'Menu → Modalità.', n3:'Una pagina più calma', n3s:'Lo sfondo piatto è il nuovo standard. Stelle e Sfumato sono in Menu → Sfondo.', n4:'Un inizio più semplice', n4s:'Chi arriva ha un benvenuto breve e un primo viaggio guidato.' },
    es: { voteFor:'Votar', voted:'Tu voto', or:'o', votes:'votos', vote:'voto', heroA:'¿Dudas? Votad.', heroAs:'Dos sitios lado a lado, y cada uno elige.', heroAdone:'Listo: todos ven tu voto al momento.',
      f_added:'añadió', f_sat:'al sábado', f_vote:'abrió una votación:', f_voteSub:'Toca para votar', f_star:'marcó con estrella', f_ideas:'en la caja de ideas', f_assign:'te pidió reservar', f_assignSub:'Viernes · Florencia', now:'ahora', notes:'Notas',
      q1:'¿Cómo te llamas?', q1s:'Así te ven los demás en planes y votos.', nameph:'Tu nombre', cont:'Continuar', skip:'Saltar por ahora',
      q2:'Crea tu avatar', q2s:'Aparece junto a todo lo que añades.', random:'Sorpréndeme',
      q3:'Elige tu estilo', q3s:'Solo para ti: los demás mantienen el suyo.', colours:'Colores', fonts:'Fuente', mode:'Modo', light:'Claro', dark:'Oscuro', shuffle:'Mezclar',
      f_neutral:'Neutra', f_rounded:'Redonda', f_elegant:'Elegante', f_mono:'Mono', f_dyslexia:'Dislexia',
      doneT:'Encantada, ', doneS:'Puedes cambiarlo todo luego desde el menú.', start:'Empezar a planear', saveErr:'No se pudo guardar tu avatar. Puedes hacerlo luego desde el menú.',
      preview:'Vista previa: no se guarda nada', close:'Cerrar',
      w1:'¿A dónde?', w1s:'Una ciudad, un país, o varios. Puedes cambiarlo luego.', w1ph:'Florencia, Portugal…',
      w2:'¿Cuándo?', w2s:'Elige los días, o un mes si aún no está decidido.', w2a:'Sé las fechas', w2as:'Primer y último día', w2b:'Aún no', w2bs:'Elige un mes',
      w3:'¿Quién viene?', w3s:'Reciben un email con el enlace. O empieza sola e invita luego.', w3ph:'Su email, luego Intro', you:'tú', justMe:'Solo yo por ahora', create:'Crear viaje', back:'Atrás',
      likeT:'¿Qué te gusta?', likeS:'Elige algunos: van a la caja de ideas, para ponerlos en un día luego.', likeLoad:'Buscando sitios…', likeAdd:'Añadir a ideas', likeSkip:'Saltar',
      c1:'Tus días', c1p:'Haz clic en un día para añadir lo primero que quieres hacer. @ encuentra el sitio y lo pone en el mapa.',
      c2:'Notas e ideas', c2p:'¿No lo tienes claro? Deja ideas en la caja aquí: todos pueden darles un corazón.',
      c3:'Trae a los demás', c3p:'Comparte el viaje: ven el mismo plan y votan contigo.', next:'Siguiente', gotIt:'Entendido',
      gs:'Para empezar', gs1:'Añade la primera actividad', gs2:'Invita a alguien', gs3:'Guarda una idea', gs4:'Abre un “esto o aquello”', doIt:'Hacerlo', allSet:'Todo listo. ¡Buen viaje!', voteHint:'Abre una actividad, luego “Esto o aquello…”',
      newK:'Novedades', newT:'Un aspecto nuevo', newDone:'Genial',
      n1:'Caras nuevas', n1s:'Peinados, flequillo, tipos de pelo, gafas, un sombrero. Menú → Editar avatar.', n2:'Modo oscuro', n2s:'Menú → Modo.', n3:'Una página más tranquila', n3s:'El fondo liso es el nuevo estándar. Estrellas y Degradado están en Menú → Fondo.', n4:'Un comienzo más fácil', n4s:'Quien llega tiene una bienvenida corta y un primer viaje guiado.' }
  };
  // The avatar maker's own labels (TPAvatar.maker has the English ones).
  var MAKER = {
    it: { skin:'Pelle', hair:'Capelli', eyes:'Occhi', mouth:'Bocca', extras:'Accessori', bgc:'Sfondo', style:'Acconciatura', bangs:'Frangia', texture:'Tipo', length:'Lunghezza', colour:'Colore', short:'Corti', medium:'Medi', long:'Lunghi',
      hs_loose:'Sciolti', hs_ponytail:'Coda', hs_pigtails:'Due codini', hs_braid:'Treccia', tx_straight:'Lisci', tx_wavy:'Mossi', tx_curly:'Ricci', bg_none:'Nessuna', bg_curtain:'Aperta', bg_bangs:'Piena', bg_short:'Corta', bg_wispy:'Sfilata', bg_side:'Laterale',
      eyeC:'Colore', mouthS:'Forma', glasses:'Occhiali', none:'Nessuno', gl:'Da vista', sun:'Da sole', more:'Altro', piercing:'Piercing', hat:'Cappello' },
    es: { skin:'Piel', hair:'Pelo', eyes:'Ojos', mouth:'Boca', extras:'Accesorios', bgc:'Fondo', style:'Peinado', bangs:'Flequillo', texture:'Tipo', length:'Largo', colour:'Color', short:'Corto', medium:'Medio', long:'Largo',
      hs_loose:'Suelto', hs_ponytail:'Coleta', hs_pigtails:'Dos coletas', hs_braid:'Trenza', tx_straight:'Liso', tx_wavy:'Ondulado', tx_curly:'Rizado', bg_none:'Sin', bg_curtain:'Abierto', bg_bangs:'Recto', bg_short:'Corto', bg_wispy:'Desfilado', bg_side:'De lado',
      eyeC:'Color', mouthS:'Forma', glasses:'Gafas', none:'Ninguna', gl:'De ver', sun:'De sol', more:'Más', piercing:'Piercing', hat:'Sombrero' }
  };
  function lang(){ var l = window.TP && TP.lang ? TP.lang() : 'en'; return T[l] ? l : 'en'; }
  function t(k){ return T[lang()][k] || T.en[k] || k; }
  function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function ls(k, v){ try { if(v === undefined) return localStorage.getItem(k); if(v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch(e){ return null; } }

  var THEMES = [
    { k:'neutral', p:'#ffc561', s:'#0b6e4f', a:'#073b3a' }, { k:'kawaii', p:'#ec6a9c', s:'#3fbf94', a:'#f2884d' }, { k:'classic', p:'#1c6672', s:'#1fa896', a:'#ef9a5c' },
    { k:'bubbles', p:'#3b4fe0', s:'#7f8cf3', a:'#9cc31f' }, { k:'cool', p:'#14293c', s:'#667f91', a:'#7f9585' }, { k:'forest', p:'#3f6b3d', s:'#6c744a', a:'#474f35' },
    { k:'harbor', p:'#344e61', s:'#4876ae', a:'#ab8465' }, { k:'earth', p:'#755c48', s:'#8a8674', a:'#2f2d2a' }, { k:'dusk', p:'#374375', s:'#895159', a:'#c68f82' }];
  var FONTS = [{ k:'neutral', f:"'Plus Jakarta Sans',sans-serif" }, { k:'rounded', f:"'Nunito',sans-serif" }, { k:'elegant', f:"'Lora',serif" }, { k:'mono', f:"'IBM Plex Mono',monospace" }, { k:'dyslexia', f:"'OpenDyslexic',sans-serif" }];
  var ICON = {
    back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    notes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    star:'<svg viewBox="0 0 32 32"><path d="M16 4l3.1 8.2 8.8.4-6.9 5.5 2.4 8.5L16 21.8l-7.4 4.8 2.4-8.5-6.9-5.5 8.8-.4z" fill="#ffc561" stroke="#e8a93a" stroke-width="1" stroke-linejoin="round"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>',
    map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    door:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></svg>',
    palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.7 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="11" cy="7.5" r="1.2" fill="currentColor"/><circle cx="16" cy="8.5" r="1.2" fill="currentColor"/></svg>'
  };
  // Three friends for the pictures.
  var ANA = { skin:'#C68B59', hair:'#2B2B2B', hairLength:'long', hairStyle:'loose', hairTexture:'wavy', fringe:'curtain', eyes:'#6B4423', mouthType:1, bg:'#E8F3FD' },
      SEB = { skin:'#F0D3AC', hair:'#D9B877', hairLength:'short', hairStyle:'loose', hairTexture:'straight', fringe:'side', eyes:'#4A89C9', mouthType:0, bg:'#E9F7EC', glasses:'glasses' },
      MARTA = { skin:'#7A4B2E', hair:'#2B2B2B', hairLength:'medium', hairStyle:'pigtails', hairTexture:'curly', fringe:'bangs', eyes:'#6B4423', mouthType:6, bg:'#FDE8EF' };
  function face(o){ return A.render(o); }

  // ======================================================================
  // 1. The sign-in picture: Duomo climb or Piazzale Michelangelo?
  // ======================================================================
  var DUOMO = '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice"><rect width="200" height="140" fill="#ffe2b3"/><circle cx="100" cy="66" r="52" fill="#ffd28a"/><path d="M0 108 C20 102 30 104 42 100 C56 96 64 102 76 101 L124 101 C138 100 148 96 160 99 C176 103 186 100 200 104 V140 H0Z" fill="#efcfa8"/><rect x="142" y="44" width="15" height="66" rx="1.5" fill="#fbf5ea"/><path d="M140 44 H159 L156 39 H143Z" fill="#c8553d"/><rect x="145.5" y="52" width="8" height="12" rx="4" fill="#0b6e4f"/><rect x="145.5" y="72" width="8" height="10" rx="4" fill="#0b6e4f" opacity=".55"/><rect x="142" y="88" width="15" height="2" fill="#0b6e4f" opacity=".5"/><rect x="62" y="90" width="76" height="22" rx="2" fill="#fbf5ea"/><path d="M62 97 H138" stroke="#0b6e4f" stroke-width="1.6" opacity=".7"/><path d="M74 102 v8 M86 102 v8 M114 102 v8 M126 102 v8" stroke="#0b6e4f" stroke-width="2.4" stroke-linecap="round" opacity=".5"/><path d="M96 112 V105 a4 4 0 0 1 8 0 V112Z" fill="#0b6e4f"/><rect x="78" y="78" width="44" height="12" rx="2" fill="#fbf5ea"/><g fill="#0b6e4f" opacity=".75"><circle cx="86" cy="84" r="2"/><circle cx="95" cy="84" r="2"/><circle cx="105" cy="84" r="2"/><circle cx="114" cy="84" r="2"/></g><path d="M76 79 C76 58 86 44 100 41 C114 44 124 58 124 79Z" fill="#d0603f"/><path d="M100 41 C108 46 113 58 114 79 L124 79 C124 58 114 44 100 41Z" fill="#b84d31"/><path d="M100 42 V79 M100 42 C93 48 89 60 88.5 79 M100 42 C107 48 111 60 111.5 79" stroke="#fbf5ea" stroke-width="1.6" fill="none" stroke-linecap="round"/><rect x="95" y="32" width="10" height="10" rx="1.5" fill="#fbf5ea"/><path d="M94 32 C96 26 98 23 100 20 C102 23 104 26 106 32Z" fill="#d0603f"/><circle cx="100" cy="18" r="1.8" fill="#073b3a"/><rect x="0" y="112" width="200" height="28" fill="#e2bb8f"/><rect x="56" y="112" width="88" height="3" rx="1.5" fill="#073b3a" opacity=".12"/></svg>';
  var PIAZZALE = '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice"><rect width="200" height="140" fill="#073b3a"/><circle cx="100" cy="92" r="40" fill="#ffc561"/><path d="M20 104 V94 H34 V90 H44 V104 H54 V92 H60 V72 H66 V92 H76 V104 H82 V90 H86 C86 74 114 74 114 90 H118 V104 H126 V62 H134 V104 H144 V92 H158 V96 H170 V104 H180 V140 H20Z" fill="#0b6e4f"/><rect x="97.5" y="68" width="5" height="8" rx="1.5" fill="#0b6e4f"/><path d="M0 104 H200 V140 H0Z" fill="#0b6e4f"/><path d="M0 112 C40 108 70 114 100 112 C130 110 160 116 200 112 V140 H0Z" fill="#0f5c55"/><path d="M86 120 H114 M92 126 H108" stroke="#ffc561" stroke-width="2.4" stroke-linecap="round"/><path d="M14 112 C10 96 14 80 20 72 C26 80 30 96 26 112Z" fill="#05302f"/><path d="M178 112 C175 100 178 88 183 82 C188 88 191 100 188 112Z" fill="#05302f"/></svg>';
  var myVote = null;
  function heroA(meAv){
    var V = { duomo:[ANA, SEB].concat(myVote === 'duomo' ? [meAv] : []), piazzale:[MARTA].concat(myVote === 'piazzale' ? [meAv] : []) };
    // the yellow border follows your vote; before you vote, the one in the lead
    var lead = myVote || (V.duomo.length >= V.piazzale.length ? 'duomo' : 'piazzale');
    function card(k, art, title, meta){
      var n = V[k].length, mine = myVote === k;
      return '<div class="c' + (lead === k ? ' win' : '') + (mine ? ' mine' : '') + '" role="button" tabindex="0" aria-pressed="' + mine + '" data-vote="' + k + '"><div class="ph">' + art + '</div><div class="t">' + title + '</div><div class="m">' + meta + '</div>' +
        '<div class="votes">' + V[k].map(function(o){ return '<span class="f">' + face(o) + '</span>'; }).join('') + '&nbsp;' + n + ' ' + (n === 1 ? t('vote') : t('votes')) + '<span class="vbtn">' + (mine ? '✓ ' + t('voted') : t('voteFor')) + '</span></div></div>';
    }
    return '<div class="tpo-hero"><div class="tpo-vs">' + card('duomo', DUOMO, 'Duomo climb', 'Fri 09:00 · € 30 · 6 min walk') + '<div class="or2">' + t('or').toUpperCase() + '</div>' +
      card('piazzale', PIAZZALE, 'Piazzale Michelangelo', 'Fri 19:30 · free · 25 min walk') + '</div>' +
      '<div class="tpo-herocap">' + t('heroA') + '<small>' + (myVote ? t('heroAdone') : t('heroAs')) + '</small></div></div>';
  }
  var GUEST = { skin:'#F0D3AC', hair:'#A85432', hairLength:'medium', hairStyle:'ponytail', hairTexture:'wavy', fringe:'curtain', eyes:'#4F8A5B', mouthType:3, bg:'#FFF6DC' };
  function renderAuthHero(){
    var el = document.getElementById('authArt'); if(!el) return;
    el.innerHTML = heroA(GUEST);
  }
  document.addEventListener('click', function(e){
    var c = e.target.closest('#authArt [data-vote]'); if(!c) return;
    myVote = myVote === c.getAttribute('data-vote') ? null : c.getAttribute('data-vote');
    renderAuthHero();
  });
  document.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('#authArt [data-vote]')){ e.preventDefault(); e.target.click(); }
  });
  var authLang = document.getElementById('authLang');
  if(authLang) authLang.addEventListener('change', function(){ setTimeout(renderAuthHero, 0); });
  renderAuthHero();

  // ======================================================================
  // 2. Sign-up steps: name, avatar, style, done (the 50/50 screen)
  // ======================================================================
  var st = null, feedT = null;
  function currentLook(){ return { theme: ls('travelPlannerTheme') || 'neutral', font: ls('travelPlannerFont') || 'neutral', mode: ls('travelPlannerMode') || 'light', backdrop: ls('travelPlannerBackdrop') || 'flat', lang: ls('travelPlannerLang') }; }
  function applyLook(l){ if(!window.TP) return; TP.applyTheme(l.theme); TP.applyFont(l.font); TP.applyMode(l.mode); }
  function themeOf(k){ return THEMES.filter(function(x){ return x.k === k; })[0] || THEMES[0]; }
  function fontOf(k){ return FONTS.filter(function(x){ return x.k === k; })[0] || FONTS[0]; }

  function openOnboarding(opts){
    opts = opts || {};
    closeGuide();
    var me = TP.me(), look = currentLook();
    var nm = me.name && me.name.indexOf('@') === -1 && me.name.indexOf(',') === -1 ? me.name : '';
    st = { step:1, name:nm, preview:!!opts.preview, saved:look, theme:THEMES.some(function(x){ return x.k === look.theme; }) ? look.theme : 'neutral', font:look.font, mode:look.mode, av:A.normalize(opts.avatar || { hair:'#5B3A29', hairTexture:'wavy' }), maker:null };
    var ov = document.getElementById('tpOnb');
    if(!ov){
      ov = document.createElement('div'); ov.id = 'tpOnb'; ov.className = 'tpo'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
      ov.innerHTML = '<div class="tpo-left"><button type="button" class="tpo-back" aria-label="Back">' + ICON.back + '</button><div class="tpo-art"></div><div class="tpo-logo"><span class="mark">' + ICON.star + '</span>Travel Planner</div></div>' +
        '<div class="tpo-right"><div class="tpo-card"></div></div>';
      document.body.appendChild(ov);
      ov.querySelector('.tpo-back').addEventListener('click', function(){ if(st && st.step > 1){ st.step--; render(); } });
      ov.addEventListener('click', onClick);
    }
    var tag = ov.querySelector('.tpo-preview-tag'); if(tag) tag.remove();
    if(st.preview){
      tag = document.createElement('div'); tag.className = 'tpo-preview-tag'; tag.innerHTML = esc(t('preview')) + '<button type="button" aria-label="' + esc(t('close')) + '">✕</button>';
      tag.querySelector('button').addEventListener('click', function(){ closeOnboarding(true); });
      ov.querySelector('.tpo-right').appendChild(tag);
    }
    ov.hidden = false;
    render();
  }
  function closeOnboarding(cancel){
    var ov = document.getElementById('tpOnb'); if(ov) ov.hidden = true;
    clearInterval(feedT);
    if(st && (cancel || st.preview)) applyLook(st.saved);
  }
  function render(){
    var ov = document.getElementById('tpOnb'); if(!ov || !st) return;
    var c = ov.querySelector('.tpo-card'), s = st.step, h = '';
    if(s === 1){
      h = '<h2>' + t('q1') + '</h2><p class="tpo-sub">' + t('q1s') + '</p><input class="tpo-big" id="tpoName" maxlength="30" autocomplete="name" placeholder="' + esc(t('nameph')) + '" value="' + esc(st.name) + '">' +
        '<button type="button" class="tpo-go" data-x="next"' + (st.name.trim() ? '' : ' disabled') + '>' + t('cont') + '</button>';
    }
    if(s === 2){
      h = '<div class="tpo-titlerow"><h2>' + t('q2') + '</h2><button type="button" class="avm-dice" data-x="random" title="' + esc(t('random')) + '" aria-label="' + esc(t('random')) + '">' + A.DICE + '</button></div><p class="tpo-sub">' + t('q2s') + '</p>' +
        '<div class="tpo-maker"></div><button type="button" class="tpo-go" data-x="next">' + t('cont') + '</button><button type="button" class="tpo-skip" data-x="next">' + t('skip') + '</button>';
    }
    if(s === 3){
      h = '<div class="tpo-titlerow"><h2>' + t('q3') + '</h2><button type="button" class="avm-dice" data-x="shuffle" title="' + esc(t('shuffle')) + '" aria-label="' + esc(t('shuffle')) + '">' + A.DICE + '</button></div><p class="tpo-sub">' + t('q3s') + '</p>' +
        '<p class="tpo-lab">' + t('colours') + '</p><div class="tpo-pal">' + THEMES.map(function(x){ return '<button type="button" data-theme-k="' + x.k + '" class="' + (st.theme === x.k ? 'on' : '') + '" aria-label="' + x.k + '" style="background:conic-gradient(' + x.p + ' 0 120deg,' + x.s + ' 120deg 240deg,' + x.a + ' 240deg)"></button>'; }).join('') + '</div>' +
        '<p class="tpo-lab">' + t('fonts') + '</p><div class="tpo-fonts">' + FONTS.map(function(f){ return '<button type="button" data-font-k="' + f.k + '" class="' + (st.font === f.k ? 'on' : '') + '"><span style="font-family:' + f.f + '">Aa</span><small>' + t('f_' + f.k) + '</small></button>'; }).join('') + '</div>' +
        '<p class="tpo-lab">' + t('mode') + '</p><div class="tpo-chips">' + [['light', ICON.sun + t('light')], ['dark', ICON.moon + t('dark')]].map(function(m){ return '<button type="button" data-mode-k="' + m[0] + '" class="' + (st.mode === m[0] ? 'on' : '') + '">' + m[1] + '</button>'; }).join('') + '</div>' +
        '<button type="button" class="tpo-go" data-x="next">' + t('cont') + '</button><button type="button" class="tpo-skip" data-x="next">' + t('skip') + '</button>';
    }
    if(s === 4){
      var x = themeOf(st.theme), f = fontOf(st.font);
      h = '<div class="tpo-done"><div class="face">' + face(st.av) + '</div><h2>' + t('doneT') + esc(st.name.trim() || '') + '!</h2><p class="tpo-sub">' + t('doneS') + '</p>' +
        '<div class="tpo-sum"><span class="dots"><i style="background:' + x.p + '"></i><i style="background:' + x.s + '"></i><i style="background:' + x.a + '"></i></span><span class="sep"></span><span class="aa" style="font-family:' + f.f + '">Aa</span><span class="sep"></span><span class="md">' + (st.mode === 'dark' ? ICON.moon : ICON.sun) + '</span></div>' +
        '<button type="button" class="tpo-go" data-x="start">' + t('start') + '</button><div class="tpo-err" hidden></div></div>';
    }
    c.innerHTML = h;
    var nmIn = c.querySelector('#tpoName');
    if(nmIn){
      nmIn.addEventListener('input', function(){ st.name = nmIn.value; c.querySelector('.tpo-go').disabled = !nmIn.value.trim(); document.querySelectorAll('#tpOnb [data-myname]').forEach(function(x){ x.textContent = st.name.trim() || '…'; }); });
      nmIn.addEventListener('keydown', function(e){ if(e.key === 'Enter' && nmIn.value.trim()){ st.step++; render(); } });
      setTimeout(function(){ nmIn.focus(); }, 0);
    }
    var mk = c.querySelector('.tpo-maker');
    if(mk) st.maker = A.maker(mk, { value: st.av, labels: MAKER[lang()], onChange: function(av){ st.av = av; drawBigFace(); } });
    ov.querySelector('.tpo-back').hidden = s === 1;
    renderLeft();
  }
  function drawBigFace(){ var b = document.querySelector('#tpOnb .tpo-bigface'); if(b) b.innerHTML = face(st.av); }
  function onClick(e){
    var b = e.target.closest('[data-x],[data-theme-k],[data-font-k],[data-mode-k]'); if(!b || !st) return;
    var x = b.getAttribute('data-x');
    if(x === 'next'){ st.step = Math.min(4, st.step + 1); render(); return; }
    if(x === 'random'){ st.av = st.maker ? st.maker.random() : A.randomize(); drawBigFace(); return; }
    if(x === 'shuffle'){
      var pick = function(l){ return l[Math.floor(Math.random() * l.length)]; };
      st.theme = pick(THEMES).k; st.font = pick(FONTS).k; st.mode = pick(['light', 'light', 'dark']);
      applyLook(st); render(); return;
    }
    if(x === 'start'){ finishOnboarding(); return; }
    if(b.hasAttribute('data-theme-k')){ st.theme = b.getAttribute('data-theme-k'); TP.applyTheme(st.theme); render(); return; }
    if(b.hasAttribute('data-font-k')){ st.font = b.getAttribute('data-font-k'); TP.applyFont(st.font); render(); return; }
    if(b.hasAttribute('data-mode-k')){ st.mode = b.getAttribute('data-mode-k'); TP.applyMode(st.mode); render(); return; }
  }
  function finishOnboarding(){
    var me = TP.me();
    if(st.preview){ closeOnboarding(true); startGuide({ preview: true, name: st.name, av: st.av }); return; }
    var btn = document.querySelector('#tpOnb .tpo-go'); if(btn) btn.disabled = true;
    var av = {}; Object.keys(st.av).forEach(function(k){ av[k] = st.av[k]; });
    if(st.name.trim()) av.name = st.name.trim();
    TP.saveAvatar(av).then(function(){
      ls('tpOnbDone:' + me.key, '1'); ls('tpSeenNew', VERSION);
      closeOnboarding(false); startGuide({ name: st.name, av: st.av });
    }).catch(function(err){
      console.warn('Saving the avatar failed (check the /avatars database rule allows the new fields)', err);
      ls('tpOnbDone:' + me.key, '1'); ls('tpSeenNew', VERSION);
      var e = document.querySelector('#tpOnb .tpo-err'); if(e){ e.hidden = false; e.textContent = t('saveErr'); }
      setTimeout(function(){ closeOnboarding(false); startGuide({ name: st.name, av: st.av }); }, 2200);
    });
  }

  // ---- the left side ----
  var FEED = [
    { who:ANA, html:function(){ return '<b>Ana</b> ' + t('f_added') + ' <b>Ponte Vecchio walk</b>'; }, sub:function(){ return t('f_sat'); }, chip:'<span class="chip" style="background:var(--secondary)">Walk</span>', day:1 },
    { who:SEB, html:function(){ return '<b>Seba</b> ' + t('f_vote') + ' <b>Uffizi</b> ' + t('or') + ' <b>Accademia</b>?'; }, sub:function(){ return t('f_voteSub'); }, chip:'<span class="vote">VS</span>', day:0 },
    { who:MARTA, html:function(){ return '<b>Marta</b> ' + t('f_star') + ' <b>Gelato at Vivoli</b>'; }, sub:function(){ return t('f_ideas'); }, chip:'<span class="star">★ 3</span>', day:-1 },
    { who:ANA, html:function(){ return '<b>Ana</b> ' + t('f_assign') + ' <b>Duomo climb</b>'; }, sub:function(){ return t('f_assignSub'); }, chip:'<span class="chip" style="background:var(--primary);color:var(--on-primary,#fff)">Sight</span>', day:0 }];
  function weekend(){
    var n = esc(st.name.trim() || '…'), l = lang(), w = l === 'it' ? ['VEN', 'SAB', 'DOM'] : l === 'es' ? ['VIE', 'SÁB', 'DOM'] : ['FRI', 'SAT', 'SUN'];
    var act = function(chip, col, title, time){ return '<div class="act"><span class="chip" style="background:' + col + (col === 'var(--primary)' ? ';color:var(--on-primary,#fff)' : '') + '">' + chip + '</span><div class="tt">' + title + '</div><div class="mm">' + time + '</div></div>'; };
    var go = function(m){ return '<div class="go2">' + m + '</div>'; };
    return '<div class="tpo-pv"><div class="bar"><div class="nt">' + ICON.notes + t('notes') + '</div><div class="tab on">1. Florence<small>12–14 Jun ¦ €182</small></div><div class="tab" style="background:var(--secondary)">2. Lisbon<small>Jun ¦ €240</small></div><div class="tab" style="background:var(--accent)">3. Prague<small>Jun ¦ €210</small></div>' +
      '<div class="me"><span class="f">' + face(st.av) + '</span><span data-myname>' + n + '</span></div></div>' +
      '<div class="book"><div class="days">' +
        '<div class="day" data-d="0"><div class="dh"><b>12</b>' + w[0] + '<span class="tot">€ 55</span></div><div class="wx">☀ 27° <i>16°</i></div><div class="loc">FIRENZE</div>' +
          act('Sight', 'var(--primary)', 'Duomo climb', '09:00 – 10:30 · € 30') + go('6 min walk · 450 m') + act('Museum', 'var(--accent)', 'Uffizi Gallery', '11:00 – 14:00 · € 25') + '</div>' +
        '<div class="day" data-d="1"><div class="dh"><b>13</b>' + w[1] + '<span class="tot">€ 52</span></div><div class="wx">⛅ 26° <i>15°</i></div><div class="loc">FIRENZE</div>' +
          act('Museum', 'var(--accent)', 'Accademia · David', '09:30 · € 16') + go('14 min walk · 1,1 km') + '<div class="slot"></div>' + act('View', 'var(--secondary)', 'Piazzale Michelangelo', '19:30 · sunset') + '</div>' +
        '<div class="day" data-d="2"><div class="dh"><b>14</b>' + w[2] + '<span class="tot">€ 75</span></div><div class="wx">🌦 23° <i>14°</i></div><div class="loc">FIRENZE → CHIANTI</div>' +
          act('Food', 'var(--secondary)', 'Mercato Centrale', '11:00 · € 20') + go('55 min by bus') + act('Wine', 'var(--accent)', 'Chianti tasting', '15:00 · € 55') + '</div>' +
      '</div></div><div class="tpo-feed"></div></div>';
  }
  var feedI = 0;
  function drawFeed(){
    var f = document.querySelector('#tpOnb .tpo-feed'); if(!f) return;
    var e = FEED[feedI % FEED.length];
    f.innerHTML = '<div class="tpo-toast"><span class="f">' + face(e.who) + '</span><div>' + e.html() + '<small>' + e.sub() + ' · ' + t('now') + '</small></div>' + e.chip + '</div>';
    document.querySelectorAll('#tpOnb .tpo-pv .day').forEach(function(d){ d.classList.toggle('ping', +d.getAttribute('data-d') === e.day); });
    var slot = document.querySelector('#tpOnb .tpo-pv .slot');
    if(slot && e.day === 1 && !slot.innerHTML) slot.innerHTML = '<div class="act new"><span class="chip" style="background:var(--secondary)">Walk</span><div class="tt">Ponte Vecchio walk</div><div class="mm">17:00 · free</div></div><div class="go2">18 min walk · 1,4 km</div>';
  }
  function renderLeft(){
    var L = document.querySelector('#tpOnb .tpo-art'); if(!L) return;
    clearInterval(feedT);
    if(st.step === 2){ L.innerHTML = '<div class="tpo-bigface">' + face(st.av) + '</div>'; return; }
    // the weekend keeps playing across steps 1, 3 and 4 instead of starting over
    if(!L.querySelector('.tpo-pv')){ L.innerHTML = weekend(); feedI = 0; }
    else { var mf = L.querySelector('.me .f'); if(mf) mf.innerHTML = face(st.av); }
    drawFeed(); feedT = setInterval(function(){ feedI++; drawFeed(); }, 3200);
  }

  // ======================================================================
  // 3. The first trip, guided
  // ======================================================================
  var g = null;
  var PLACES = [['🇮🇹', 'Florence'], ['🇵🇹', 'Lisbon'], ['🇨🇿', 'Prague'], ['🇪🇸', 'Barcelona']];
  var MONTH = { en:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], it:['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'], es:['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'] };
  function iso(d){ return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function startGuide(opts){
    opts = opts || {};
    var now = new Date(), a = new Date(now.getFullYear(), now.getMonth() + 1, 12), b = new Date(now.getFullYear(), now.getMonth() + 1, 14);
    g = { q:0, preview:!!opts.preview, name:opts.name || '', av:opts.av, where:'', when:'', from:iso(a), to:iso(b), month:null, who:[], pid:null };
    var sc = scrim(); sc.hidden = false; drawWiz();
  }
  function scrim(){
    var sc = document.getElementById('tpoScrim');
    if(!sc){
      sc = document.createElement('div'); sc.id = 'tpoScrim'; sc.className = 'tpo-scrim'; sc.hidden = true; document.body.appendChild(sc);
      sc.addEventListener('click', function(e){ e.stopPropagation(); onWizClick(e); });
      sc.addEventListener('mousedown', function(e){ e.stopPropagation(); });
      sc.addEventListener('keydown', function(e){ e.stopPropagation(); });
    }
    return sc;
  }
  function closeGuide(){ var sc = document.getElementById('tpoScrim'); if(sc){ sc.hidden = true; sc.innerHTML = ''; } coach(99); }
  function drawWiz(){
    var sc = scrim(), q = g.q, h = '<div class="prog">' + [0, 1, 2].map(function(i){ return '<i class="' + (i <= q ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    if(q === 0) h += '<h3>' + t('w1') + '</h3><p>' + t('w1s') + '</p><input class="in" id="tpoWhere" placeholder="' + esc(t('w1ph')) + '" value="' + esc(g.where) + '" autocomplete="off" maxlength="40">' +
      '<div class="sugg">' + PLACES.map(function(p){ return '<button type="button" data-pl="' + p[1] + '" class="' + (g.where === p[1] ? 'on' : '') + '"><span>' + p[0] + '</span>' + p[1] + '</button>'; }).join('') + '</div>';
    if(q === 1){
      h += '<h3>' + t('w2') + '</h3><p>' + t('w2s') + '</p><div class="two"><button type="button" data-when="exact" class="' + (g.when === 'exact' ? 'on' : '') + '">' + t('w2a') + '<small>' + t('w2as') + '</small></button><button type="button" data-when="month" class="' + (g.when === 'month' ? 'on' : '') + '">' + t('w2b') + '<small>' + t('w2bs') + '</small></button></div>';
      if(g.when === 'exact') h += '<div class="dates"><input class="in" type="date" id="tpoFrom" value="' + g.from + '"><span>–</span><input class="in" type="date" id="tpoTo" value="' + g.to + '"></div>';
      if(g.when === 'month'){
        var now = new Date(), M = MONTH[lang()] || MONTH.en;
        h += '<div class="months">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ var d = new Date(now.getFullYear(), now.getMonth() + i, 1), k = d.getFullYear() + '-' + (d.getMonth() + 1);
          return '<button type="button" data-m="' + k + '" class="' + (g.month === k ? 'on' : '') + '">' + M[d.getMonth()] + (d.getFullYear() !== now.getFullYear() ? ' ' + String(d.getFullYear()).slice(2) : '') + '</button>'; }).join('') + '</div>';
      }
    }
    if(q === 2){
      var me = TP.me();
      h += '<h3>' + t('w3') + '</h3><p>' + t('w3s') + '</p><input class="in" id="tpoEmail" type="email" placeholder="' + esc(t('w3ph')) + '">' +
        '<div class="ppl"><span><i>' + (g.av ? face(g.av) : TP.avatar(me.email, null)) + '</i>' + esc(g.name || me.name || '') + ' (' + t('you') + ')</span>' + g.who.map(function(e){ return '<span><i>' + TP.avatar(e, null) + '</i>' + esc(e) + '</span>'; }).join('') + '</div>';
    }
    var ok = q === 0 ? !!g.where : q === 1 ? (g.when === 'exact' ? g.from && g.to && g.to >= g.from : g.when === 'month' && !!g.month) : true;
    h += '<div class="foot">' + (q ? '<button type="button" class="bk" data-w="back">' + t('back') + '</button>' : '<button type="button" class="bk" data-w="close">' + t('skip') + '</button>') +
      (q === 2 && !g.who.length ? '<button type="button" class="bk" data-w="next" style="margin-left:auto">' + t('justMe') + '</button>' : '') +
      '<button type="button" class="tpo-go" data-w="next"' + (ok ? '' : ' disabled') + '>' + (q === 2 ? t('create') : t('cont')) + '</button></div>';
    sc.innerHTML = '<div class="tpo-wiz" role="dialog" aria-modal="true">' + h + '</div>';
    var wh = sc.querySelector('#tpoWhere');
    if(wh){ wh.focus(); wh.addEventListener('input', function(){ g.where = wh.value.replace(/^@/, '').trim(); sc.querySelector('.tpo-go').disabled = !g.where; sc.querySelectorAll('[data-pl]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-pl') === g.where); }); });
      wh.addEventListener('keydown', function(e){ if(e.key === 'Enter' && g.where){ g.q++; drawWiz(); } }); }
    var fi = sc.querySelector('#tpoFrom'), ti = sc.querySelector('#tpoTo');
    function dates(){ g.from = fi.value; g.to = ti.value; if(g.to < g.from){ g.to = g.from; ti.value = g.to; } sc.querySelector('.tpo-go').disabled = !(g.from && g.to); }
    if(fi){ fi.addEventListener('change', dates); ti.addEventListener('change', dates); }
    var em = sc.querySelector('#tpoEmail');
    if(em){ em.focus(); em.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); var v = em.value.trim().toLowerCase(); if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) && g.who.indexOf(v) === -1){ g.who.push(v); drawWiz(); } } }); }
  }
  function onWizClick(e){
    if(!g) return;
    var b = e.target.closest('[data-pl],[data-when],[data-m],[data-w],[data-like],[data-lk]'); if(!b) return;
    if(b.hasAttribute('data-pl')){ g.where = b.getAttribute('data-pl'); drawWiz(); return; }
    if(b.hasAttribute('data-when')){ g.when = b.getAttribute('data-when'); drawWiz(); return; }
    if(b.hasAttribute('data-m')){ g.month = b.getAttribute('data-m'); drawWiz(); return; }
    if(b.hasAttribute('data-like')){ var i = +b.getAttribute('data-like'); g.likes[i].on = !g.likes[i].on; b.classList.toggle('on', g.likes[i].on); likeCount(); return; }
    if(b.hasAttribute('data-lk')){ var k = b.getAttribute('data-lk'); if(k === 'add') addLikes(); finishWizard(); return; }
    var w = b.getAttribute('data-w');
    if(w === 'close'){ closeGuide(); return; }
    if(w === 'back'){ g.q--; drawWiz(); return; }
    if(w === 'next'){ if(g.q < 2){ g.q++; drawWiz(); } else createTrip(); }
  }
  function createTrip(){
    var em = document.querySelector('#tpoEmail'), v = em && em.value.trim().toLowerCase();
    if(v && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) && g.who.indexOf(v) === -1) g.who.push(v);
    var dates;
    if(g.when === 'exact'){ var a = g.from.split('-').map(Number), b = g.to.split('-').map(Number); dates = { from:{ year:a[0], month:a[1], day:a[2] }, to:{ year:b[0], month:b[1], day:b[2] }, exact:true }; }
    else { var m = g.month.split('-').map(Number); dates = { from:{ year:m[0], month:m[1], day:1 }, to:{ year:m[0], month:m[1], day:new Date(m[0], m[1], 0).getDate() }, exact:false }; }
    g.dates = dates;
    if(!g.preview){
      try { g.pid = TP.createTrip(g.where, dates, g.who); } catch(err){ console.warn('Creating the first trip failed', err); }
      if(g.pid) ls('tpGuidePlan', g.pid);
    } else g.pid = TP.activePlan();
    showLikes();
  }
  // "What do you like?": places from OpenTripMap + Wikipedia (through the
  // Apps Script). Skipped without a key, or when nothing comes back.
  var MOCK_LIKES = [
    { name:'Florence Cathedral', kind:'Church', img:'', icon:'⛪' }, { name:'Uffizi Gallery', kind:'Museum', img:'', icon:'🖼' }, { name:'Ponte Vecchio', kind:'Bridge', img:'', icon:'🌉' },
    { name:'Boboli Gardens', kind:'Garden', img:'', icon:'🌳' }, { name:'Piazzale Michelangelo', kind:'Viewpoint', img:'', icon:'🌅' }, { name:'Mercato Centrale', kind:'Market', img:'', icon:'🍝' }];
  function showLikes(){
    var sc = scrim();
    sc.innerHTML = '<div class="tpo-wiz"><h3>' + t('likeT') + '</h3><p>' + t('likeS') + '</p><div class="tpo-likes-load">' + t('likeLoad') + '</div></div>';
    var done = false, timer = setTimeout(function(){ if(!done){ done = true; finishWizard(); } }, 9000);
    function show(items){
      if(done) return; done = true; clearTimeout(timer);
      items = (items || []).filter(function(x){ return x && x.name; }).slice(0, 9);
      if(!items.length){ finishWizard(); return; }
      g.likes = items.map(function(x){ return { item:x, on:false }; });
      sc.innerHTML = '<div class="tpo-wiz"><h3>' + t('likeT') + '</h3><p>' + t('likeS') + '</p><div class="tpo-likes">' + g.likes.map(function(l, i){ var x = l.item;
          return '<button type="button" class="tpo-like" data-like="' + i + '"><div class="im"' + (x.img ? ' style="background-image:url(\'' + esc(x.img) + '\')"' : '') + '>' + (x.img ? '' : (x.icon || '📍')) + '</div><span class="ck">✓</span><div class="tx"><b>' + esc(x.name) + '</b><small>' + esc(x.kind || '') + '</small></div></button>'; }).join('') + '</div>' +
        '<div class="foot"><button type="button" class="bk" data-lk="skip">' + t('likeSkip') + '</button><button type="button" class="tpo-go" data-lk="add" disabled>' + t('likeAdd') + '</button></div></div>';
    }
    if(!TP.hosted){ setTimeout(function(){ show(/florence|firenze|florencia/i.test(g.where) ? MOCK_LIKES : []); }, 500); return; }
    try { TP.travelCall({ kind:'suggest', city:g.where }).then(function(r){ show(r && r.places); }).catch(function(){ show([]); }); } catch(e){ show([]); }
  }
  function likeCount(){ var n = g.likes.filter(function(l){ return l.on; }).length, b = document.querySelector('#tpoScrim [data-lk="add"]'); if(b){ b.disabled = !n; b.textContent = t('likeAdd') + (n ? ' (' + n + ')' : ''); } }
  function addLikes(){
    if(g.preview || !g.pid) return;
    g.likes.filter(function(l){ return l.on; }).forEach(function(l){ var x = l.item, lines = [];
      if(x.kind) lines.push(x.kind); if(x.desc) lines.push(x.desc);
      TP.addIdea(g.pid, { t:x.name, l:lines }); });
  }
  function finishWizard(){
    var sc = scrim(); sc.hidden = true; sc.innerHTML = '';
    if(g.pid && !g.preview) TP.openPlan(g.pid);
    setTimeout(function(){ coach(0); }, 600);
  }
  // ---- three pointers, on the real page ----
  var COACH = [
    { sel:function(){ return dayCell(); }, t:'c1', p:'c1p' },
    { sel:function(){ return document.querySelector('.pills > .notes-tab'); }, t:'c2', p:'c2p' },
    { sel:function(){ return document.querySelector('#pageHead .page-share') || document.querySelector('#pageHead'); }, t:'c3', p:'c3p' }];
  function dayCell(){
    var cells = [].slice.call(document.querySelectorAll('.panel.on > .grid.week > .cell:not(.empty)'));
    var day = g && g.dates ? g.dates.from.day : 0;
    var hit = cells.filter(function(c){ var n = c.querySelector('.daynum'); return n && +n.textContent.trim() === day; })[0];
    hit = hit || cells.filter(function(c){ var r = c.getBoundingClientRect(); return r.top > 60 && r.bottom < innerHeight; })[0] || cells[0];
    if(hit && hit.scrollIntoView){ var r = hit.getBoundingClientRect(); if(r.top < 60 || r.bottom > innerHeight) hit.scrollIntoView({ block:'center' }); }
    return hit;
  }
  var coachI = -1;
  function coach(i){
    var spot = document.getElementById('tpoSpot'), box = document.getElementById('tpoCoach');
    if(i >= COACH.length || i < 0){ if(spot) spot.remove(); if(box) box.remove(); var was = coachI; coachI = -1; if(was >= 0) showCheck(); return; }
    var el = COACH[i].sel();
    if(!el || !el.getBoundingClientRect().width){ coach(i + 1); return; }
    coachI = i;
    if(!spot){ spot = document.createElement('div'); spot.id = 'tpoSpot'; spot.className = 'tpo-spot'; document.body.appendChild(spot); }
    if(!box){ box = document.createElement('div'); box.id = 'tpoCoach'; box.className = 'tpo-coach'; document.body.appendChild(box);
      box.addEventListener('click', function(e){ e.stopPropagation(); var b = e.target.closest('[data-c]'); if(!b) return; coach(b.getAttribute('data-c') === 'skip' ? 99 : coachI + 1); }); }
    var r = el.getBoundingClientRect();
    spot.style.left = (r.left - 6) + 'px'; spot.style.top = (r.top - 6) + 'px'; spot.style.width = (r.width + 12) + 'px'; spot.style.height = (r.height + 12) + 'px';
    box.innerHTML = '<b>' + t(COACH[i].t) + '</b><p>' + t(COACH[i].p) + '</p><div class="cf"><span>' + (i + 1) + ' / ' + COACH.length + '</span><span><button type="button" class="sk" data-c="skip">' + t('skip') + '</button> <button type="button" data-c="next">' + (i === COACH.length - 1 ? t('gotIt') : t('next')) + '</button></span></div>';
    var W = 280, H = box.offsetHeight || 150, left, top;
    if(r.right + 18 + W < innerWidth && r.height > 80){ left = r.right + 18; top = Math.min(r.top, innerHeight - H - 12); }
    else { left = Math.min(Math.max(12, r.left), innerWidth - W - 12); top = r.bottom + 16; if(top + H > innerHeight) top = Math.max(12, r.top - H - 16); }
    box.style.left = left + 'px'; box.style.top = top + 'px';
  }
  window.addEventListener('resize', function(){ if(coachI >= 0) coach(coachI); });
  // ---- Get started ----
  var checkT = null;
  function guidePlan(){ return g && g.pid ? g.pid : ls('tpGuidePlan'); }
  function showCheck(){
    var pid = guidePlan(); if(!pid) return;
    if(g && g.preview){ drawCheck({ acts:0, ideas:0, duels:0, people:1, shared:false }, true); return; }
    clearInterval(checkT);
    function tick(){ var s = TP.planStats(pid); if(!s){ return; } drawCheck(s, false); }
    tick(); checkT = setInterval(tick, 1500);
  }
  function drawCheck(s, preview){
    var c = document.getElementById('tpoCheck');
    if(!c){ c = document.createElement('div'); c.id = 'tpoCheck'; c.className = 'tpo-check grp-ui'; document.body.appendChild(c);
      c.addEventListener('click', function(e){ e.stopPropagation(); var b = e.target.closest('[data-do]'); if(!b) return; doIt(b.getAttribute('data-do')); }); }
    var done = { act:s.acts > 0, invite:s.people > 1 || s.shared, idea:s.ideas > 0, vote:s.duels > 0 };
    var items = [['act', 'gs1'], ['invite', 'gs2'], ['idea', 'gs3'], ['vote', 'gs4']], n = items.filter(function(i){ return done[i[0]]; }).length;
    var html = '<div class="h">' + t('gs') + '<small>' + n + '/4</small><button type="button" data-do="close" aria-label="' + esc(t('close')) + '">✕</button></div><div class="bar2"><i style="width:' + (n / 4 * 100) + '%"></i></div>' +
      (n === 4 ? '<div class="all">' + t('allSet') + '</div>' : items.map(function(i){ return '<div class="it' + (done[i[0]] ? ' ok' : '') + '"><i>' + (done[i[0]] ? '✓' : '') + '</i>' + t(i[1]) + (done[i[0]] ? '' : '<button type="button" data-do="' + i[0] + '">' + t('doIt') + '</button>') + '</div>'; }).join(''));
    if(c.innerHTML !== html) c.innerHTML = html;
    if(n === 4 && !preview && !c._bye){ c._bye = setTimeout(function(){ hideCheck(true); }, 5000); }
  }
  function hideCheck(forGood){ clearInterval(checkT); var c = document.getElementById('tpoCheck'); if(c) c.remove(); if(forGood && !(g && g.preview)) ls('tpGuidePlan', null); }
  function doIt(k){
    if(k === 'close'){ hideCheck(true); return; }
    if(k === 'act'){ var el = dayCell(); if(el) el.click(); return; }
    if(k === 'invite'){ var s = document.querySelector('#pageHead .page-share'); if(s) s.click(); return; }
    if(k === 'idea'){ TP.openNotes(); return; }
    if(k === 'vote'){ TP.toast(t('voteHint')); return; }
  }

  // ======================================================================
  // 4. What's new
  // ======================================================================
  function showWhatsNew(){
    var sc = scrim();
    var demo = { skin:'#F0D3AC', hair:'#8B6FC9', hairLength:'long', hairStyle:'braid', hairTexture:'wavy', fringe:'bangs', eyes:'#4A89C9', mouthType:0, glasses:'sunglasses', bg:'#F1E9FB' };
    sc.innerHTML = '<div class="tpo-new" role="dialog" aria-modal="true"><div class="k">' + t('newK') + '</div><h3>' + t('newT') + '</h3><ul>' +
      '<li><span class="ic face">' + face(demo) + '</span><div><b>' + t('n1') + '</b><span>' + t('n1s') + '</span></div></li>' +
      '<li><span class="ic">' + ICON.moon + '</span><div><b>' + t('n2') + '</b><span>' + t('n2s') + '</span></div></li>' +
      '<li><span class="ic">' + ICON.palette + '</span><div><b>' + t('n3') + '</b><span>' + t('n3s') + '</span></div></li>' +
      '<li><span class="ic">' + ICON.flag + '</span><div><b>' + t('n4') + '</b><span>' + t('n4s') + '</span></div></li></ul>' +
      '<button type="button" class="tpo-go" data-new="ok">' + t('newDone') + '</button></div>';
    sc.hidden = false;
    sc.querySelector('[data-new]').addEventListener('click', function(){ ls('tpSeenNew', VERSION); sc.hidden = true; sc.innerHTML = ''; });
  }

  // ======================================================================
  // 5. The cheat corner: hover the bottom-left corner for 2 seconds
  // ======================================================================
  var cheatOn = false;
  function enableCheats(){
    if(cheatOn) return; cheatOn = true;
    var hot = document.createElement('div'); hot.className = 'tpo-cheat-hot grp-ui'; hot.setAttribute('aria-hidden', 'true'); document.body.appendChild(hot);
    var timer = null;
    hot.addEventListener('mouseenter', function(){ hot.classList.add('arming'); timer = setTimeout(openCheats, 2000); });
    hot.addEventListener('mouseleave', function(){ hot.classList.remove('arming'); clearTimeout(timer); });
  }
  // the quick way in: Ctrl+Shift+K (or ⌘+Shift+K), owners only
  document.addEventListener('keydown', function(e){
    if(!cheatOn || !e.shiftKey || !(e.ctrlKey || e.metaKey) || e.altKey || String(e.key).toLowerCase() !== 'k') return;
    e.preventDefault(); openCheats();
  });
  function openCheats(){
    var old = document.getElementById('tpoCheat'); if(old){ old.remove(); return; }
    var p = document.createElement('div'); p.id = 'tpoCheat'; p.className = 'tpo-cheat grp-ui';
    var rows = [
      ['signup', ICON.user, 'Sign up from scratch', 'Name, avatar, style, then the guide'],
      ['page', ICON.door, 'Show the sign-in page', 'As a new person sees it'],
      ['guide', ICON.map, 'Replay the first-trip guide', 'Where / When / Who, pointers, Get started'],
      ['new', ICON.spark, 'Show What’s new', ''],
      ['bell', ICON.bell, 'Send me a sample notification', 'Lands in your bell'],
      ['reset', ICON.reset, 'Reset my preferences', 'Theme, font, mode, background, language']];
    p.innerHTML = '<div class="h">Cheat codes<button type="button" data-ch="x" aria-label="Close">✕</button></div>' +
      rows.map(function(r){ return '<button type="button" class="row" data-ch="' + r[0] + '">' + r[1] + '<span>' + r[2] + (r[3] ? '<small>' + r[3] + '</small>' : '') + '</span></button>'; }).join('') +
      '<div class="note">Previews don’t save anything, except the notification.</div>';
    document.body.appendChild(p);
    p.addEventListener('click', function(e){
      e.stopPropagation();
      var b = e.target.closest('[data-ch]'); if(!b) return; var k = b.getAttribute('data-ch');
      if(k !== 'bell') p.remove();
      if(k === 'signup'){ TP.myAvatar().then(function(){ openOnboarding({ preview:true }); }); }
      if(k === 'page') previewSignIn();
      if(k === 'guide') startGuide({ preview:true });
      if(k === 'new') showWhatsNew();
      if(k === 'bell'){ TP.sampleNotification().then(function(){ TP.toast('Sent: check the bell'); }).catch(function(err){ TP.toast('Not sent: ' + ((err && err.message) || 'error')); }); }
      if(k === 'reset'){ if(confirm('Reset theme, font, mode, background and language to the standard?')){ TP.applyTheme('neutral'); TP.applyFont('neutral'); TP.applyMode('light'); TP.applyBackdrop('flat'); TP.applyLanguage('en'); TP.toast('Preferences reset'); } }
    });
    document.addEventListener('mousedown', function off(e){ if(!p.contains(e.target)){ p.remove(); document.removeEventListener('mousedown', off); } });
  }
  function previewSignIn(){
    var gate = document.getElementById('authGate'); if(!gate) return;
    var state = gate.getAttribute('data-state'), mode = gate.getAttribute('data-auth');
    gate.setAttribute('data-state', 'signin'); gate.setAttribute('data-auth', 'signup');
    gate.classList.add('show', 'auth-preview');
    var bar = gate.querySelector('.auth-preview-bar');
    if(!bar){ bar = document.createElement('div'); bar.className = 'auth-preview-bar tpo-preview-tag'; bar.innerHTML = 'Preview<button type="button" aria-label="Close">✕</button>'; gate.appendChild(bar); }
    bar.querySelector('button').onclick = function(){ gate.classList.remove('show', 'auth-preview'); if(state) gate.setAttribute('data-state', state); if(mode) gate.setAttribute('data-auth', mode); };
    myVote = null; renderAuthHero();
  }

  // ======================================================================
  // When someone is in: new people get the steps, everyone else What's new
  // ======================================================================
  window.TPOnb = {
    afterSignIn: function(info){
      var me = TP.me();
      if(info && info.owner) enableCheats();
      if(ls('tpOnbDone:' + me.key)){ resume(); return; }
      TP.myAvatar().then(function(ov){
        var fresh = info && info.created && Date.now() - info.created < 14 * 864e5;
        if(!ov && fresh){ openOnboarding({}); return; }
        ls('tpOnbDone:' + me.key, '1');
        resume();
      }).catch(function(){ resume(); });
    },
    openOnboarding: openOnboarding, startGuide: startGuide, showWhatsNew: showWhatsNew, previewSignIn: previewSignIn, openCheats: openCheats
  };
  function resume(){
    if(ls('tpGuidePlan')) setTimeout(showCheck, 1500);
    else if(ls('tpSeenNew') !== VERSION) setTimeout(showWhatsNew, 1200);
  }
  // Opened from disk (the local draft): the cheat corner is always there.
  if(window.TP && !TP.hosted) enableCheats();
})();
