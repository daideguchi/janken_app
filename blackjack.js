/*
    「JavaScript ブラックジャック」		2004/05/06版

    THU
    madpoet@thu.sakura.ne.jp
    http://thu.sakura.ne.jp/
*/

//	ブラックジャック制御用クラス
function BlackJack() {
    this.fieldId = arguments[0];

    this.debug = false;

    this.point = 100;			// 初期点数
    this.size = 8;				// 全体のサイズ基本値
    this.speed = 100;			// カード配布待ち時間
    this.waitTime = 1000;			// 文字表示待ち時間
    this.color = 'black';			// 文字色
    this.outFrameColor = 'black';		// 一番外側の枠線の色
    this.bgColor = 'limegreen';		// フィールドの背景色
    this.frameColor = 'black';		// 枠線の色
    this.cardColor = 'white';		// カードの色
    this.cardBackColor = 'royalblue';	// カードの裏面の色

    this.clickOk = false;
    this.count = 0;
    this.actionId = 0;

    var i;
    for (i = 1; i < arguments.length; i++) {
        if (i == 1) { this.point = arguments[i]; }
        else if (i == 2) { this.size = arguments[i]; }
        else if (i == 3) { this.speed = arguments[i]; }
        else if (i == 4) { this.waitTime = arguments[i]; }
        else if (i == 5) { this.color = arguments[i]; }
        else if (i == 6) { this.outFrameColor = arguments[i]; }
        else if (i == 7) { this.bgColor = arguments[i]; }
        else if (i == 8) { this.frameColor = arguments[i]; }
        else if (i == 9) { this.cardColor = arguments[i]; }
        else if (i == 10) { this.cardBackColor = arguments[i]; }
    }

    if (this.node = document.getElementById(this.fieldId)) {
        this.dealerModel = new DealerModel();
        this.playerModel = new PlayerModel(this.point);
        this.cardView = new CardView(this.size, this.color, this.frameColor, this.cardColor, this.cardBackColor, this.bgColor);
        this.fieldView = new FieldView(this.fieldId, this.size, this.color, this.outFrameColor, this.bgColor, this.frameColor);
        this.mode = 'start';
        this.enter();
        this.debugView('set');
        this.clickOk = true;
    }
}

//	ブラックジャック制御：コマンドの実行と表示
BlackJack.prototype.enter = function () {
    var i, j, id, tmp;

    if (this.mode == 'start') {
        var card = -2;
        for (i = 0; i < 5; i++) {
            card++;
            this.dealerModel.card[i] = card;
        }
        for (j = 0; j < 2; j++) {
            for (i = 0; i < 5; i++) {
                card++;
                this.playerModel.card[j][i] = card;
            }
        }
        this.cardClearAndSet();
        this.fieldView.commandSet('start');
    } else if (this.mode == 'bet') {
        if (this.playerModel.point >= 10) {
            this.fieldView.messageView('Please bet.');
            this.dealerModel.init(), this.playerModel.init();
            this.cardClearAndSet();
            this.fieldView.commandSet('bet');
            if (this.playerModel.bet > this.playerModel.point) {
                tmp = this.playerModel.point;
                tmp -= tmp % 10;
                this.playerModel.bet = tmp;
            }
            this.playerModel.point -= this.playerModel.bet;
            this.fieldView.pointView(this.playerModel.bet, 1);
            this.fieldView.pointView(this.playerModel.point);
            this.debugView();
        } else {
            this.fieldView.pointView(this.playerModel.point);
            this.fieldView.messageView('you are lacking in points.');
            this.fieldView.commandSet('restart');
        }
    } else if (this.mode == 'dealEnd') {
        this.fieldView.frameSet(1);
        this.playerModel.bjCheck();
        this.dealerModel.bjCheck();
        if (this.playerModel.bj) {
            this.fieldView.messageView('BlackJack !');
        } else {
            this.fieldView.messageView('Hit or Stand? Or ...');
        }
        this.fieldView.commandSet();
        if (this.dealerModel.card[0] == 1 && !this.playerModel.insurance) {
            var insBet = this.playerModel.bet / 2;
            if (this.playerModel.point >= insBet) {
                if (this.playerModel.bj) {
                    this.fieldView.commandSet('evenMoney', 1);
                } else {
                    this.fieldView.commandSet('insurance', 1);
                }
            }
        }
        var card1 = this.playerModel.card[0][0];
        if (card1 > 10) { card1 = 10; }
        var card2 = this.playerModel.card[0][1];
        if (card2 > 10) { card2 = 10; }
        if (card1 == card2) {
            if (this.playerModel.point >= this.playerModel.bet) {
                this.fieldView.commandSet('split', 1);
            }
        }
        if (this.playerModel.point >= this.playerModel.bet) {
            if (!this.playerModel.bj) {
                this.fieldView.commandSet('doubleDown', 1);
            }
        }
        if (!this.playerModel.bj) {
            this.fieldView.commandSet('surrender', 1);
            this.fieldView.commandSet('hit', 1);
        }
        this.fieldView.commandSet('stand', 1);
        this.debugView();
    } else if (this.mode == 'hitOrStand') {
        var dd = false;
        if (this.playerModel.split) {
            var sp = 0;
            if (this.playerModel.split == 2) { sp = 1; }
            var len = this.playerModel.card[sp].length;
            if (len == 2 && this.playerModel.point >= this.playerModel.bet) {
                dd = true;
            }
        }
        if (dd) {
            this.fieldView.messageView('Hit or Stand? Or ...');
            this.fieldView.commandSet('doubleDown');
            this.fieldView.commandSet('hit', 1);
            this.fieldView.commandSet('stand', 1);
        } else {
            this.fieldView.messageView('Hit or Stand?');
            this.fieldView.commandSet('hit');
            this.fieldView.commandSet('stand', 1);
        }
        this.debugView();
    }
}

