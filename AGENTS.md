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

## Site bilingue (français / anglais)

Le site existe en français (adresses d'origine) et en anglais (sous `/en`).
**Tout contenu ou toute page ajouté en français doit être ajouté en anglais
dans la même modification** :

- Article de blog : sa traduction dans `src/content/en/blog-*.ts` et son
  adresse anglaise dans `src/content/blog.slugs.en.ts`.
- Service, secteur, réalisation, tarif : le fichier correspondant de
  `src/content/en/`.
- Page d'offre : `nameEn` / `textEn` dans `src/content/landings.ts`.
- Nouvelle page : le composant dans `src/pages/` (texte `fr` et `en`), une
  route française mince, une route dans `src/routes/en/`, et l'adresse
  anglaise dans `PAGES` (`src/lib/locale.ts`).

`npm run check:translations` liste ce qui manque. `npm run deploy` refuse de
mettre le site en ligne tant que cette liste n'est pas vide. Le détail est
dans `src/content/translation-status.ts`.
