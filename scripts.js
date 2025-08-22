<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>喝酒遊戲</title>
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="beer.png" type="image/x-icon" />
</head>
<body>
  <header class="site-header pro">
    <div class="container">
      <div class="hero">
        <div class="brand-block">
          <h1 class="brand">喝酒遊戲</h1>
          <p class="subtitle">超過 50 種熱門的聚會喝酒遊戲！</p>
        </div>
        <div class="hero-cta">
          <a href="cocktail-guide.html" class="nav-chip">
            <span class="emoji">🍹</span> 派對調酒指南（超商就能買）
          </a>
        </div>
      </div>

      <!-- 工具列：搜尋 / 排序 / 隨機 -->
      <div class="toolbar">
        <div class="input-wrap">
          
          <input id="search" type="search" placeholder="搜尋遊戲名稱或內容…" autocomplete="off" />
        </div>
        <div class="select-wrap">
          <label for="sort">排序</label>
          <select id="sort">
            <option value="featured">智慧排序（推薦優先）</option>
            <option value="title">名稱（A→Z）</option>
            <option value="alcohol">酒量（高→低）</option>
            <option value="ease">難度（低→高）</option>
          </select>
        </div>
        <button id="random" class="btn ghost">隨機帶我玩</button>
      </div>

      <!-- 篩選列 -->
      <div class="pills" role="tablist" aria-label="篩選遊戲">
        <button class="pill is-active" data-filter="all" role="tab" aria-selected="true">全部</button>
        <button class="pill" data-filter="quick-drinking" role="tab">快速喝酒</button>
        <button class="pill" data-filter="high-interaction" role="tab">高參與度</button>
        <button class="pill" data-filter="dice" role="tab">骰子</button>
        <button class="pill" data-filter="card" role="tab">撲克牌</button>
        <button class="pill" data-filter="no-prop" role="tab">不用道具</button>
      </div>
    </div>
  </header>

  <main id="main" class="container layout">
    <!-- 桌機側邊索引 -->
    <aside class="sidebar" aria-label="遊戲索引">
      <section class="sidebar-section">
        <h2 class="sidebar-title">骰子遊戲</h2>
        <ul id="dice-games" class="link-list"></ul>
      </section>
      <section class="sidebar-section">
        <h2 class="sidebar-title">撲克牌遊戲</h2>
        <ul id="card-games" class="link-list"></ul>
      </section>
      <section class="sidebar-section">
        <h2 class="sidebar-title">不用道具</h2>
        <ul id="no-prop-games" class="link-list"></ul>
      </section>
    </aside>

    <section class="content">
      <!-- 骰子模擬器 -->
      <div class="card card-lite">
        <div class="card-head"><h2>骰子模擬器</h2></div>
        <div class="card-body">
          <label for="dice-count" class="label">選擇骰子數量</label>
          <div class="row">
            <input type="number" id="dice-count" value="1" min="1" max="10" inputmode="numeric" />
            <button id="roll-dice" class="btn">丟骰子</button>
          </div>
          <div id="dice-results" class="dice-results" aria-live="polite"></div>
        </div>
      </div>

      <!-- 遊戲卡片 Masonry -->
      <section id="game-details" class="game-grid" aria-label="遊戲清單"></section>
    </section>
  </main>

  <!-- 詳細內容 Modal / Bottom Sheet -->
  <div id="modal" class="modal" aria-hidden="true">
    <div class="modal-backdrop" data-close></div>
    <section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <h2 id="modal-title" class="modal-title" tabindex="-1"></h2>
        <div class="modal-tools">
          <button id="copy-link" class="icon-btn" title="複製連結" aria-label="複製連結">🔗</button>
          <button class="modal-close icon-btn" aria-label="關閉" title="關閉" data-close>✕</button>
        </div>
        <div id="modal-meta" class="modal-meta"></div>
      </header>
      <div id="modal-content" class="modal-content"></div>
    </section>
  </div>

  <footer class="site-footer">
    <div class="container"><p>© 2024 喝酒遊戲介紹</p></div>
  </footer>

  <script src="scripts.js"></script>
</body>
</html>
