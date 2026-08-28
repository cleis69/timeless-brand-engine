LOGOS DES ENTREPRISES ACCOMPAGNEES
==================================

Affiches dans le bandeau defilant de la page d'accueil.
Le composant qui les lit est la fonction Clients() de src/routes/index.tsx.

LE FOND DE CETTE SECTION EST #090909. VERIFIE TOUT NOUVEAU LOGO DESSUS,
JAMAIS SUR BLANC.

Un logo en encre noire sur fond transparent y est parfaitement invisible,
et un JPEG a fond opaque y apparait comme un rectangle clair. Les fichiers
de ce dossier sont donc DEJA TRAITES : Centralym et Gatsby sont des versions
blanches, Koozina est un SVG dont l'encre a ete eclaircie et le disque creme
retire.

Le traitement est fait dans le FICHIER, pas par un filtre CSS. Un filtre
donne le meme resultat a l'ecran mais ne survit pas a un changement de fond :
le jour ou la section passe sur clair, les logos disparaissent en silence.

DIMENSIONS

Les largeurs sont ecrites a la main dans index.tsx, et calculees pour que
les quatre logos occupent la MEME SURFACE - pas la meme hauteur. Centralym
fait 5,66:1, Koozina 1:1 : a hauteur egale, Koozina parait trois fois plus
petit, parce que l'oeil compare des aires.

  the-kop-barber.png    186 x 65    couleurs d'origine
  centralym.png         262 x 46    passe en blanc
  gatsby.png            216 x 56    passe en blanc
  koozina-garden.svg    104 x 104   couleurs conservees

Les PNG sont exportes en x3 pour les ecrans a haute densite.

EN AJOUTANT UN LOGO : vise la meme surface que les autres, verifie-le sur
#090909, et augmente LOOPS dans index.tsx si la bande devient plus courte.