//	ブラックジャック制御：カードの初期セット
BlackJack.prototype.cardClearAndSet = function (target) {
    // target（0:ディーラ、1:プレイヤ、未定義：双方）
    var i, j, id;

    if (target == 0 || target == null) {
        // ディーラのカードをセット
        for (i = 1; i <= 5; i++) {
            id = this.fieldId + '_dField_c' + i;
            this.cardView.clear(id);
        }
        if (this.dealerModel.card.length == 0) {
            id = this.fieldId + '_dField_c1';
            this.cardView.set(id, 20);
        } else {
            for (i = 1; i <= this.dealerModel.card.length; i++) {
                id = this.fieldId + '_dField_c' + i;
                this.cardView.set(id, this.dealerModel.card[i - 1]);
            }
        }
    }
    if (target == 1 || target == null) {
        // プレイヤのカードをセット
        id = this.fieldId + '_pCardField';
        this.fieldView.clear(id);
        var length, num;
        if (this.playerModel.card[1].length > 0) {
            this.fieldView.cardFieldSet(id, 1);
            for (j = 1; j <= 2; j++) {
                length = this.playerModel.card[j - 1].length;
                for (i = 1; i <= length; i++) {
                    id = this.fieldId;
                    id += '_pField' + j + '_c' + i;
                    num = this.playerModel.card[j - 1][i - 1];
                    if (i == length) {
                        this.cardView.set(id, num);
                    } else {
                        this.cardView.set(id, num, 1);
                    }
                }
            }
        } else {
            this.fieldView.cardFieldSet(id);
            if (this.playerModel.card[0].length == 0) {
                id = this.fieldId + '_pField1_c1';
                this.cardView.set(id, 20);
            } else {
                for (i = 1; i <= this.playerModel.card[0].length; i++) {
                    id = this.fieldId + '_pField1_c' + i;
                    this.cardView.set(id, this.playerModel.card[0][i - 1]);
                }
            }
        }
    }
}

//	ブラックジャック制御：カード配布
BlackJack.prototype.cardAdd = function (target, option) {
    // target（0:ディーラ、1:プレイヤ）
    // option ディーラの場合（1:holecard）
    // option プレイヤの場合（未定義:通常、1:split(1)、2:split(2)）

    var num, id, tmp;
    if (target == 1 && !option) {
        num = this.playerModel.card[0].length;
        if (num == 5) { return false; }
        this.playerModel.card[0][num] = this.dealerModel.oneCards[0];
        this.dealerModel.oneCards = this.dealerModel.oneCards.slice(1);
        tmp = num + 1;
        id = this.fieldId + '_pField1_c' + tmp;
        this.cardView.clear(id);
        this.cardView.set(id, this.playerModel.card[0][num]);
    } else if (target == 1) {
        var sp = 0, sp2 = 1;
        if (option == 2) { sp = 1, sp2 = 2; }
        num = this.playerModel.card[sp].length;
        if (num == 5) { return false; }
        this.playerModel.card[sp][num] = this.dealerModel.oneCards[0];
        this.dealerModel.oneCards = this.dealerModel.oneCards.slice(1);
        id = this.fieldId + '_pField' + sp2 + '_c';
        tmp = num;
        if (num > 0) {
            this.cardView.clear(id + tmp);
            this.cardView.set(id + tmp, this.playerModel.card[sp][num - 1], 1);
        }
        tmp++;
        this.cardView.clear(id + tmp);
        this.cardView.set(id + tmp, this.playerModel.card[sp][num]);
    } else if (target == 0) {
        num = this.dealerModel.card.length;
        if (num == 5) { return false; }
        this.dealerModel.card[num] = this.dealerModel.oneCards[0];
        this.dealerModel.oneCards = this.dealerModel.oneCards.slice(1);
        tmp = num + 1;
        id = this.fieldId + '_dField_c' + tmp;
        if (option) {
            this.cardView.clear(id);
            this.cardView.set(id, 0);
        } else {
            this.cardView.clear(id);
            this.cardView.set(id, this.dealerModel.card[num]);
        }
    }
}

//	ブラックジャック制御：ホールカードを開く
BlackJack.prototype.holecard = function () {
    if (this.dealerModel.holecard) {
        var id = this.fieldId + '_dField_c2';
        this.cardView.clear(id);
        this.cardView.set(id, this.dealerModel.card[1]);
        this.dealerModel.holecard = false;
    }
}

//	ブラックジャック制御：勝敗判定
BlackJack.prototype.judgment = function (sp) {
    var result = 2;
    var spt = 0;
    if (sp) { spt = 2; }
    var pTotal = this.playerModel.cardTotal(spt);
    var dTotal = this.dealerModel.cardTotal();

    // バーストしたか？
    if (pTotal > 21) { result = 0; }
    else if (dTotal > 21) { result = 1; }
    // ブラックジャックか？
    else if (this.playerModel.bj && !this.dealerModel.bj) { result = 1; }
    else if (this.dealerModel.bj && !this.playerModel.bj) { result = 0; }
    // 合計値比較
    else if (pTotal > dTotal) { result = 1; }
    else if (dTotal > pTotal) { result = 0; }
    // 同点時の枚数比較
    else if (this.playerModel.card[sp].length > this.dealerModel.card.length) { result = 1; }
    else if (this.dealerModel.card.length > this.playerModel.card[sp].length) { result = 0; }

    // 得るpoint
    if (result == 1) {
        var pt = this.playerModel.bet;
        if (this.playerModel.bj) { pt *= 2.5; }
        else if (this.playerModel.doubleDown[sp]) { pt = pt * 4; }
        else { pt *= 2; }
        this.playerModel.getPoint += pt;
    } else if (result == 2) {
        this.playerModel.getPoint += this.playerModel.bet;
    }

    return result;
}

//	ブラックジャック制御：デバグ情報表示
BlackJack.prototype.debugView = function (mode) {
    if (!this.debug) { return false; }
    var id = this.fieldId + '_debug';
    var node;
    if (!(node = document.getElementById(id))) { return false; }
    if (mode == 'set') {
        node.appendChild(document.createTextNode('debug'));
    } else if (this.dealerModel.oneCards.length > 0) {
        var str = 'debug: ', num, cardNum;
        if (this.dealerModel.card.length == 2) {
            num = cardStr(this.dealerModel.card[1]);
            str += '(' + num + ') ';
        }
        var i;
        str += '(' + cardStr(this.dealerModel.oneCards[0]);
        for (i = 1; i < this.dealerModel.oneCards.length; i++) {
            str += ',' + cardStr(this.dealerModel.oneCards[i]);
        }
        str += ')';
        node.firstChild.nodeValue = str;
    }
}

