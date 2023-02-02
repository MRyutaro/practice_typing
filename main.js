
const url = "./words.json";

let words;

let chars_for_display;
let chars_for_decision;
let word_num;
let char_check_flag;
let word_length;

let inputed_char_total_num = 0;
let correctly_inputed_char_total_num = 0;
let correctly_inputed_rate = 0;

let language_code = 0;

window.addEventListener("load", load(language_code));
window.addEventListener("keydown", push_keydown);

function load(language_code){
  fetch(url)
    .then( response => response.json())
    .then( json => load_json(json, language_code));
};

function load_json(json, language_code){
  if (language_code == 0){
    words = json.Japanese;
  }
  else if(language_code == 1){
    words = json.English;
  };
};

function make_new_word(words, language_code){
  if (language_code == 0){
    word_num = Math.floor( Math.random() * words.length);
    word_length = words[word_num].romaji.length;
    chars_for_display = words[word_num]._;
    chars_for_decision = words[word_num].romaji;
  }
  else if(language_code == 1){
    word_num = Math.floor( Math.random() * words.length);
    word_length = words[word_num].length;
    chars_for_decision = words[word_num];
    chars_for_display = words[word_num];
  };
  char_check_flag = 0;
  show_text(chars_for_decision, chars_for_display, char_check_flag, word_length);
};

function show_text(chars_for_decision, chars_for_display, start_char_num, end_char_num){
  document.getElementById("start").innerHTML = chars_for_display.substring(0, end_char_num);
  document.getElementById("romaji").innerHTML = chars_for_decision.substring(start_char_num, end_char_num);
};

function change_language_code(input_language_code){
  if (input_language_code == 0){
    language_code = 0;
    document.getElementById("change_language_text").innerHTML = "日本語モードです";
  } 
  else if(input_language_code == 1){
    language_code = 1;
    document.getElementById("change_language_text").innerHTML = "英語モードです";
  };
  load(language_code);
};

function push_keydown(event){
  inputed_char_total_num++;
  let key_code = event.key;
  console.log("keycode", key_code);
  console.log("文字：", chars_for_display, "、文字番号：", char_check_flag, "、文字長さ：", word_length);

	if (key_code == "Enter"){
    console.log("初期化");
    inputed_char_total_num = 0;
    correctly_inputed_char_total_num = 0;
    correctly_inputed_rate = 0;
    make_new_word(words, language_code);
	};

	if (key_code == chars_for_decision.charAt(char_check_flag)) {
		char_check_flag++;
    correctly_inputed_char_total_num++;

    console.log("キー合ってた");
    console.log("score", correctly_inputed_char_total_num);
    
    show_text(chars_for_decision, chars_for_display, char_check_flag, word_length);

		if (word_length-char_check_flag == 0){
      console.log("単語変更");
      make_new_word(words, language_code);
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
