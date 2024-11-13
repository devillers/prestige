// app/api/sections/route.js

export async function GET(request) {
  console.log('API route accessed:', request.url); // Log API route access

  const data = [
    {
      id: 'home',
      title: 'Bienvenue',
      content: 'chez Care Prestige',
      component: null,
      image: '/images/image.png',
    },
    {
      id: 'collection',
      title: 'La Collection',
      content: 'Nos biens préférés',
      component: 'accommodationlist', // Ensure lowercase
      image: null,
    },
    {
      id: 'services',
      title: 'Nos Services',
      content: 'de conciergerie',
      component: 'services', // Lowercase
      image: null,
    },
    {
      id: 'blog',
      title: 'Blog',
      content: 'astuces',
      component: 'blog', // Changed to lowercase
      image: null,
    },
    {
      id: 'contact',
      title: 'Contactez-nous',
      content: 'Notre formulaire',
      component: 'contact', // Lowercase
      image: null,
    },
  ];

  console.log('Returning data:', data); // Log the data being returned

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