//	フィールドビュークラス
function FieldView(fieldId, size, color, outFrameColor, bgColor, frameColor) {
    this.fieldId = fieldId;
    this.size = size + 2;
    this.lineHeight = this.size + Math.ceil(this.size / 2);
    this.color = color;
    this.outFrameColor = outFrameColor;
    this.bgColor = bgColor;
    this.frameColor = frameColor;
    this.widthHalf = this.size + 2;
    this.widthHalf = (this.widthHalf * 5) + this.widthHalf;
    this.width = this.widthHalf * 2;

    this.ie = false;
    var agt = navigator.appName;
    if (agt.match(/Internet Explorer/)) { this.ie = true; }

    this.init();
}

//	フィールドビュー：初期化
FieldView.prototype.init = function () {
    this.clear(this.fieldId);
    this.fieldSet();
    this.cardFieldSet(this.fieldId + '_dCardField', 0, 1);
}

//	フィールドビュー：フィールドのセット
FieldView.prototype.fieldSet = function () {
    id = this.fieldId;
    var node;
    if (!(node = document.getElementById(id))) { return false; }
    var nTable, nCaption, nTbody, nTr, nTd, nP, nDiv, nSpan;
    var nTable2, nTbody2, nTr2, nTd2, nTable3, nTbody3, nTr3, nTd3;
    nTable = document.createElement('table');
    nTable.style.background = this.bgColor;
    nTable.style.border = '1pt solid ' + this.outFrameColor;
    nTable.style.borderCollapse = 'collapse';
    nTbody = document.createElement('tbody');
    nTr = document.createElement('tr');
    // タイトル部分
    nTd = document.createElement('td');
    nTd.style.fontSize = this.size + 'pt';
    nTd.style.fontWeight = 'bold';
    nTd.style.fontFamily = 'sans-serif';
    nTd.style.color = this.color;
    nTd.style.textDecoration = 'underline';
    nTd.style.padding = '2pt';
    nTd.appendChild(document.createTextNode('BlackJack'));
    nTr.appendChild(nTd);
    // コマンド部分
    nTd = document.createElement('td');
    nTd.rowSpan = 4;
    nTd.vAlign = 'bottom';
    nTd.style.fontSize = this.size + 'pt';
    nTd.style.color = this.color;
    nTd.style.width = this.widthHalf + 'pt';
    nP = document.createElement('p');
    nP.id = id + '_command';
    nP.style.marginBottom = '0pt';
    nP.align = 'center';
    nTd.appendChild(nP);
    nDiv = document.createElement('div');
    nDiv.style.border = '1pt solid ' + this.frameColor;
    nDiv.style.margin = '2pt';
    nDiv.style.marginTop = Math.floor(this.size / 2.2) + 'pt';
    nDiv.style.textAlign = 'right';
    nSpan = document.createElement('span');
    nSpan.id = this.fieldId + '_point';
    nSpan.appendChild(document.createTextNode('0'));
    nDiv.appendChild(nSpan);
    nSpan = document.createElement('span');
    nSpan.style.fontWeight = 'bold';
    nSpan.appendChild(document.createTextNode(' pt.'));
    nDiv.appendChild(nSpan);
    nTd.appendChild(nDiv);
    nTr.appendChild(nTd);
    nTbody.appendChild(nTr);
    // ディーラ側フィールド
    nTr = document.createElement('tr');
    nTd = document.createElement('td');
    nTd.id = id + '_dCardField';
    nTr.appendChild(nTd);
    nTbody.appendChild(nTr);
    // メッセージフィールド
    nTr = document.createElement('tr');
    nTd = document.createElement('td');
    nDiv = document.createElement('div');
    nDiv.id = id + '_mField';
    nDiv.style.margin = '0pt 5pt';
    nDiv.style.border = '1pt solid ' + this.frameColor;
    nDiv.style.fontSize = this.size + 'pt';
    nDiv.style.lineHeight = this.lineHeight + 'pt';
    nDiv.style.fontWeight = 'bold';
    nDiv.style.color = this.color;
    nDiv.style.textAlign = 'center';
    nDiv.appendChild(document.createTextNode('Click Start.'));
    nTd.appendChild(nDiv);
    nTr.appendChild(nTd);
    nTbody.appendChild(nTr);
    // プレイヤ側フィールド
    nTr = document.createElement('tr');
    nTd = document.createElement('td');
    nTd.id = id + '_pCardField';
    nTr.appendChild(nTd);
    nTbody.appendChild(nTr);
    // デバグ情報フィールド
    nTr = document.createElement('tr');
    nTd = document.createElement('td');
    nTd.colSpan = 2;
    nTd.style.fontSize = this.size + 'pt';
    nTd.style.color = this.color;
    nTd.id = id + '_debug';
    nTr.appendChild(nTd);
    nTbody.appendChild(nTr);

    nTable.appendChild(nTbody);
    node.appendChild(nTable);
}

