export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export const activities: Activity[] = [
  {
    id: 'matcha-tastings',
    title: 'Matcha Tastings',
    description: 'Sample a variety of premium matcha teas from Japan, each with unique flavor profiles and brewing techniques. Our tea experts will guide you through the tasting experience.',
    icon: 'tea-cup',
    order: 1
  },
  {
    id: 'yoga-classes',
    title: 'Yoga Classes',
    description: 'Join our energizing yoga sessions designed for all skill levels. Experience the perfect blend of movement and mindfulness, complemented by matcha refreshments.',
    icon: 'yoga',
    order: 2
  },
  {
    id: 'matcha-bakery',
    title: 'Matcha Bakery',
    description: 'Indulge in delicious matcha-infused pastries, cakes, and cookies created by local artisan bakers. Learn baking tips and take home recipes to recreate these treats.',
    icon: 'bakery',
    order: 3
  },
  {
    id: 'live-music',
    title: 'Live Music',
    description: 'Enjoy ambient tunes from local musicians throughout the day, creating the perfect atmosphere for relaxation and socializing with fellow matcha enthusiasts.',
    icon: 'music',
    order: 4
  }
];