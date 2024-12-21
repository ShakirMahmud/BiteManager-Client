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
    foodImage: "https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp",
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
    totalSaleInThisMonth: faker.number.int({ min: 10, max: 200 }),
    preparationTime: `${faker.number.int({ min: 10, max: 60 })} minutes`,
    isVegetarian: faker.datatype.boolean(),
  });
}

fs.writeFileSync('foods.json', JSON.stringify(data, null, 2));
console.log('Meaningful fake data generated and saved to foods.json');