//	フィールドビュー：カードフィールドのセット
FieldView.prototype.cardFieldSet = function (id, split, dealer) {
    var i, j;
    var node;
    if (!(node = document.getElementById(id))) { return false; }
    var nTable, nCaption, nTbody, nTr, nTd;
    var nTable2, nTbody2, nTr2, nTd2, nTable3, nTbody3, nTr3, nTd3;
    if (split) {
        nTable = document.createElement('table');
        nTable.style.border = 'none';
        nTable.style.borderCollapse = 'collapse';
        nCaption = document.createElement('caption');
        nCaption.align = 'bottom';
        nCaption.style.marginBottom = '2pt';
        nCaption.style.fontSize = this.size + 'pt';
        nCaption.style.color = this.color;
        nCaption.appendChild(document.createTextNode('Player'));
        nTable.appendChild(nCaption);
        nTbody = document.createElement('tbody');
        nTr = document.createElement('tr');
        for (j = 1; j <= 2; j++) {
            nTd = document.createElement('td');
            nTd.style.padding = '0pt';
            nTable2 = document.createElement('table');
            nTable2.id = this.fieldId + '_pField' + j;
            nTable2.style.border = '1pt dotted ' + this.bgColor;
            nTable2.style.borderCollapse = 'collapse';
            nTable2.style.width = this.widthHalf + 'pt';
            nTbody2 = document.createElement('tbody');
            nTr2 = document.createElement('tr');
            nTd2 = document.createElement('td');
            nTd2.style.padding = '0pt';
            nTable3 = document.createElement('table');
            nTable3.style.margin = '1pt';
            nTable3.style.border = 'none';
            nTable3.style.borderCollapse = 'collapse';
            nTbody3 = document.createElement('tbody');
            nTr3 = document.createElement('tr');
            nTd3 = document.createElement('td');
            for (i = 1; i <= 5; i++) {
                nTd3 = document.createElement('td');
                nTd3.id = this.fieldId + '_pField' + j + '_c' + i;
                nTd3.style.padding = '1pt 0pt';
                nTr3.appendChild(nTd3);
            }
            nTbody3.appendChild(nTr3);
            nTable3.appendChild(nTbody3);
            nTd2.appendChild(nTable3);
            nTr2.appendChild(nTd2);
            nTbody2.appendChild(nTr2);
            nTable2.appendChild(nTbody2);
            nTd.appendChild(nTable2);
            nTr.appendChild(nTd);
        }
        nTbody.appendChild(nTr);
        nTable.appendChild(nTbody);
        node.appendChild(nTable);
    } else {
        nTable = document.createElement('table');
        if (dealer) { nTable.id = this.fieldId + '_dField'; }
        else { nTable.id = this.fieldId + '_pField1'; }
        nTable.style.border = '1pt dotted ' + this.bgColor;
        nTable.style.borderCollapse = 'collapse';
        nTable.style.width = this.width + 'pt';
        nCaption = document.createElement('caption');
        nCaption.style.color = this.color;
        if (dealer) {
            nCaption.appendChild(document.createTextNode('Dealer'));
        } else {
            nCaption.align = 'bottom';
            nCaption.style.marginBottom = '2pt';
            nCaption.appendChild(document.createTextNode('Player'));
        }
        nCaption.style.fontSize = this.size + 'pt';
        nTable.appendChild(nCaption);
        nTbody = document.createElement('tbody');
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt 0pt';
        nTable2 = document.createElement('table');
        nTable2.style.margin = '1pt';
        nTable2.style.marginLeft = this.size + 'pt';
        nTable2.style.border = 'none';
        nTable2.style.borderCollapse = 'collapse';
        nTbody2 = document.createElement('tbody');
        nTr2 = document.createElement('tr');
        for (i = 1; i <= 5; i++) {
            nTd2 = document.createElement('td');
            if (dealer) {
                nTd2.id = this.fieldId + '_dField_c' + i;
            } else { nTd2.id = this.fieldId + '_pField1_c' + i; }
            nTd2.style.padding = '0pt 2pt';
            nTr2.appendChild(nTd2);
        }
        nTbody2.appendChild(nTr2);
        nTable2.appendChild(nTbody2);
        nTd.appendChild(nTable2);
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTable.appendChild(nTbody);
        node.appendChild(nTable);
    }

}

//	フィールドビュー：点数の表示
FieldView.prototype.pointView = function (pt, bet) {
    var id;
    if (bet) { id = this.fieldId + '_betPoint'; }
    else { id = this.fieldId + '_point'; }
    var node, num;
    if (!(node = document.getElementById(id))) { return false; }
    if (pt >= 0) {
        num = pt;
        if (num > 999999999) { num = 999999999; }
    } else { num = 0; }
    node.firstChild.nodeValue = num + '';
}

//	フィールドビュー：メッセージの表示
FieldView.prototype.messageView = function (str) {
    var id = this.fieldId + '_mField';
    var node;
    if (!(node = document.getElementById(id))) { return false; }
    node.firstChild.nodeValue = str + '';
}

//	フィールドビュー：コマンドボタンのセット
FieldView.prototype.commandSet = function (command, option) {
    // command（未定義:クリア）
    // option（1:クリアしない）

    var id = this.fieldId + '_command';
    var node;
    if (!(node = document.getElementById(id))) { return false; }
    if (!option) { this.clear(id); }
    var i, j, elm;
    if (command == 'start') {
        // スタートボタン
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_start';
        elm.appendChild(document.createTextNode('Start'));
        node.appendChild(elm);
    } else if (command == 'bet') {
        // bet表示
        var nTable, nTbody, nTr, nTd;
        nTable = document.createElement('table');
        nTable.style.border = 'none';
        nTable.style.borderCollapse = 'collapse';
        nTable.style.width = '90%';
        nTbody = document.createElement('tbody');
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.fontWeight = 'bold';
        nTd.style.color = this.color;
        nTd.appendChild(document.createTextNode('bet:'));
        nTr.appendChild(nTd);
        nTd = document.createElement('td');
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.color = this.color;
        nTd.style.textAlign = 'right';
        elm = document.createElement('span');
        elm.id = this.fieldId + '_betPoint';
        elm.appendChild(document.createTextNode('10'));
        nTd.appendChild(elm);
        elm = document.createElement('span');
        elm.style.fontWeight = 'bold';
        elm.appendChild(document.createTextNode(' pt.'));
        nTd.appendChild(elm);
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTable.appendChild(nTbody);
        node.appendChild(nTable);
        // betボタン
        nTable = document.createElement('table');
        nTable.cellSpacing = 2;
        nTable.style.border = 'none';
        nTbody = document.createElement('tbody');
        var str, sign, num, id = this.fieldId + '_bet-', id2;
        for (j = 0; j < 2; j++) {
            if (j == 0) { sign = '+', id2 = id + 'p-'; }
            else { sign = '-', id2 = id + 'm-'; }
            num = 10000;
            nTr = document.createElement('tr');
            for (i = 0; i < 3; i++) {
                nTd = document.createElement('td');
                nTd.style.padding = '0pt';
                elm = this.createComElement('div2');
                num /= 10;
                elm.id = id2 + num;
                str = sign + num + '';
                elm.appendChild(document.createTextNode(str));
                nTd.appendChild(elm);
                nTr.appendChild(nTd);
            }
            nTbody.appendChild(nTr);
        }
        nTable.appendChild(nTbody);
        node.appendChild(nTable);
        // Dealボタン
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_deal';
        elm.title = '賭けを終了（決定）し、カードを配ります。';
        elm.appendChild(document.createTextNode('Deal'));
        node.appendChild(elm);
    } else if (command == 'hit') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_hit';
        elm.title = 'カードを一枚引きます。';
        elm.appendChild(document.createTextNode('Hit'));
        node.appendChild(elm);
    } else if (command == 'stand') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_stand';
        elm.title = 'カードを引くのをやめ、現在の手で勝負します。';
        elm.appendChild(document.createTextNode('Stand'));
        node.appendChild(elm);
    } else if (command == 'doubleDown') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_doubleDown';
        elm.title = 'あと一枚だけしかカードを引かない代わりに、betに同額を上乗せします。';
        elm.appendChild(document.createTextNode('DoubleDown'));
        node.appendChild(elm);
    } else if (command == 'surrender') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_surrender';
        elm.title = '負けを宣言し、betの半額を取り戻します。';
        elm.appendChild(document.createTextNode('Surrender'));
        node.appendChild(elm);
    } else if (command == 'split') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_split';
        elm.title = '手札を分割し、別々の手を作って勝負します。betと同額が必要です。';
        elm.appendChild(document.createTextNode('Split'));
        node.appendChild(elm);
    } else if (command == 'evenMoney') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_evenMoney';
        elm.title = 'BJの配当を諦め、通常の配当を受け取ります。';
        elm.appendChild(document.createTextNode('EvenMoney'));
        node.appendChild(elm);
    } else if (command == 'insurance') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_insurance';
        elm.title = '「Dealerの手がBJである」ことに、betの半額を賭けます。';
        elm.appendChild(document.createTextNode('Insurance'));
        node.appendChild(elm);
    } else if (command == 'restart') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_restart';
        elm.appendChild(document.createTextNode('Restart'));
        node.appendChild(elm);
    } else if (command == 'next') {
        elm = this.createComElement('div');
        elm.id = this.fieldId + '_start';
        elm.appendChild(document.createTextNode('NextGame'));
        node.appendChild(elm);
    } else if (command == 'none') {
        elm = this.createComElement('divNone');
        elm.appendChild(document.createElement('br'));
        node.appendChild(elm);
    }
}

