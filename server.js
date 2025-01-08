//install: node js
//install web server package: express 

//npm install express
//npm install nedb-promises

// 引入必要的模組
var express = require("express");           // 引入 Express 框架
var server = express();                     // 建立 Express 應用程式實例
var bodyParser = require("body-parser");    // 引入請求體解析器


// 設定靜態檔案目錄
// __dirname 代表目前程式執行的目錄路徑
// /public 資料夾將作為網站的根目錄，用於存放靜態檔案(如 HTML、CSS、圖片等)
server.use(express.static(__dirname + '/public'));

// 設定請求體解析中介軟體
server.use(bodyParser.json());    // 支援解析 JSON 格式的請求體
server.use(bodyParser.urlencoded({ extended: true }));  // 支援解析 URL 編碼的請求體


// 建立三個資料庫實例，分別用於存儲不同類型的資料
// 資料庫檔案會自動建立在指定路徑
// 統一資料庫宣告
const DB = require("nedb-promises");
const DishesListDB = DB.create(__dirname + "/DishesList.db");    
const FoodstuffDB = DB.create(__dirname + "/Foodstuff.db");        
const CultureListDB = DB.create(__dirname + "/CultureList.db");     
const ContactDB = DB.create(__dirname + "/Contact.db");

// 更新其他需要的資料庫
// const SushiTypesDB = DB.create(__dirname + "/SushiTypes.db");    
// const IngredientsDB = DB.create(__dirname + "/Ingredients.db");   
// const TechniquesDB = DB.create(__dirname + "/Techniques.db");
// DishesListDB.insert([
//     {country:"japan",title:"壽司之藝",text:"探索日本壽司文化的精髓與傳統",img:"images/food/sushi.jpg"},
//     {country:"india",title:"風味咖哩",text:"豐富香料與多層次的味蕾刺激",img:"images/food/indiacurry.jpg"},
//     {country:"italy",title:"義大利麵",text:"傳統手工製作工藝",img:"images/food/pasta.jpg"},
//     {country:"french",title:"紅酒燉牛肉",text:"精緻料理的藝術",img:"images/food/Beefbourguignon.jpg"},   
// ])

// FoodstuffDB.insert([
//     {country:"french",title:"黑松露",text:"土地的黑色鑽石",img:"images/food/黑松露.jpg"},
//     {country:"spanish",title:"藏紅花",text:"世界最昂貴的香料",img:"images/food/藏紅花.jpg"},
//     {country:"japan",title:"抹茶",text:"傳統茶道文化精髓",img:"images/food/抹茶.jpg"},
//     {country:"vietnam",title:"魚露",text:"東南亞料理靈魂",img:"images/food/魚露.jpg"},   
// ])

// CultureListDB.insert([
//     {country:"japan",title:"茶道文化",text:"一期一會的藝術",img:"images/food/茶道文化.jpg"},
//     {country:"french",title:"餐酒搭配",text:"美食與美酒的完美結合",img:"images/food/餐酒搭配.jpg"},
//     {country:"maroc",title:"摩洛哥茶文化",text:"薄荷茶的待客之道",img:"images/food/摩洛哥茶文化.jpg"},
//     {country:"china",title:"圓桌文化與敬酒",text:"東南亞料理靈魂",img:"images/food/圓桌文化.jpg"}, 
// ])

// DishesListDB.insert();
FoodstuffDB.updateOne([{"country":"spain","title":"西班牙藏紅花","text":"世界最珍貴的香料之一，由番紅花的花柱手工採摘製成","img":"/images/food/saffron.jpg","ingredients":[{"name":"番紅花","description":"精選優質番紅花，手工採摘花柱","tips":["確保花朵新鮮度","採摘時機要準確","輕柔處理避免損傷"],"img":"/images/ingredients/crocus.jpg"},{"name":"乾燥設備","description":"專業乾燥設備確保品質","tips":["控制乾燥溫度","注意乾燥時間","保持環境清潔"],"img":"/images/ingredients/dryer.jpg"}],"steps":[{"step":1,"title":"採摘處理","description":"清晨採摘新鮮花朵並取出花柱","tools":["採摘籃","鑷子","托盤"]},{"step":2,"title":"乾燥過程","description":"將花柱進行精確溫控乾燥","tools":["乾燥機","溫度計","計時器"]},{"step":3,"title":"分類包裝","description":"將乾燥後的藏紅花分級包裝","tools":["天平","包裝袋","密封機"]}],"_id":"B2cD3eEfGhIjKlMn"}]),

server.get("/home", async (req, res) => {
    let result = {
        dishes: [],
        food: [],
        culture: [],
        errors: [] // 新增錯誤訊息陣列
    };

    // 查詢餐點資料
    try {
        const dishes = await DishesListDB.find({});
        if (dishes) {
            result.dishes = dishes;
        }
    } catch (err) {
        console.error('餐點資料查詢失敗:', err);
        result.errors.push({
            type: 'dishes',
            message: '餐點資料查詢失敗',
            error: err.message
        });
    }

    // 查詢食材資料
    try {
        const food = await FoodstuffDB.find({});
        if (food) {
            result.food = food;
        }
    } catch (err) {
        console.error('食材資料查詢失敗:', err);
        result.errors.push({
            type: 'food',
            message: '食材資料查詢失敗',
            error: err.message
        });
    }

    // 查詢文化資料
    try {
        const culture = await CultureListDB.find({});
        if (culture) {
            result.culture = culture;
        }
    } catch (err) {
        console.error('文化資料查詢失敗:', err);
        result.errors.push({
            type: 'culture',
            message: '文化資料查詢失敗',
            error: err.message
        });
    }

    // 設定適當的 HTTP 狀態碼
    if (result.errors.length > 0) {
        res.status(207).send(result); // 207 Multi-Status
    } else {
        res.status(200).send(result);
    }
});

// 修改以確保路由正確匹配
// 獲取所有食譜
server.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await DishesListDB.find({});
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: '資料載入失敗' });
    }
});

// API 路由
server.get('/api/recipes/:id', async (req, res) => {
    try {
        console.log('Looking for recipe with ID:', req.params.id);
        const recipe = await DishesListDB.findOne({ _id: req.params.id });
        
        if (!recipe) {
            console.log('Recipe not found');
            return res.status(404).json({ error: '找不到該食譜' });
        }
        
        console.log('Found recipe:', recipe);
        res.json(recipe);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '資料載入失敗' });
    }
});

// 處理食譜詳細頁面的路由
server.get('/recipe/:id', (req, res) => {
    console.log('Serving recipe page for ID:', req.params.id);
    res.sendFile(__dirname + '/public/recipe.html');
});

// 處理 POST /contact_me 路由的請求
// 用於處理連絡表單的提交
server.post("/contact_me", (req, res) => {
    // 將請求中的表單資料存入 ContactDB
    ContactDB.insert(req.body);
    // 重新導向到首頁的 contact 區塊
    res.redirect("/#contact");
})

server.listen(3001, () => {
    console.log("Server is running at port 3001.");
});


