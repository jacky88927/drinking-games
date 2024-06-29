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
            id: 'game21',
            title: '殘暴輪盤',
            description: `
                <ol>
                    <li>玩家數任意，需要一顆骰子與六個公杯，並將其指定為1~6數字。</li>
                    <li>骰子骰到空杯則加酒至滿杯。</li>
                    <li>若骰到有酒的則喝完該杯酒。</li>
                    <li>喝完後繼續骰，直到骰到空杯加酒為止才換下一家。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/eAtocsJJwd0?si=S0nehYXB8KTyLb_0&t=175" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 1,
            alcohol: 5,
            players: '>2',
            recommended: true,
            interaction: false
        },
        {
            id: 'game31',
            title: '倒楣三',
            description: `
                <ol>
                    <li>所有玩家丟骰子，只要有三就要當鬼，可能不只一個鬼。</li>
                    <li>正式開始後：
                        <ul>
                            <li>兩顆骰子出現3，鬼要喝。</li>
                            <li>兩顆骰子點數加起來是3的倍數（3, 6, 9, 12），鬼要喝。</li>
                            <li>兩顆骰子是一對，擲中者可指定任何一人喝。</li>
                            <li>骰到7，上家喝。</li>
                            <li>骰到8，下家喝。</li>
                            <li>骰到9，自己喝（是三的倍數鬼也要喝）。</li>
                        </ul>
                    <li>不符合上述條件時換下一家丟（例如6 5, 6 4, 4 1），鬼也要丟。</li>
                    </li>
                </ol>`,
            category: 'dice',
            ease: 3,
            alcohol: 5,
            players: '任意',
            recommended: true,
            interaction: false
        },
        {
            id: 'game1',
            title: '殘暴七八九',
            description: `
                <ol>
                    <li>玩家數任意，需要兩顆骰子與一個公杯。</li>
                    <li>骰到7加酒，骰到8喝半杯，骰到9喝整杯。</li>
                    <li>骰到兩個1指定玩家喝完，骰到Pair迴轉。</li>
                    <li>有喝到酒的玩家要繼續骰（骰到8、9），直到沒喝酒才換下一家。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/eAtocsJJwd0?si=d-M1ILzXOy_RH5PY&t=272" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 1,
            alcohol: 4,
            players: '任意',
            recommended: true,
            interaction: false
        },
        {
            id: 'game6',
            title: '吹牛',
            description:`
                <ol>
                    <li>每位參加者有一個藏有五顆骰子的骰盅，遊戲人數至少兩人。</li>
                    <li>開始時，各參加者搖動骰盅並自己看骰盅裡的骰子，不讓其他人看到。</li>
                    <li>一位參加者喊出「X個Y」，即預料所有參加者中至少有X顆Y點數骰子，X至少為參加者的數目。</li>
                    <li>下一位參加者可喊出新的骰子數目和點數，或不信任上一位玩家的叫喊。</li>
                    <li>若喊出新的骰子數目和點數，X必須大於或等於上一次叫喊，若X相同，Y點數必須大於上一位。</li>
                    <li>骰子上的「一點」是通用，可代表任何點數，但若Y是一，則「一點」不再通用。</li>
                    <li>當有玩家不信任上一位的叫喊時，各玩家打開骰盅，若骰子數目等於或大於叫喊的X，首先打開骰盅的玩家喝酒；少於則最後叫喊者喝酒。</li>
                    <li>負方喝完酒後遊戲重新開始，無最終勝方。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/TaiNo8LcPLU?si=L22-q7GMS05DEBcM&t=261" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 3,
            alcohol: 3,
            players: '任意',
            recommended: true,
            interaction: true
        },
        {
            id: 'game34',
            title: '紅黑單雙大小',
            description: `
                <ol>
                    <li>起始玩家看完自己的牌後選擇以下六種喊法之一：
                        <ul>
                            <li>紅的拿掉</li>
                            <li>黑的拿掉</li>
                            <li>大的拿掉（4、5、6）</li>
                            <li>小的拿掉（1、2、3）</li>
                            <li>單數拿掉（1、3、5）</li>
                            <li>雙數拿掉（2、4、6）</li>
                        </ul>
                    </li>
                    <li>全部玩家依照指示拿掉該骰子，包含喊者本人。</li>
                    <li>完成後，全部玩家將剩餘的骰子放入骰盅再次搖動。</li>
                    <li>接下來的玩家依循順時針或逆時針方向重複動作，直到有玩家骰子拿光則為輸家。</li>
                    <li>若第一次喊牌時有玩家直接拿光骰子，為一擊必殺，懲罰兩倍。</li>
                    <li>若同時有兩家以上輸掉，依照順序最後一家輸家為下一場開局玩家。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/TaiNo8LcPLU?si=LmMNQOPfzFlJaDF0&t=458" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: '任意',
            recommended: true,
            interaction: true
        },
        {
            id: 'game36',
            title: '三合一',
            description: `
                <strong>結合吹牛、紅黑單雙大小、比大小三個遊戲</strong>
                    <br>大家先搖骰子，莊家可以看並決定玩哪個遊戲：
                        <ol>
                            <li>
                                <strong>吹牛：</strong> 莊家喊"幾個幾"，即預料所有參加者中至少有X顆面向天的Y點數骰子。每位玩家可選擇喊出新的數目和點數或不信任上一位玩家的叫喊。若質疑失敗或被質疑成功，喝酒。
                            </li>
                            <li>
                                <strong>紅黑單雙大小：</strong> 莊家選擇以下六種喊法之一：
                                <ul>
                                    <li>紅的拿掉</li>
                                    <li>黑的拿掉</li>
                                    <li>大的拿掉 (4、5、6)</li>
                                    <li>小的拿掉 (1、2、3)</li>
                                    <li>單數拿掉 (1、3、5)</li>
                                    <li>雙數拿掉 (2、4、6)</li>
                                </ul>
                                所有玩家依指示拿掉該骰子並重新搖骰。直到有玩家骰子拿光為輸家。
                            </li>
                            <li>
                                <strong>比大小：</strong> 莊家喊"開"，所有玩家將骰盅打開，檢查彼此的牌，選定欲重骰的骰子放回骰盅，重新搖骰，最小者為輸家。牌型大小依傳統撲克牌規則：
                                <ul>
                                    <li>散牌（無法組成以上任一牌型的雜牌）</li>
                                    <li>一對（兩個相同數字的骰子和三個雜牌）</li>
                                    <li>兩對（兩對數字相同但不同的骰子和一張雜牌）</li>
                                    <li>三條（三個相同數字和兩個不同數字的骰子）</li>
                                    <li>順子（1、2、3、4、5或2、3、4、5、6）</li>
                                    <li>同花（全黑或全紅，但通常不玩同花，可自行決定）</li>
                                    <li>葫蘆（三個相同數字及兩個相同數字）</li>
                                    <li>四條（四個相同數字與一個其他數字）</li>
                                    <li>五條（五個同樣數字）</li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                    輸的人為下一輪莊家。
                <p>教學影片: <a href="https://youtu.be/TaiNo8LcPLU?si=osW5iSKSvpgupDHr&t=628" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 4,
            alcohol: 3,
            players: '任意',
            recommended: true,
            interaction: true
        },
        {
            id: 'game17',
            title: '九宮格',
            description: `準備九個杯子和兩個骰子，骰到多少就在對應的杯子加酒。
            <br>下一個人骰到的喝掉，如果連線三杯都要喝。
            <br>骰到11和12當1，骰到10當2。`,
            category: 'dice',
            ease: 1,
            alcohol: 4,
            players: '<8',
            recommended: false,
            interaction: false
        },
        {
            id: 'game37',
            title: '踩地雷',
            description: `
                <ol>
                    <li>每位玩家有五顆骰子。</li>
                    <li>由莊家開始擲骰。</li>
                    <li>如果擲出任意一對相同的數字，該數字即為地雷。例如：如果擲出1, 3, 3, 4, 5，那麼3即為地雷；如果擲出1, 1, 3, 3, 6，那麼1和3都是地雷。</li>
                    <li>接著由下一位玩家擲骰，或由所有玩家依次擲骰。</li>
                    <li>每次擲骰，玩家擲出的每個地雷數字都需喝一杯。例如：地雷數字是3，而玩家擲出3, 4, 3, 2, 5，則需喝兩杯。</li>
                </ol>
                <p>教學影片: <a href="https://www.instagram.com/p/C729FOuvM9T/" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 4,
            players: '>2',
            recommended: false,
            interaction: false
        },
        {
            id: 'game38',
            title: '骰子炸彈',
            description: `
                <ol>
                    <li>玩家數不限，至少需要三顆骰子。</li>
                    <li>共同決定一個目標數字組合，如12個5或總和等於300。</li>
                    <li>每人輪流擲三顆骰子，累積點數結果。</li>
                    <li>達到目標數字組合的玩家需接受懲罰。</li>
                </ol>
                <p>變化規則：可更改目標數字組合或骰子數量。</p>`,
            category: 'dice',
            ease: 2,
            alcohol: 1,
            players: '不限',
            recommended: false,
            interaction: false
        },
        {
            id: 'game39',
            title: '骰子接龍',
            description: `
                <ol>
                    <li>每位玩家拿五顆骰子，秘密地擺在自己面前。</li>
                    <li>猜拳決定起始玩家，起始玩家拿出點數為1的骰子。</li>
                    <li>下一位玩家必須拿出2點，以此類推，6點後接1點。</li>
                    <li>無法接龍的玩家需接受懲罰並拿出新點數。</li>
                </ol>
                <p>變化規則：可增加骰子數量或更改規則。</p>`,
            category: 'dice',
            ease: 2,
            alcohol: 2,
            players: '不限',
            recommended: false,
            interaction: false
        },
        {
            id: 'game40',
            title: '骰子地雷',
            description: `
                <ol>
                    <li>起始玩家決定本輪地雷條件（如兩個3或總和等於7）。</li>
                    <li>所有玩家輪流擲兩顆骰子。</li>
                    <li>符合地雷條件的玩家需喝酒。</li>
                    <li>起始玩家骰完後，由下一位決定本輪地雷條件。</li>
                </ol>
                <p>變化規則：可增加骰子數量或設置大、小地雷。</p>`,
            category: 'dice',
            ease: 2,
            alcohol: 2,
            players: '不限',
            recommended: false,
            interaction: false
        },
        {
            id: 'game43',
            title: '殘暴碗公',
            description: `
                <ol>
                    <li>玩家數任意，起始三個骰子。</li>
                    <li>開場玩家先指定1~6其中一個數字。</li>
                    <li>骰出後若沒有該數字則換下一家，若有該數字則要喝酒，有幾顆就喝幾單位。</li>
                    <li>喝完後繼續骰，直到沒有喊到數字為止。</li>
                    <li>轉一輪又回到起始玩家時加一顆骰子，直到七顆時遊戲結束。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/eAtocsJJwd0?si=38g6dZk1QYrIkE7P&t=56" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 4,
            players: '>2',
            recommended: false,
            interaction: false
        },
        {
            id: 'game2',
            title: '殘暴三百五',
            description: `
                <ol>
                    <li>玩家數任意，需要七顆骰子與一個公杯。</li>
                    <li>數字1代表100點，數字5代表50點，有骰到就將該點數拿出後繼續骰（可選擇拿或不拿，至少要拿一顆）。</li>
                    <li>每次擲骰至少要有1或5其中一個，不然直接出局並喝自己的酒。</li>
                    <li>當總數超過350點後可以喊停，該數字即為本場點數。</li>
                    <li>等所有玩家骰完後以點數高低比較輸贏，最低點數的為輸家。</li>
                    <li>結算時若有玩家500點以上x2倍，600點以上x3倍，全骰開x4倍，乘法累計。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/eAtocsJJwd0?si=4PV1-iiUiI9IKqFv&t=392" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: '<6',
            recommended: false,
            interaction: false
        },
        {
            id: 'game53',
            title: '攏總來',
            description: `
                <ol>
                    <li>每位玩家需有一個骰盅和五顆骰子。</li>
                    <li>由莊家（上一場輸家）開始，莊家開骰盅的瞬間喊牌。</li>
                    <li>莊家喊牌後，每位玩家同時開骰盅，並將骰子排成莊家指定牌型。</li>
                    <li>排完的玩家立即舉手，最後一位舉手的即為輸家。</li>
                    <li>喝酒單位由上一場輸家制定。</li>
                    <li>基礎牌型：
                        <ul>
                            <li>全部黑的朝上</li>
                            <li>全部紅的朝上</li>
                            <li>全部黑的連起來</li>
                            <li>全部紅的連起來</li>
                            <li>全部黑的疊起來</li>
                            <li>全部紅的疊起來</li>
                        </ul>
                    </li>
                    <li>熟悉後可自己加規則（如順子、葫蘆等），牌型喊法也可改編為口訣。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/o_lF6r-HORU?si=BZjuBu6VXHK6LWLM&t=441" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 3,
            alcohol: 2,
            players: '任意',
            recommended: false,
            interaction: true
        },        
        {
            id: 'game24',
            title: '沒有一 (骰一)',
            description:`
                <ol>
                    <li>每位玩家五個骰子同時一起骰。</li>
                    <li>開牌看誰沒有骰到一。</li>
                    <li>沒有一的玩家先喝一口，然後繼續骰。</li>
                    <li>骰到一的將其移出骰盅。</li>
                    <li>落後者骰到數量超過或平手領先者。</li>
                    <li>最先骰到五個一的玩家過關。</li>
                    <li>剩餘玩家繼續骰直到過關。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/WHnrDHopFJA?si=cMuDSqFQ2o-k25Jh&t=49" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 3,
            players: '任意',
            recommended: false,
            interaction: true
        },
        {
            id: 'game23',
            title: '骰子終極密碼',
            description: `
                <ol>
                    <li>準備一個骰盅與五顆骰子，骰子數可依照節奏增加。</li>
                    <li>莊家晃動骰盅後遊戲開始（牌只有莊家能看）。</li>
                    <li>由莊家開始，起始數字為骰子數量，最少喊一個數字，最多可喊三個數字。</li>
                    <li>玩家自覺快喊到骰子數字總和時，可使用迴轉或Pass（兩者擇一）。</li>
                    <li>莊家因知道骰子數字總和，故不可使用迴轉或Pass。</li>
                    <li>直到有玩家喊過骰子數字總和，即為輸家（莊家抓錯也輸）。</li>
                    <li>喝酒單位由上一場輸家制定。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/o_lF6r-HORU?si=bgBZFVsSaztkK-a3&t=224" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 2,
            alcohol: 2,
            players: '<6',
            recommended: false,
            interaction: false
        },
        {
            id: 'game45',
            title: '疊骰子',
            description: `
                <ol>
                    <li>準備一盒骰子。</li>
                    <li>由莊家開始，每人輪流將骰子一顆顆往上疊。</li>
                    <li>最後骰子塔在誰疊的過程中倒了，該玩家即為輸家。</li>
                    <li>喝酒單位由上一場輸家制定。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/o_lF6r-HORU?si=YXTNetU8rykMN6A0&t=371" target="_blank">觀看教學影片</a></p>`,
            category: 'dice',
            ease: 1,
            alcohol: 2,
            players: '任意',
            recommended: false,
            interaction: false
        },        
        {
            id: 'game27',
            title: '九宮格射龍門',
            description: `1. 在桌上明放九張撲克牌。
            <br>2. 翻牌的人決定要玩哪一題，並選擇要比題目的牌面大還是小。
            <br>3. 如果猜對，就可以換人或繼續。
            <br>4. 如果撞柱（跟牌面相同），就 Double 該題現在牌數的數量。
            <p>教學影片: <a href="https://youtu.be/KLV3cWBsaR8?si=0HPMehTgU3wc6VyS&t=54" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 2,
            alcohol: 4,
            players: '任意',
            recommended: true,
            interaction: false
        },
        {
            id: 'game18',
            title: '陪酒員',
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
            <br>4 = 陪酒員
            <br>5 = 制定遊戲規則
            <br>6 = 接龍遊戲（以廣泛主題為題目）
            <br>7 = 廁所牌（可交易）
            <br>8 = 不可回答抽到此牌之玩家的問題
            <br>9 = 上家喝一單位
            <br>10 = 下家喝一單位
            <br>J = Pass
            <br>Q = 抽到此牌的玩家做出明顯動作時，最後跟到的喝一單位
            <br>K = 全部玩家喝一單位
            <p>教學影片: <a href="https://youtu.be/Voxf__LATHw?si=n3HyAI-OcVwnfWLm&t=265" target="_blank">觀看教學影片</a></p>
            <p>教學影片: <a href="https://youtu.be/CGEHeAWe0dA?si=Gt9YwQRy89eOcUL1" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 5,
            alcohol: 3,
            players: '>4',
            recommended: true,
            interaction: true
        },
        {
            id: 'game19',
            title: '31點',
            description: `
                <h3>基本規則:</h3>
                <ol>
                    <li>每人手上有兩張牌，出牌後立即抽牌，保持在兩張。</li>
                    <li>1~10點數照算，JQK則為0.5點。</li>
                    <li>31點為上限，超過31點遊戲結束，無法出牌者為輸家。</li>
                    <li>輸家基本底注為兩單位。</li>
                    <li>出牌順序為順時鐘。</li>
                </ol>
                <h3>進階規則:</h3>
                <ol>
                    <li>若手牌可即刻將場中點數湊成整數(10、20、30)，即可發動”搶牌”。</li>
                    <li>搶牌不限制出牌順序，先放牌者為主，每搶到一次加一單位。</li>
                    <li>若是順向下一家搶牌或自己搶自己牌，則不加單位。</li>
                    <li>搶牌只搶整數，無法直接搶到31點。</li>
                    <li>若牌理上可一張牌直接捕到31點時，可詢問下家是否買保險。</li>
                    <li>保險詢問和搶牌先提出者為主。</li>
                    <li>若被詢問者不買保險，詢問者出牌後結束遊戲，加一單位。</li>
                    <li>若詢問者出牌後無法結束遊戲也無法出牌，加一單位。</li>
                    <li>若詢問者出牌後無法結束遊戲但可以出牌，則遊戲繼續。</li>
                    <li>若被詢問者買保險，該場懲罰單位減半（最低為底注）。</li>
                    <li>未即時照順序抽牌，被其他玩家搶抽牌，加一單位。</li>
                </ol>
                <p>單場最多單位為：底注兩單位 + 搶10一單位 + 搶20一單位 + 搶30一單位 + 不買保險(或亂問保險)一單位 = 六單位。</p>
                <p>教學影片: <a href="https://youtu.be/on1dPxBcQ3E?si=4p58V1Eoi44TUrk3&t=365" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 3,
            alcohol: 3,
            players: '2-8',
            recommended: true,
            interaction: false
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
            <br>10. 抽到第四張A的玩家需喝完全部公杯的酒。
            <p>教學影片: <a href="https://youtu.be/KLV3cWBsaR8?si=IpBRdjr0nltE9C05&t=470" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: '>3',
            recommended: true,
            interaction: false
        },
        {
            id: 'game22',
            title: '吹吹牌',
            description: `
                <ol>
                    <li>先訂好公杯量用以輸家懲罰用。</li>
                    <li>將整副撲克牌放置於酒瓶上方。</li>
                    <li>由上一場輸家開始吹牌。</li>
                    <li>有吹掉一張以上的牌即換下一家。</li>
                    <li>吹掉最後一張牌的為輸家。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/qNQmbnnubi8?si=P-tkzgsBfWHsjqxE&t=51" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 2,
            alcohol: 3,
            players: '任意',
            recommended: true,
            interaction: false
        },
        {
            id: 'game33',
            title: '拍賣會',
            description: `
                <ol>
                    <li>一人一張底牌（A~10分別為1~10點；J, Q, K為0.5點）</li>
                    <li>桌上放人數n+1張牌做為拍賣品（玩家必須要湊到10點半才算勝利，因此需要決定是否買入拍賣品）</li>
                    <li>如要拍賣，需喊出要喝出多少口，最多者可拿到拍賣品，並喝下喊出的量</li>
                    <li>桌上的拍賣品售光或是無人拍賣即結算遊戲</li>
                    <li>各自將底牌和拍賣品加起來結算並比大小，點數最少的人跟超出10點半的人要喝1杯，每當有人結算總數達到10點半就要多加一杯</li>
                </ol>
                <p>教學影片: <a href="https://www.instagram.com/west_ferryman_hsiang/reel/C21tZMqSnAj/" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 2,
            alcohol: 4,
            players: '>2',
            recommended: true,
            interaction: false
        },
        {
            id: 'game29',
            title: '心臟病',
            description: `
                <ol>
                    <li>將52張牌按人數平分（有梅花3的玩家拿無法整除的牌並且先攻）。</li>
                    <li>如果人數超過8-10人，則合併兩副牌玩。</li>
                    <li>拿到牌後不得看自己的牌，將牌背朝上放在自己前面。</li>
                    <li>大家輪流出牌，一人一張，出牌時口中同時唸數字（按順序1, 2, 3, ... J, Q, K）。</li>
                    <li>若發出的牌數字與口中唸出的數字相同，則大家要將右手掌壓於牌上方。</li>
                    <li>最慢的人（手放在最上面的人），要將已發出的牌全數拿走（罰一單位酒）。</li>
                    <li>如果有人搞錯而「誤拍」，則同樣要將所有的牌收回。(罰一單位酒)</li>
                    <li>誤拍者重新開始從1數起出牌，若數字與牌不符則繼續。</li>
                    <li>52張牌發完後，牌最多的人算輸（罰三單位酒）。</li>
                    <li>由輸家洗牌並發下一局的牌。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/on1dPxBcQ3E?si=yil8Tm_6l_OFOTDd&t=56" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 2,
            alcohol: 3,
            players: '>2',
            recommended: true,
            interaction: false
        },
        {
            id: 'game42',
            title: '撲克牌吹牛',
            description: `
                <ol>
                    <li>使用標準的52張撲克牌，不含鬼牌，洗牌後發給所有玩家。</li>
                    <li>擁有梅花3的玩家先出牌，順序與發牌順序一致。</li>
                    <li>第一位玩家打出1至5張牌，背面向上，並告訴其他玩家牌的數字，可說謊。</li>
                    <li>其他玩家可以選擇相信或質疑，並翻開檢查。</li>
                    <li>若出牌人說謊，需拿回所有牌並喝一單位酒，由揭發者出牌；若未說謊，揭發者拿走所有牌並喝一單位酒，出牌人繼續出牌。</li>
                    <li>沒有質疑時，下一位玩家繼續出牌。</li>
                    <li>J, Q, K可以作為任何牌使用。</li>
                    <li>最先清空手牌的玩家為贏家，最後清空手牌的為輸家，懲罰三單位酒。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/on1dPxBcQ3E?si=BNV0SsZAUiM5aQFX&t=188" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 3,
            alcohol: 3,
            players: '>2',
            recommended: false,
            interaction: false
        },
        {
            id: 'game49',
            title: '二十一點',
            description: `
                <ol>
                    <li>底注1~3單位，可以買一張或是分牌，也可以分牌後買一張，每次執行都加1單位。</li>
                    <li>莊家開場兩張牌一明一暗，最後補牌，17點以上才停，一次一副牌，發完換人當莊家。</li>
                    <li>若有BJ可能，莊家優先開，開到就通殺2倍，再輪到玩家補牌，爆掉直接喝，同點數無勝負，玩家開BJ莊家賠2倍。</li>
                    <li>建議人數4~6人，此為最佳遊戲節奏參與人數。</li>
                </ol>
                <p>教學影片: <a href="https://www.youtube.com/watch?v=hdPKY-_uOnY&list=PLDCvBR3znPeCcYlwbwim2Jeh54TumDqqm&index=19&ab_channel=%E6%81%A9%E7%86%99%E4%BF%8AakaMCJeng" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 3,
            alcohol: 4,
            players: '4-6',
            recommended: false,
            interaction: false
        },        
        {
            id: 'game41',
            title: 'Triforce 三角之力',
            description: `
                <p>玩家數不限，由其中一位玩家擔任發牌者，進行兩個Round的遊戲。</p>
                <h3>Round 1:</h3>
                <ol>
                    <li>發牌者詢問每個玩家四個問題：
                        <ul>
                            <li>(1) 大或小</li>
                            <li>(2) 紅色或黑色</li>
                            <li>(3) 單數或雙數</li>
                            <li>(4) 哪一種花色</li>
                        </ul>
                    </li>
                    <li>玩家依序回答後，猜對的牌放入廢牌區，猜錯的牌交給玩家。</li>
                    <li>發牌者也要參與遊戲，最後手上牌最多的玩家進入Round 2。</li>
                    <li>每一Round結尾，所有玩家依照手上牌的數量對應喝幾單位。</li>
                    <li>若有平手，則用同一副牌不重新洗牌，繼續Round 1，直到輸家出現。</li>
                </ol>
                <h3>Round 2:</h3>
                <ol>
                    <li>發牌者排好金字塔：
                        <ul>
                            <li>(1) 最上層蓋一張牌</li>
                            <li>(2) 中層蓋兩張牌</li>
                            <li>(3) 下層蓋三張牌</li>
                        </ul>
                    </li>
                    <li>由Round 1的輸家進行，從下層開始猜大或小。</li>
                    <li>要連續猜對三張牌，才能進入中層。</li>
                    <li>猜錯則回到該層最右邊重新開始，每猜錯一次喝一單位。</li>
                    <li>完成下、中、上層即結束本局遊戲。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/Voxf__LATHw?si=3lfD1D0Ig9Q6EtD9&t=47" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 5,
            alcohol: 4,
            players: '<6',
            recommended: false,
            interaction: false
        },
        {
            id: 'game46',
            title: '頭貼牌',
            description: `
                <ol>
                    <li>每位玩家發一張牌，自己不能看到。</li>
                    <li>牌可放在頭上或其他方便其他玩家看的地方。</li>
                    <li>起始玩家若從A開始喊，只能喊+0或+1。</li>
                    <li>起始玩家若從K開始喊，只能喊-0或-1。</li>
                    <li>若喊到自己頭上的牌，則為輸家。</li>
                    <li>可自行決定能夠喊的數字範圍。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/KLV3cWBsaR8?si=XsxzZoAv5A0XQgMY&t=331" target="_blank">觀看教學影片</a></p>`,
            category: 'card',
            ease: 2,
            alcohol: 2,
            players: '>4',
            recommended: false,
            interaction: false
        },
        {
            id: 'game11',
            title: '比大小',
            description: `每人抽一張牌貼在額頭上，其他人看得到但自己看不到。
            <br>每人依次問旁邊的人：「你覺得我需要換嗎？」
            <br>可以選擇換牌或保持原樣，最後揭曉時，點數最小的人輸。`,
            category: 'card',
            ease: 1,
            alcohol: 1,
            players: '>3',
            recommended: false,
            interaction: false
        },
        {
            id: 'game14',
            title: '國王遊戲',
            description: `準備多張牌，其中一張寫著「國王」，其他編號1、2、3等。
            <br>每人抽一張牌，抽到「國王」的人可以指定幾號喝酒。`,
            category: 'card',
            ease: 2,
            alcohol: 2,
            players: '>3',
            recommended: false,
            interaction: false
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
            recommended: true,
            interaction: false
        },
        {
            id: 'game50',
            title: '搶數字',
            description: `
                <ol>
                    <li>所有玩家將手舉起。</li>
                    <li>放下時依照數字順序喊數字。</li>
                    <li>若有同時喊到同一個數字者即為輸家。</li>
                    <li>最後一個把手放下的要喝兩倍。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/kQVxMZNsLzQ?si=Iha7CCG-bcZrdjRG&t=375" target="_blank">觀看教學影片</a></p>`,
            category: 'no-prop',
            ease: 1,
            alcohol: 3,
            players: '>2',
            recommended: true,
            interaction: false
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
            players: '>3',
            recommended: true,
            interaction: false
        },        
        {
            id: 'game3',
            title: '十五二十',
            description: `兩人同時伸手出指（雙手能出的數字為0、5、10），口中喊一個數字（雙方出指數字之和，0、5、10、15、20）。
            <br>如果喊的數字和實際出的手指數相同，就贏，輸的人罰喝酒。
            <br>兩人都喊中就繼續。
            <p>教學影片: <a href="https://youtu.be/m6qNxnyqKWY?si=gPD4tu0sdhV4l5X6&t=168" target="_blank">觀看教學影片</a></p>`,
            category: 'no-prop',
            ease: 2,
            alcohol: 2,
            players: 2,
            recommended: true,
            interaction: false
        },
        {
            id: 'game30',
            title: '十五二十-多人',
            description: `
                         1. 每個人同時伸出一隻手，能出的數字只有0或5。<br> 
                         2. 每回合有一個莊家，莊家喊一個數字，這個數字應該是所有玩家伸出手指數的總和，可能的數字包括0、5、10、15、20。<br>
                         3. 如果莊家喊的數字和實際出的手指數相同，莊家的下一個人喝酒。<br> 
                         4. 如果莊家連續喊中兩次，則莊家的上下兩個人都要喝酒。<br>
                         5. 如果莊家連續喊中三次，則除了莊家以外的所有人都要喝酒。<br>
                         6. 如果莊家沒有喊中，則下一個人當莊家，遊戲繼續。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 2,
            players: '>2',
            recommended: true,
            interaction: false
        },
        {
            id: 'game4',
            title: '真心話和大冒險',
            description: `通過猜拳或抽牌選出一個人，這個人要選擇「真心話」或「大冒險」。
            <br>「真心話」可以讓任何一個人問任何問題，必須如實回答。
            <br>「大冒險」則是接受在座其他人的指示去做一件事情。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: '3~8',
            recommended: false,
            interaction: false
        },
        {
            id: 'game5',
            title: '數三',
            description: `一群人從1開始輪流說數字，數到有3的數字或3的倍數不能說出來，改為拍手。
            <br>如果說錯了就罰喝酒，然後重新開始數。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 2,
            players: '>4',
            recommended: false,
            interaction: false
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
            alcohol: 2,
            players: '>4',
            recommended: false,
            interaction: false
        },
        {
            id: 'game28',
            title: '烏龜烏龜翹',
            description: `
                <ol>
                    <li>猜拳決定先攻者，雙方將一支手放置於桌面。</li>
                    <li>攻擊者說完"烏龜烏龜翹"後翹起任一支手指。</li>
                    <li>若對方翹起相對應的手指，則攻擊方獲勝。</li>
                    <li>若對方翹起非相對應的手指，則遊戲繼續並交換攻守方。</li>
                    <li>以此類推直到分出勝負為止。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/m6qNxnyqKWY?si=Gfpffu1K69PQiqGn&t=77" target="_blank">觀看教學影片</a></p>`,
            category: 'no-prop',
            ease: 2,
            alcohol: 3,
            players: 2,
            recommended: false,
            interaction: false
        }, 
        {
            id: 'game44',
            title: '鐵達尼號',
            description: `
                <ol>
                    <li>準備一長杯和一Shot杯。</li>
                    <li>往長杯中倒入過半的啤酒或其他任意酒（濃度不拘）。</li>
                    <li>將Shot空杯放置於長杯中，Shot杯會浮在酒上。</li>
                    <li>由莊家（上一場輸家）開始依序往Shot杯中倒入另外一種酒（每人可倒不同酒種）。</li>
                    <li>倒的量不拘，最少只要有酒進入Shot杯即可，想害人的可以倒更多。</li>
                    <li>若玩家倒完酒後Shot酒杯翻船或沉入長杯底，即為輸家。</li>
                    <li>輸家需喝完這整杯酒，喝完後開始下一輪，由輸家開始。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/o_lF6r-HORU?si=yL8r1SSDsEBp2vnh&t=42" target="_blank">觀看教學影片</a></p>`,
            category: 'np-prop',
            ease: 1,
            alcohol: 4,
            players: '任意',
            recommended: false,
            interaction: false
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
            recommended: false,
            interaction: false
        },
        {
            id: 'game13',
            title: '傳牙籤',
            description: `每人抽一張撲克牌，按順序坐好，持最小（或最大）牌的人開始，用嘴銜住牙籤傳給下一個人。
            <br>不許掉落，也不能用手或其他工具幫忙。
            <br>掉了的人罰酒。傳完一圈後將牙籤撅一半，繼續抽牌並重複遊戲。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 2,
            players: '>3',
            recommended: false,
            interaction: false
        },
        {
            id: 'game15',
            title: '我愛你VS不要臉',
            description: `眾人圍坐成一圈，規定只能對左邊的人說「我愛你」，對右邊的人說「不要臉」。
            <br>兩人之間只能連續對話3次。一旦有人說錯，即受罰。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 2,
            players: '>4',
            recommended: false,
            interaction: false
        },
        {
            id: 'game16',
            title: '大小西瓜',
            description: `這遊戲要求在口喊「大西瓜」的同時，手上比劃出「小西瓜」的輪廓；反之亦然。
            <br>說錯的人罰酒。`,
            category: 'no-prop',
            ease: 2,
            alcohol: 2,
            players: '>4',
            recommended: false,
            interaction: false
        },
        {
            id: 'game10',
            title: '撕紙',
            description: `每人撕一長條餐巾紙，含在嘴裡並撕下一段傳給下一個人。
            <br>接牌時，前一人嘴裡必須留有紙。
            <br>撕到最後紙會越來越少，放棄的罰兩次，嘗試沒成功的罰一次。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 2,
            players: '>3',
            recommended: false,
            interaction: false
        },
        {
            id: 'game9',
            title: '吸星大法',
            description: `男女交替坐成一圈，用嘴吸住一張撲克牌並傳給下一個人。
            <br>牌掉了的人罰酒。可以跨越多個人傳牌，只要不掉就可以。`,
            category: 'no-prop',
            ease: 1,
            alcohol: 2,
            players: '>3',
            recommended: false,
            interaction: false
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
            players: '>4',
            recommended: false,
            interaction: false
        },
        {
            id: 'game47',
            title: 'Flip Cup (翻杯子)',
            description: `
                <ol>
                    <li>準備任意數量紙杯（兩側杯數一致）。</li>
                    <li>在酒杯裡裝酒（酒種任意）。</li>
                    <li>喝完酒後將杯子由下往上翻。</li>
                    <li>翻成面朝下後算是成功即可往下一杯進行。</li>
                    <li>直到全部翻完後為贏家。</li>
                    <li>輸家喝完公杯內的酒（若有隊員則一起喝完）。</li>
                    <li>公杯內容由上一家輸家決定。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/WHnrDHopFJA?si=dRE7ZX6nZWzXmPyg&t=327" target="_blank">觀看教學影片</a></p>`,
            category: 'no-prop',
            ease: 2,
            alcohol: 4,
            players: '任意',
            recommended: false,
            interaction: false
        },        
        {
            id: 'game48',
            title: '異口同聲(喝酒版)',
            description: `
                <ol>
                    <li>四人以上可以玩，一組2人。</li>
                    <li>分為兩組攻擊方、防守方，猜拳決定誰為攻擊方。</li>
                    <li>攻擊方先出題，任何問題但需明確且範圍不能太偏。</li>
                    <li>防守方兩人聽完問題倒數3, 2, 1當下一起回答。</li>
                    <li>總共問5題，中間排五個Shot杯。</li>
                    <li>防守方答案相同，將一杯Shot放到攻擊方面前。</li>
                    <li>防守方答案不同，將一杯Shot放到防守方面前。</li>
                    <li>五題問完結算時，面前杯數多的為輸家。</li>
                    <li>攻擊方獲勝，防守方喝面前Shot。</li>
                    <li>防守方答對4題，攻擊方懲罰x2（共8杯）。</li>
                    <li>防守方5題全對，攻擊方懲罰x3（共15杯）。</li>
                    <li>結算後雙方攻守互換，三戰兩勝。</li>
                    <li>若進入第三場改問3題，互問積分高的為贏家。</li>
                    <li>輸家若連輸兩場喝10杯，1勝1負後輸掉第三場喝5杯。</li>
                    <li>下一場輸家先攻。</li>
                </ol>
                <p>教學影片: <a href="https://youtu.be/WHnrDHopFJA?si=s2_DH6PYIMzLVIRb&t=558" target="_blank">觀看教學影片</a></p>`,
            category: 'no-prop',
            ease: 3,
            alcohol: 4,
            players: '>4',
            recommended: false,
            interaction: false
        },        
        {
            id: 'game32',
            title: '沉船遊戲',
            description: `沉船遊戲因為可以加入不同酒種到酒裡，所以你可以選擇混酒形式或是類似於燒啤、野格炸彈這樣的調酒類型去玩。<br>
            <strong>遊戲規則：</strong>
            <ol>
                <li>準備一大一小的酒杯，大酒杯倒入2/3的任意酒類。</li>
                <li>再將小酒杯放到大酒杯中，玩家開始輪流倒酒到小杯子中，倒多少都可以，最後讓小酒杯翻倒或是沉下去的就輸了！懲罰就要整杯酒一起喝下去！</li>
            </ol>`,
            category: 'no-prop',
            ease: 1,
            alcohol: 5,
            players: '>2',
            recommended: false,
            interaction: false
        },
        
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

    window.filterGames = function(category) {
        const allGames = document.querySelectorAll('#dice-games li, #card-games li, #no-prop-games li');
        const allSections = document.querySelectorAll('#game-details section');
    
        allGames.forEach(game => {
            game.style.display = 'none';
        });
    
        allSections.forEach(section => {
            section.style.display = 'none';
        });
    
        if (category === 'all') {
            allGames.forEach(game => {
                game.style.display = 'block';
            });
            allSections.forEach(section => {
                section.style.display = 'block';
            });
        } else if (category === 'high-interaction') {
            games.forEach(game => {
                if (game.interaction) {
                    const gameLink = document.querySelector(`#${game.category}-games li a[href="#${game.id}"]`);
                    if (gameLink) {
                        gameLink.parentElement.style.display = 'block';
                        document.getElementById(game.id).style.display = 'block';
                    }
                }
            });
        } else {
            games.forEach(game => {
                if (game.category === category || (category === 'quick-drinking' && game.alcohol > 3)) {
                    const gameLink = document.querySelector(`#${game.category}-games li a[href="#${game.id}"]`);
                    if (gameLink) {
                        gameLink.parentElement.style.display = 'block';
                        document.getElementById(game.id).style.display = 'block';
                    }
                }
            });
        }
    };
});
