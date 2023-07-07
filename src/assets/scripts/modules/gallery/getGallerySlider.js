export function getGallerySlider(id) {
    if (document.documentElement.dataset.status === 'local') {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve({
                data: {
                    title: 'Gallery slider'+Math.random(),
                    gallery: ['./assets/images/home/home-page-screen1.jpg', './assets/images/home/home-page-screen1.jpg', './assets/images/home/home-page-screen1.jpg', './assets/images/home/home-page-screen1.jpg'],
                    miniFlatImage: './assets/images/home/home-page-screen1.jpg',
                } 
                    
            })
            }, 1000)
        })
    }
}
