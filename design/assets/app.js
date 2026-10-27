/* ==========================================================================
   LACRE · app.js (protótipo navegável)
   - Injeta shells (public / buyer / seller / admin / auth) a partir de
     <body data-shell="..." data-page="..." data-root="../">
   - Ícones inline: <i data-icon="lock"></i>
   - Identicons determinísticos: <span class="identicon" data-handle="coruja-7f3a"></span>
   - Interações: tabs, modais, menus, variantes, stepper, copiar, toasts,
     contagem regressiva, tema claro/escuro, sidebar mobile.
   Sem dependências. Troque BRAND para renomear a plataforma.
   ========================================================================== */
(function () {
  'use strict';
  const BRAND = 'Lacre';
  const body = document.body;
  const shell = body.dataset.shell || 'public';
  const page = body.dataset.page || '';
  const root = body.dataset.root || './';
  const href = (p) => root + p;

  /* ------------------------------------------------- idioma e país */
  // Dicionário do shell, indexado pelo texto em português (fallback: o próprio texto).
  const I18N = {
    en: {
      'Explorar': 'Explore', 'Pedidos': 'Requests', 'Como funciona': 'How it works', 'Para vendedores': 'For sellers', 'Políticas': 'Policies',
      'Entrar': 'Sign in', 'Criar conta anônima': 'Create anonymous account', 'Índice do protótipo': 'Prototype index', 'Sair': 'Sign out', 'Design system': 'Design system',
      'Marketplace curado de informação. Anonimato total entre as partes, curadoria humana obrigatória e prova pública de cada item.': 'A curated marketplace for information. Full anonymity between parties, mandatory human curation and a public proof for every item.',
      'Provas públicas': 'Public proofs', 'Feed': 'Feed', 'Marketplace': 'Marketplace', 'Lacres coletivos': 'Collective seals', 'Pedidos com recompensa': 'Requests with rewards',
      'Sua conta': 'Your account', 'Vender informação': 'Sell information', 'Reputação': 'Reputation', 'Confiança': 'Trust', 'Política de conteúdo': 'Content policy',
      'Anonimato e seus limites': 'Anonymity and its limits', 'Denunciar um item': 'Report an item', 'Pedidos jurídicos': 'Legal requests',
      '© 2026 Lacre · Protótipo navegável · Nenhum dado de identidade é coletado.': '© 2026 Lacre · Navigable prototype · No identity data is collected.',
      'Comprar': 'Buy', 'Painel': 'Dashboard', 'Explorar catálogo': 'Explore catalog', 'Meus pedidos': 'My requests', 'Minha conta': 'My account', 'Cofre': 'Vault', 'Apoios': 'Backings',
      'Carteira': 'Wallet', 'Pagamentos': 'Payments', 'Carteiras dos itens': 'Item wallets', 'Mensagens': 'Messages', 'Notificações': 'Notifications', 'Configurações': 'Settings', 'Vender': 'Sell', 'Meus anúncios': 'My listings', 'Novo anúncio': 'New listing',
      'Pedidos abertos': 'Open requests', 'Conta': 'Account', 'Ganhos e saques': 'Earnings and withdrawals', 'Curadoria': 'Curation', 'Fila de análise': 'Review queue',
      'Análise (workbench)': 'Review (workbench)', 'Jurídico': 'Legal', 'Publicação': 'Publishing', 'Operação': 'Operations', 'Disputas': 'Disputes', 'Denúncias': 'Reports',
      'Contas': 'Accounts', 'Financeiro': 'Finance', 'Sistema': 'System', 'Auditoria': 'Audit log', 'Área do vendedor': 'Seller area', 'Área do comprador': 'Buyer area',
      'mesma conta, outro papel': 'same account, another role', 'Comprador': 'Buyer', 'Vendedor': 'Seller', 'Minhas ações': 'My actions',
      'Buscar no catálogo…': 'Search the catalog…', 'Buscar item, pseudônimo, hash…': 'Search item, pseudonym, hash…', 'Alternar tema': 'Toggle theme', 'Tema claro': 'Light theme', 'Tema escuro': 'Dark theme',
      'Idioma': 'Language', 'País': 'Country', 'Buscar país…': 'Search country…', 'Todos os países (Global)': 'All countries (Global)', 'Detectado pelo navegador': 'Detected from your browser',
      'idioma e fuso horário · sem GPS, sem IP guardado': 'language and time zone · no GPS, no IP stored', 'Trocar': 'Change', 'Entendi': 'Got it', 'Idioma e país': 'Language and country',
      'Mostrando o Lacre em {lang} com itens de {country}, detectados pelo seu navegador.': 'Showing Lacre in {lang} with items from {country}, detected from your browser.',
      'Itens de {country}': 'Items from {country}', 'Ver todos os países': 'See all countries', 'Trocar país': 'Change country',
      'Nenhum item de {country} ainda. Mostrando todos os países.': 'No items from {country} yet. Showing all countries.', 'Novos no catálogo': 'New in the catalog',
      'Informação com lacre. Anonimato dos dois lados.': 'Sealed information. Anonymity on both sides.',
      'Explorar o catálogo': 'Explore the catalog', 'Documentos, bases de dados, fotografias, áudios e apurações de qualquer país, vendidos por pessoas que não precisam dizer quem são, para pessoas que também não precisam. Nada vai ao ar sem uma equipe humana ler tudo antes.': 'Documents, datasets, photographs, audio and investigations from any country, sold by people who do not need to say who they are, to people who do not need to either. Nothing goes live before a human team reads all of it.', 'Ver os 351 itens': 'See all 351 items', 'Curadoria humana obrigatória.': 'Mandatory human curation.', 'Anonimato total entre as partes.': 'Full anonymity between parties.', 'Prova pública de cada item.': 'A public proof for every item.'
    },
    es: {
      'Explorar': 'Explorar', 'Pedidos': 'Pedidos', 'Como funciona': 'Cómo funciona', 'Para vendedores': 'Para vendedores', 'Políticas': 'Políticas',
      'Entrar': 'Entrar', 'Criar conta anônima': 'Crear cuenta anónima', 'Índice do protótipo': 'Índice del prototipo', 'Sair': 'Salir', 'Design system': 'Design system',
      'Marketplace curado de informação. Anonimato total entre as partes, curadoria humana obrigatória e prova pública de cada item.': 'Marketplace curado de información. Anonimato total entre las partes, curaduría humana obligatoria y prueba pública de cada ítem.',
      'Provas públicas': 'Pruebas públicas', 'Feed': 'Feed', 'Marketplace': 'Marketplace', 'Lacres coletivos': 'Lacres colectivos', 'Pedidos com recompensa': 'Pedidos con recompensa',
      'Sua conta': 'Tu cuenta', 'Vender informação': 'Vender información', 'Reputação': 'Reputación', 'Confiança': 'Confianza', 'Política de conteúdo': 'Política de contenido',
      'Anonimato e seus limites': 'Anonimato y sus límites', 'Denunciar um item': 'Denunciar un ítem', 'Pedidos jurídicos': 'Solicitudes legales',
      '© 2026 Lacre · Protótipo navegável · Nenhum dado de identidade é coletado.': '© 2026 Lacre · Prototipo navegable · No se recopila ningún dato de identidad.',
      'Comprar': 'Comprar', 'Painel': 'Panel', 'Explorar catálogo': 'Explorar catálogo', 'Meus pedidos': 'Mis pedidos', 'Minha conta': 'Mi cuenta', 'Cofre': 'Bóveda', 'Apoios': 'Apoyos',
      'Carteira': 'Billetera', 'Pagamentos': 'Pagos', 'Carteiras dos itens': 'Billeteras de los ítems', 'Mensagens': 'Mensajes', 'Notificações': 'Notificaciones', 'Configurações': 'Configuración', 'Vender': 'Vender', 'Meus anúncios': 'Mis anuncios', 'Novo anúncio': 'Nuevo anuncio',
      'Pedidos abertos': 'Pedidos abiertos', 'Conta': 'Cuenta', 'Ganhos e saques': 'Ganancias y retiros', 'Curadoria': 'Curaduría', 'Fila de análise': 'Cola de análisis',
      'Análise (workbench)': 'Análisis (workbench)', 'Jurídico': 'Jurídico', 'Publicação': 'Publicación', 'Operação': 'Operación', 'Disputas': 'Disputas', 'Denúncias': 'Denuncias',
      'Contas': 'Cuentas', 'Financeiro': 'Finanzas', 'Sistema': 'Sistema', 'Auditoria': 'Auditoría', 'Área do vendedor': 'Área del vendedor', 'Área do comprador': 'Área del comprador',
      'mesma conta, outro papel': 'misma cuenta, otro rol', 'Comprador': 'Comprador', 'Vendedor': 'Vendedor', 'Minhas ações': 'Mis acciones',
      'Buscar no catálogo…': 'Buscar en el catálogo…', 'Buscar item, pseudônimo, hash…': 'Buscar ítem, seudónimo, hash…', 'Alternar tema': 'Cambiar tema', 'Tema claro': 'Tema claro', 'Tema escuro': 'Tema oscuro',
      'Idioma': 'Idioma', 'País': 'País', 'Buscar país…': 'Buscar país…', 'Todos os países (Global)': 'Todos los países (Global)', 'Detectado pelo navegador': 'Detectado por el navegador',
      'idioma e fuso horário · sem GPS, sem IP guardado': 'idioma y zona horaria · sin GPS, sin IP guardada', 'Trocar': 'Cambiar', 'Entendi': 'Entendido', 'Idioma e país': 'Idioma y país',
      'Mostrando o Lacre em {lang} com itens de {country}, detectados pelo seu navegador.': 'Mostrando Lacre en {lang} con ítems de {country}, detectados por tu navegador.',
      'Itens de {country}': 'Ítems de {country}', 'Ver todos os países': 'Ver todos los países', 'Trocar país': 'Cambiar país',
      'Nenhum item de {country} ainda. Mostrando todos os países.': 'Aún no hay ítems de {country}. Mostrando todos los países.', 'Novos no catálogo': 'Nuevos en el catálogo',
      'Informação com lacre. Anonimato dos dois lados.': 'Información con lacre. Anonimato de los dos lados.',
      'Explorar o catálogo': 'Explorar el catálogo', 'Documentos, bases de dados, fotografias, áudios e apurações de qualquer país, vendidos por pessoas que não precisam dizer quem são, para pessoas que também não precisam. Nada vai ao ar sem uma equipe humana ler tudo antes.': 'Documentos, bases de datos, fotografías, audios e investigaciones de cualquier país, vendidos por personas que no necesitan decir quiénes son, a personas que tampoco lo necesitan. Nada sale al aire sin que un equipo humano lo lea antes.', 'Ver os 351 itens': 'Ver los 351 ítems', 'Curadoria humana obrigatória.': 'Curaduría humana obligatoria.', 'Anonimato total entre as partes.': 'Anonimato total entre las partes.', 'Prova pública de cada item.': 'Prueba pública de cada ítem.'
    }
  };
  const LANGS = { pt: 'Português', en: 'English', es: 'Español' };
  // nomes dos países em pt / en / es
  const COUNTRIES = {
    GLOBAL: ['Global', 'Global', 'Global'], BR: ['Brasil', 'Brazil', 'Brasil'], US: ['Estados Unidos', 'United States', 'Estados Unidos'], AR: ['Argentina', 'Argentina', 'Argentina'],
    PT: ['Portugal', 'Portugal', 'Portugal'], MX: ['México', 'Mexico', 'México'], GB: ['Reino Unido', 'United Kingdom', 'Reino Unido'], DE: ['Alemanha', 'Germany', 'Alemania'],
    IN: ['Índia', 'India', 'India'], CL: ['Chile', 'Chile', 'Chile'], BD: ['Bangladesh', 'Bangladesh', 'Bangladesh'], CO: ['Colômbia', 'Colombia', 'Colombia'], ES: ['Espanha', 'Spain', 'España'],
    FR: ['França', 'France', 'Francia'], IT: ['Itália', 'Italy', 'Italia'], PE: ['Peru', 'Peru', 'Perú'], UY: ['Uruguai', 'Uruguay', 'Uruguay'], CA: ['Canadá', 'Canada', 'Canadá'],
    AU: ['Austrália', 'Australia', 'Australia'], ZA: ['África do Sul', 'South Africa', 'Sudáfrica'], NG: ['Nigéria', 'Nigeria', 'Nigeria'], KE: ['Quênia', 'Kenya', 'Kenia'],
    JP: ['Japão', 'Japan', 'Japón'], KR: ['Coreia do Sul', 'South Korea', 'Corea del Sur'], ID: ['Indonésia', 'Indonesia', 'Indonesia'], PH: ['Filipinas', 'Philippines', 'Filipinas'],
    TR: ['Turquia', 'Turkey', 'Turquía'], PL: ['Polônia', 'Poland', 'Polonia'], NL: ['Países Baixos', 'Netherlands', 'Países Bajos'], AO: ['Angola', 'Angola', 'Angola'], MZ: ['Moçambique', 'Mozambique', 'Mozambique']
  };
  // fuso horário → país (sinal sem permissão e sem IP)
  const TZ = { 'America/Sao_Paulo': 'BR', 'America/Fortaleza': 'BR', 'America/Recife': 'BR', 'America/Bahia': 'BR', 'America/Manaus': 'BR', 'America/Belem': 'BR', 'America/Cuiaba': 'BR', 'America/Campo_Grande': 'BR', 'America/Porto_Velho': 'BR', 'America/Boa_Vista': 'BR', 'America/Rio_Branco': 'BR', 'America/Maceio': 'BR', 'America/Araguaina': 'BR', 'America/Santarem': 'BR', 'America/Noronha': 'BR',
    'America/Santiago': 'CL', 'America/Punta_Arenas': 'CL', 'America/Montevideo': 'UY', 'America/Lima': 'PE', 'America/Bogota': 'CO', 'America/Mexico_City': 'MX', 'America/Cancun': 'MX', 'America/Monterrey': 'MX', 'America/Tijuana': 'MX', 'America/Chihuahua': 'MX', 'America/Merida': 'MX', 'America/Hermosillo': 'MX', 'America/Mazatlan': 'MX',
    'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US', 'Pacific/Honolulu': 'US', 'America/Detroit': 'US',
    'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'Europe/Lisbon': 'PT', 'Atlantic/Azores': 'PT', 'Atlantic/Madeira': 'PT',
    'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES', 'Europe/London': 'GB', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL', 'Europe/Warsaw': 'PL', 'Europe/Istanbul': 'TR',
    'Asia/Kolkata': 'IN', 'Asia/Dhaka': 'BD', 'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR', 'Asia/Jakarta': 'ID', 'Asia/Manila': 'PH', 'Africa/Johannesburg': 'ZA', 'Africa/Lagos': 'NG', 'Africa/Nairobi': 'KE', 'Africa/Luanda': 'AO', 'Africa/Maputo': 'MZ' };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function detectLang() {
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
    for (const l of langs) { const p = String(l).slice(0, 2).toLowerCase(); if (LANGS[p]) return p; }
    return 'en';
  }
  function detectCountry() {
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']);
    for (const l of langs) { const m = /^[a-z]{2,3}-([A-Za-z]{2})/.exec(String(l)); if (m && COUNTRIES[m[1].toUpperCase()]) return m[1].toUpperCase(); }
    try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; if (tz) { if (TZ[tz]) return TZ[tz]; if (tz.startsWith('America/Argentina/')) return 'AR'; if (tz.startsWith('Australia/')) return 'AU'; } } catch (e) {}
    return 'GLOBAL';
  }
  const detected = { lang: detectLang(), country: detectCountry() };
  const locale = {
    lang: (lsGet('lacre-lang') && LANGS[lsGet('lacre-lang')]) ? lsGet('lacre-lang') : detected.lang,
    country: (lsGet('lacre-country') && COUNTRIES[lsGet('lacre-country')]) ? lsGet('lacre-country') : detected.country,
    detected,
    countryName(code, lang) { const c = COUNTRIES[code] || COUNTRIES.GLOBAL; return c[{ pt: 0, en: 1, es: 2 }[lang || locale.lang]]; },
    setLang(l) { lsSet('lacre-lang', l); location.reload(); },
    setCountry(c) { lsSet('lacre-country', c); location.reload(); }
  };
  function t(text, vars) {
    let out = (I18N[locale.lang] && I18N[locale.lang][text]) || text;
    if (vars) Object.keys(vars).forEach(k => { out = out.split('{' + k + '}').join(vars[k]); });
    return out;
  }
  // Traduz nós de texto, placeholders e rótulos dentro de um subtree, pelo texto em português.
  function translateTree(rootEl) {
    if (!rootEl || locale.lang === 'pt') return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { const raw = n.nodeValue, k = raw.trim(); if (k && I18N[locale.lang][k]) n.nodeValue = raw.replace(k, I18N[locale.lang][k]); });
    rootEl.querySelectorAll('[placeholder],[aria-label],[data-tip]').forEach(el => ['placeholder', 'aria-label', 'data-tip'].forEach(a => { const v = el.getAttribute(a); if (v && I18N[locale.lang][v]) el.setAttribute(a, I18N[locale.lang][v]); }));
  }
  function localeControl() {
    const cur = (locale.country === 'GLOBAL' ? '🌐' : locale.country) + ' · ' + locale.lang;
    let list = '<button data-country="GLOBAL"' + (locale.country === 'GLOBAL' ? ' class="active"' : '') + '>' + t('Todos os países (Global)') + '</button>';
    Object.keys(COUNTRIES).filter(c => c !== 'GLOBAL').map(c => [c, locale.countryName(c)]).sort((a, b) => a[1].localeCompare(b[1])).forEach(([c, n]) => { list += '<button data-country="' + c + '"' + (locale.country === c ? ' class="active"' : '') + '><span class="tag">' + c + '</span>' + n + '</button>'; });
    return '<div class="menu-wrap locale-wrap"><button class="locale-btn" data-menu-toggle aria-label="' + t('Idioma e país') + '">' + iconSvg('globe') + '<span>' + cur.replace('🌐', 'Global') + '</span></button>' +
      '<div class="menu locale-menu">' +
      '<div class="lm-sec"><div class="lm-label">' + t('Idioma') + '</div><div class="segmented">' + Object.keys(LANGS).map(l => '<button data-lang="' + l + '"' + (l === locale.lang ? ' class="active"' : '') + '>' + LANGS[l] + '</button>').join('') + '</div></div>' +
      '<div class="lm-sec"><div class="lm-label">' + t('País') + '</div><div class="search"><span class="icon-wrap">' + iconSvg('search') + '</span><input class="input" type="search" data-country-search placeholder="' + t('Buscar país…') + '" aria-label="' + t('Buscar país…') + '"></div><div class="lm-list">' + list + '</div></div>' +
      '<div class="lm-foot">' + t('Detectado pelo navegador') + ': ' + LANGS[detected.lang] + ' · ' + locale.countryName(detected.country) + '<br><span class="muted">' + t('idioma e fuso horário · sem GPS, sem IP guardado') + '</span></div>' +
      '</div></div>';
  }
  function localeBar() {
    if (lsGet('lacre-locale-ack')) return '';
    return '<div class="locale-bar"><div class="container">' + iconSvg('globe') + '<span>' + t('Mostrando o Lacre em {lang} com itens de {country}, detectados pelo seu navegador.', { lang: LANGS[locale.lang], country: locale.countryName(locale.country) }) + '</span><button class="btn btn-sm" data-locale-open>' + t('Trocar') + '</button><button class="btn btn-sm btn-ghost" data-locale-ack>' + t('Entendi') + '</button></div></div>';
  }

  /* ------------------------------------------------------------------ ícones */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    unlock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    'lock-keyhole': '<circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'shield-alert': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'file-lock': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="8" height="5" x="2" y="13" rx="1"/><path d="M8 13v-2a2 2 0 1 0-4 0v2"/>',
    'file-search': '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="m9 18-1.5-1.5"/><circle cx="5" cy="14" r="3"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    table: '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    audio: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'badge-check': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-down-right': '<path d="m7 7 10 10"/><path d="M17 7v10H7"/>',
    'arrow-up-down': '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    hourglass: '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'user-x': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
    'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    crown: '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
    key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
    fingerprint: '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    list: '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'more-vertical': '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    edit: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    'bar-chart': '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    'pie-chart': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    gavel: '<path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    bitcoin: '<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/>',
    'qr-code': '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
    'circle-dollar': '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
    percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    'hand-coins': '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
    archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    'clipboard-check': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    'scroll-text': '<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
    store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
    vault: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/><path d="m7.9 7.9 2.7 2.7"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/><path d="m13.4 10.6 2.7-2.7"/><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/><path d="m7.9 16.1 2.7-2.7"/><circle cx="16.5" cy="16.5" r=".5" fill="currentColor"/><path d="m13.4 13.4 2.7 2.7"/><circle cx="12" cy="12" r="2"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    rss: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    stamp: '<path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/>',
    paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    circle: '<circle cx="12" cy="12" r="10"/>',
    dot: '<circle cx="12" cy="12" r="3" fill="currentColor"/>'
  };
  function iconSvg(name, cls) {
    const inner = ICONS[name] || ICONS.circle;
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }
  function renderIcons(scope) {
    (scope || document).querySelectorAll('i[data-icon]').forEach(el => {
      const tpl = document.createElement('template');
      tpl.innerHTML = iconSvg(el.dataset.icon, el.className);
      el.replaceWith(tpl.content.firstChild);
    });
  }

  /* --------------------------------------------------------- selo / marca */
  const SEAL = '<svg class="seal" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#c43d33"/><circle cx="57" cy="27" r="4" fill="#c43d33"/><circle cx="9" cy="39" r="3.5" fill="#c43d33"/><circle cx="41" cy="59" r="3" fill="#c43d33"/><circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/><circle cx="32" cy="32" r="21.5" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/><path d="M25.5 20.5v23H40" fill="none" stroke="#f3dca6" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function brandHtml(withSub) {
    return '<a class="brand" href="' + href('public/home.html') + '">' + SEAL + '<span>' + BRAND + '</span>' + (withSub ? '<small>' + withSub + '</small>' : '') + '</a>';
  }
  document.querySelectorAll('[data-seal]').forEach(el => { el.innerHTML = SEAL; });
  document.querySelectorAll('[data-brand]').forEach(el => { el.innerHTML = brandHtml(el.dataset.brand); });

  /* ------------------------------------------------------------ identicon */
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const ID_COLORS = ['#d9a441', '#c43d33', '#3987e5', '#199e70', '#9085e9', '#d95926', '#2bb0c5', '#c98500'];
  function identiconSvg(handle) {
    const h = hashStr(handle || 'anon');
    const color = ID_COLORS[h % ID_COLORS.length];
    let bits = h; let rects = '';
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 3; x++) {
        bits = (bits * 1103515245 + 12345) >>> 0;
        if ((bits >>> 16) & 1) {
          rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
          if (x < 2) rects += '<rect x="' + (4 - x) + '" y="' + y + '" width="1" height="1"/>';
        }
      }
    }
    return '<svg viewBox="-0.6 -0.6 6.2 6.2" shape-rendering="crispEdges" aria-hidden="true"><rect x="-0.6" y="-0.6" width="6.2" height="6.2" fill="' + color + '" opacity=".18"/><g fill="' + color + '">' + rects + '</g></svg>';
  }
  function renderIdenticons(scope) {
    (scope || document).querySelectorAll('.identicon[data-handle]').forEach(el => { if (!el.innerHTML.trim()) el.innerHTML = identiconSvg(el.dataset.handle); });
    (scope || document).querySelectorAll('.handle[data-handle]').forEach(el => {
      if (el.dataset.rendered) return;
      el.dataset.rendered = '1';
      const hd = el.dataset.handle;
      const rep = el.dataset.rep ? '<span class="rep">' + el.dataset.rep + '</span>' : '';
      el.innerHTML = '<span class="identicon">' + identiconSvg(hd) + '</span><span>@' + hd + '</span>' + rep;
    });
  }

  /* ---------------------------------------------------------------- tema */
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      const dark = document.documentElement.getAttribute('data-theme') === 'light' ? false : (document.documentElement.getAttribute('data-theme') === 'dark' ? true : !window.matchMedia('(prefers-color-scheme: light)').matches);
      b.innerHTML = iconSvg(dark ? 'sun' : 'moon');
      b.setAttribute('aria-label', dark ? 'Tema claro' : 'Tema escuro');
    });
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = cur === 'light' ? false : (cur === 'dark' ? true : !window.matchMedia('(prefers-color-scheme: light)').matches);
    const next = dark ? 'light' : 'dark';
    try { localStorage.setItem('lacre-theme', next); } catch (e) {}
    applyTheme(next);
  }
  try { const saved = localStorage.getItem('lacre-theme'); if (saved) document.documentElement.setAttribute('data-theme', saved); } catch (e) {}

  /* --------------------------------------------------------------- toast */
  let toastHost;
  window.toast = function (msg, icon) {
    if (!toastHost) { toastHost = document.createElement('div'); toastHost.className = 'toast-host'; document.body.appendChild(toastHost); }
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = iconSvg(icon || 'check-circle') + '<span>' + msg + '</span>';
    toastHost.appendChild(t); setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2600);
  };

  /* ----------------------------------------------------------- navegação */
  const NAV = {
    public: [
      { key: 'explorar', label: 'Explorar', to: 'public/explorar.html' },
      { key: 'pedidos', label: 'Pedidos', to: 'public/pedidos.html' },
      { key: 'como-funciona', label: 'Como funciona', to: 'public/como-funciona.html' },
      { key: 'vendedor', label: 'Para vendedores', to: 'public/vendedor.html' },
      { key: 'politicas', label: 'Políticas', to: 'public/politicas.html' }
    ],
    buyer: [
      { label: 'Comprar' },
      { key: 'painel', label: 'Painel', icon: 'home', to: 'buyer/painel.html' },
      { key: 'explorar', label: 'Explorar catálogo', icon: 'compass', to: 'public/explorar.html' },
      { key: 'pedidos', label: 'Meus pedidos', icon: 'file-search', to: 'buyer/pedidos.html', count: 2 },
      { label: 'Minha conta' },
      { key: 'cofre', label: 'Cofre', icon: 'vault', to: 'buyer/cofre.html', count: 7 },
      { key: 'apoios', label: 'Apoios', icon: 'hand-coins', to: 'buyer/apoios.html', count: 3 },
      { key: 'pagamentos', label: 'Pagamentos', icon: 'receipt', to: 'buyer/pagamentos.html' },
      { key: 'mensagens', label: 'Mensagens', icon: 'message-square', to: 'buyer/mensagens.html', count: 2 },
      { key: 'notificacoes', label: 'Notificações', icon: 'bell', to: 'buyer/notificacoes.html', count: 4 },
      { key: 'configuracoes', label: 'Configurações', icon: 'settings', to: 'buyer/configuracoes.html' }
    ],
    seller: [
      { label: 'Vender' },
      { key: 'painel', label: 'Painel', icon: 'home', to: 'seller/painel.html' },
      { key: 'anuncios', label: 'Meus anúncios', icon: 'archive', to: 'seller/anuncios.html', count: 6 },
      { key: 'novo-anuncio', label: 'Novo anúncio', icon: 'plus', to: 'seller/novo-anuncio.html' },
      { key: 'pedidos', label: 'Pedidos abertos', icon: 'file-search', to: 'seller/pedidos.html', count: 6 },
      { label: 'Conta' },
      { key: 'carteiras', label: 'Carteiras dos itens', icon: 'wallet', to: 'seller/carteiras.html' },
      { key: 'reputacao', label: 'Reputação', icon: 'award', to: 'seller/reputacao.html' },
      { key: 'mensagens', label: 'Mensagens', icon: 'message-square', to: 'buyer/mensagens.html', count: 1 },
      { key: 'notificacoes', label: 'Notificações', icon: 'bell', to: 'buyer/notificacoes.html', count: 4 },
      { key: 'configuracoes', label: 'Configurações', icon: 'settings', to: 'buyer/configuracoes.html' }
    ],
    admin: [
      { label: 'Curadoria' },
      { key: 'painel', label: 'Painel', icon: 'activity', to: 'admin/painel.html' },
      { key: 'fila', label: 'Fila de análise', icon: 'inbox', to: 'admin/fila.html', count: 23 },
      { key: 'analise', label: 'Análise (workbench)', icon: 'clipboard-check', to: 'admin/analise.html' },
      { key: 'juridico', label: 'Jurídico', icon: 'scale', to: 'admin/juridico.html', count: 5 },
      { key: 'publicacao', label: 'Publicação', icon: 'megaphone', to: 'admin/publicacao.html', count: 6 },
      { label: 'Operação' },
      { key: 'disputas', label: 'Disputas', icon: 'gavel', to: 'admin/disputas.html', count: 3 },
      { key: 'denuncias', label: 'Denúncias', icon: 'flag', to: 'admin/denuncias.html', count: 2 },
      { key: 'contas', label: 'Contas', icon: 'users', to: 'admin/contas.html' },
      { key: 'financeiro', label: 'Financeiro', icon: 'banknote', to: 'admin/financeiro.html' },
      { label: 'Sistema' },
      { key: 'auditoria', label: 'Auditoria', icon: 'scroll-text', to: 'admin/auditoria.html' },
      { key: 'configuracoes', label: 'Configurações', icon: 'settings', to: 'admin/configuracoes.html' }
    ]
  };

  function buildSidebar(kind) {
    const items = NAV[kind];
    const sub = kind === 'buyer' ? 'Comprador' : kind === 'seller' ? 'Vendedor' : 'Curadoria';
    let html = '<aside class="sidebar" aria-label="Menu">' + brandHtml(sub) + '<nav class="nav-group">';
    items.forEach(it => {
      if (!it.key) { html += '<div class="nav-label">' + it.label + '</div>'; return; }
      const active = it.key === page ? ' active' : '';
      html += '<a class="nav-item' + active + '" href="' + href(it.to) + '">' + iconSvg(it.icon) + '<span>' + it.label + '</span>' + (it.count ? '<span class="count">' + it.count + '</span>' : '') + '</a>';
    });
    html += '</nav><div class="sidebar-foot">';
    if (kind === 'buyer') html += '<a class="role-switch" href="' + href('seller/painel.html') + '">' + iconSvg('repeat') + '<span><b>Área do vendedor</b><br><span class="muted xs">mesma conta, outro papel</span></span></a>';
    if (kind === 'seller') html += '<a class="role-switch" href="' + href('buyer/painel.html') + '">' + iconSvg('repeat') + '<span><b>Área do comprador</b><br><span class="muted xs">mesma conta, outro papel</span></span></a>';
    if (kind === 'admin') html += '<div class="role-switch"><span class="identicon" style="background:var(--brass-soft);display:inline-flex;align-items:center;justify-content:center;color:var(--brass);font-weight:700;font-size:12px">AR</span><span><b>Ana R.</b><br><span class="muted xs">Curadora sênior · 2FA ativo</span></span></div>';
    else html += '<div class="role-switch"><span class="handle" data-handle="coruja-7f3a"></span></div>';
    html += '<a class="nav-item" href="' + href('index.html') + '">' + iconSvg('grid') + '<span>Índice do protótipo</span></a>';
    html += '<a class="nav-item" href="' + href('auth/entrar.html') + '">' + iconSvg('log-out') + '<span>Sair</span></a>';
    html += '</div></aside><div class="sidebar-backdrop" data-sidebar-close></div>';
    return html;
  }

  function buildTopbar(kind) {
    const title = body.dataset.title || (document.querySelector('h1') ? '' : BRAND);
    const searchPh = kind === 'admin' ? 'Buscar item, pseudônimo, hash…' : 'Buscar no catálogo…';
    let html = '<header class="topbar">';
    html += '<button class="icon-btn menu-btn" data-sidebar-toggle aria-label="Abrir menu">' + iconSvg('menu') + '</button>';
    if (title) html += '<span class="page-title">' + title + '</span>';
    html += '<div class="search"><span class="icon-wrap">' + iconSvg('search') + '</span><input class="input" type="search" placeholder="' + searchPh + '" aria-label="Buscar"></div><span class="spacer"></span>';
    html += localeControl();
    html += '<button class="icon-btn" data-theme-toggle aria-label="Alternar tema"></button>';
    html += '<a class="icon-btn" href="' + href('buyer/notificacoes.html') + '" aria-label="Notificações">' + iconSvg('bell') + '<span class="dot"></span></a>';
    html += '<div class="menu-wrap"><button class="icon-btn" data-menu-toggle aria-label="Conta">' + (kind === 'admin' ? '<span class="identicon" style="width:26px;height:26px;background:var(--brass-soft);display:inline-flex;align-items:center;justify-content:center;color:var(--brass);font-weight:700;font-size:11px">AR</span>' : '<span class="identicon" data-handle="coruja-7f3a"></span>') + '</button>';
    html += '<div class="menu">' + (kind === 'admin' ? '<a href="' + href('admin/auditoria.html') + '">' + iconSvg('scroll-text') + 'Minhas ações</a>' : '<a href="' + href('buyer/configuracoes.html') + '">' + iconSvg('settings') + 'Configurações</a><a href="' + href('buyer/pagamentos.html') + '">' + iconSvg('receipt') + 'Pagamentos</a>') + '<div class="sep"></div><a href="' + href('auth/entrar.html') + '">' + iconSvg('log-out') + 'Sair</a></div></div>';
    html += '</header>';
    return html;
  }

  function buildPublicHeader() {
    let html = '<header class="site-header"><div class="container">' + brandHtml() + '<nav class="site-nav">';
    NAV.public.forEach(it => { html += '<a href="' + href(it.to) + '"' + (it.key === page ? ' class="active"' : '') + '>' + it.label + '</a>'; });
    html += '</nav><div class="site-actions">' + localeControl() + '<button class="icon-btn" data-theme-toggle aria-label="Alternar tema"></button>';
    html += '<a class="btn btn-ghost" href="' + href('auth/entrar.html') + '">Entrar</a><a class="btn btn-primary" href="' + href('auth/criar-conta.html') + '">Criar conta anônima</a>';
    html += '<button class="icon-btn menu-btn" data-nav-toggle aria-label="Menu">' + iconSvg('menu') + '</button></div></div>';
    html += '<nav class="mobile-nav">';
    NAV.public.forEach(it => { html += '<a href="' + href(it.to) + '"' + (it.key === page ? ' class="active"' : '') + '>' + it.label + '</a>'; });
    html += '<a href="' + href('auth/entrar.html') + '">Entrar</a><a href="' + href('auth/criar-conta.html') + '">Criar conta anônima</a><a href="' + href('index.html') + '">Índice do protótipo</a></nav></header>';
    return html;
  }
  function buildPublicFooter() {
    return '<footer class="site-footer"><div class="container"><div class="cols">' +
      '<div>' + brandHtml() + '<p class="mt-2" style="max-width:34ch">Marketplace curado de informação. Anonimato total entre as partes, curadoria humana obrigatória e prova pública de cada item.</p>' +
      '<div class="row mt-2"><a class="chip" href="' + href('public/prova.html') + '">' + iconSvg('badge-check') + 'Provas públicas</a><a class="chip" href="#">' + iconSvg('rss') + 'Feed</a></div></div>' +
      '<div><h4>Marketplace</h4><a href="' + href('public/explorar.html') + '">Explorar</a><a href="' + href('public/explorar.html') + '#coletivos">Lacres coletivos</a><a href="' + href('public/pedidos.html') + '">Pedidos com recompensa</a><a href="' + href('public/como-funciona.html') + '">Como funciona</a></div>' +
      '<div><h4>Sua conta</h4><a href="' + href('auth/criar-conta.html') + '">Criar conta anônima</a><a href="' + href('auth/entrar.html') + '">Entrar</a><a href="' + href('public/vendedor.html') + '">Vender informação</a><a href="' + href('public/como-funciona.html') + '#reputacao">Reputação</a></div>' +
      '<div><h4>Confiança</h4><a href="' + href('public/politicas.html') + '">Política de conteúdo</a><a href="' + href('public/politicas.html') + '#anonimato">Anonimato e seus limites</a><a href="' + href('public/prova.html') + '#denunciar">Denunciar um item</a><a href="' + href('public/politicas.html') + '#juridico">Pedidos jurídicos</a></div>' +
      '</div><div class="legal"><span>© 2026 ' + BRAND + ' · Protótipo navegável · Nenhum dado de identidade é coletado.</span><span><a href="' + href('index.html') + '" style="display:inline">Índice do protótipo</a> · <a href="' + href('styleguide.html') + '" style="display:inline">Design system</a></span></div></div></footer>';
  }

  function mountShell() {
    const main = document.querySelector('main');
    if (!main) return;
    if (shell === 'buyer' || shell === 'seller' || shell === 'admin') {
      const app = document.createElement('div'); app.className = 'app';
      app.innerHTML = buildSidebar(shell);
      const wrap = document.createElement('div'); wrap.className = 'main';
      wrap.innerHTML = buildTopbar(shell) + localeBar();
      main.parentNode.insertBefore(app, main);
      wrap.appendChild(main);
      app.appendChild(wrap);
      if (!main.classList.contains('content')) main.classList.add('content');
    } else if (shell === 'public') {
      main.insertAdjacentHTML('beforebegin', buildPublicHeader() + localeBar());
      main.insertAdjacentHTML('afterend', buildPublicFooter());
    } else if (shell === 'auth') {
      const wrap = document.createElement('div'); wrap.className = 'auth-layout';
      wrap.innerHTML = '<div class="auth-top">' + brandHtml() + '<div class="row">' + localeControl() + '<button class="icon-btn" data-theme-toggle aria-label="Alternar tema"></button><a class="btn btn-ghost btn-sm" href="' + href('index.html') + '">Índice do protótipo</a></div></div>';
      const bodyWrap = document.createElement('div'); bodyWrap.className = 'auth-body';
      main.parentNode.insertBefore(wrap, main);
      bodyWrap.appendChild(main); wrap.appendChild(bodyWrap);
    }
  }

  /* ---------------------------------------------------------- interações */
  function bind() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-theme-toggle],[data-sidebar-toggle],[data-sidebar-close],[data-nav-toggle],[data-menu-toggle],[data-tab],[data-modal-open],[data-modal-close],[data-show],[data-step-go],[data-copy],[data-toast],[data-amount],[data-toggle-class],[data-dismiss],[data-lang],[data-country],[data-locale-ack],[data-locale-open]');
      if (!t) {
        if (!e.target.closest('.menu')) document.querySelectorAll('.menu.open').forEach(m => m.classList.remove('open'));
        return;
      }
      if (t.hasAttribute('data-theme-toggle')) { toggleTheme(); return; }
      if (t.hasAttribute('data-lang')) { e.preventDefault(); locale.setLang(t.dataset.lang); return; }
      if (t.hasAttribute('data-country')) { e.preventDefault(); lsSet('lacre-locale-ack', '1'); locale.setCountry(t.dataset.country); return; }
      if (t.hasAttribute('data-locale-ack')) { e.preventDefault(); lsSet('lacre-locale-ack', '1'); const bar = t.closest('.locale-bar'); if (bar) bar.remove(); return; }
      if (t.hasAttribute('data-locale-open')) { e.preventDefault(); const m = document.querySelector('.locale-menu'); if (m) m.classList.add('open'); const inp = m && m.querySelector('[data-country-search]'); if (inp) inp.focus(); return; }
      if (t.hasAttribute('data-sidebar-toggle')) { body.classList.toggle('sidebar-open'); return; }
      if (t.hasAttribute('data-sidebar-close')) { body.classList.remove('sidebar-open'); return; }
      if (t.hasAttribute('data-nav-toggle')) { body.classList.toggle('nav-open'); return; }
      if (t.hasAttribute('data-menu-toggle')) {
        e.preventDefault();
        const menu = t.parentElement.querySelector('.menu');
        document.querySelectorAll('.menu.open').forEach(m => { if (m !== menu) m.classList.remove('open'); });
        if (menu) menu.classList.toggle('open');
        return;
      }
      if (t.hasAttribute('data-tab')) {
        e.preventDefault();
        const group = t.closest('[data-tabs]') || document;
        const name = t.dataset.tab;
        group.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('active', x.dataset.tab === name));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === name || p.id === name));
        return;
      }
      if (t.hasAttribute('data-modal-open')) { e.preventDefault(); const m = document.getElementById(t.dataset.modalOpen); if (m) m.classList.add('open'); return; }
      if (t.hasAttribute('data-modal-close')) { e.preventDefault(); const m = t.closest('.modal-backdrop'); if (m) m.classList.remove('open'); if (t.hasAttribute('data-toast')) window.toast(t.dataset.toast, t.dataset.toastIcon); return; }
      if (t.hasAttribute('data-show')) {
        e.preventDefault();
        const v = t.dataset.show;
        const scope = t.closest('[data-variants]') || document;
        scope.querySelectorAll('[data-variant]').forEach(x => x.classList.toggle('active', x.dataset.variant === v));
        (t.closest('.variant-switch') || scope).querySelectorAll('[data-show]').forEach(b => b.classList.toggle('active', b.dataset.show === v));
        return;
      }
      if (t.hasAttribute('data-step-go')) {
        e.preventDefault();
        const n = t.dataset.stepGo;
        const scope = t.closest('[data-wizard]') || document;
        scope.querySelectorAll('[data-step]').forEach(s => s.classList.toggle('active', s.dataset.step === n));
        scope.querySelectorAll('.stepper .step').forEach((s, i) => { s.classList.remove('active', 'done'); if (i + 1 < +n) s.classList.add('done'); if (i + 1 === +n) s.classList.add('active'); });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (t.hasAttribute('data-copy')) {
        e.preventDefault();
        const sel = t.dataset.copy; let text = sel;
        if (sel && sel.startsWith('#')) { const src = document.querySelector(sel); text = src ? (src.value || src.textContent) : ''; }
        const done = () => window.toast('Copiado', 'copy');
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text.trim()).then(done, done); else done();
        return;
      }
      if (t.hasAttribute('data-toast')) { e.preventDefault(); window.toast(t.dataset.toast, t.dataset.toastIcon); document.querySelectorAll('.menu.open').forEach(m => m.classList.remove('open')); return; }
      if (t.hasAttribute('data-amount')) {
        e.preventDefault();
        const group = t.closest('.amount-options');
        group.querySelectorAll('[data-amount]').forEach(b => b.classList.toggle('active', b === t));
        const target = document.querySelector(group.dataset.target || '[data-amount-input]');
        if (target) target.value = t.dataset.amount;
        return;
      }
      if (t.hasAttribute('data-toggle-class')) { e.preventDefault(); const tgt = document.querySelector(t.dataset.target) || t; tgt.classList.toggle(t.dataset.toggleClass); return; }
      if (t.hasAttribute('data-dismiss')) { e.preventDefault(); const tgt = t.closest(t.dataset.dismiss || '.alert'); if (tgt) tgt.remove(); return; }
    });
    document.addEventListener('click', (e) => { if (e.target.classList && e.target.classList.contains('modal-backdrop')) e.target.classList.remove('open'); });
    // Tags editáveis: clique remove; Enter ou vírgula adiciona; Backspace vazio remove a última.
    document.addEventListener('click', (e) => {
      const tag = e.target.closest('.tag-input .tag');
      if (tag) { tag.remove(); return; }
    });
    document.addEventListener('keydown', (e) => {
      const inp = e.target;
      if (!inp.matches || !inp.matches('[data-tag-input]')) return;
      const box = inp.closest('.tag-input');
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const v = inp.value.trim().replace(/,$/, '').toLowerCase();
        if (!v) return;
        const exists = Array.from(box.querySelectorAll('.tag')).some(t => t.textContent.trim() === v);
        if (!exists) { const t = document.createElement('span'); t.className = 'tag'; t.textContent = v; t.title = 'Clique para remover'; box.insertBefore(t, inp); }
        inp.value = '';
      } else if (e.key === 'Backspace' && !inp.value) {
        const last = box.querySelectorAll('.tag'); if (last.length) last[last.length - 1].remove();
      }
    });
    // Painéis de configuração que seguem a opção escolhida: <input data-switch="x"> mostra [data-config="x"] dentro de [data-configs].
    function syncConfigs() {
      document.querySelectorAll('[data-configs]').forEach(scope => {
        const sel = document.querySelector('[data-switch]:checked');
        const key = sel ? sel.dataset.switch : scope.dataset.configs;
        scope.querySelectorAll('[data-config]').forEach(el => el.classList.toggle('active', el.dataset.config === key));
        scope.dispatchEvent(new CustomEvent('lacre:config', { detail: { key } }));
      });
    }
    document.addEventListener('change', (e) => { if (e.target.matches && e.target.matches('[data-switch]')) syncConfigs(); });
    syncConfigs();
    document.addEventListener('input', (e) => {
      if (!e.target.matches('[data-country-search]')) return;
      const q = e.target.value.trim().toLowerCase();
      e.target.closest('.lm-sec').querySelectorAll('.lm-list button').forEach(b => { b.hidden = !!q && !b.textContent.toLowerCase().includes(q); });
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open')); body.classList.remove('sidebar-open', 'nav-open'); } });
    document.querySelectorAll('form').forEach(f => f.addEventListener('submit', (e) => { e.preventDefault(); window.toast(f.dataset.submitToast || 'Enviado (protótipo)'); }));
    // variantes: ativar a padrão
    document.querySelectorAll('[data-variants]').forEach(scope => {
      const def = scope.dataset.variants || (scope.querySelector('[data-variant]') || {}).dataset?.variant;
      if (def) { scope.querySelectorAll('[data-variant]').forEach(x => x.classList.toggle('active', x.dataset.variant === def)); document.querySelectorAll('.variant-switch [data-show], [data-show]').forEach(b => { if (!b.closest('[data-variants]') || b.closest('[data-variants]') === scope) b.classList.toggle('active', b.dataset.show === def); }); }
    });
    if (!document.querySelector('[data-variants]')) {
      const first = document.querySelector('[data-variant]');
      if (first && !document.querySelector('[data-variant].active')) first.classList.add('active');
      const vs = document.querySelector('.variant-switch');
      if (vs) { const b = vs.querySelector('[data-show]'); if (b && !vs.querySelector('.active')) { b.classList.add('active'); } }
    }
    // barras de progresso animadas
    requestAnimationFrame(() => document.querySelectorAll('.progress-bar[data-width]').forEach(b => { b.style.width = b.dataset.width; }));
    // contagem regressiva
    const cds = document.querySelectorAll('[data-deadline]');
    function tick() {
      const now = Date.now();
      cds.forEach(el => {
        const d = new Date(el.dataset.deadline).getTime() - now;
        if (isNaN(d)) return;
        if (d <= 0) { el.textContent = 'encerrado'; return; }
        const days = Math.floor(d / 864e5), h = Math.floor(d % 864e5 / 36e5), m = Math.floor(d % 36e5 / 6e4), s = Math.floor(d % 6e4 / 1e3);
        el.textContent = days > 0 ? days + 'd ' + String(h).padStart(2, '0') + 'h ' + String(m).padStart(2, '0') + 'm' : String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      });
    }
    if (cds.length) { tick(); setInterval(tick, 1000); }
  }

  /* --------------------------------------------------------- utilitários */
  window.Lacre = {
    BRAND, icon: iconSvg, identicon: identiconSvg, seal: SEAL, locale, t, countries: COUNTRIES,
    brl: (cents) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    render: (scope) => { renderIcons(scope); renderIdenticons(scope); }
  };

  /* ---------------------------------------------------------------- init */
  function init() {
    mountShell();
    document.documentElement.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[locale.lang];
    ['.sidebar', '.topbar', '.site-header', '.site-footer', '.auth-top', '.locale-bar'].forEach(sel => document.querySelectorAll(sel).forEach(translateTree));
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n') || el.textContent.trim(); const v = I18N[locale.lang] && I18N[locale.lang][k]; if (v) el.textContent = v; });
    renderIcons();
    renderIdenticons();
    applyTheme(document.documentElement.getAttribute('data-theme'));
    bind();
    document.title = document.title || BRAND;
    // abre a aba indicada no hash (ex.: anuncio.html#curadoria)
    const h = (location.hash || '').replace('#', '');
    if (h) { const tabBtn = document.querySelector('.tabs [data-tab="' + h + '"]'); if (tabBtn) tabBtn.click(); }
    document.dispatchEvent(new CustomEvent('lacre:ready', { detail: { locale } }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
