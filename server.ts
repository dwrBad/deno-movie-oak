import {Application, Router} from "https://deno.land/x/oak/mod.ts";

const apikey = Deno.env.get('apiKey')

async function bootstrap() {
    const router = new Router();
    router
        .get("/search", async (ctx) => {
            const query = new URLSearchParams(ctx.request.url.search)
            const s = query.get('query')

            const result = await fetch('https://www.omdbapi.com/?s=' + s + '&apiKey=' + apikey)
            ctx.response.body = await result.json()
        })
        .get("/movie", async (ctx) => {
            const query = new URLSearchParams(ctx.request.url.search)
            const t = query.get('title')
            const i = query.get('id')
            const url = i ?
                'https://www.omdbapi.com/?i=' + i + '&apiKey=' + apikey
                : 'https://www.omdbapi.com/?t=' + t + '&apiKey=' + apikey

            const result = await fetch(url)
            ctx.response.body = await result.json()
        })

    const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen({port: 3000})

    console.log('Listening on http://localhost:3000')
}

bootstrap()
