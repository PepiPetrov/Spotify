import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { home } from './views/home.js'
import { loginPage } from './views/login.js'
import { logout } from './api/data.js'
import { dashboardPage } from './views/dashboard.js'
import { createPage } from './views/create.js'
import { myPage } from './views/my.js'
import { registerPage } from './views/register.js'

page('/', decorate, home)
page('/login',decorate,loginPage)
page('/all',decorate,dashboardPage)
page('/add',decorate,createPage)
page('/my',decorate,myPage)
page('/register',decorate,registerPage)

setupNav()
page()
document.getElementById('logout').addEventListener('click',async e=>{
    await logout()
    setupNav()
})

function decorate(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = setupNav
    next()
}

function setupNav() {
    if (sessionStorage.getItem('userId')) {
        [...document.querySelectorAll('.user')].map(x => x.style.display = 'block')
        Array.from(document.querySelectorAll('.guest')).map(x => x.style.display = 'none')
        document.getElementById('welcome').textContent=`Welcome, ${sessionStorage.getItem('username')}!`
    } else {
        [...document.querySelectorAll('.user')].map(x => x.style.display = 'none')
        Array.from(document.querySelectorAll('.guest')).map(x => x.style.display = 'block')
    }
}