# cynthiasdl.github.io
# **Colors in Flags**

#### **Colors in Flags** is a project that was created during my time at the [Lede program](https://ledeprogram.com).

#### The final [webpage](https://cynthiasdl.github.io) provides an overview of all the colors used in the world's flags and contains exciting/funny facts about their meanings.


## So how do I do this?

### Scraping 

First I **scraped the html** from this website called [flagcolorcodes.de](https://www.flagcolorcodes.com). The flags where within 18 different pages. 

```
BASE_URL = "https://www.flagcolorcodes.com/flags/country/page/"

for i in range(18):
    print(BASE_URL + str(i + 1))
```    


The html contained the flagname (countryname + Flag), the colorname (e.g. Red), and the hexacode for all the colors that are (#FF0000). So i created the list `data` and filtered for the *country_name*, the *color_code*  and the *color_name* with the following code. 


```
data = []

for i in range(18):
    page_url = BASE_URL + str(i + 1)
    print(f"Fetching {page_url}")
    response = requests.get(page_url)
    
    # Überprüfen, ob scrapen geklappt hat
    if response.status_code == 200:
        html = response.text
        #data.append(html)
        print(f"Successfully fetched {page_url}")
    else:
        print(f"Failed to fetch {page_url}, status code: {response.status_code}")

    soup = BeautifulSoup(html)
    flaglist = soup.select(".flag-list")[0]
    #print(f"Found flag: {flaglist}")
    list_element = flaglist.find_all("li")
    
    for country in list_element:
        #print(country)
        country_name = country.find('a')['title']
        print(country_name)
        
        colors = country.find_all('span')
        for color in colors: 
            color_code = color['data-clipboard-text']
            print(color_code)
            color_name = color['title']
            print(color_name)

            data.append({
                'country': country_name,
                'color_code': color_code,
                'color_name': color_name
            })
    
    print("----------------")
```

If it works your result should look something like this: 

```
Fetching https://www.flagcolorcodes.com/flags/country/page/1
Successfully fetched https://www.flagcolorcodes.com/flags/country/page/1
East Timor Flag
000000
Black: #000000
FFFFFF
White: #FFFFFF
FFC72C
Yellow: #FFC72C
DA291C
Red: #DA291C

```
### Cleaning the data

After I fetched all the data, I put it into a dataframe, sorted it alphabetically by countries and cleaned the data. 

```
df = pd.DataFrame(data)
df = df.sort_values(by='country', ascending=True).reset_index(drop=True)
df['color_name'] = df['color_name'].str.extract(r'([^:]+)', expand=False)
df['country'] = df['country'].str.replace(' Flag', '', regex=False)

```

I also grouped all the colors that go together into maingroups. `Dark Blue` --> `Blue`

```
df['color_name'] = df['color_name'].str.replace("YelloW", "Yellow") 
df['color_name'] = df['color_name'].str.replace("Reflex Blue", "Blue") 
df['color_name'] = df['color_name'].str.replace("Grey", "Gray") 
df['color_name'] = df['color_name'].str.replace("Golden", "Gold") 
df['color_name'] = df['color_name'].str.replace("Dark Blue", "Blue") 
df['color_name'] = df['color_name'].str.replace("Light Blue", "Blue") 
df['color_name'] = df['color_name'].str.replace("white", "White")

```

### Adding the continents

Next I added the continents. Since merging with various csv files from the Internet did not work, I exported the df as excel and entered the continents by hand. Then I imported the df again. 

**Export**
```
df_continents = pd.read_excel('flag_colors_continente.xlsx')
```
**Import**
```
df_continents = pd.read_excel('flag_colors_continente.xlsx')
```
### **Now the data was ready to be analysed**

