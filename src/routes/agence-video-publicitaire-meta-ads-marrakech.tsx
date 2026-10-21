import { createFileRoute } from "@tanstack/react-router";
import { VideoMetaAdsPage, videoMetaAdsHead } from "@/pages/VideoMetaAds";

/** Page d'offre video + Meta Ads, en francais. Le contenu : src/pages/VideoMetaAds.tsx. */
export const Route = createFileRoute("/agence-video-publicitaire-meta-ads-marrakech")({
  head: () => videoMetaAdsHead("fr"),
  component: VideoMetaAdsPage,
});
