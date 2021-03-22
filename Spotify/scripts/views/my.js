import { getMyArticles, editArticle, deleteArticle } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const template = (data = [], onListen, onDelete) => html`
<section id="mySongsView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>My Songs</h1>
            ${data.map(x => itemTemplate(x, onDelete, onListen))}
        </div>
    </div>
</section>
`
const itemTemplate = (item, onRemove, onListen) => html`
<div class="song">
    <h5>Title: ${item.title}</h5>
    <h5>Artist: ${item.artist}</h5>
    <img class="cover" src="${item.imageUrl}" />
    <p>Likes: ${item.likes}; Listened ${item.listened} times</p>
    <a href="javascript:void(0)" @click=${onRemove} id=${item._id} class="btn btn-danger mt-4">Remove</a>
    <a href="javascript:void(0)" @click=${onListen} id=${item._id} class="btn btn-success mt-4">Listen</a>
</div>
`

export async function myPage(ctx) {
    ctx.render(template(Object.values(await getMyArticles()), onListen, onRemove))
    async function onListen(e) {
        const song = await getArticle(e.target.id)
        song.listened++
        await editArticle(e.target.id, song)
        ctx.render(
            template(Object.values(await getArticles()).filter(x => typeof x !== 'number'),
                onRemove, onListen, onLike)
        )
    }
    async function onRemove(e) {
        if (confirm('Are you sure')) {
            await deleteArticle(e.target.id)
            console.log(e.target.id)
            ctx.render(template(Object.values(await getArticles()).filter(x => typeof x !== 'number'), onRemove, onListen, onLike))
        }
    }
}