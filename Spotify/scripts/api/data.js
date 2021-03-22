import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getArticles() {
    const teams = await api.get(host + '/jsonstore/songs');
    return teams;
}

export async function getArticle(id) {
    return await api.get(host + '/jsonstore/songs/' + id);
}

export async function createAritcle(article) {
    article.likes=0
    const result = await api.post(host + '/jsonstore/songs', article);
    
    return result;
}

export async function editArticle(id, article) {
    return await api.put(host + '/jsonstore/songs/' + id, article);
}

export async function deleteArticle(id) {
    return await api.del(host + '/jsonstore/songs/' + id);
}

export async function getMyArticles(){
    const data=Object.values(await getArticles()).filter(x=>x._ownerId==sessionStorage.getItem('userId'))
    return data
}


export async function filterByCategory(category){
    const data=await api.get(`http://localhost:3030/jsonstore/songs`)

    const pets=Object.values(data).filter(x=>x.category==category)
    pets.sort((a,b)=>b.likes-a.likes)
    return pets
}