//	フィールドビュー：コマンド用要素の生成
FieldView.prototype.createComElement = function (element) {
    var elm;
    if (element == 'div') {
        var halfSize = Math.floor(this.size / 4);
        elm = document.createElement('div');
        elm.onclick = bjClick;
        elm.style.marginTop = halfSize + 'pt';
        elm.style.border = '2pt double ' + this.frameColor;
        if (this.ie) { elm.style.cursor = 'hand'; }
        else { elm.style.cursor = 'pointer'; }
        elm.style.fontSize = this.size + 'pt';
        elm.style.color = this.color;
        elm.style.textAlign = 'center';
        elm.style.width = '80%';
    } else if (element == 'div2') {
        var miniFont = Math.ceil(this.size / 1.5);
        elm = document.createElement('div');
        elm.onclick = bjClick;
        elm.style.margin = '0pt';
        elm.style.border = '2pt double ' + this.frameColor;
        elm.style.padding = '1pt';
        if (this.ie) { elm.style.cursor = 'hand'; }
        else { elm.style.cursor = 'pointer'; }
        elm.style.fontSize = miniFont + 'pt';
        elm.style.color = this.color;
        elm.style.textAlign = 'center';
    } else if (element == 'divNone') {
        elm = document.createElement('div');
        elm.style.margin = '0pt';
        elm.style.border = '2pt double ' + this.bgColor;
        elm.style.padding = '1pt';
        elm.style.fontSize = this.size + 'pt';
    }
    return elm;
}

//	フィールドビュー：枠線色のセット
FieldView.prototype.frameSet = function (target) {
    // target（0:ディーラ、1:プレイヤ1、2:プレイヤ2、その他:全クリア）
    var node, id;

    id = this.fieldId + '_dField';
    if (node = document.getElementById(id)) {
        if (target == 0) { node.style.borderColor = this.frameColor; }
        else { node.style.borderColor = this.bgColor; }
    }
    id = this.fieldId + '_pField1';
    if (node = document.getElementById(id)) {
        if (target == 1) { node.style.borderColor = this.frameColor; }
        else { node.style.borderColor = this.bgColor; }
    }
    id = this.fieldId + '_pField2';
    if (node = document.getElementById(id)) {
        if (target == 2) { node.style.borderColor = this.frameColor; }
        else { node.style.borderColor = this.bgColor; }
    }
}

//	フィールドビュー：フィールドのクリア
FieldView.prototype.clear = function (id) {
    var node;
    if (node = document.getElementById(id)) {
        while (true) {
            if (node.childNodes[0] != null) {
                node.removeChild(node.childNodes[0]);
            } else { break; }
        }
    }
}

//	カードビュークラス
function CardView(size, color, frameColor, cardColor, cardBackColor, bgColor) {
    this.size = size;
    this.sizeMax = size + 2;
    this.sizeMin = size - 4;
    this.color = color;
    this.frameColor = frameColor;
    this.cardColor = cardColor;
    this.cardBackColor = cardBackColor;
    this.bgColor = bgColor;
    this.width = this.sizeMax * 2;
    this.height = this.sizeMax * 3;
}

//	カードビュー：カードの表示
CardView.prototype.set = function (id, num, half) {
    var node, tmp;
    if (!(node = document.getElementById(id))) { return false; }
    var nTable, nTbody, nTr, nTd, nText, nTable2, nTbody2, nTr2, nTd2;
    nTable = document.createElement('table');
    nTable.style.tableLayout = 'fixed';
    nTable.style.background = this.cardColor;
    nTable.style.border = '1pt solid ' + this.frameColor;
    nTable.style.borderCollapse = 'collapse';
    nTable.style.width = this.width + 'pt';
    nTable.style.height = this.height + 'pt';
    if (half) {
        nTable.style.borderRight = 'none';
        nTable.style.width = this.sizeMax + 'pt';
    }
    nTbody = document.createElement('tbody');
    if (num >= 1 && num <= 13) {		// カードの表
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        if (num == 10) { nTd.style.paddingLeft = '0pt'; }
        else { nTd.style.paddingLeft = '2pt'; }
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.fontFamily = 'sans-serif';
        nTd.style.color = this.color;
        nTd.style.lineHeight = this.sizeMax + 'pt';
        nText = document.createTextNode(cardStr(num));
        nTd.appendChild(nText);
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTd.style.lineHeight = this.sizeMin + 'pt';
        nTd.appendChild(document.createElement('br'));
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.fontFamily = 'sans-serif';
        nTd.style.color = this.color;
        nTd.style.lineHeight = this.size + 'pt';
        if (half) {
            nTd.appendChild(document.createElement('br'));
        } else {
            nTd.style.textAlign = 'right';
            nText = document.createTextNode(cardStr(num));
            nTd.appendChild(nText);
        }
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
    } else if (num <= 0) {			// カードの裏
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTable2 = document.createElement('table');
        nTable2.style.background = this.cardBackColor;
        nTable2.style.border = 'none';
        nTable2.style.borderCollapse = 'collapse';
        nTable2.style.width = '100%';
        nTable2.style.height = '100%';
        nTbody2 = document.createElement('tbody');
        nTr2 = document.createElement('tr');
        nTd2 = document.createElement('td');
        nTd2.style.padding = '0pt';
        var lineHeight = this.size * 3 + 1;
        nTd2.style.lineHeight = lineHeight + 'pt';
        nTd2.appendChild(document.createElement('br'));
        nTr2.appendChild(nTd2);
        nTbody2.appendChild(nTr2);
        nTable2.appendChild(nTbody2);
        nTd.appendChild(nTable2);
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
    } else {
        nTable.style.background = this.bgColor;
        nTable.style.borderColor = this.bgColor;
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.fontFamily = 'sans-serif';
        nTd.style.lineHeight = this.sizeMax + 'pt';
        nTd.appendChild(document.createElement('br'));
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTd.style.lineHeight = this.sizeMin + 'pt';
        nTd.appendChild(document.createElement('br'));
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
        nTr = document.createElement('tr');
        nTd = document.createElement('td');
        nTd.style.padding = '1pt';
        nTd.style.fontSize = this.size + 'pt';
        nTd.style.fontFamily = 'sans-serif';
        nTd.style.lineHeight = this.size + 'pt';
        nTd.appendChild(document.createElement('br'));
        nTr.appendChild(nTd);
        nTbody.appendChild(nTr);
    }
    nTable.appendChild(nTbody);
    node.appendChild(nTable);
}

