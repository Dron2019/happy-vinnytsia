export default async function getProgress(id) {
    console.log(id);
    if (document.documentElement.dataset.status==="local") {
        return Promise.resolve({
            data: {
                title: '25 Серпня 2023 р.'+new Date().getTime(),
                text: 'Монтаж ліфтів Продовжується влаштування систем опалення, вентиляції, водопроводу, каналізації та електрики. Проходять фасадні роботи на торцях. Влаштування утеплення на балконах.',
                gallery: [],
            }
        })
    }

    const fd = new FormData();
    fd.append('action', 'construction');
    fd.append('id', id);
    return axios.post('/wp-admin/admin-ajax.php', fd);
}





export function getProgressList(type) {
    if (document.documentElement.dataset.status === 'local') {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve({
                data: [
                    {
                        title: 'хід будівництва', 
                        img: './assets/images/home/home-page-screen1@05x.jpg', 
                        id: 15055151,
                        linkText: 'Детальніше',
                        title: new Date().getTime(),
                        date: '30.07.2023',
                        text: 'Монтаж ліфтів Продовжується влаштування систем опалення, вентиляції, водопроводу, каналізації та електрики. Проходять фасадні роботи на торцях. Влаштування утеплення на балконах.',
                        gallery: [],
                    },
                    {
                        title: 'хід будівництва', 
                        img: './assets/images/home/home-page-screen1@05x.jpg', 
                        id: 15055151,
                        linkText: 'Детальніше',
                        title: new Date().getTime(),
                        date: '30.07.2023',
                        text: 'Монтаж ліфтів Продовжується влаштування систем опалення, вентиляції, водопроводу, каналізації та електрики. Проходять фасадні роботи на торцях. Влаштування утеплення на балконах.',
                        gallery: [],
                    }
                ]
            })
            }, 1000)
        })
    }

    const fd = new FormData();
    fd.append('action', 'constructionList');
    fd.append('type', type);
    return axios.post('/wp-admin/admin-ajax.php', fd);
}