const menuItems = [
  { title: "Accueil", href: "/" },
  {
    title: "Le Répertoire",
    href: "/repertoire",
    submenu: [
      {
        title: "Combloux - Megeve",
        items: [
          {
            title: "La ferme des Choseaux",
            href: "/repertoire/la-ferme-des-choseaux",
          },
        
        ],
      },

      {
        title: "Chamonix",
        items: [
          { title: "Chalet Sia", href: "/repertoire/chalet-sia" },
          { title: "Ecrin des Bossons", href: "/repertoire/ecrin-des-bossons" },
          { title: "Moussoux", href: "/repertoire/ecrin-des-bossons" },
          { title: "Soljanel", href: "/repertoire/ecrin-des-bossons" },
        ],
      },
      {
        title: "Les Houches",
        items: [
          { title: "Chalet Kieppi", href: "/repertoire/chalet-kieppi" },
          { title: "Le 1000", href: "/repertoire/le-splendide" },
          { title: "Bechar", href: "/repertoire/bechar" },
 
          {
            title: "Chalet des Eaux Rousses",
            href: "/repertoire/chalet-des-eaux-rousses",
          },
        ],
      },
      {
        title: "Saint Nicolas",
        items: [
          { title: "La ferme Picherie", href: "/repertoire/la-ferme-picherie" },
          { title: "L'anier rdc", href: "/repertoire/lanier-rdc" },
          { title: "L'anier 1 etage", href: "/repertoire/lanier-1-etage" },
        ],
      },
      {
        title: "Saint Gervais",
        items: [
          { title: "Chalet Remy", href: "/repertoire/chalet-remy" },
          {
            title: "La Ferme de Bionnassay",
            href: "/repertoire/la-ferme-de-bionnassay",
          },
        ],
      },
    ],
  },
  { title: "La Conciergerie", href: "/conciergerie" },
  { title: "Séminaire", href: "/seminaires" },
  {
    title: "Blog",
    href: "/blog",
    submenu: [
      {
        title: "Sortir à Megeve",
        items: [
          {
            title: "7 Jours pour Explorer le Massif du Mont-Blanc",
            href: "/blog/7-jours-pour-explorer-le-massif-du-mont-blanc",
          },
        ],
      },
      {
        title: "Sortir à Chamonix",
        items: [
          {
            title: "7 Jours pour Explorer le Massif du Mont-Blanc",
            href: "/blog/7-jours-pour-explorer-le-massif-du-mont-blanc",
          },
        ],
      },
      {
        title: "Sortir à Saint Nicolas",
        items: [],
      },
      {
        title: "Sortir à Saint Gervais",
        items: [
          {
            title: "7 Jours d’Aventure dans les Alpes",
            href: "/blog/7-jours-daventure-dans-les-alpes",
          },
          {
            title: "Un Paradis pour les Amateurs de Vélo",
            href: "/blog/un-paradis-pour-les-amateurs-de-velo",
          },
        ],
      },
    ],
  },
  { title: "Vente", href: "/vente" },
  { title: "Contact", href: "/contact" },
];

export default menuItems;