//	カードビュー：カードのクリア
CardView.prototype.clear = function (id) {
    var node;
    if (node = document.getElementById(id)) {
        while (true) {
            if (node.childNodes[0] != null) {
                node.removeChild(node.childNodes[0]);
            } else { break; }
        }
    }
}

//	ディーラモデルクラス
function DealerModel() {
    this.init();
}

//	ディーラモデル：初期化
DealerModel.prototype.init = function () {
    this.card = new Array();
    this.holecard = true;
    this.bj = false;
    this.oneCards = new Array();
    var i, card, cardLimit = new Array();
    for (i = 0; i < 13; i++) { cardLimit[i] = 0; }
    for (i = 0; i < 20; i++) {
        while (true) {
            card = dice(1, 13);
            if (cardLimit[card - 1] < 4) {
                cardLimit[card - 1]++;
                this.oneCards[i] = card;
                break;
            }
        }
    }
}

//	ディーラモデル：BJチェック
DealerModel.prototype.bjCheck = function () {
    this.bj = false;
    if (this.card.length != 2) { return false; }
    if (this.card[0] == 1) {
        if (this.card[1] >= 10 && this.card[1] <= 13) {
            this.bj = true;
        }
    } else if (this.card[0] >= 10 && this.card[0] <= 13) {
        if (this.card[1] == 1) {
            this.bj = true;
        }
    }
}

//	ディーラモデル：合計値
DealerModel.prototype.cardTotal = function () {
    var i, num = 0, ace = 0;
    for (i = 0; i < this.card.length; i++) {
        if (this.card[i] == 1) { ace = 1; }
        if (this.card[i] >= 10) { num += 10; }
        else if (this.card[i] < 0) { num += 0; }
        else { num += this.card[i]; }
    }
    if (ace && num <= 11) { num += 10; }
    if (this.card.length == 5 && num <= 21) { num = 21; }
    return num;
}

//	プレイヤモデルクラス
function PlayerModel(point) {
    this.firstPoint = point;
    this.pointLevel = new Array();
    this.pointOver = 0;
    this.doubleDown = new Array();
    var i, min, tmp = 10;
    min = point;
    while (true) {
        tmp *= 10;
        if (min <= tmp) {
            min = tmp;
            break;
        }
    }
    i = -1;
    while (true) {
        i++;
        min *= 10;
        this.pointLevel[i] = min;
        if (min >= 100000000) {
            break;
        }
    }
    this.fullInit();
}

//	プレイヤモデル：完全初期化
PlayerModel.prototype.fullInit = function () {
    this.point = this.firstPoint;
    this.bet = 10;
    this.init();
}

//	プレイヤモデル：初期化
PlayerModel.prototype.init = function () {
    this.card = new Array();
    this.card[0] = new Array();
    this.card[1] = new Array();
    this.bj = false;
    this.insurance = false;
    this.doubleDown[0] = false;
    this.doubleDown[1] = false;
    this.split = 0;
    this.getPoint = 0;
}

//	プレイヤモデル：BJチェック
PlayerModel.prototype.bjCheck = function () {
    this.bj = false;
    if (this.card[0].length != 2) { return false; }
    if (this.card[0][0] == 1) {
        if (this.card[0][1] >= 10 && this.card[0][1] <= 13) {
            this.bj = true;
        }
    } else if (this.card[0][0] >= 10 && this.card[0][0] <= 13) {
        if (this.card[0][1] == 1) {
            this.bj = true;
        }
    }
}

//	プレイヤモデル：合計値
PlayerModel.prototype.cardTotal = function (split) {
    var i, num = 0, ace = 0;
    if (split == 2) { split = 1; }
    else { split = 0; }
    for (i = 0; i < this.card[split].length; i++) {
        if (this.card[split][i] == 1) { ace = 1; }
        if (this.card[split][i] >= 10) { num += 10; }
        else if (this.card[split][i] < 0) { num += 0; }
        else { num += this.card[split][i]; }
    }
    if (ace && num <= 11) { num += 10; }
    if (this.card[split].length == 5 && num <= 21) { num = 21; }
    return num;
}

