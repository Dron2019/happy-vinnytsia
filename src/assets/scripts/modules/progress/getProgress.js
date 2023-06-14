export default function getProgress(id) {
    if (document.documentElement.dataset.status==="local") {
        return Promise.resolve({
            data: {
                title: '25 Серпня 2023 р.'+new Date().getTime(),
                text: 'Монтаж ліфтів Продовжується влаштування систем опалення, вентиляції, водопроводу, каналізації та електрики. Проходять фасадні роботи на торцях. Влаштування утеплення на балконах.',
                gallery: [],
            }
        })
    }
}