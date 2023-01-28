
const url = "./words.json";

let Q, Q_No, Q_i, Q_l;

window.addEventListener("load", load_Json);
window.addEventListener("keypress", push_Keydown);
console.log("end load");

function load_Json(){
  console.log("load json...");
  fetch(url)
    .then( response => response.json())
    .then( data => decide_Words(data));
};

function decide_Words(data){
  Q = data.Japanese;
  Q_No = Math.floor( Math.random() * Q._.length)
  Q_i = 0;
  Q_l = Q.romaji[Q_No].length;
};

function push_Keydown(event){
  let keyCode = event.key;
  console.log("文字：", Q.romaji[Q_No], "、文字番号：", Q_i, "、文字長さ：",Q_l);
	if (keyCode == " "){
    console.log("初期化");
    makeNewWord(Q);
	};
  
	if (Q.romaji[Q_No].charAt(Q_i) == keyCode) { //押したキーが合っていたら
		Q_i++; //判定する文章に１足す
    
    console.log("キー合ってた");
    document.getElementById("start").innerHTML = Q._[Q_No].substring(0, Q_l); //問題を書き出す
		document.getElementById("romaji").innerHTML = Q.romaji[Q_No].substring(Q_i, Q_l); //問題を書き出す

		if (Q_l-Q_i == 0){ //全部正解したら
      console.log("単語変更");
      makeNewWord(Q);
		};
	};
};

function makeNewWord(Q){
  Q_No = Math.floor( Math.random() * Q._.length);//問題をランダムで出題する
  Q_i = 0;//回答初期値・現在どこまで合っているか判定している文字番号
  Q_l = Q.romaji[Q_No].length;//計算用の文字の長さ
  document.getElementById("start").innerHTML = Q._[Q_No].substring(Q_i, Q_l); //新たな問題を書き出す
  document.getElementById("romaji").innerHTML = Q.romaji[Q_No].substring(Q_i, Q_l); //新たな問題を書き出す
  return Q_No, Q_i, Q_l
};

function changeLanguageCode(language_code){
  fetch(url)
    .then( response => response.json())
    .then( json => changeLanguage(language_code, json));
};

function changeLanguage(language_code, json){
  if (language_code == 0){
    document.getElementById("changeLanguageText").innerHTML = "日本語モードです"
    Q = json.Japanese;
  } 
  else if(language_code == 1){
    document.getElementById("changeLanguageText").innerHTML = "英語モードです"
    Q = json.English;
  };
};
