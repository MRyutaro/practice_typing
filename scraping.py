from bs4 import BeautifulSoup
import requests
import pykakasi
import json
from pprint import pprint
import os
import unicodedata


def get_titles_from_qiita():
    url = "https://qiita.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("article", class_="style-1hwjs98")

    titles = list()

    for article in articles:
        title = article.find("h2", class_="style-skov52").get_text().replace(
            "　", "").replace("（", "").replace("）", "").replace("＆", "").replace("ー", "").replace("】", "").replace("【", "").replace("(", "").replace(")", "").replace("?", "").replace("!", "").replace("、", "").replace("。", "")
        title = unicodedata.normalize('NFKC', title)
        titles.append(title)

    # print(titles)
    return titles


def convert_to_romaji(japanese_titles):
    kakasi = pykakasi.kakasi()
    kakasi.setMode('H', 'a')  # ひらがなからローマ字
    kakasi.setMode('K', 'a')  # カタカナからローマ字
    kakasi.setMode('J', 'a')  # 漢字からローマ字
    conversion = kakasi.getConverter()

    romaji_titles = list()
    for japanese_title in japanese_titles:
        romaji_title = conversion.do(japanese_title)
        romaji_title = romaji_title.lower()
        romaji_titles.append(romaji_title)

    # print(romaji_titles)
    return romaji_titles


def save_json(japanese_titles, romaji_titles):
    file_name = "words.json"
    output_file = open(file_name, "r", encoding="utf_8")
    json_load = json.load(output_file)
    for japanese_title, romaji_title in zip(japanese_titles, romaji_titles):
        words = {"_": f"{japanese_title}", "romaji": f"{romaji_title}"}
        json_load["Japanese"].append(words)
    pprint(json_load)
    output_file.close()

    os.remove(file_name)

    output_file = open(file_name, "w", encoding="utf_8")
    json.dump(json_load, output_file, indent=2, ensure_ascii=False)
    output_file.close()


if __name__ == "__main__":
    japanese_titles = get_titles_from_qiita()
    romaji_titles = convert_to_romaji(japanese_titles)
    save_json(japanese_titles, romaji_titles)
