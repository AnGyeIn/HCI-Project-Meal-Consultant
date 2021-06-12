"""
Crawing to construct './database/meal_list.json'. To run this program type
`python3 crawing.py`
on terminal (in this `dataset` directory).
The result will be raw version, namely you have to manually edit the output file,
including for example rhetorical names.
"""

import requests
from bs4 import BeautifulSoup
import math
import json

home_url = 'https://www.10000recipe.com'

ingredient_names = ["사과", "바나나", "밤", "옥수수", "오이", "대추", "가지", "포도", "감", "귤", "양파", "오렌지", "배", "피망", "감자", "고구마", "토마토", "호두"]
meal_list = {}

def math_parsing(exp):
    if '-' in exp:
        range = exp.split('-')
        return math_parsing(range[-1].strip())
    elif '~' in exp:
        range = exp.split('~')
        return math_parsing(range[-1].strip())
    elif '+' in exp:
        operands = exp.split('+')
        return math_parsing(operands[0].strip()) + math_parsing(operands[1].strip())
    elif '/' in exp:
        operands = exp.split('/')
        return math_parsing(operands[0].strip()) / math_parsing(operands[1].strip())
    else:
        return float(exp)

for ingredient_name in ingredient_names:
    qpage_url = home_url + '/recipe/list.html?q=' + ingredient_name
    qpage_req = requests.get(qpage_url)
    qpage_soup = BeautifulSoup(qpage_req.text, 'html.parser')

    recipe_urls = qpage_soup.find('ul', attrs={'class', 'rcp_m_list2'})
    recipe_urls = recipe_urls.findAll('a', attrs={'class', 'common_sp_link'})
    recipe_urls = [a['href'] for a in recipe_urls]

    for recipe_url in recipe_urls:
        recipe_req = requests.get(home_url + recipe_url)
        recipe_soup = BeautifulSoup(recipe_req.text, 'html.parser')

        meal_name = recipe_soup.find('div', attrs={'class', 'view2_summary'}).h3.get_text()

        try:
            raw_ingredients = recipe_soup.find('div', attrs={'class', 'ready_ingre3'}).ul.findAll('a')
        except:
            continue
        
        raw_ingredients = [a.li.get_text().split('\n') for a in raw_ingredients]
        ingredients = []
        for ingredient_info in raw_ingredients:
            name = ingredient_info[0].strip()
            count = ingredient_info[1].strip()

            if '개' not in count:
                continue

            idx = count.find('개')
            left = count.find('(')
            right = count.find(')')
            if left < idx and idx < right:
                count = count[left+1:idx]
            else:
                count = count[:idx].strip()
    
            count = count.replace('여', '').strip()

            try:
                count = math.ceil(math_parsing(count))
            except:
                print('Err: ', ingredient_info)
                continue
            
            ingredients.append({'name': name, 'count': count})

        if len(ingredients) > 0:
            meal_list[meal_name] = {'ingredients': ingredients}

file_path = '../database/meal_list.json'
with open(file_path, 'w') as outfile:
    json.dump(meal_list, outfile, indent=4, ensure_ascii=False)
