import { html } from "../../node_modules/lit-html/lit-html.js";

const template = () => html`
<section id="homeView">
    <img class="m-auto background-image" width="100%" height="100%"
        src="https://m.investor.bg/images/photos/0309/0000309170-article3.jpg">
</section>
`

export function home(ctx){
    ctx.render(template())
}