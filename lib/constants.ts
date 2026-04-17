type SiteHours = {
  weekdays: string;
  weekends: string;
};

type SocialLinks = {
  instagram: string;
  facebook: string;
  tiktok: string;
};

type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: SiteHours;
  social: SocialLinks;
};

type NavLink = {
  label: string;
  href: string;
};

type MenuItemTag = "popular" | "new" | "vegan" | "seasonal";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: MenuItemTag[];
};

type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: 4 | 5;
  avatar: string;
};

type GalleryImageCategory = "interior" | "coffee" | "food" | "people";
type GalleryImageSpan = "wide" | "tall";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryImageCategory;
  span?: GalleryImageSpan;
};

type FeatureIcon = "Coffee" | "Flame" | "Heart" | "Clock";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: FeatureIcon;
};

type AboutStat = {
  value: string;
  label: string;
};

type AboutContent = {
  heading: string;
  subheading: string;
  paragraphs: [string, string];
  stats: [AboutStat, AboutStat, AboutStat, AboutStat];
};

const SITE_CONFIG: SiteConfig = {
  name: "Roast & Rest",
  tagline: "Crafted with passion since 2019",
  description:
    "Roast & Rest is a neighborhood craft coffee shop in the heart of Portland, where slow mornings and good conversations feel right at home. We hand-roast small batches and brew with care, so every cup is expressive, balanced, and unmistakably fresh. Step in for the warmth, stay for the ritual.",
  address: "42 Brew Street, Portland, OR 97201",
  phone: "+1 (503) 555-0142",
  email: "hello@roastandrest.com",
  hours: {
    weekdays: "7:00 AM — 9:00 PM",
    weekends: "8:00 AM — 10:00 PM",
  },
  social: {
    instagram: "https://instagram.com/roastandrest",
    facebook: "https://facebook.com/roastandrest",
    tiktok: "https://tiktok.com/@roastandrest",
  },
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "espresso",
    name: "Espresso",
    items: [
      {
        id: "classic-espresso",
        name: "Classic Espresso",
        description:
          "A tight, velvety double shot with a caramel finish and cocoa aroma.",
        price: 3.75,
        image: "/images/menu/classic-espresso.jpg",
        tags: ["popular"],
      },
      {
        id: "americano",
        name: "Americano",
        description:
          "Espresso stretched with hot water for a clean cup and bright sweetness.",
        price: 4.25,
        image: "/images/menu/americano.jpg",
      },
      {
        id: "cortado",
        name: "Cortado",
        description:
          "Equal parts espresso and silky milk—balanced, bold, and beautifully smooth.",
        price: 4.85,
        image: "/images/menu/cortado.jpg",
      },
      {
        id: "flat-white",
        name: "Flat White",
        description:
          "Microfoam-forward and rich, crafted to let the espresso stay in the spotlight.",
        price: 5.25,
        image: "/images/menu/flat-white.jpg",
        tags: ["popular"],
      },
      {
        id: "caramel-macchiato",
        name: "Caramel Macchiato",
        description:
          "Vanilla, espresso, and a warm caramel drizzle—sweet without losing depth.",
        price: 6.15,
        image: "/images/menu/caramel-macchiato.jpg",
        tags: ["seasonal"],
      },
      {
        id: "mocha",
        name: "Mocha",
        description:
          "House chocolate, espresso, and steamed milk—like dessert, but grown up.",
        price: 6.45,
        image: "/images/menu/mocha.jpg",
        tags: ["popular"],
      },
    ],
  },
  {
    id: "filter-pour-over",
    name: "Filter & Pour Over",
    items: [
      {
        id: "batch-brew",
        name: "Batch Brew",
        description:
          "Our daily house filter—sweet, consistent, and always freshly brewed.",
        price: 3.95,
        image: "/images/menu/batch-brew.jpg",
      },
      {
        id: "v60-pour-over",
        name: "V60 Pour Over",
        description:
          "Single-origin brewed to order, highlighting bright notes and a clean finish.",
        price: 6.75,
        image: "/images/menu/v60-pour-over.jpg",
        tags: ["popular"],
      },
      {
        id: "chemex",
        name: "Chemex",
        description:
          "A crisp, aromatic cup with a silky body—ideal for sharing at the table.",
        price: 7.25,
        image: "/images/menu/chemex.jpg",
      },
      {
        id: "aeropress",
        name: "Aeropress",
        description:
          "Smooth and full-bodied with soft acidity—brewed fast, finished clean.",
        price: 6.15,
        image: "/images/menu/aeropress.jpg",
        tags: ["new"],
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        description:
          "Slow-steeped overnight for chocolate notes, low acidity, and a refreshing bite.",
        price: 5.95,
        image: "/images/menu/cold-brew.jpg",
      },
      {
        id: "nitro-cold-brew",
        name: "Nitro Cold Brew",
        description:
          "Velvety, creamy, and naturally sweet—served on tap with a cascading finish.",
        price: 7.45,
        image: "/images/menu/nitro-cold-brew.jpg",
        tags: ["seasonal"],
      },
    ],
  },
  {
    id: "food-desserts",
    name: "Food & Desserts",
    items: [
      {
        id: "avocado-toast",
        name: "Avocado Toast",
        description:
          "Sourdough, smashed avocado, chili flakes, and lemon—fresh, bright, and satisfying.",
        price: 11.75,
        image: "/images/menu/avocado-toast.jpg",
        tags: ["popular"],
      },
      {
        id: "croissant",
        name: "Butter Croissant",
        description:
          "Flaky, golden layers with a tender center—baked fresh for that first bite crunch.",
        price: 5.95,
        image: "/images/menu/croissant.jpg",
      },
      {
        id: "banana-bread",
        name: "Brown Butter Banana Bread",
        description:
          "Moist, warmly spiced, and finished with toasted walnuts for extra depth.",
        price: 6.45,
        image: "/images/menu/banana-bread.jpg",
      },
      {
        id: "acai-bowl",
        name: "Açaí Bowl",
        description:
          "Açaí blend topped with granola, seasonal berries, and coconut—bright and energizing.",
        price: 12.50,
        image: "/images/menu/acai-bowl.jpg",
        tags: ["vegan"],
      },
      {
        id: "cinnamon-roll",
        name: "Cinnamon Roll",
        description:
          "Soft spirals with a buttery cinnamon center and a light vanilla glaze.",
        price: 6.85,
        image: "/images/menu/cinnamon-roll.jpg",
        tags: ["popular"],
      },
      {
        id: "matcha-cheesecake",
        name: "Matcha Cheesecake",
        description:
          "Creamy and delicate with a clean matcha finish—quietly indulgent, never heavy.",
        price: 8.75,
        image: "/images/menu/matcha-cheesecake.jpg",
        tags: ["seasonal", "new"],
      },
    ],
  },
];

