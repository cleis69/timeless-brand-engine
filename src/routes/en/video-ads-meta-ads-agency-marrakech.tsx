import { createFileRoute } from "@tanstack/react-router";
import { VideoMetaAdsPage, videoMetaAdsHead } from "@/pages/VideoMetaAds";

/** Video ads + Meta Ads offer page, in English. Content: src/pages/VideoMetaAds.tsx. */
export const Route = createFileRoute("/en/video-ads-meta-ads-agency-marrakech")({
  head: () => videoMetaAdsHead("en"),
  component: VideoMetaAdsPage,
});
