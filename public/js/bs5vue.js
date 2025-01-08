// 從 Vue 中解構出 createApp 和 ref 函數
const { createApp, ref } = Vue;

// 創建菜品列表的 Vue 實例
var vueDishesList = createApp({
    data() {
        return{
            Dishes:[] // 初始化空陣列，用於存儲菜品數據
        }
    }
}).mount("#dishes") // 掛載到 id 為 "dishes" 的 DOM 元素上

// 創建食材列表的 Vue 實例
var vueFoodstuff = createApp({
    data() {
        return{
            foodstuff:[] // 初始化空陣列，用於存儲食材數據
        }
    }
}).mount("#foodstuff") // 掛載到 id 為 "foodstuff" 的 DOM 元素上

// 創建文化列表的 Vue 實例
var vueCultureList = createApp({
    data() {
        return{
            culture:[] // 初始化空陣列，用於存儲文化數據
        }
    }
}).mount("#culture") // 掛載到 id 為 "culture" 的 DOM 元素上

// 使用 jQuery Ajax 從後端獲取數據
$.ajax({
    url: "/home", // 請求的 URL 地址
    method: "get", // HTTP 請求方法
    dataType: "json", // 預期服務器返回的數據類型
    success: results => { // 請求成功的回調函數
        console.log('Results:', results); // 在控制台輸出返回的結果
        // 將獲取的數據分別賦值給三個 Vue 實例的數據屬性
        vueDishesList.Dishes = results.dishes;
        vueFoodstuff.foodstuff = results.food;
        vueCultureList.culture = results.culture;
    },
    error: err => { // 請求失敗的回調函數
        console.error("Error:", err); // 在控制台輸出錯誤信息
    }
});

// 被注釋掉的代碼是靜態數據的版本，現在改為從後端動態獲取數據
// 包含了菜品列表、食材列表和文化列表的靜態數據範例
// 每個列表項都包含 country（國家）、title（標題）、text（描述文字）和 img（圖片路徑）屬性