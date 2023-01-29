
const url = "./words.json";

let Q, Q_No, Q_i, Q_l;
let inputed_Character_Total_Num;
let correctly_Inputed_Character_Total_Num;
let correctly_Input_Rate;

window.addEventListener("load", load_Json);
window.addEventListener("keypress", push_Keydown);

function load_Json(){
  console.log("load json...");
  fetch(url)
    .then( response => response.json())
    .then( data => decide_Words(data));
};

function decide_Words(data){
  Q = data.Japanese;
  Q_No = Math.floor( Math.random() * Q.length)
  Q_i = 0;
  Q_l = Q[Q_No].romaji.length;
};

function push_Keydown(event){
  inputed_Character_Total_Num++;
  let keyCode = event.key;
  console.log("文字：", Q[Q_No].romaji, "、文字番号：", Q_i, "、文字長さ：",Q_l);
	if (keyCode == " "){
    console.log("初期化");
    inputed_Character_Total_Num = 0;
    correctly_Inputed_Character_Total_Num = 0;
    correctly_Input_Rate = 0;
    makeNewWord(Q);
	};
  
	if (Q[Q_No].romaji.charAt(Q_i) == keyCode) { //押したキーが合っていたら
    correctly_Inputed_Character_Total_Num++;
    console.log("score", correctly_Inputed_Character_Total_Num);
		Q_i++; //判定する文章に１足す
    
    console.log("キー合ってた");
    document.getElementById("start").innerHTML = Q[Q_No]._.substring(0, Q_l); //問題を書き出す
		document.getElementById("romaji").innerHTML = Q[Q_No].romaji.substring(Q_i, Q_l); //問題を書き出す

		if (Q_l-Q_i == 0){ //全部正解したら
      console.log("単語変更");
      makeNewWord(Q);
		};
	};

  showScore();

};

function makeNewWord(Q){
  Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
  Q_i = 0;//回答初期値・現在どこまで合っているか判定している文字番号
  Q_l = Q[Q_No].romaji.length;//計算用の文字の長さ
  document.getElementById("start").innerHTML = Q[Q_No]._.substring(Q_i, Q_l); //新たな問題を書き出す
  document.getElementById("romaji").innerHTML = Q[Q_No].romaji.substring(Q_i, Q_l); //新たな問題を書き出す
  return Q_No, Q_i, Q_l
};

function changeLanguageCode(language_code){
  fetch(url)
    .then( response => response.json())
    .then( json => changeLanguage(language_code, json));
};

function changeLanguage(language_code, json){
  if (language_code == 0){
    document.getElementById("changeLanguageText").innerHTML = "日本語モードです";
    Q = json.Japanese;
  } 
  else if(language_code == 1){
    document.getElementById("changeLanguageText").innerHTML = "英語モードです";
    Q = json.English;
  };
};

function showScore(){
  document.getElementById("inputed_Character_Total_Num").innerHTML = inputed_Character_Total_Num;
  document.getElementById("correctly_Inputed_Character_Total_Num").innerHTML = correctly_Inputed_Character_Total_Num;
  if(inputed_Character_Total_Num != 0){
    correctly_Input_Rate = Math.round((correctly_Inputed_Character_Total_Num/inputed_Character_Total_Num)*100);
  } 
  else{
    correctly_Input_Rate = 0;
  }
  document.getElementById("correctly_Input_Rate").innerHTML = correctly_Input_Rate + "%";
};
