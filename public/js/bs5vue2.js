// bs5vue2.js
const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        const item = ref({
            title: '',
            text: '',
            img: ''
        });
        const ingredients = ref([]);
        const steps = ref([]);

        const fetchData = async () => {
            try {
                // 獲取 ID
                const id = window.location.pathname.split('/recipe/')[1];

                // 使用完整的 API 路徑
                const response = await fetch(`/api/recipes/${id}`);

                if (!response.ok) {
                    throw new Error('資料載入失敗');
                }

                const data = await response.json();

                // 更新資料
                item.value = {
                    title: data.title,
                    text: data.text,
                    img: data.img
                };

                // 設置食材資料
                if (data.ingredients) {
                    ingredients.value = data.ingredients;
                }

                // 設置步驟資料
                if (data.steps) {
                    steps.value = data.steps;
                }

            } catch (err) {
                console.error('Error:', err);
            }
        };

        onMounted(() => {
            fetchData();
        });

        return {
            item,
            ingredients,
            steps
        };
    }
}).mount('#app');

// // GSAP 動畫設定
// gsap.registerPlugin(ScrollTrigger);

// // 封面圖片動畫
// gsap.to(".header-img", {
//     scrollTrigger: {
//         trigger: ".header",
//         start: "top top",
//         end: "bottom 100px",
//         scrub: 1,
//         toggleActions: "restart none none reverse"
//     },
//     scale: 1.1,
//     opacity: 0.8
// });

// // 文字淡入動畫
// gsap.utils.toArray('.fade-in').forEach(element => {
//     gsap.from(element, {
//         scrollTrigger: {
//             trigger: element,
//             start: "top 80%",
//             toggleActions: "play none none none"
//         },
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         ease: "power2.out"
//     });
// });

// // 卡片動畫
// gsap.utils.toArray('.card').forEach((card, i) => {
//     gsap.from(card, {
//         scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//             toggleActions: "play none none none"
//         },
//         opacity: 0,
//         y: 30,
//         delay: i * 0.1,
//         duration: 0.8,
//         ease: "back.out(1.7)"
//     });
// });

