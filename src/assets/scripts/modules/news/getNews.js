export default async function getNews(type) {
    const fd = new FormData();
    fd.append('action', 'news');
    fd.append('type', type);

    return axios.post('/wp-admin/admin-ajax.php', fd);
}