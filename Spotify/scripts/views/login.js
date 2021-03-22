import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

const template = (onSubmit) => html`
<section id="loginView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Login</h1>
            <form @submit=${onSubmit}>
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input id="username" type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input id="password" type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <h4 class="mt-3 text-white">No account yet? <a href="/register" class="add-link">Register</a></h4>
        </div>
    </div>
</section>
`

export async function loginPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [username, password] = [...new FormData(e.target)].map(x => x[1])
        if (username == '' || password == '') {
            return alert('All fields are required!')
        }
        await login(username, password)
        ctx.setupNav()
        ctx.page.redirect('/all')
    }
}