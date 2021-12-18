// let playerdate = {
//     name: "自分",
//     temochi: 10,
//     max : 20

// }







let playername = "自分"
let temochi = 10
let max = "/20"

// let enemydate = {
//     name: "敵",
//     temochi_aite: 10,
//     max : 20
// }

let enemyname = "敵"
let temochi_aite = 20 - temochi


function insertText(id, text) {
    document.getElementById(id)
        .textContent = text
}

insertText("playerName", playername)
insertText("currentPlayerHp", temochi)
insertText("maxPlayerHp", max)
insertText("enemyName", enemyname)
insertText("currentEnemyHp", temochi_aite)
insertText("maxEnemyHp", max)

let endGame = false;

        // const number = getElementById(ohazikinumber)
        // console.log(number)



//偶数   選択されたら,相手の手の中が決まる
document.getElementById("button_guu")
    .addEventListener("click", function () {



        let randomNumber1 = Math.floor(Math.random() * 2 + 1);

        // const aite = "相手は偶数でした"

        if (randomNumber1 === 2) {
            //賭けた数だけ動かしたい
            temochi += randomNumber1
            temochi_aite -= randomNumber1
        }
        //違ったら賭けた数をマイナス
        else {
            temochi -= randomNumber1
            temochi_aite += randomNumber1
        }
        insertText("currentPlayerHp", temochi)
        insertText("currentEnemyHp", temochi_aite)

        if (temochi_aite <= 0) {
            //勝ち
            endGame = true;
        }
        else if (temochi <= 0) {
            //負け
            endGame = true;
        }
        if (endGame) {
            document.getElementById("button_guu").classList.add("deactive");
            document.getElementById("button_ki").classList.add("deactive");
        }


        document.getElementById("button_ki")
            .addEventListener("click", function () {
                let endGame = false;
                let randomNumber1 = Math.floor(Math.random() * 2 + 1);
                // console.log(randomNumber1)
                if (randomNumber1 === 1) {
                    temochi += randomNumber1
                    temochi_aite -= randomNumber1
                }
                //違ったら賭けた数をマイナス
                else {
                    temochi -= randomNumber1
                    temochi_aite += randomNumber1
                }
                insertText("currentPlayerHp", temochi)
                insertText("currentEnemyHp", temochi_aite)
                if (temochi_aite <= 0) {
                    //勝ち
                    endGame = true;
                }
                else if (temochi <= 0) {
                    //負け
                    endGame = true;
                }
                if (endGame) {
                    document.getElementById("button_guu").classList.add("deactive");
                    document.getElementById("button_ki").classList.add("deactive");
                }
            });





        //②偶数か奇数のボタン選択
// $('#button_guu').on('click', function () {
//     {
//         const randomNumber1 = Math.floor(Math.random() * 2 + 1);



//         if (rundomNumber1 = 2) { temochi + randomNumber1 }

//         //違ったら賭けた数をマイナス
//         else { temochi - randomNumber1 }
//         // $("#echo").text(temochi)

//         // $("count").document.write(temochi)
//     }
//     console.log(temochi)
// })



// let temochi = 10
// let temochi_aite = 20 - temochi

// console.log(temochi_aite)


// // 続行できるかの判断 手持ちのおはじきが１〜１９個の場合はゲーム続行
// // while (1 <= temochi && temochi < 20) {







// // }


// // ゲームが終了し、勝敗を判断
//   if (temochi = 20) {
//     //  勝ち
//   }
//   else {
//     // 負け

//    }

        //手持ちの数によって賭けるボタンの個数を変化させる↓↓↓↓
        // if (temochi === 1) {
        //     document.getElementById("button1").classList.add("hihyouzi")
        // }
        //↑↑  

        //ボタン１個が選択されたら
        //         document.getElementById("button1")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 1
        //                     temochi_aite -= 1
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 1
        //                     temochi_aite += 1
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         //ボタン２個が選択されたら
        //         document.getElementById("button2")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 2
        //                     temochi_aite -= 2
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 2
        //                     temochi_aite += 2
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button3")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 3
        //                     temochi_aite -= 3
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 3
        //                     temochi_aite += 3
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button4")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 4
        //                     temochi_aite -= 4
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 4
        //                     temochi_aite += 4
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button4")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 4
        //                     temochi_aite -= 4
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 4
        //                     temochi_aite += 4
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button5")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 5
        //                     temochi_aite -= 5
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 5
        //                     temochi_aite += 5
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button6")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 6
        //                     temochi_aite -= 6
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 6
        //                     temochi_aite += 6
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button7")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 7
        //                     temochi_aite -= 7
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 7
        //                     temochi_aite += 7
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button8")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 8
        //                     temochi_aite -= 8
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 8
        //                     temochi_aite += 8
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button9")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 9
        //                     temochi_aite -= 9
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 9
        //                     temochi_aite += 9
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button10")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 10
        //                     temochi_aite -= 10
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 10
        //                     temochi_aite += 10
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button11")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 11
        //                     temochi_aite -= 11
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 11
        //                     temochi_aite += 11
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button12")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 12
        //                     temochi_aite -= 12
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 12
        //                     temochi_aite += 12
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button13")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 13
        //                     temochi_aite -= 13
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 13
        //                     temochi_aite += 13
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button14")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 14
        //                     temochi_aite -= 14
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 14
        //                     temochi_aite += 14
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button15")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 15
        //                     temochi_aite -= 15
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 15
        //                     temochi_aite += 15
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button16")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 16
        //                     temochi_aite -= 16
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 16
        //                     temochi_aite += 16
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button17")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 17
        //                     temochi_aite -= 17
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 17
        //                     temochi_aite += 17
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button18")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 18
        //                     temochi_aite -= 18
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 18
        //                     temochi_aite += 18
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });


        //         document.getElementById("button19")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 2) {
        //                     temochi += 19
        //                     temochi_aite -= 19
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 19
        //                     temochi_aite += 19
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         insertText("aite", "syouhai")

        //     });





        // document.getElementById("button_ki")
        //     .addEventListener("click", function () {








        //         //ボタン１個が選択されたら
        //         document.getElementById("button1")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 1
        //                     temochi_aite -= 1
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 1
        //                     temochi_aite += 1
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         //ボタン２個が選択されたら
        //         document.getElementById("button2")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 2
        //                     temochi_aite -= 2
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 2
        //                     temochi_aite += 2
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button3")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 3
        //                     temochi_aite -= 3
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 3
        //                     temochi_aite += 3
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button4")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 4
        //                     temochi_aite -= 4
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 4
        //                     temochi_aite += 4
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button4")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 4
        //                     temochi_aite -= 4
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 4
        //                     temochi_aite += 4
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button5")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 5
        //                     temochi_aite -= 5
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 5
        //                     temochi_aite += 5
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button6")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 6
        //                     temochi_aite -= 6
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 6
        //                     temochi_aite += 6
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button7")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 7
        //                     temochi_aite -= 7
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 7
        //                     temochi_aite += 7
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button8")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 8
        //                     temochi_aite -= 8
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 8
        //                     temochi_aite += 8
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button9")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 9
        //                     temochi_aite -= 9
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 9
        //                     temochi_aite += 9
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button10")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 10
        //                     temochi_aite -= 10
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 10
        //                     temochi_aite += 10
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button11")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 11
        //                     temochi_aite -= 11
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 11
        //                     temochi_aite += 11
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button12")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 12
        //                     temochi_aite -= 12
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 12
        //                     temochi_aite += 12
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button13")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 13
        //                     temochi_aite -= 13
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 13
        //                     temochi_aite += 13
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button14")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 14
        //                     temochi_aite -= 14
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 14
        //                     temochi_aite += 14
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button15")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 15
        //                     temochi_aite -= 15
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 15
        //                     temochi_aite += 15
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button16")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 16
        //                     temochi_aite -= 16
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 16
        //                     temochi_aite += 16
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button17")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 17
        //                     temochi_aite -= 17
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 17
        //                     temochi_aite += 17
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });

        //         document.getElementById("button18")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 18
        //                     temochi_aite -= 18
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 18
        //                     temochi_aite += 18
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });


        //         document.getElementById("button19")
        //             .addEventListener("click", function () {
        //                 let randomNumber1 = Math.floor(Math.random() * 2 + 1);
        //                 if (randomNumber1 === 1) {
        //                     temochi += 19
        //                     temochi_aite -= 19
        //                 }
        //                 //違ったら賭けた数をマイナス
        //                 else {
        //                     temochi -= 19
        //                     temochi_aite += 19
        //                 }
        //                 insertText("currentPlayerHp", temochi)
        //                 insertText("currentEnemyHp", temochi_aite)
        //             });


    });








