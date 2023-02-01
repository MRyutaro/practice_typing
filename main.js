
const url = "./words.json";

let chars_for_display;
let chars_for_decision;
let word_num;
let char_check_flag;
let word_length;
let inputed_char_total_num = 0;
let correctly_inputed_char_total_num = 0;
let correctly_inputed_rate = 0;

window.addEventListener("load", load_json);
window.addEventListener("keypress", push_keydown);

function load_json(){
  changeLanguageCode(0);
  make_new_word(chars_for_decision, chars_for_display);
};

function make_new_word(chars_for_decision, chars_for_display){
  word_num = Math.floor( Math.random() * chars_for_decision.length);
  word_length = chars_for_decision[word_num].length;
  char_check_flag = 0;
  show_text(chars_for_decision, chars_for_display, char_check_flag, word_length);
  return word_num, char_check_flag, word_length;
};

function show_text(chars_for_decision, chars_for_display, start_char_num, end_char_num){
  document.getElementById("start").innerHTML = chars_for_decision[word_num].substring(0, end_char_num);
  document.getElementById("romaji").innerHTML = chars_for_display[word_num].substring(start_char_num, end_char_num);

};

function changeLanguageCode(language_code){
  fetch(url)
    .then( response => response.json())
    .then( json => changeLanguage(language_code, json));
};

function changeLanguage(language_code, json){
  if (language_code == 0){
    document.getElementById("change_language_text").innerHTML = "日本語モードです";
    chars_for_decision = json.Japanese.romaji;
    chars_for_display = json.Japanese._;
  } 
  else if(language_code == 1){
    document.getElementById("change_language_text").innerHTML = "英語モードです";
    chars_for_decision = json.English;
    chars_for_display = json.English;
  };
};

function push_keydown(event){
  inputed_char_total_num += 1;
  let key_code = event.key;
  console.log("文字：", chars_for_display, "、文字番号：", char_check_flag, "、文字長さ：",word_length);
	if (key_code == " "){
    inputed_char_total_num = 0;
    console.log("初期化");
    correctly_inputed_char_total_num = 0;
    correctly_inputed_rate = 0;
    make_new_word(chars_for_decision, chars_for_display, char_check_flag, word_length);
	};
  
	if (key_code == chars_for_decision[word_num].charAt(char_check_flag)) {
    correctly_inputed_char_total_num += 1;
    console.log("score", correctly_inputed_char_total_num);
		char_check_flag++;
    
    console.log("キー合ってた");
    show_text(chars_for_decision, chars_for_display, char_check_flag, word_length);
    
		if (word_length-char_check_flag == 0){
      console.log("単語変更");
      make_new_word(chars_for_decision, chars_for_display);
		};
	};
  
  show_score();

};

function show_score(){
  document.getElementById("inputed_char_total_num").innerHTML = inputed_char_total_num;
  document.getElementById("correctly_inputed_char_total_num").innerHTML = correctly_inputed_char_total_num;
  if(inputed_char_total_num != 0){
    correctly_inputed_rate = Math.round((correctly_inputed_char_total_num/inputed_char_total_num)*100);
  };
  document.getElementById("correctly_inputed_rate").innerHTML = correctly_inputed_rate + "%";
};
