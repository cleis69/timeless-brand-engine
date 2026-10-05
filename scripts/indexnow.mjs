/**
 * ULTRA VISION — signalement des pages a Bing (IndexNow).
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL A LA FIN DE `npm run deploy`.
 * ============================================================
 *
 * CE QU'IL FAIT
 *
 * Une fois le site en ligne, il lit le sitemap publie et envoie toutes
 * ses adresses a IndexNow : Bing (et les moteurs qui l'utilisent, dont
 * la recherche de ChatGPT) apprend dans l'heure qu'une page est nouvelle
 * ou a change, au lieu d'attendre son prochain passage.
 *
 * LA CLE
 *
 * IndexNow verifie que le site nous appartient en lisant un fichier
 * texte a la racine, nomme d'apres la cle et qui la contient :
 * public/53d65cf0ecda2eb8dd19552cb10373e7.txt. Ce n'est pas un secret : n'importe qui peut le
 * lire, il prouve seulement que l'envoi vient du proprietaire du site.
 * Si tu changes la cle ici, renomme le fichier et change son contenu.
 *
 * IL NE BLOQUE JAMAIS LE DEPLOIEMENT
 *
 * Le site est deja en ligne quand ce script tourne. S'il echoue (pas de
 * reseau, IndexNow indisponible), il le dit et s'arrete sans erreur :
 * les pages seront decouvertes par le sitemap, simplement moins vite.
 */

const SITE = "https://ultravisionagency.com";
const KEY = "53d65cf0ecda2eb8dd19552cb10373e7";

try {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap : HTTP ${res.status}`);
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(SITE) && !/\.(mp4|jpe?g|png|webp)$/i.test(u));
  if (!urlList.length) throw new Error("aucune page dans le sitemap");

  const ping = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 : recu ; 202 : recu, cle en cours de verification (premier envoi).
  if (ping.status === 200 || ping.status === 202) {
    console.log(`[indexnow] ${urlList.length} pages signalees a Bing (HTTP ${ping.status}).`);
  } else {
    console.warn(`[indexnow] refuse (HTTP ${ping.status}) : ${await ping.text()}`);
  }
} catch (e) {
  console.warn(`[indexnow] non envoye : ${e.message}. Le site est en ligne ; Bing passera par le sitemap.`);
}
