export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const types = searchParams.getAll('type_bien')
    const villes = searchParams.getAll('ville')
    const prixMax = searchParams.get('prix_max')
  
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
    const resWP = await fetch(`${baseUrl}/wp-json/wp/v2/vente_immo?_embed&per_page=100`)
    if (!resWP.ok) {
      return new Response(JSON.stringify({ error: 'Erreur WordPress' }), {
        status: 500,
      })
    }
  
    let data = await resWP.json()
  
    // 🔎 Filtres
    if (types.length > 0) {
      data = data.filter((item) =>
        item.type_bien?.some((term) => types.includes(term.slug))
      )
    }
  
    if (villes.length > 0) {
      data = data.filter((item) => villes.includes(item.ville))
    }
  
    if (prixMax) {
      const max = parseFloat(prixMax)
      data = data.filter((item) => parseFloat(item.prix_vente) <= max)
    }
  
    return new Response(JSON.stringify(data), { status: 200 })
  }
  