const REVIEWS: Review[] = [
  {
    id: "avery-collins",
    name: "Avery Collins",
    role: "Coffee enthusiast",
    text: "Their single-origin V60 pour over completely changed how I think about coffee. The baristas actually walk you through the flavor notes without making it feel intimidating. I keep coming back to see what’s on the brewer this week.",
    rating: 5,
    avatar: "/images/avatars/avery-collins.jpg",
  },
  {
    id: "maya-thompson",
    name: "Maya Thompson",
    role: "Regular customer",
    text: "The flat white here is my comfort order—perfect texture, never too hot, and the espresso always tastes fresh. I love that the space feels calm even when it’s busy. It’s my go-to spot for a quiet hour with a book.",
    rating: 5,
    avatar: "/images/avatars/maya-thompson.jpg",
  },
  {
    id: "ethan-park",
    name: "Ethan Park",
    role: "Remote worker",
    text: "I usually camp out for a couple hours and it’s consistently easy: great Wi‑Fi, plenty of outlets, and no pressure to rush. The batch brew is surprisingly good—clean and sweet, not an afterthought. Bonus points for staff who actually remember your name.",
    rating: 5,
    avatar: "/images/avatars/ethan-park.jpg",
  },
  {
    id: "sierra-nguyen",
    name: "Sierra Nguyen",
    role: "Local artist",
    text: "The mocha tastes like real chocolate, not syrup, and it pairs dangerously well with their cinnamon roll. The lighting and music are always on point—warm, not loud. It’s the kind of place you end up sketching in without planning to.",
    rating: 5,
    avatar: "/images/avatars/sierra-nguyen.jpg",
  },
  {
    id: "jordan-reed",
    name: "Jordan Reed",
    role: "Weekend bruncher",
    text: "We stopped in after the farmers market and split a Chemex at the table—so smooth and aromatic. The avocado toast is legit, with just enough lemon and heat. It felt like a small ritual, not just grabbing coffee.",
    rating: 5,
    avatar: "/images/avatars/jordan-reed.jpg",
  },
  {
    id: "olivia-martinez",
    name: "Olivia Martinez",
    role: "Neighborhood resident",
    text: "I’m picky about cold brew and theirs is the first one in town that isn’t overly bitter. The nitro version is ridiculously creamy and somehow still tastes bright. I’ve had one off day with a rushed drink, but they fixed it immediately and kindly.",
    rating: 4,
    avatar: "/images/avatars/olivia-martinez.jpg",
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800&q=80&fm=webp&fit=crop",
    alt: "Inside our warm, inviting space",
    category: "interior",
    span: "wide",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1579265898841-79c7890d69cf?w=800&q=80&fm=webp&fit=crop",
    alt: "The art of coffee making",
    category: "coffee",
    span: "tall",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1729277133095-bff46b56c29a?w=800&q=80&fm=webp&fit=crop",
    alt: "Crafted with care, every cup",
    category: "coffee",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1553742198-6eea5ac42a24?w=800&q=80&fm=webp&fit=crop",
    alt: "Our cozy coffee corner",
    category: "coffee",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1534432182912-63863115e106?w=800&q=80&fm=webp&fit=crop",
    alt: "Fresh flavors, daily specials",
    category: "food",
    span: "wide",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1641209751671-d1cd7bedcd86?w=800&q=80&fm=webp&fit=crop",
    alt: "Made with the finest ingredients",
    category: "food",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1710880694444-970aaf7e7f97?w=800&q=80&fm=webp&fit=crop",
    alt: "Where community meets coffee",
    category: "people",
    span: "tall",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80&fm=webp&fit=crop",
    alt: "Every detail tells a story",
    category: "interior",
  },
];

