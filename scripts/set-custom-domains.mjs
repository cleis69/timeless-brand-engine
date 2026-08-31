/**
 * ULTRA VISION — declaration du domaine avant deploiement Cloudflare.
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL VIA `npm run deploy`.
 *
 *  LA SEULE CHOSE MODIFIABLE ICI EST LA LISTE `DOMAINES`.
 * ============================================================
 *
 * POURQUOI CE FICHIER EXISTE
 *
 * Cloudflare a besoin de savoir quelles adresses doivent afficher le
 * site. Cette information vit normalement dans un fichier de
 * configuration nomme `wrangler.json`.
 *
 * Le probleme : ce fichier n'est pas ecrit par nous. Il est REGENERE
 * a chaque construction du site par l'outil de build, qui ecrase tout
 * ce qu'on aurait pu y mettre a la main.
 *
 * Une modification manuelle survivrait donc exactement jusqu'au
 * prochain `npm run deploy` — puis le domaine se detacherait sans
 * prevenir, et le site deviendrait injoignable a son adresse. Ce
 * script reinscrit la liste juste apres chaque construction, ce qui
 * rend le branchement permanent.
 *
 * L'autre facon de faire serait de brancher le domaine a la main dans
 * le tableau de bord Cloudflare. Ca marche aussi, mais l'information
 * n'existe alors nulle part dans le code : personne ne peut savoir,
 * en lisant le projet, a quelle adresse le site est cense repondre.
 * Ici, c'est ecrit noir sur blanc et versionne avec le reste.
 *
 * ------------------------------------------------------------
 *  POURQUOI UNE « ROUTE » ET NON UN « DOMAINE PERSONNALISE »
 *
 *  Cloudflare propose deux branchements. Le « domaine personnalise »
 *  cree lui-meme l'enregistrement DNS — et refuse donc de s'installer
 *  si une autre entree occupe deja la place, ce qui etait le cas ici
 *  avec la page de parking heritee du registrar.
 *
 *  La « route » ne touche pas au DNS : elle intercepte les requetes
 *  en amont, avant qu'elles n'atteignent la destination inscrite dans
 *  l'enregistrement. Le site s'affiche, l'ancienne entree devient
 *  inerte, et rien n'a eu besoin d'etre supprime.
 *
 *  Consequence a connaitre : cette entree DNS residuelle survit dans
 *  la zone. Elle ne sert plus a rien tant que la route existe, mais
 *  si la route etait retiree un jour, la page de parking
 *  reapparaitrait au lieu d'une erreur franche. C'est le seul defaut
 *  de cette methode, et il est reparable a tout moment en supprimant
 *  l'entree dans Cloudflare puis en repassant en domaine
 *  personnalise.
 * ------------------------------------------------------------
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const CONFIG = ".output/server/wrangler.json";

/**
 * Les adresses qui doivent afficher le site.
 *
 * `www` est inclus volontairement : une partie des visiteurs le tape
 * par habitude, et sans cette ligne l'adresse ne repondrait pas du
 * tout. Le site redirige ensuite `www` vers l'adresse courte, pour
 * que Google ne voie qu'une seule version de chaque page.
 */
const ZONE = "ultravisionagency.com";
const DOMAINES = [ZONE, `www.${ZONE}`];

if (!existsSync(CONFIG)) {
  console.error(`\n[set-custom-domains] ECHEC : ${CONFIG} introuvable — lance le build d'abord.\n`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(CONFIG, "utf8"));
config.routes = DOMAINES.map((domaine) => ({
  pattern: `${domaine}/*`,
  zone_name: ZONE,
}));

/*
  Sans cette ligne, declarer un domaine DESACTIVE l'adresse technique
  en `.workers.dev`. C'est le comportement par defaut de Cloudflare :
  il suppose qu'un site ayant un vrai domaine n'a plus besoin de son
  adresse de test.

  On la garde active : c'est le seul moyen de verifier qu'un
  deploiement fonctionne sans dependre du domaine — donc exactement ce
  dont on a besoin le jour ou le domaine, lui, ne repond plus.
*/
config.workers_dev = true;
writeFileSync(CONFIG, `${JSON.stringify(config, null, 2)}\n`, "utf8");

console.log(`[set-custom-domains] domaines declares : ${DOMAINES.join(", ")}`);
