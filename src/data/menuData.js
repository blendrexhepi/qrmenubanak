export const restaurantInfo = {
  name: "Bistro Verde",
  address: "128 Culinary Avenue, NY",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&h=100&q=80",
  coverImage:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&h=600&q=80",
  rating: 4.8,
  reviewCount: 1.2,
  openStatus: "Open until 10 PM",
  deliveryTime: "25-35 min",
  minOrder: 15,
};

export const categories = [
  {
    id: "starters",
    name: "Starters",
    subcategories: [
      { id: "hot", name: "Hot" },
      { id: "cold", name: "Cold" },
    ],
  },
  {
    id: "bowls",
    name: "Bowls",
    subcategories: [
      { id: "poke", name: "Poke" },
      { id: "grain", name: "Grain" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    subcategories: [
      { id: "beef", name: "Beef" },
      { id: "chicken", name: "Chicken" },
      { id: "veggie", name: "Veggie" },
    ],
  },
  { id: "mains", name: "Mains" },
  { id: "desserts", name: "Desserts" },
  {
    id: "drinks",
    name: "Drinks",
    subcategories: [
      { id: "coffee", name: "Coffee" },
      { id: "cold", name: "Cold Drinks" },
    ],
  },
];

export const menuItems = [
  // Starters
  {
    id: "1",
    categoryId: "starters",
    subcategoryId: "hot",
    name: "Crispy Calamari",
    description: "Lightly fried squid rings with lemon aioli.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 450,
  },
  {
    id: "77",
    categoryId: "starters",
    subcategoryId: "hot",
    name: "Crispy Calamari",
    description: "Lightly fried squid rings with lemon aioli.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 450,
  },
  {
    id: "88",
    categoryId: "starters",
    subcategoryId: "hot",
    name: "Crispy Calamari",
    description: "Lightly fried squid rings with lemon aioli.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 450,
  },
  {
    id: "71",
    categoryId: "starters",
    subcategoryId: "hot",
    name: "Crispy Calamari",
    description: "Lightly fried squid rings with lemon aioli.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 450,
  },
  {
    id: "2",
    categoryId: "starters",
    subcategoryId: "hot",
    name: "Truffle Fries",
    description: "Hand-cut fries with truffle oil & parmesan.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    calories: 380,
  },
  {
    id: "3",
    categoryId: "starters",
    subcategoryId: "cold",
    name: "Burrata Salad",
    description: "Fresh burrata, heirloom tomatoes, basil pesto.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80",
    calories: 320,
  },

  // Bowls
  {
    id: "4",
    categoryId: "bowls",
    subcategoryId: "poke",
    name: "Spicy Tuna Poke",
    description: "Fresh tuna, avocado, edamame, spicy mayo.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 520,
  },
  {
    id: "41",
    categoryId: "bowls",
    subcategoryId: "poke",
    name: "Spicy Tuna Poke",
    description: "Fresh tuna, avocado, edamame, spicy mayo.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 520,
  },
  {
    id: "42",
    categoryId: "bowls",
    subcategoryId: "poke",
    name: "Spicy Tuna Poke",
    description: "Fresh tuna, avocado, edamame, spicy mayo.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 520,
  },
  {
    id: "43",
    categoryId: "bowls",
    subcategoryId: "poke",
    name: "Spicy Tuna Poke",
    description: "Fresh tuna, avocado, edamame, spicy mayo.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 520,
  },

  {
    id: "5",
    categoryId: "bowls",
    subcategoryId: "grain",
    name: "Quinoa Power",
    description: "Roasted sweet potato, kale, chickpeas, tahini.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    calories: 410,
  },

  {
    id: "55",
    categoryId: "bowls",
    subcategoryId: "grain",
    name: "Quinoa Power",
    description: "Roasted sweet potato, kale, chickpeas, tahini.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    calories: 410,
  },
  {
    id: "51",
    categoryId: "bowls",
    subcategoryId: "grain",
    name: "Quinoa Power",
    description: "Roasted sweet potato, kale, chickpeas, tahini.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    calories: 410,
  },
  // Burgers
  {
    id: "8",
    categoryId: "burgers",
    subcategoryId: "beef",
    name: "Classic Cheese",
    description: "Angus beef, cheddar, lettuce, house sauce.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 850,
  },
  {
    id: "81",
    categoryId: "burgers",
    subcategoryId: "beef",
    name: "Classic Cheese",
    description: "Angus beef, cheddar, lettuce, house sauce.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 850,
  },
  {
    id: "82",
    categoryId: "burgers",
    subcategoryId: "beef",
    name: "Classic Cheese",
    description: "Angus beef, cheddar, lettuce, house sauce.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 850,
  },
  {
    id: "83",
    categoryId: "burgers",
    subcategoryId: "beef",
    name: "Classic Cheese",
    description: "Angus beef, cheddar, lettuce, house sauce.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    popular: true,
    calories: 850,
  },
  {
    id: "9",
    categoryId: "burgers",
    subcategoryId: "chicken",
    name: "Spicy Chicken",
    description: "Fried chicken, spicy slaw, pickles, chipotle.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1615551309522-288663169567?auto=format&fit=crop&w=600&q=80",
    spicy: true,
    calories: 780,
  },
  {
    id: "93",
    categoryId: "burgers",
    subcategoryId: "chicken",
    name: "Spicy Chicken",
    description: "Fried chicken, spicy slaw, pickles, chipotle.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1615551309522-288663169567?auto=format&fit=crop&w=600&q=80",
    spicy: true,
    calories: 780,
  },
  {
    id: "94",
    categoryId: "burgers",
    subcategoryId: "chicken",
    name: "Spicy Chicken",
    description: "Fried chicken, spicy slaw, pickles, chipotle.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1615551309522-288663169567?auto=format&fit=crop&w=600&q=80",
    spicy: true,
    calories: 780,
  },
  {
    id: "95",
    categoryId: "burgers",
    subcategoryId: "chicken",
    name: "Spicy Chicken",
    description: "Fried chicken, spicy slaw, pickles, chipotle.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1615551309522-288663169567?auto=format&fit=crop&w=600&q=80",
    spicy: true,
    calories: 780,
  },

  {
    id: "9b",
    categoryId: "burgers",
    subcategoryId: "veggie",
    name: "Beyond Burger",
    description: "Plant-based patty, avocado, vegan mayo.",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc3f3a2a?auto=format&fit=crop&w=600&q=80",
    calories: 620,
  },

  // Mains
  {
    id: "6",
    categoryId: "mains",
    name: "Grilled Salmon",
    description: "Atlantic salmon with asparagus & lemon butter.",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80",
    calories: 580,
  },
  {
    id: "7",
    categoryId: "mains",
    name: "Steak Frites",
    description: "Grass-fed ribeye with herb butter & fries.",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80",
    calories: 950,
  },

  // Desserts
  {
    id: "10",
    categoryId: "desserts",
    name: "Lava Cake",
    description: "Warm chocolate cake with vanilla ice cream.",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80",
    calories: 450,
  },
  {
    id: "11",
    categoryId: "desserts",
    name: "Berry Cheesecake",
    description: "NY style cheesecake with berry compote.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    calories: 380,
  },

  // Drinks
  {
    id: "12",
    categoryId: "drinks",
    subcategoryId: "cold",
    name: "Lemonade",
    description: "Freshly squeezed with mint.",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    calories: 120,
  },
  {
    id: "13",
    categoryId: "drinks",
    subcategoryId: "coffee",
    name: "Iced Matcha",
    description: "Premium matcha with oat milk.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    calories: 180,
  },
];
