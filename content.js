'use strict';
window.Portal = {
  key: 'lulag-portal-drafts-v1',
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } },
  image(value) { return typeof value === 'string' && (/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value) || /^https:\/\//.test(value) || /^assets\/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|gif)$/.test(value)) ? value : ''; },
  link(value) { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch { return ''; } },
  validate(data) {
    if (!Array.isArray(data) || data.length > 1000) throw new Error('Use uma lista com até 1000 publicações.');
    const ids = new Set();
    return data.map(p => {
      if (!p || typeof p !== 'object' || !/^[a-z0-9-]{1,80}$/.test(p.id) || ids.has(p.id) || typeof p.title !== 'string' || !p.title.trim()) throw new Error('Cada publicação precisa de um título e de um identificador único válido.');
      ids.add(p.id);
      const str = (key, max) => typeof p[key] === 'string' ? p[key].slice(0, max) : '';
      return {id:p.id,title:str('title',160),category:['Arte','Sátira','Bastidores','Leituras','Na rede'].includes(p.category)?p.category:'Arte',excerpt:str('excerpt',350),body:str('body',16000),coverText:str('coverText',80),theme:['purple','yellow','red'].includes(p.theme)?p.theme:'purple',demo:p.demo===true,image:Portal.image(p.image),alt:str('alt',400),format:['reading','tweet','image'].includes(p.format)?p.format:'image',sourceUrl:Portal.link(p.sourceUrl),sourceLabel:str('sourceLabel',180),authors:str('authors',300)};
    });
  },
  async load() { const r = await fetch('posts.json', {cache:'no-cache'}); if (!r.ok) throw new Error('Não foi possível carregar as publicações.'); return Portal.validate(await r.json()); },
  el(tag, className, text) { const e = document.createElement(tag); if(className) e.className=className; if(text !== undefined)e.textContent=text; return e; }
};

