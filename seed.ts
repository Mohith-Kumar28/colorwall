import { getPayload } from "payload";
import configPromise from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Oil Paintings",
    color: "#8B4513",
    slug: "oil-paintings",
    subcategories: [
      { name: "Traditional Oil", slug: "traditional-oil" },
      { name: "Impressionist", slug: "impressionist-oil" },
      { name: "Realism", slug: "realism-oil" },
      { name: "Classical Portraits", slug: "classical-portraits" },
      { name: "Still Life", slug: "still-life-oil" },
    ],
  },
  {
    name: "Watercolor",
    color: "#87CEEB",
    slug: "watercolor",
    subcategories: [
      { name: "Landscape Watercolor", slug: "landscape-watercolor" },
      { name: "Floral Watercolor", slug: "floral-watercolor" },
      { name: "Abstract Watercolor", slug: "abstract-watercolor" },
      { name: "Portrait Watercolor", slug: "portrait-watercolor" },
      { name: "Botanical", slug: "botanical-watercolor" },
    ],
  },
  {
    name: "Acrylic Paintings",
    color: "#FF6B6B",
    slug: "acrylic-paintings",
    subcategories: [
      { name: "Modern Acrylic", slug: "modern-acrylic" },
      { name: "Pop Art", slug: "pop-art" },
      { name: "Textured Acrylic", slug: "textured-acrylic" },
      { name: "Palette Knife", slug: "palette-knife" },
      { name: "Mixed Media", slug: "mixed-media-acrylic" },
    ],
  },
  {
    name: "Abstract Art",
    color: "#9B59B6",
    slug: "abstract-art",
    subcategories: [
      { name: "Geometric Abstract", slug: "geometric-abstract" },
      { name: "Expressionism", slug: "expressionism" },
      { name: "Minimalist", slug: "minimalist-abstract" },
      { name: "Color Field", slug: "color-field" },
      { name: "Fluid Art", slug: "fluid-art" },
    ],
  },
  {
    name: "Portraits",
    color: "#E67E22",
    slug: "portraits",
    subcategories: [
      { name: "Commissioned Portraits", slug: "commissioned-portraits" },
      { name: "Pet Portraits", slug: "pet-portraits" },
      { name: "Family Portraits", slug: "family-portraits" },
      { name: "Self Portraits", slug: "self-portraits" },
      { name: "Celebrity Art", slug: "celebrity-art" },
    ],
  },
  {
    name: "Landscapes",
    color: "#27AE60",
    slug: "landscapes",
    subcategories: [
      { name: "Mountain Scenes", slug: "mountain-scenes" },
      { name: "Seascapes", slug: "seascapes" },
      { name: "Cityscapes", slug: "cityscapes" },
      { name: "Rural Landscapes", slug: "rural-landscapes" },
      { name: "Sunset & Sunrise", slug: "sunset-sunrise" },
    ],
  },
  {
    name: "Digital Art",
    color: "#3498DB",
    slug: "digital-art",
    subcategories: [
      { name: "Digital Paintings", slug: "digital-paintings" },
      { name: "Digital Illustrations", slug: "digital-illustrations" },
      { name: "NFT Art", slug: "nft-art" },
      { name: "Concept Art", slug: "concept-art" },
      { name: "Fan Art", slug: "fan-art" },
    ],
  },
  {
    name: "Sketches & Drawings",
    color: "#34495E",
    slug: "sketches-drawings",
    subcategories: [
      { name: "Pencil Drawings", slug: "pencil-drawings" },
      { name: "Charcoal Art", slug: "charcoal-art" },
      { name: "Ink Drawings", slug: "ink-drawings" },
      { name: "Pastel Art", slug: "pastel-art" },
      { name: "Graphite", slug: "graphite" },
    ],
  },
  {
    name: "Indian Art",
    color: "#FF9933",
    slug: "indian-art",
    subcategories: [
      { name: "Madhubani", slug: "madhubani" },
      { name: "Warli Art", slug: "warli-art" },
      { name: "Tanjore Paintings", slug: "tanjore-paintings" },
      { name: "Kalamkari", slug: "kalamkari" },
      { name: "Miniature Paintings", slug: "miniature-paintings" },
      { name: "Pattachitra", slug: "pattachitra" },
    ],
  },
  {
    name: "Contemporary Art",
    color: "#1ABC9C",
    slug: "contemporary-art",
    subcategories: [
      { name: "Modern Sculptures", slug: "modern-sculptures" },
      { name: "Installation Art", slug: "installation-art" },
      { name: "Street Art Style", slug: "street-art-style" },
      { name: "Surrealism", slug: "surrealism" },
      { name: "Cubism", slug: "cubism" },
    ],
  },
  {
    name: "Nature & Wildlife",
    color: "#2ECC71",
    slug: "nature-wildlife",
    subcategories: [
      { name: "Birds", slug: "birds-art" },
      { name: "Animals", slug: "animals-art" },
      { name: "Flowers", slug: "flowers-art" },
      { name: "Trees & Forests", slug: "trees-forests" },
      { name: "Marine Life", slug: "marine-life" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
];

const seed = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  // Create Admin User
  const existingAdmin = await payload.find({
    collection: "users",
    where: { email: { equals: "admin@admin.com" } },
    limit: 1,
  });
  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@admin.com",
        password: "password",
        username: "admin",
        roles: ["super-admin"],
      },
    });
    console.log("Created admin user: admin@admin.com");
  } else {
    console.log("Admin user already exists, skipping creation");
  }
  // Delete all existing categories before seeding new ones
  console.log("Deleting existing categories...");
  await payload.delete({
    collection: "categories",
    where: {
      id: { exists: true },
    },
  });
  console.log("Existing categories deleted");

  // Create categories
  console.log("Creating new categories...");
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seed completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error during seed:", error);
  process.exit(1);
}
