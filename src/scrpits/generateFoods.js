import { faker } from '@faker-js/faker';
import fs from 'fs';

const foodNames = [
  "Caesar Salad", "Margherita Pizza", "Chocolate Brownie", "Chicken Biryani",
  "Vegetable Stir Fry", "Spaghetti Carbonara", "Margarita Cocktail", 
  "Tomato Soup", "Grilled Cheese Sandwich", "Pancakes", "Sushi Roll", 
  "Tacos", "Buffalo Wings", "Cheeseburger", "Vanilla Ice Cream",
  "French Fries", "Egg Fried Rice", "Chicken Alfredo", "Crispy Spring Rolls",
  "Veggie Wrap"
];

const foodImages = {
  "Egg Fried Rice": "https://i.ibb.co/WgH2N9Q/Egg-Fried-Rice.png",
  "Buffalo Wings": "https://i.ibb.co/QjX0pJG/Buffalo-Wings.png",
  "Tacos": "https://i.ibb.co/VBcWLSx/Tacos.png",
  "Grilled Cheese Sandwich": "https://i.ibb.co/mGVCdxG/Grilled-Cheese-Sandwich.png",
  "Tomato Soup": "https://i.ibb.co/VxJD6Xk/Tomato-Soup.png",
  "Margarita Cocktail": "https://i.ibb.co/cTtwFCF/Margarita-Cocktail.png",
  "Spaghetti Carbonara": "https://i.ibb.co/kgvND2k/Spaghetti-Carbonara.png",
  "Margherita Pizza": "https://i.ibb.co/Q8f5hP8/Margherita-Pizza.png",
  "Caesar Salad": "https://i.ibb.co/zXW4RgC/Caesar-Salad.png",
  "Vanilla Ice Cream": "https://i.ibb.co/K0pMjWN/Vanilla-Ice-Cream.png",
  "Veggie Wrap": "https://i.ibb.co/H2DyJzb/Veggie-Wrap.png",
  "Vegetable Stir Fry": "https://i.ibb.co/VpqjHpk/Vegetable-Stir-Fry.png",
  "Cheeseburger": "https://i.ibb.co/CwF4hKX/Cheeseburger.png",
  "French Fries": "https://i.ibb.co/6PJjp56/French-Fries.png",
  "Chicken Biryani": "https://i.ibb.co/WDG2x6W/Chicken-Biryani.png",
  "Pancakes": "https://i.ibb.co/f9T8BkK/Pancakes.png",
  "Chicken Alfredo": "https://i.ibb.co/rmgyQfp/Chicken-Alfredo.png",
  "Sushi Roll": "https://i.ibb.co/q9CZc2D/Sushi-Roll.png",
  "Chocolate Brownie": "https://i.ibb.co/qnYNK49/Chocolate-Brownie.png",
  "Crispy Spring Rolls": "https://i.ibb.co/gdxL4fr/Crispy-Spring-Rolls.png"
};

const users = [
  { name: "Shakir", email: "shakir@gmail.com" },
  { name: "Shakir Mahmud", email: "shakirmahmud44@gmail.com" },
  { name: "Shakir Mahmud", email: "shakirmahmud50@gmail.com" },
  { name: "Rasel", email: "rasel@gmail.com" },
];

const categories = ["Salad", "Main Course", "Dessert", "Beverage", "Soup", "Pizza", "Pasta"];
const predefinedData = {
  Salad: {
    description: "Fresh and healthy salad with a mix of vegetables and delicious dressing.",
    ingredients: ["Lettuce", "Cucumber", "Tomatoes", "Olive oil"],
    procedure: "Chop all vegetables. Mix with dressing and serve fresh.",
  },
  "Main Course": {
    description: "A satisfying main course featuring a protein-rich and well-balanced meal.",
    ingredients: ["Chicken", "Rice", "Spices", "Vegetables"],
    procedure: "Cook chicken with spices. Serve with rice and fresh vegetables.",
  },
  Dessert: {
    description: "Sweet and delightful dessert to end your meal on a high note.",
    ingredients: ["Chocolate", "Cream", "Sugar", "Vanilla"],
    procedure: "Mix ingredients, bake or refrigerate, and serve chilled.",
  },
  Beverage: {
    description: "Refreshing beverage to quench your thirst.",
    ingredients: ["Water", "Lemon", "Mint", "Sugar"],
    procedure: "Mix all ingredients in a pitcher. Serve cold.",
  },
  Soup: {
    description: "Warm and comforting soup made with fresh ingredients.",
    ingredients: ["Carrots", "Onions", "Celery", "Chicken broth"],
    procedure: "Simmer all ingredients together until cooked. Serve hot.",
  },
  Pizza: {
    description: "Cheesy and flavorful pizza topped with fresh ingredients.",
    ingredients: ["Pizza base", "Cheese", "Tomato sauce", "Toppings"],
    procedure: "Spread sauce on the base, add toppings, bake, and serve.",
  },
  Pasta: {
    description: "Classic pasta dish with a rich and creamy sauce.",
    ingredients: ["Pasta", "Cream", "Cheese", "Garlic"],
    procedure: "Cook pasta. Toss with sauce and serve hot.",
  },
};

const data = [];

for (let i = 0; i < 100; i++) {
  const user = faker.helpers.arrayElement(users);
  const category = faker.helpers.arrayElement(categories);
  const foodData = predefinedData[category];
  const foodName = faker.helpers.arrayElement(foodNames);

  data.push({
    foodName: foodName,
    foodImage: foodImages[foodName] || "https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp", // Default image
    foodCategory: category,
    quantity: faker.number.int({ min: 0, max: 20 }),
    price: faker.number.int({ min: 5, max: 50 }),
    addedBy: user,
    foodOrigin: faker.address.country(),
    description: foodData.description,
    ingredients: foodData.ingredients,
    makingProcedure: foodData.procedure,
    nutritionFacts: {
      calories: faker.number.int({ min: 150, max: 500 }),
      protein: faker.number.int({ min: 5, max: 50 }),
      carbs: faker.number.int({ min: 10, max: 100 }),
      fat: faker.number.int({ min: 5, max: 50 }),
    },
    purchaseCount: faker.number.int({ min: 0, max: 0 }),
    preparationTime: `${faker.number.int({ min: 10, max: 60 })} minutes`,
    isVegetarian: faker.datatype.boolean(),
  });
}

fs.writeFileSync('foods.json', JSON.stringify(data, null, 2));
console.log('Meaningful fake data generated and saved to foods.json');
