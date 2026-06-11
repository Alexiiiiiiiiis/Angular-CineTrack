export const environment = {
  apiUrl: 'http://localhost:3000',
  // Activation/désactivation simple de la fonctionnalité Favoris.
  // À false : pas de lien nav, pas de badge cœur, /favorites redirige vers /tracks.
  features: {
    favorites: true,
  },
};
