import { getArticles, editArticle, deleteArticle, getArticle } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const template = (data = [], onRemove, onListen, onLike) => html`
<section id="allSongsView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>All Songs</h1>
            <a href="/add">
                <button type="button" class="btn-lg btn-block new-song-btn">Add a new song</button>
            </a>
            ${data.map(x =>
                itemTemplate(x, onRemove, onListen, onLike))}
        </div>
    </div>
</section>
`

const itemTemplate = (item, onRemove, onListen, onLike) => html`
<div class="song">
    <h5>Title: ${item.title}</h5>
    <h5>Artist: ${item.artist}</h5>
    <img class="cover" src="${item.imageUrl}" />
    ${sessionStorage.getItem('userId') == item._ownerId ? html`
    <p>Likes: ${item.likes}; Listened ${item.listened} times</p>
    <a href="javascript:void(0)" @click=${onRemove} id=${item._id} class="btn btn-danger mt-4">Remove</a>
    <a href="javascript:void(0)" @click=${onListen} id=${item._id} class="btn btn-success mt-4">Listen</a>
    `: html`
    <p>Likes: ${item.likes}</p>
    <a href="javascript:void(0)" @click=${onLike} id=${item._id} class="btn btn-primary mt-4">Like</a>
    `}
</div>
`

export async function dashboardPage(ctx) {
    const data = Object.values(await getArticles()).filter(x=>typeof x!=='number')
    ctx.render(template(data, onRemove,onListen,onLike))
    async function onRemove(e) {
        if (confirm('Are you sure')) {
            await deleteArticle(e.target.id)
            console.log(e.target.id)
            ctx.render(template(Object.values(await getArticles()).filter(x=>typeof x!=='number'), onRemove,onListen,onLike))
        }
    }
    async function onListen(e) {
        const song=await getArticle(e.target.id)
        song.listened++
        await editArticle(e.target.id,song)
        ctx.render(
            template(Object.values(await getArticles()).filter(x=>typeof x!=='number'), 
            onRemove,onListen,onLike)
            )
    }
    async function onLike(e) {
        const song=await getArticle(e.target.id)
        song.likes++
        await editArticle(e.target.id,song)
        ctx.render(
            template(Object.values(await getArticles()).filter(x=>typeof x!=='number'), 
            onRemove,onListen,onLike)
            )
    }
}