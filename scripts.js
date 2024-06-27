document.addEventListener('DOMContentLoaded', function() {
    const rollDiceButton = document.getElementById('roll-dice');
    const diceCountInput = document.getElementById('dice-count');
    const diceResultsDiv = document.getElementById('dice-results');

    rollDiceButton.addEventListener('click', function() {
        const diceCount = parseInt(diceCountInput.value);
        let results = [];

        for (let i = 0; i < diceCount; i++) {
            results.push(Math.floor(Math.random() * 6) + 1);
        }

        diceResultsDiv.innerHTML = '';  // 清空之前的结果

        results.forEach(result => {
            const dice = document.createElement('div');
            dice.className = 'dice';
            dice.style.backgroundImage = `url('images/dice${result}.png')`;  // 假设图片存放在 images 文件夹中
            diceResultsDiv.appendChild(dice);
        });
    });

    const games = [
        {
            id: 'game1',
            title: '殘暴七八九',
            description: `玩家數任意，需要兩顆骰子與一個公杯。
            <br>骰到7加酒，骰到8喝半杯，骰到9喝整杯，骰到兩個1指定玩家喝完，骰到Pair迴轉。
            <br>有喝到酒的玩家要繼續骰(骰到8、9)，直到沒喝酒才換下一家。`,
            category: 'dice',
            ease: 1,
            alcohol: 4,
            players: '<8',
            recommended: true
        },
        {
            id: 'game2',
            title: '殘暴三百五',
            description: `玩家數任意，需要七顆骰子與一個公杯。
            <br>數字1代表100點，數字5代表50點。
            <br>有骰到就將該點數拿出後繼續骰(可選擇拿或不拿，至少要拿一顆)。
            <br>每一骰一次最少都要有1或5其中一個，不然會直接出局(喝自己的酒)。
            <br>當總數超過350點後可以喊停，該數字就是你本場點數。
            <br>等所有玩家骰完就以點數高低比較輸贏，最低點數的為輸家。
            <br>結算時若有玩家500點以上x2倍，600點以上x3倍，全骰開x4倍，乘法都累計上去計算。`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: '<4',
            recommended: true
        },
        {
            id: 'game3',
            title: '十五二十',
            description: `兩人同時伸手出指（雙手能出的數字為0、5、10），口中喊一個數字（雙方出指數字之和，0、5、10、15、20）。
            <br>如果喊的數字和實際出的手指數相同，就贏，輸的人罰喝酒。
            <br>兩人都喊中就繼續。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 2,
            players: 2,
            recommended: true
        },
        {
            id: 'game4',
            title: '真心話和大冒險',
            description: `通過猜拳或抽牌選出一個人，這個人要選擇「真心話」或「大冒險」。
            <br>「真心話」可以讓任何一個人問任何問題，必須如實回答。
            <br>「大冒險」則是接受在座其他人的指示去做一件事情，例如跟陌生人說話。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 3,
            recommended: true
        },
        {
            id: 'game5',
            title: '數七',
            description: `一群人從1開始輪流說數字，到7或7的倍數不能說出來，改為拍自己的大腿。
            <br>如果說錯了就罰喝酒，然後重新開始數。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 2,
            players: 4,
            recommended: true
        },
        {
            id: 'game6',
            title: '吹牛',
            description: `每人一個骰盅和5個骰子。
            <br>每個人搖骰盅後喊出一個數字，比如兩個三。如果對方不信，打開骰盅驗證。
            <br>如果數量不足，喊的人輸；如果達到或超過，對方輸。
            <br>下次喊數字的人數量要比前一個人多。`,
            category: 'dice',
            ease: 3,
            alcohol: 4,
            players: 3,
            recommended: true
        },
        {
            id: 'game7',
            title: '划拳',
            description: `兩人同時喊一個數字（0到10），並伸出一隻手（0到5）。
            <br>如果喊的數字和兩人的手指數相加相同，對方罰喝酒。
            <br>兩人都喊中就算平手，繼續再划。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 2,
            recommended: true
        },
        {
            id: 'game8',
            title: '庫克船長',
            description: `類似於007遊戲。一人喊「庫」並指定另一人，該人喊「克」再指定第三人，第三人喊「船」，再指第四人。
            <br>第四人喊「長」並再指定一人。最後被指定的人模仿拉汽笛的動作，旁邊兩人模仿划船的動作。
            <br>出錯的人罰酒。`,
            category: 'no-prop',
            ease: 3,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game9',
            title: '吸星大法',
            description: `男女交替坐成一圈，用嘴吸住一張撲克牌並傳給下一個人。
            <br>牌掉了的人罰酒。可以跨越多個人傳牌，只要不掉就可以。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 4,
            players: 5,
            recommended: true
        },
        {
            id: 'game10',
            title: '撕紙',
            description: `每人撕一長條餐巾紙，含在嘴裡並撕下一段傳給下一個人。
            <br>接牌時，前一人嘴裡必須留有紙。
            <br>撕到最後紙會越來越少，放棄的罰兩次，嘗試沒成功的罰一次。`,
            category: 'no-prop',
            ease: 3,
            alcohol: 3,
            players: 3,
            recommended: true
        },
        {
            id: 'game11',
            title: '比大小',
            description: `每人抽一張牌貼在額頭上，其他人看得到但自己看不到。
            <br>每人依次問旁邊的人：「你覺得我需要換嗎？」
            <br>可以選擇換牌或保持原樣，最後揭曉時，點數最小的人輸。`,
            category: 'card',
            ease: 3,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game12',
            title: '表面張力',
            description: `1. 由第一位玩家開始做莊家。 
                         <br>2. 莊家需要將酒倒入酒杯中，可以倒多或倒少。
                         <br>3. 倒酒完畢後，換下一位玩家繼續倒酒。
                         <br>4. 如果任何玩家在倒酒的過程中讓酒流出一滴在酒杯外，該玩家必須喝完這杯酒。
                         <br>5. 遊戲持續進行，直到所有人都輪流倒過酒。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 4,
            players: '<5',
            recommended: true
        },
        {
            id: 'game13',
            title: '傳牙籤',
            description: `每人抽一張撲克牌，按順序坐好，持最小（或最大）牌的人開始，用嘴銜住牙籤傳給下一個人。
            <br>不許掉落，也不能用手或其他工具幫忙。
            <br>掉了的人罰酒。傳完一圈後將牙籤撅一半，繼續抽牌並重複遊戲。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game14',
            title: '國王遊戲',
            description: `準備多張牌，其中一張寫著「國王」，其他編號1、2、3等。
            <br>每人抽一張牌，抽到「國王」的人可以指定幾號做某事，例如互相打架或接吻。`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game15',
            title: '我愛你VS不要臉',
            description: `眾人圍坐成一圈，規定只能對左邊的人說「我愛你」，對右邊的人說「不要臉」。
            <br>兩人之間只能連續對話3次。一旦有人說錯，即受罰。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game16',
            title: '大小西瓜',
            description: `這遊戲要求在口喊「大西瓜」的同時，手上比劃出「小西瓜」的輪廓；反之亦然。
            <br>說錯的人罰酒。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game17',
            title: '九宮格',
            description: `準備九個杯子和兩個骰子，骰到多少就在對應的杯子加酒。
            <br>下一個人骰到的喝掉，如果連線三杯都要喝。
            <br>骰到11和12當1，骰到10當2。`,
            category: 'dice',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game18',
            title: 'Roy’s Game',
            description: `1. 喝酒單位數量可於遊戲開始前討論。
            <br>2. 不可說任何形式的髒話。
            <br>3. 抽到5、8、Q這三張牌，執行時間由抽到後至下一位玩家抽到同樣卡時停止。
            <br>4. 抽到5、7、8、Q這四張牌，需放置於桌面。
            <br>5. 抽到5的玩家制定規則，規則在執行時間內無法更改。
            <br>6. 抽到8、Q的玩家可以隨時發動。
            <br>7. 每張牌的規則可以在遊戲開始前調整。
            <br>A = 喝一單位
            <br>2 = 喝兩單位
            <br>3 = 喝三單位
            <br>4 = 迴轉
            <br>5 = 制定遊戲規則
            <br>6 = 接龍遊戲（以廣泛主題為題目）
            <br>7 = 廁所牌（可交易）
            <br>8 = 不可回答抽到此牌之玩家的問題
            <br>9 = 上家喝一單位
            <br>10 = 下家喝一單位
            <br>J = Pass
            <br>Q = 抽到此牌的玩家做出明顯動作時，最後跟到的喝一單位
            <br>K = 全部玩家喝一單位`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game19',
            title: '31點',
            description: `基本規則：
            <br>1. 每人手上有兩張牌，出牌後立即抽牌，保持在兩張。
            <br>2. 1~10點數按牌面計算，JQK算半點（0.5）。
            <br>3. 31點為上限，超過31點遊戲結束，無法出牌者為輸家。
            <br>4. 輸家基本底注為兩單位。
            <br>5. 出牌順序為順時鐘。
            <br>進階規則：
            <br>1. 若手牌可以即時湊成10、20、30的整數，則可以發動「搶牌」。
            <br>2. 搶牌不限制出牌順序，先放到場中牌推的為主，每搶到一次加一單位。
            <br>3. 順向下一家搶牌或自己搶自己牌不加單位。
            <br>4. 搶牌只能搶整數，無法直接搶到31點。
            <br>5. 若有機會一張牌直接湊成31點，可以詢問下家是否買保險。
            <br>6. 若被詢問者不買保險，而詢問者出牌後結束遊戲，加一個單位。
            <br>7. 若詢問者出牌後無法結束遊戲也無法出牌，加一單位。
            <br>8. 若詢問者出牌後無法結束遊戲但可以出牌，遊戲繼續。
            <br>9. 若被詢問者買保險，該場懲罰單位減半（最低為底注）。
            <br>10. 若未即時照順序抽牌，被其他玩家搶抽牌，加一單位。
            <br>單場最多單位：底注兩單位 + 搶10一單位 + 搶20一單位 + 搶30一單位 + 不買保險或亂問保險一單位 = 六單位。`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game20',
            title: '倒楣A',
            description: `1. 從撲克牌中挑出10、J、Q、K、A，共20張牌。
            <br>2. 將這20張牌蓋在桌面上。
            <br>3. 起始玩家決定公杯內的量。
            <br>4. 開始遊戲後每位玩家輪流抽牌。
            <br>5. 抽到10迴轉，J倒酒，Q保命，K喝一單位，A絕命牌。
            <br>6. J倒酒量可任意，公杯不限一個。
            <br>7. Q保命牌需於開牌前使用，可交易。
            <br>8. 抽到K喝一單位，第二張喝兩單位，以此類推。
            <br>9. 抽到A要繼續抽牌，抽到第四張A即結束。
            <br>10. 抽到第四張A的玩家需喝完全部公杯的酒。`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game21',
            title: '殘暴輪盤',
            description: `玩家數任意，需要一顆骰子與六個公杯，並指定為1到6數字。
            <br>骰到空杯則加酒至滿杯，若骰到有酒的則喝完該杯酒。
            <br>喝完後繼續骰，直到骰到空杯加酒為止，然後換下一家。`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: 6,
            recommended: true
        },
        {
            id: 'game22',
            title: '吹吹牌',
            description: `1. 先訂好公杯量用以輸家懲罰用。
            <br>2. 將整副撲克牌放置酒瓶上方。
            <br>3. 由上一場輸家開始吹牌。
            <br>4. 有吹掉一張以上的牌即換下一家。
            <br>5. 吹掉最後一張牌的為輸家。`,
            category: 'card',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game23',
            title: '骰子終極密碼',
            description: `1. 準備一個骰盅與五顆骰子，骰子數可以依照節奏增加。
            <br>2. 莊家晃動骰盅後遊戲開始（點數只有莊家能看）。
            <br>3. 由莊家開始，起始數字為骰子數量，最少喊一個數字，最多可喊三個數字。
            <br>4. 玩家自覺快喊到骰子總和時，可使用迴轉或Pass（兩者擇一）。
            <br>5. 莊家因知道骰子總和，故不可使用迴轉或Pass。
            <br>6. 直到有玩家喊過骰子總和，即為輸家（莊家抓錯也輸）。
            <br>7. 喝酒單位由上一場輸家制定。`,
            category: 'dice',
            ease: 3,
            alcohol: 4,
            players: 5,
            recommended: true
        },
        {
            id: 'game24',
            title: '沒有一 (骰一)',
            description: `1. 每位玩家五個骰子同時一起骰。
            <br>2. 開牌看誰沒有骰到一。
            <br>3. 沒有骰到一的玩家喝一口然後繼續骰。
            <br>4. 骰到一的將其移出骰盅。
            <br>5. 落後者骰到數量超過或是平手領先者。
            <br>6. 最先骰到五個一的過關。
            <br>7. 剩餘玩家繼續骰直到全部過關。`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: 5,
            recommended: true
        },
        {
            id: 'game25',
            title: '我從來沒有',
            description: `1. 所有參與者圍坐成一圈，並伸出五隻手指。
            <br>2. 每個人輪流說出一件自己從來沒有做過的事情，句式為「我從來沒有……」。
            <br>3. 如果其他參與者有做過這件事，就需要減掉一根手指。
            <br>4. 當某個人的手指全部減完，即變成零時，該人需要喝一口公杯。
            <br>5. 說完一句後，下一個人繼續說「我從來沒有……」，遊戲依此類推。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game26',
            title: '上下樓梯',
            description: `1. 以一個人當中心點成為一樓，順時針將每個人標上樓數。
            <br>2. 每個人要記好自己的樓層。
            <br>3. 當一樓開始說：「一樓上 x 樓啊！」，被點到的樓層的人接著說下一句。
            <br>4. 如果喊錯樓層或喊到不存在的樓層，要喝一杯。
            <br><br>舉例：<br>全部有四樓 -> 一樓上四樓 -> 四樓下二樓 -> 二樓上三樓 -> 三樓上五樓（罰一杯，因為沒有五樓）。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game27',
            title: '九宮格射龍門',
            description: `1. 在桌上明放九張撲克牌。
            <br>2. 翻牌的人決定要玩哪一題，並選擇要比題目的牌面大還是小。
            <br>3. 如果猜對，就可以換人或繼續。
            <br>4. 如果撞柱（跟牌面相同），就 Double 該題現在牌數的數量。`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: 4,
            recommended: true
        },
        {
            id: 'game28',
            title: '烏龜烏龜翹',
            description: ``,
            category: 'no-prop',
            ease: 1,
            alcohol: 3,
            players: 4,
            recommended: true
        },
        {
            id: 'game29',
            title: '心臟病',
            description: `1. 大家圍坐成一圈，每人手中持有同樣數量的牌，面朝下放置。
            <br>2. 依次輪流出牌，並將牌面朝上放置於中央堆疊。
            <br>3. 當有兩張相同牌連續出現時，所有玩家需迅速拍打中央堆疊。
            <br>4. 最後一個拍打堆疊的玩家要將堆疊中的所有牌收回自己手中。
            <br>5. 第一個將所有牌出完的玩家獲勝，其餘玩家繼續，直到剩下最後一個人。
            <br>6. 最後一個人為輸家，需罰喝一杯。`,
            category: 'card',
            ease: 2,
            alcohol: 3,
            players: 4,
            recommended: false
        }
    ];

    const diceGames = document.getElementById('dice-games');
    const cardGames = document.getElementById('card-games');
    const noPropGames = document.getElementById('no-prop-games');
    const gameDetails = document.getElementById('game-details');

    games.forEach(game => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${game.id}`;
        link.innerHTML = game.recommended ? '<span class="recommended-star">★</span> ' + game.title : game.title; // 添加星號
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
        
        // 如果推薦，添加星號
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
});