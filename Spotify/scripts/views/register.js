import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";

const template = (onSubmit) => html`
<section id="registerView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Register</h1>
            <form action="#" method="POST" @submit=${onSubmit}>
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <h4 class="mt-3 text-white">Already have an account? <a href="/login" class="add-link">Login</a></h4>
        </div>
    </div>
</section>
`

export async function registerPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [username, password] = [...new FormData(e.target)].map(x => x[1])
        if (username == '' || password == '') {
            return alert('All fields are required!')
        }
        await register(username, password)
        ctx.setupNav()
        ctx.page.redirect('/all')
    }
}