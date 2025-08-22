document.addEventListener('DOMContentLoaded', async () => {
  console.log('🎮 喝酒遊戲網站開始載入...');
  // ===== 滑動隱藏Header =====
  let lastScrollY = 0;
  let isScrolling = false;
  const header = document.querySelector('.site-header');
  const body = document.body;
  
  function handleScroll() {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // 向下滑動且超過100px時
        if (scrollDelta > 0 && currentScrollY > 100) {
          if (currentScrollY > 200) {
            // 完全隱藏
            header.classList.add('header-hidden');
            header.classList.remove('header-compact');
            body.classList.add('header-hidden');
            body.classList.remove('header-compact');
          } else {
            // 緊湊模式
            header.classList.add('header-compact');
            header.classList.remove('header-hidden');
            body.classList.add('header-compact');
            body.classList.remove('header-hidden');
          }
        } 
        // 向上滑動
        else if (scrollDelta < 0) {
          if (currentScrollY < 50) {
            // 回到完整模式
            header.classList.remove('header-hidden', 'header-compact');
            body.classList.remove('header-hidden', 'header-compact');
          } else {
            // 顯示緊湊模式
            header.classList.add('header-compact');
            header.classList.remove('header-hidden');
            body.classList.add('header-compact');
            body.classList.remove('header-hidden');
          }
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
      });
      isScrolling = true;
    }
  }
  
  // 使用防抖處理滑動事件
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 10);
  });
  // ===== 骰子 =====
  const rollBtn = document.getElementById('roll-dice');
  const diceInput = document.getElementById('dice-count');
  const diceOut = document.getElementById('dice-results');
  rollBtn?.addEventListener('click', () => {
    const n = Math.min(10, Math.max(1, parseInt(diceInput.value || '1', 10)));
    diceOut.innerHTML = '';
    Array.from({length:n}, () => 1 + Math.floor(Math.random()*6)).forEach(v=>{
      const d = document.createElement('div'); d.className='dice';
      d.style.backgroundImage = `url('images/dice${v}.png')`; diceOut.appendChild(d);
    });
  });

  // ===== 讀資料 =====
  let allGames = [];
  try {
    console.log('📁 開始載入遊戲資料...');
    const res = await fetch('games.json');
    if (!res.ok) {
      throw new Error(`HTTP錯誤: ${res.status}`);
    }
    allGames = await res.json();
    console.log(`✅ 成功載入 ${allGames.length} 個遊戲`);
  } catch (error) {
    console.error('❌ 載入遊戲資料失敗:', error);
    // 顯示錯誤訊息給用戶
    document.getElementById('game-details').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #f87171;">
        <h3>⚠️ 載入失敗</h3>
        <p>無法載入遊戲資料，請檢查網路連線或重新整理頁面。</p>
        <p>錯誤詳情: ${error.message}</p>
      </div>
    `;
    return; // 停止執行
  }

  // ===== DOM 參照 =====
  const grid = document.getElementById('game-details');
  const listDice = document.getElementById('dice-games');
  const listCard = document.getElementById('card-games');
  const listNoProp = document.getElementById('no-prop-games');
  const pills = document.querySelectorAll('.pill');
  const searchInp = document.getElementById('search');
  const sortSel = document.getElementById('sort');
  const randomBtn = document.getElementById('random');

  // 檢查DOM元素是否存在
  if (!grid) {
    console.error('❌ 找不到遊戲容器元素 #game-details');
    return;
  }
  console.log('✅ DOM元素載入完成');

  // Modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalContent = document.getElementById('modal-content');
  const copyLink = document.getElementById('copy-link');
  const closeEls = modal.querySelectorAll('[data-close]');

  const labelCategory = (c) => c==='dice'?'骰子':c==='card'?'撲克牌':c==='no-prop'?'不用道具':c;
  const badges = (g) => `
    <span class="badge">類別：${labelCategory(g.category)}</span>
    <span class="badge">酒量：${g.alcohol}</span>
    <span class="badge">難度：${g.ease}</span>
    <span class="badge">人數：${g.players}</span>`;

  function openModal(g){
    modalTitle.innerHTML = `${g.recommended?'<span class="star">★</span>':''}${g.title}`;
    modalMeta.innerHTML = badges(g);
    // 將換行安全轉 <br>
    const html = (g.description||'').replace(/\n/g,'<br>');
    modalContent.innerHTML = `<div class="content">${html}</div>`;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    // 將焦點移到modal標題以便鍵盤用戶導航
    modalTitle.focus();
    // 更新網址 hash 方便分享
    history.replaceState(null,'',`#${g.id}`);
  }
  function closeModal(){
    // 在設定aria-hidden之前，先移除modal內所有元素的焦點
    const focusedElement = modal.querySelector(':focus');
    if (focusedElement) {
      focusedElement.blur();
    }
    
    modal.classList.remove('is-open'); 
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow=''; 
    history.replaceState(null,'',location.pathname + location.search);
    
    // 將焦點返回到觸發modal的元素（如果存在的話）
    // 這裡我們簡單地將焦點移回到document.body
    document.body.focus();
  }
  closeEls.forEach(el => el.addEventListener('click', closeModal));
  modal.addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape' && modal.classList.contains('is-open')) closeModal(); });
  copyLink?.addEventListener('click', async () => {
    await navigator.clipboard.writeText(location.href);
    copyLink.textContent = '已複製'; setTimeout(()=> copyLink.textContent='🔗', 900);
  });

  // ===== 索引（左欄） =====
  function buildIndex(games){
    [listDice, listCard, listNoProp].forEach(ul=>ul && (ul.innerHTML=''));
    games.forEach(g=>{
      const li = document.createElement('li'); const a = document.createElement('a');
      a.textContent = g.title; a.href = `#${g.id}`;
      a.addEventListener('click', (e)=>{ e.preventDefault(); openModal(g); });
      if (g.category==='dice') listDice?.appendChild(li);
      if (g.category==='card') listCard?.appendChild(li);
      if (g.category==='no-prop') listNoProp?.appendChild(li);
      li.appendChild(a);
    });
  }

  // ===== 渲染卡片（摘要） =====
  function render(games){
    console.log(`🎨 開始渲染 ${games.length} 個遊戲卡片`);
    grid.innerHTML = '';
    games.forEach(g=>{
      const art = document.createElement('article'); art.className='game'; art.id=g.id;
      const sum = document.createElement('div'); sum.className='game-summary'; sum.tabIndex = 0; sum.setAttribute('role','button');
      const h3 = document.createElement('h3'); h3.className='game-title';
      h3.innerHTML = `${g.recommended?'<span class="star">★</span>':''}${g.title}`;
      const meta = document.createElement('div'); meta.className='badges'; meta.innerHTML = badges(g);
      sum.append(h3, meta); art.appendChild(sum); grid.appendChild(art);
      const go = () => openModal(g);
      sum.addEventListener('click', go);
      sum.addEventListener('keydown', e => { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); go(); } });
    });
    console.log(`✅ 卡片渲染完成`);
  }

  // ===== 過濾 + 排序 + 搜尋 =====
  let state = { filter:'all', q:'', sort:'featured' };

  const matchFilter = (g) => {
    const f = state.filter;
    if (f==='all') return true;
    if (f==='quick-drinking') return Number(g.alcohol) > 3;
    if (f==='high-interaction') return !!g.interaction;
    return g.category === f;
  };
  const matchQuery = (g) => {
    if (!state.q) return true;
    const q = state.q.toLowerCase();
    return (g.title||'').toLowerCase().includes(q) || (g.description||'').toLowerCase().includes(q);
  };
  const sortBy = {
    featured: (a,b)=> (b.recommended?1:0) - (a.recommended?1:0) || a.title.localeCompare(b.title,'zh-Hant'),
    title:    (a,b)=> a.title.localeCompare(b.title,'zh-Hant'),
    alcohol:  (a,b)=> Number(b.alcohol) - Number(a.alcohol),
    ease:     (a,b)=> Number(a.ease) - Number(b.ease),
  };

  function getVisible(){
    return [...allGames].filter(g=> matchFilter(g) && matchQuery(g)).sort(sortBy[state.sort]);
  }

  // 事件：pills
  pills.forEach(p=>{
    p.addEventListener('click', ()=>{
      pills.forEach(x=>x.classList.remove('is-active')); p.classList.add('is-active');
      state.filter = p.dataset.filter; update();
    });
  });
  // 事件：搜尋（簡單節流）
  let t; searchInp?.addEventListener('input', ()=>{
    clearTimeout(t); t = setTimeout(()=>{ state.q = (searchInp.value||'').trim(); update(); }, 120);
  });
  // 事件：排序
  sortSel?.addEventListener('change', ()=>{ state.sort = sortSel.value; update(); });
  // 事件：隨機
  randomBtn?.addEventListener('click', ()=>{
    const arr = getVisible(); if(!arr.length) return;
    openModal(arr[Math.floor(Math.random()*arr.length)]);
  });

  function update(){
    const visible = getVisible();
    render(visible);
    buildIndex(visible);
  }

  // 初始渲染
  update();

  // 支援直接以 #id 開啟
  const hash = location.hash.replace('#','');
  if (hash){
    const g = allGames.find(x=> x.id === hash);
    if (g) openModal(g);
  }

  // 舊版 API（仍保留）
  window.filterGames = (cat)=>{ state.filter = cat; pills.forEach(p=>p.classList.toggle('is-active', p.dataset.filter===cat)); update(); };
});
