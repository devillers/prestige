// app/repertoire/[slug]/page.js
import PortfolioClient from "../PortfolioClient";

export default function RepertoireDetailPage({ params }) {
  // params.slug comes from the URL /repertoire/<slug>
  return <PortfolioClient initialSlug={params.slug} />;
}
