document.addEventListener('DOMContentLoaded', function () {
    const rollDiceButton = document.getElementById('roll-dice');
    const diceCountInput = document.getElementById('dice-count');
    const diceResultsDiv = document.getElementById('dice-results');

    const diceGames = document.getElementById('dice-games');
    const cardGames = document.getElementById('card-games');
    const noPropGames = document.getElementById('no-prop-games');
    const gameDetails = document.getElementById('game-details');

    const diceRoller = document.getElementById('dice-roller'); // 骰子模擬器引用
    let games = []; // 用於存儲從 JSON 加載的遊戲數據

    // 骰子按鈕邏輯
    rollDiceButton.addEventListener('click', function () {
        const diceCount = parseInt(diceCountInput.value);document.addEventListener('DOMContentLoaded', async () => {
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
  const res = await fetch('games.json');
  const allGames = await res.json();

  // ===== DOM 參照 =====
  const grid = document.getElementById('game-details');
  const listDice = document.getElementById('dice-games');
  const listCard = document.getElementById('card-games');
  const listNoProp = document.getElementById('no-prop-games');
  const pills = document.querySelectorAll('.pill');
  const searchInp = document.getElementById('search');
  const sortSel = document.getElementById('sort');
  const randomBtn = document.getElementById('random');

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
    // 更新網址 hash 方便分享
    history.replaceState(null,'',`#${g.id}`);
  }
  function closeModal(){
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true');
    document.body.style.overflow=''; history.replaceState(null,'',location.pathname + location.search);
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

        let results = [];

        for (let i = 0; i < diceCount; i++) {
            results.push(Math.floor(Math.random() * 6) + 1);
        }

        diceResultsDiv.innerHTML = ''; // 清空之前的結果

        results.forEach(result => {
            const dice = document.createElement('div');
            dice.className = 'dice';
            dice.style.backgroundImage = `url('images/dice${result}.png')`; // 假設圖片存放在 images 文件夾中
            diceResultsDiv.appendChild(dice);
        });
    });

    // 動態加載 JSON 資料
    fetch('./games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // 確認內容是否正確
            games = data;
            renderGameList(games);
        })
        .catch(error => {
            console.error('Error loading games:', error);
        });

    function renderGameList(games) {
        games.forEach(game => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${game.id}`;
            link.innerHTML = game.recommended
                ? '<span class="recommended-star">★</span> ' + game.title
                : game.title;
            listItem.appendChild(link);

            // 根據遊戲分類將遊戲添加到相應的部分
            if (game.category === 'dice') {
                diceGames.appendChild(listItem);
            } else if (game.category === 'card') {
                cardGames.appendChild(listItem);
            } else if (game.category === 'no-prop') {
                noPropGames.appendChild(listItem);
            }

            const gameSection = document.createElement('section');
            gameSection.id = game.id;

            const star = game.recommended ? '<span class="recommended-star">★</span>' : '';
            gameSection.innerHTML = `
                <h2>${star}${game.title}</h2>
                <div class="game-ratings">
                    <div class="game-rating">簡易度: ${game.ease}</div>
                    <div class="game-rating">酒量: ${game.alcohol}</div>
                    <div class="game-rating">適合人數: ${game.players}</div>
                </div>
                <p>${game.description}</p>
            `;
            gameDetails.appendChild(gameSection);
        });
    }

    // 篩選遊戲
    window.filterGames = function (category) {
        const allGames = document.querySelectorAll('#dice-games li, #card-games li, #no-prop-games li');
        const allSections = document.querySelectorAll('#game-details section');

        // 隱藏所有區塊
        allGames.forEach(game => (game.style.display = 'none'));
        allSections.forEach(section => (section.style.display = 'none'));
        diceRoller.style.display = 'none'; // 預設隱藏骰子模擬器

        if (category === 'all') {
            allGames.forEach(game => (game.style.display = 'block'));
            allSections.forEach(section => (section.style.display = 'block'));
        } else if (category === 'dice-roller') {
            diceRoller.style.display = 'block'; // 顯示骰子模擬器
        } else if (category === 'high-interaction') {
            games
                .filter(game => game.interaction)
                .forEach(game => {
                    const gameLink = document.querySelector(`#${game.category}-games li a[href="#${game.id}"]`);
                    if (gameLink) {
                        gameLink.parentElement.style.display = 'block';
                        document.getElementById(game.id).style.display = 'block';
                    }
                });
        } else {
            games
                .filter(game => game.category === category || (category === 'quick-drinking' && game.alcohol > 3))
                .forEach(game => {
                    const gameLink = document.querySelector(`#${game.category}-games li a[href="#${game.id}"]`);
                    if (gameLink) {
                        gameLink.parentElement.style.display = 'block';
                        document.getElementById(game.id).style.display = 'block';
                    }
                });
        }
    };
});

