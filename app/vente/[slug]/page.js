import Image from "next/image";
import Link from "next/link";
import Carousel from "../../components/Carrousel";

async function getVenteBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/vente_immo?slug=${slug}&_embed`
  );
  if (!res.ok) throw new Error("Failed to fetch bien");
  const data = await res.json();
  return data[0];
}

export default async function VenteSinglePage({ params }) {
  const item = await getVenteBySlug(params.slug);

  if (!item) return <p>Bien introuvable.</p>;

  const {
    title,
    content,
    _embedded,
    ville,
    surface,
    chambres,
    salles_de_bain,
    surface_terrain,
    prix_vente,
    lien_swixim,
    gallery_images = [],
  } = item;

  const featuredImage = _embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const allImages = featuredImage
    ? [{ url: featuredImage }, ...gallery_images]
    : gallery_images;

  const formatPrix = (value) => {
    return new Intl.NumberFormat("fr-FR").format(value);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow mt-6 rounded-lg">
      {/* 🔖 LOGO + Bouton retour */}
      <div className="mb-6 flex justify-between items-center">
        <Link href="/vente" className="text-[#bd9254]  font-thin">
          ← Retour aux biens
        </Link>
        <Image
          src="/logo-swixim.svg"
          alt="Logo Conciergerie"
          width={130}
          height={130}
          className="object-contain rounded-t-lg "
        />
      </div>

      {/* 🖼️ CARROUSEL */}
      {allImages.length > 0 && (
        <div className="relative w-full aspect-video overflow-hidden mb-6">
          <div className="w-full h-full rounded-t-lg overflow-hidden">
            <Carousel images={allImages} />
          </div>
        </div>
      )}

      {/* 🧾 DESCRIPTION */}
      <h1 className="text-3xl font-thin my-4 md:p-4">{title.rendered}</h1>

      <div className="flex flex-row mb-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:items-center">
          <div className="md:ml-16 ">
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              Ville : <span className="font-thin text-black">{ville}</span>
            </p>
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              Surface :{" "}
              <span className="font-thin text-black">{surface} m²</span>
            </p>
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              Chambres :{" "}
              <span className="font-thin text-black">{chambres}</span>
            </p>
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              SDB :{" "}
              <span className="font-thin text-black">{salles_de_bain}</span>
            </p>
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              Terrain :{" "}
              <span className="font-thin text-black">{surface_terrain} m²</span>
            </p>
            <p className="font-semibold uppercase text-xs leading-6 text-[#bd9254]">
              Prix :{" "}
              <span className="font-thin text-black">
                {formatPrix(prix_vente)} €
              </span>
            </p>
          </div>

          <div
            className="prose prose-neutral max-w-none  font-thin md:p-4 text-justify text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: content.rendered }}
          />

          {/* 🔗 SWIXIM */}
        
        </div>
        
      </div>
      {lien_swixim && (
            <Link
              href={lien_swixim}
              className="inline-flex items-center justify-center px-4 h-[30px] font-thin md:ml-4 border border-[#bd9254] text-sm uppercase text-[#bd9254] rounded-full transition-all duration-200 hover:bg-red-600 hover:text-white active:scale-95"
              target="_blank"
            >
              Voir sur Swixim
            </Link>
          )}
    </div>
  );
}