const FEATURES: Feature[] = [
  {
    id: "single-origin-beans",
    title: "Single-Origin Beans",
    description:
      "Rotating selections from trusted producers, sourced for clarity, sweetness, and character.",
    icon: "Coffee",
  },
  {
    id: "hand-roasted-daily",
    title: "Hand Roasted Daily",
    description:
      "Small-batch roasting every day, so your espresso tastes vibrant and your pour over stays expressive.",
    icon: "Flame",
  },
  {
    id: "community-first",
    title: "Community First",
    description:
      "A welcoming room for neighbors, creatives, and curious coffee drinkers—always warm, never rushed.",
    icon: "Heart",
  },
  {
    id: "thoughtful-service",
    title: "Thoughtful Service",
    description:
      "We’ll happily recommend a brew method, explain tasting notes, or help you find your new favorite.",
    icon: "Clock",
  },
];

const ABOUT_CONTENT: AboutContent = {
  heading: "Our Story",
  subheading: "From bean to cup, every detail matters",
  paragraphs: [
    "Roast & Rest began in 2019 with a simple idea: make specialty coffee feel inviting. We started as a tiny Portland corner shop, roasting after hours and dialing in recipes before sunrise—chasing cups that tasted honest, balanced, and alive.",
    "Today we’re still hands-on. We roast in small batches, brew with precision, and keep the room warm and unhurried—because great coffee is as much about atmosphere as it is about beans. Whether you’re here for a quick cortado or a slow Chemex with friends, you’re part of the community we’re building.",
  ],
  stats: [
    { value: "2019", label: "Founded" },
    { value: "12+", label: "Bean Origins" },
    { value: "50K+", label: "Cups Served" },
    { value: "4.9", label: "Avg Rating" },
  ],
};

export {
  SITE_CONFIG,
  NAV_LINKS,
  MENU_CATEGORIES,
  REVIEWS,
  GALLERY_IMAGES,
  FEATURES,
  ABOUT_CONTENT,
};

export type {
  AboutContent,
  AboutStat,
  Feature,
  FeatureIcon,
  GalleryImage,
  GalleryImageCategory,
  GalleryImageSpan,
  MenuCategory,
  MenuItem,
  MenuItemTag,
  NavLink,
  Review,
  SiteConfig,
  SiteHours,
  SocialLinks,
};
