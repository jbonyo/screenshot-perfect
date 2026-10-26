<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules
- All site content (contact, socials, slides, services, gallery, testimonials) lives in src/content/site.ts — single source so details update in one place.
- Shared header/footer/mobile action bar live in src/components/site/SiteChrome.tsx and wrap every page from __root.tsx.
