/* Tiny blur placeholder for next/image loading state */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABv/EACIQAAEDAgUFAAAAAAAAAAAAAAECAxEABAUGEiExQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AjnM+YMRp8Ut7a1unba3YfLbTbLhSNKTp1EC4knfgCnSlKD//2Q==";

/* ── Hero ── */
export const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&q=80&fm=webp&fit=crop",
  alt: "Dark atmospheric coffee shop interior with warm lighting",
};

/* ── About ── */
export const ABOUT_IMAGES = {
  main: {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&fm=webp&fit=crop",
    alt: "Barista carefully pouring latte art",
  },
  secondary: {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&fm=webp&fit=crop",
    alt: "Coffee beans being roasted in a traditional roaster",
  },
};

/* ── Menu item images keyed by item id ── */
export const MENU_IMAGES: Record<string, string> = {
  "classic-espresso":
    "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=75&fm=webp&fit=crop",
  "caramel-macchiato":
    "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&q=75&fm=webp&fit=crop",
  "flat-white":
    "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=75&fm=webp&fit=crop",
  mocha:
    "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=75&fm=webp&fit=crop",
  americano:
    "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&q=75&fm=webp&fit=crop",
  cortado:
    "https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=600&q=75&fm=webp&fit=crop",
  "v60-pour-over":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=75&fm=webp&fit=crop",
  chemex:
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=75&fm=webp&fit=crop",
  "cold-brew":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=75&fm=webp&fit=crop",
  aeropress:
    "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=75&fm=webp&fit=crop",
  "batch-brew":
    "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=75&fm=webp&fit=crop",
  "nitro-cold-brew":
    "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&q=75&fm=webp&fit=crop",
  "avocado-toast":
    "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=75&fm=webp&fit=crop",
  "banana-bread":
    "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=75&fm=webp&fit=crop",
  croissant:
    "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=75&fm=webp&fit=crop",
  "acai-bowl":
    "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=75&fm=webp&fit=crop",
  "cinnamon-roll":
    "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=75&fm=webp&fit=crop",
  "matcha-cheesecake":
    "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&q=75&fm=webp&fit=crop",
};

/* Fallback for missing menu images */
export const MENU_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=75&fm=webp&fit=crop";

/* ── Map / Contact ── */
export const MAP_IMAGE = {
  src: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=75&fm=webp&fit=crop",
  alt: "Coffee shop exterior view",
};