//	クリック
function bjClick(id) {
    id = id + '';
    if (!id.match('_')) { id = this.id; }
    var tmp = id.split('_');
    var fieldId = tmp[0];
    var command = tmp[1];
    var func, str;

    var bj = blackJack[fieldId];

    if (!bj.clickOk) { return false; }
    else { bj.clickOk = false; }

    if (command == 'start') {
        bj.mode = 'bet', bj.enter();
        bj.clickOk = true;
    } else if (command.match('bet-')) {
        tmp = command.replace('bet-', '')
        tmp = tmp.split('-');
        var sign = tmp[0], num = tmp[1] - 0;
        if (sign == 'p') {
            if (num > bj.playerModel.point) {
                num = bj.playerModel.point;
                num -= num % 10;
            }
            if (bj.playerModel.bet + num > 9990) {
                num = 9990 - bj.playerModel.bet;
            }
            bj.playerModel.bet += num;
            bj.playerModel.point -= num;
        } else if (sign == 'm') {
            if (bj.playerModel.bet - num < 10) {
                num = bj.playerModel.bet - 10;
            }
            bj.playerModel.bet -= num;
            bj.playerModel.point += num;
        }
        bj.fieldView.pointView(bj.playerModel.bet, 1);
        bj.fieldView.pointView(bj.playerModel.point);
        bj.clickOk = true;
    } else if (command == 'deal') {
        bj.fieldView.messageView('Dealer is dealing ...');
        bj.fieldView.commandSet();
        bj.count = 0;
        func = "bjAction('" + fieldId + "', 'firstDeal')";
        bj.actionId = setTimeout(func, bj.speed);
    } else if (command == 'restart') {
        bj.playerModel.fullInit();
        bj.mode = 'bet', bj.enter();
        bj.clickOk = true;
    } else if (command == 'hit') {
        bj.cardAdd(1, bj.playerModel.split);
        var sp = 0;
        if (bj.playerModel.split == 2) { sp = 1; }
        if (bj.playerModel.cardTotal(bj.playerModel.split) > 21) {
            bj.fieldView.messageView('Busted !');
            bj.fieldView.commandSet();
            bj.debugView();
            if (bj.playerModel.split == 1) {
                func = "bjAction('" + fieldId + "', 'splitNext')";
                bj.actionId = setTimeout(func, bj.waitTime);
            } else if (bj.playerModel.split == 2) {
                bj.clickOk = true;
                func = "bjClick('" + fieldId + "_stand')";
                bj.actionId = setTimeout(func, bj.waitTime);
            } else {
                func = "bjAction('" + fieldId + "', 'judgment')";
                bj.actionId = setTimeout(func, bj.waitTime);
            }
        } else if (bj.playerModel.card[sp].length == 5) {
            if (bj.playerModel.split == 1) {
                bj.playerModel.split++;
                bj.fieldView.messageView('Split.');
                bj.fieldView.frameSet(2);
                bj.mode = 'hitOrStand', bj.enter();
                bj.clickOk = true;
            } else {
                bj.clickOk = true;
                bjClick(fieldId + '_stand');
            }
        } else {
            bj.mode = 'hitOrStand', bj.enter();
            bj.clickOk = true;
        }
    } else if (command == 'stand') {
        if (bj.playerModel.split == 2) {
            var ct1 = bj.playerModel.cardTotal(0);
            var ct2 = bj.playerModel.cardTotal(2);
            if (ct1 > 21 && ct2 > 21) {
                bjAction(fieldId, 'judgment');
                return;
            }
        }
        if (bj.playerModel.split == 1) {
            bjAction(fieldId, 'splitNext');
        } else {
            bj.fieldView.frameSet(0);
            tmp = bj.dealerModel.cardTotal();
            if (tmp < 17) {
                bj.fieldView.messageView('Dealer is hitting ...');
            } else {
                if (bj.dealerModel.bj) {
                    str = 'BlackJack !';
                } else {
                    str = "Dealer's hand is '" + tmp + "'.";
                }
                bj.fieldView.messageView(str);
            }
            bj.fieldView.commandSet();
            bj.holecard();
            if (tmp < 17) {
                func = "bjAction('" + fieldId + "', 'dealerHit')";
                bj.actionId = setTimeout(func, bj.speed);
            } else {
                func = "bjAction('" + fieldId + "', 'judgment')";
                bj.actionId = setTimeout(func, bj.waitTime);
            }
            bj.debugView();
        }
    } else if (command == 'surrender') {
        bj.fieldView.frameSet();
        bj.playerModel.getPoint = bj.playerModel.bet / 2;
        bjAction(fieldId, 'getPoint');
    } else if (command == 'doubleDown') {
        var sp = 0;
        if (bj.playerModel.split == 2) { sp = 1; }
        bj.playerModel.doubleDown[sp] = true;
        bj.playerModel.point -= bj.playerModel.bet;
        bj.fieldView.pointView(bj.playerModel.point);
        bj.cardAdd(1, bj.playerModel.split);
        if (bj.playerModel.cardTotal(bj.playerModel.split) > 21) {
            bj.fieldView.messageView('Busted !');
        } else {
            bj.fieldView.messageView('DoubleDown !');
        }
        bj.fieldView.commandSet();
        bj.debugView();
        bj.clickOk = true;
        func = "bjClick('" + fieldId + "_stand')";
        bj.actionId = setTimeout(func, bj.waitTime);
    } else if (command == 'split') {
        bj.fieldView.messageView('Split.');
        bj.fieldView.commandSet();
        var card1 = bj.playerModel.card[0][0];
        var card2 = bj.playerModel.card[0][1];
        bj.playerModel.init();
        bj.playerModel.card[0][0] = card1;
        bj.playerModel.card[1][0] = card2;
        bj.playerModel.split = 1;
        bj.playerModel.point -= bj.playerModel.bet;
        bj.fieldView.pointView(bj.playerModel.point);
        bj.cardClearAndSet(1);
        bj.count = 0;
        func = "bjAction('" + fieldId + "', 'splitDeal')";
        bj.actionId = setTimeout(func, bj.speed);
    } else if (command == 'insurance') {
        bj.playerModel.point -= bj.playerModel.bet / 2;
        bj.fieldView.pointView(bj.playerModel.point);
        if (bj.dealerModel.bj) {
            bj.fieldView.frameSet(0);
            bj.holecard();
            bj.fieldView.messageView("Dealer's hand is 'BJ'.");
            bj.fieldView.commandSet();
            func = "bjAction('" + fieldId + "', 'getInsBet')";
            bj.actionId = setTimeout(func, bj.waitTime);
        } else {
            bj.fieldView.frameSet(0);
            bj.fieldView.messageView("Dealer's hand is not 'BJ'.");
            bj.fieldView.commandSet();
            bj.playerModel.insurance = true;
            bj.count = 4;
            func = "bjAction('" + fieldId + "', 'firstDeal')";
            bj.actionId = setTimeout(func, bj.waitTime);
        }
    } else if (command == 'evenMoney') {
        bj.fieldView.frameSet();
        bj.playerModel.getPoint = bj.playerModel.bet * 2;
        bjAction(fieldId, 'getPoint');
    }
}

