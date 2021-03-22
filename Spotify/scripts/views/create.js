import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAritcle } from "../api/data.js";

const template = (onSubmit) => html`
<section id="createSongView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Create new song</h1>
            <form action="#" method="POST" @submit=${onSubmit}>
                <div class="form-group">
                    <label for="title" class="white-labels">Title</label>
                    <input id="title" type="text" name="title" class="form-control" placeholder="Title">
                </div>
                <div class="form-group">
                    <label for="artist" class="white-labels">Artist</label>
                    <input id="artist" type="text" name="artist" class="form-control" placeholder="Artist">
                </div>
                <div class="form-group">
                    <label for="imageURL" class="white-labels">imageURL</label>
                    <input id="imageURL" type="text" name="imageURL" class="form-control" placeholder="imageURL">
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</section>`

export function createPage(ctx){
    ctx.render(template(onSubmit))
    async function onSubmit(e){
        e.preventDefault()
        const [title,artist,imageUrl]=[...new FormData(e.target).entries()].map(x=>x[1])
        const song={title,artist,imageUrl,likes:0,listened:0,_ownerId:sessionStorage.getItem('userId')}
        if(Object.values(song).includes('')){
            return alert('All fields are required!')
        }
        await createAritcle(song)
        ctx.page.redirect('/all')
    }
}