//	タイマ用関数
function bjAction(fieldId, mode) {
    var bj = blackJack[fieldId];
    var func, id, tmp, str;
    if (mode == 'firstDeal') {
        func = "bjAction('" + fieldId + "', 'firstDeal')";
        if (bj.count <= 1) {
            bj.cardAdd(1), bj.count++;
            bj.actionId = setTimeout(func, bj.speed);
        } else if (bj.count == 2) {
            bj.cardAdd(0), bj.count++;
            bj.actionId = setTimeout(func, bj.speed);
        } else if (bj.count == 3) {
            bj.cardAdd(0, 1), bj.count++;
            bj.actionId = setTimeout(func, bj.speed);
        } else if (bj.count == 4) {
            bj.mode = 'dealEnd', bj.enter();
            bj.clickOk = true;
        }
    } else if (mode == 'getPoint') {
        bj.holecard();
        bj.playerModel.point += bj.playerModel.getPoint;
        bj.fieldView.pointView(bj.playerModel.point);
        str = 'You got ' + bj.playerModel.getPoint + ' points.';
        bj.fieldView.messageView(str);
        var check = true;
        if (bj.playerModel.pointOver >= 0) {
            tmp = bj.playerModel.pointLevel[bj.playerModel.pointOver];
            if (bj.playerModel.point >= tmp) {
                check = false;
                bj.count = 0;
                func = "bjAction('" + fieldId + "', 'pointOver')";
                bj.actionId = setTimeout(func, bj.waitTime);
            }
        }
        if (check) {
            bj.fieldView.commandSet('next');
            bj.clickOk = true;
        }
    } else if (mode == 'judgment') {
        bj.fieldView.frameSet();
        bj.holecard();
        var result = bj.judgment(0);
        if (bj.playerModel.split) {
            var result2 = bj.judgment(1);
            if (result == 0) { str = 'Lose and '; }
            else if (result == 1) { str = 'Win and '; }
            else if (result == 2) { str = 'Draw and '; }
            if (result2 == 0) { str += 'Lose.'; }
            else if (result2 == 1) { str += 'Win.'; }
            else if (result2 == 2) { str += 'Draw.'; }
        } else {
            if (result == 0) { str = 'You lost at this game.'; }
            else if (result == 1) { str = 'You won at this game.'; }
            else if (result == 2) { str = 'This game was a draw.'; }
        }
        bj.fieldView.messageView(str);
        if (bj.playerModel.getPoint > 0) {
            func = "bjAction('" + fieldId + "', 'getPoint')";
            bj.actionId = setTimeout(func, bj.waitTime);
        } else {
            bj.fieldView.commandSet('next');
            bj.clickOk = true;
        }
    } else if (mode == 'dealerHit') {
        bj.cardAdd(0);
        tmp = bj.dealerModel.cardTotal();
        if (tmp > 21) {
            bj.fieldView.messageView('Busted !');
            func = "bjAction('" + fieldId + "', 'judgment')";
            bj.actionId = setTimeout(func, bj.waitTime);
        } else if (tmp < 17) {
            func = "bjAction('" + fieldId + "', 'dealerHit')";
            bj.actionId = setTimeout(func, bj.speed);
        } else {
            str = "Dealer's hand is '" + tmp + "'.";
            bj.fieldView.messageView(str);
            func = "bjAction('" + fieldId + "', 'judgment')";
            bj.actionId = setTimeout(func, bj.waitTime);
        }
        bj.debugView();
    } else if (mode == 'splitDeal') {
        func = "bjAction('" + fieldId + "', 'splitDeal')";
        if (bj.count == 0) {
            bj.cardAdd(1, 1), bj.count++;
            bj.actionId = setTimeout(func, bj.speed);
        } else if (bj.count == 1) {
            bj.cardAdd(1, 2), bj.count++;
            bj.actionId = setTimeout(func, bj.speed);
        } else if (bj.count == 2) {
            bj.fieldView.frameSet(1);
            bj.mode = 'hitOrStand', bj.enter();
            bj.clickOk = true;
        }
    } else if (mode == 'splitNext') {
        bj.playerModel.split++;
        bj.fieldView.messageView('Split.');
        bj.fieldView.frameSet(2);
        bj.mode = 'hitOrStand', bj.enter();
        bj.clickOk = true;
    } else if (mode == 'getInsBet') {
        tmp = bj.playerModel.bet * 1.5;
        bj.playerModel.point += tmp;
        bj.fieldView.pointView(bj.playerModel.point);
        str = 'You got ' + tmp + ' points.';
        bj.fieldView.messageView(str);
        bj.fieldView.commandSet('none');
        func = "bjAction('" + fieldId + "', 'judgment')";
        bj.actionId = setTimeout(func, bj.waitTime);
    } else if (mode == 'pointOver') {
        if (bj.count == 0) {
            bj.fieldView.messageView('Congratulations !');
            bj.fieldView.commandSet('none');
            bj.count++;
            func = "bjAction('" + fieldId + "', 'pointOver')";
            bj.actionId = setTimeout(func, bj.waitTime);
        } else if (bj.count == 1) {
            tmp = bj.playerModel.pointLevel[bj.playerModel.pointOver];
            str = 'Over ' + tmp + ' points !';
            bj.fieldView.messageView(str);
            bj.playerModel.pointOver++;
            tmp = bj.playerModel.pointLevel.length;
            if (bj.playerModel.pointOver >= tmp) {
                bj.playerModel.pointOver = -1;
            }
            bj.fieldView.commandSet('next');
            bj.clickOk = true;
        }
    }
}

//	カードの文字列を返す
function cardStr(num) {
    var cardNum;
    if (num == 1) { cardNum = 'A'; }
    else if (num == 11) { cardNum = 'J'; }
    else if (num == 12) { cardNum = 'Q'; }
    else if (num == 13) { cardNum = 'K'; }
    else { cardNum = num + ''; }
    return cardNum;
}

//	ダイスロール
function dice(num, dice) {
    num = naturalNumCheck(num);
    dice = naturalNumCheck(dice, 6);
    var i, result = 0;
    for (i = 0; i < num; i++) {
        result += Math.ceil(Math.random() * dice);
    }
    return result;
}

//	自然数チェック
function naturalNumCheck(checkNum, returnNum) {
    checkNum -= 0, returnNum -= 0;
    if (returnNum < 1 || returnNum == null || isNaN(returnNum)) {
        returnNum = 1;
    }
    if (checkNum < 1 || checkNum == null || isNaN(checkNum)) {
        return returnNum;
    } else { return checkNum; }
}