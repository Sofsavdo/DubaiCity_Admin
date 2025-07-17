import { storage } from "./storage";

// Empire levels from game data
const empireLevels = [
  { level: 1, name: "Yangi Kelgan", nameUz: "Yangi Kelgan", nameRu: "Новичок", requiredCoins: 0, hourlyIncome: 0 },
  { level: 2, name: "Shahzoda", nameUz: "Shahzoda", nameRu: "Принц", requiredCoins: 10000, hourlyIncome: 100 },
  { level: 3, name: "Biznesmen", nameUz: "Biznesmen", nameRu: "Бизнесмен", requiredCoins: 50000, hourlyIncome: 500 },
  { level: 4, name: "Millioner", nameUz: "Millioner", nameRu: "Миллионер", requiredCoins: 250000, hourlyIncome: 2500 },
  { level: 5, name: "Multi-Millioner", nameUz: "Multi-Millioner", nameRu: "Мульти-миллионер", requiredCoins: 1000000, hourlyIncome: 10000 },
  { level: 6, name: "Oli Daraja", nameUz: "Oli Daraja", nameRu: "Высокий Ранг", requiredCoins: 5000000, hourlyIncome: 50000 },
  { level: 7, name: "Biznes Imperatori", nameUz: "Biznes Imperatori", nameRu: "Бизнес Император", requiredCoins: 25000000, hourlyIncome: 250000 },
  { level: 8, name: "Sheyx", nameUz: "Sheyx", nameRu: "Шейх", requiredCoins: 100000000, hourlyIncome: 1000000 },
  { level: 9, name: "Dubai Shahzodasi", nameUz: "Dubai Shahzodasi", nameRu: "Принцесса Дубая", requiredCoins: 500000000, hourlyIncome: 5000000 },
  { level: 10, name: "Burj Khalifa Egasi", nameUz: "Burj Khalifa Egasi", nameRu: "Владелец Бурдж Халифа", requiredCoins: 2500000000, hourlyIncome: 25000000 },
  { level: 11, name: "Emirat Shahzodasi", nameUz: "Emirat Shahzodasi", nameRu: "Принцесса Эмиратов", requiredCoins: 10000000000, hourlyIncome: 100000000 },
  { level: 12, name: "Dubai Hakimi", nameUz: "Dubai Hakimi", nameRu: "Правитель Дубая", requiredCoins: 50000000000, hourlyIncome: 500000000 },
  { level: 13, name: "UAE Shahzodasi", nameUz: "UAE Shahzodasi", nameRu: "Принцесса ОАЭ", requiredCoins: 250000000000, hourlyIncome: 2500000000 },
  { level: 14, name: "Dubai Shohi", nameUz: "Dubai Shohi", nameRu: "Король Дубая", requiredCoins: 1000000000000, hourlyIncome: 10000000000 }
];

// Sample tasks
const tasks = [
  {
    title: "Follow Telegram Channel",
    titleUz: "Telegram kanalga obuna bo'ling",
    titleRu: "Подписаться на Telegram канал",
    description: "Follow our official Telegram channel for updates",
    type: "telegram",
    url: "https://t.me/DubaiCity_live",
    reward: 1000,
    isActive: true
  },
  {
    title: "Watch YouTube Video",
    titleUz: "YouTube videoni ko'ring",
    titleRu: "Посмотреть YouTube видео",
    description: "Watch our promotional video and enter the code",
    type: "youtube",
    url: "https://youtube.com/example",
    reward: 2000,
    isActive: true
  },
  {
    title: "Follow Instagram",
    titleUz: "Instagram sahifani kuzatib boring",
    titleRu: "Подписаться на Instagram",
    description: "Follow our Instagram page for exclusive content",
    type: "instagram",
    url: "https://instagram.com/dubaiCity",
    reward: 1500,
    isActive: true
  },
  {
    title: "Twitter Follow",
    titleUz: "Twitter da kuzatib boring",
    titleRu: "Подписаться на Twitter",
    description: "Follow us on Twitter for latest news",
    type: "twitter",
    url: "https://twitter.com/dubaiCity",
    reward: 1200,
    isActive: true
  }
];

// Sample skins
const skins = [
  {
    name: "Classic Avatar",
    nameUz: "Klassik Avatar",
    nameRu: "Классический Аватар",
    description: "Default character skin",
    price: 1000,
    rarity: "common",
    category: "character",
    imageUrl: "/images/skins/classic.png",
    isActive: true
  },
  {
    name: "Business Suit",
    nameUz: "Biznes Kostyumi",
    nameRu: "Деловой Костюм",
    description: "Professional business outfit",
    price: 15000,
    rarity: "rare",
    category: "character",
    imageUrl: "/images/skins/business.png",
    isActive: true
  },
  {
    name: "Golden Sword",
    nameUz: "Oltin Qilich",
    nameRu: "Золотой Меч",
    description: "Legendary golden weapon",
    price: 100000,
    rarity: "legendary",
    category: "weapon",
    imageUrl: "/images/skins/golden-sword.png",
    isActive: true
  },
  {
    name: "Dubai Skyline",
    nameUz: "Dubai Manzarasi",
    nameRu: "Панорама Дубая",
    description: "Beautiful Dubai city background",
    price: 25000,
    rarity: "epic",
    category: "background",
    imageUrl: "/images/skins/dubai-bg.png",
    isActive: true
  }
];

// Sample businesses
const businesses = [
  {
    name: "Coffee Shop",
    nameUz: "Kofe Dukon",
    nameRu: "Кофейня",
    description: "Small coffee business",
    price: 1000,
    hourlyIncome: 50,
    category: "cafe",
    requiredLevel: 1,
    imageUrl: "/images/businesses/coffee.png",
    isActive: true
  },
  {
    name: "Restaurant",
    nameUz: "Restoran",
    nameRu: "Ресторан",
    description: "Fine dining restaurant",
    price: 5000,
    hourlyIncome: 250,
    category: "restaurant",
    requiredLevel: 3,
    imageUrl: "/images/businesses/restaurant.png",
    isActive: true
  },
  {
    name: "Office Building",
    nameUz: "Ofis Binosi",
    nameRu: "Офисное Здание",
    description: "Corporate office space",
    price: 25000,
    hourlyIncome: 1250,
    category: "office",
    requiredLevel: 5,
    imageUrl: "/images/businesses/office.png",
    isActive: true
  },
  {
    name: "Manufacturing Plant",
    nameUz: "Ishlab Chiqarish Zavodi",
    nameRu: "Производственный Завод",
    description: "Industrial manufacturing facility",
    price: 100000,
    hourlyIncome: 5000,
    category: "factory",
    requiredLevel: 8,
    imageUrl: "/images/businesses/factory.png",
    isActive: true
  }
];

// Sample promo codes
const promoCodes = [
  {
    code: "DUBAI2024",
    description: "New Year 2024 bonus",
    reward: 5000,
    usageLimit: 1000,
    usedCount: 0,
    expiresAt: new Date('2024-12-31'),
    isActive: true
  },
  {
    code: "WELCOME500",
    description: "Welcome bonus for new users",
    reward: 500,
    usageLimit: null,
    usedCount: 0,
    expiresAt: null,
    isActive: true
  },
  {
    code: "PREMIUM1000",
    description: "Premium user bonus",
    reward: 1000,
    usageLimit: 500,
    usedCount: 0,
    expiresAt: new Date('2024-06-30'),
    isActive: true
  }
];

// Sample users
const users = [
  {
    telegramId: "123456789",
    username: "user1",
    firstName: "Ali",
    lastName: "Karimov",
    language: "uz",
    dubaiCoin: 15000,
    tapProfit: 1,
    hourlyIncome: 100,
    level: 2,
    energy: 4500,
    maxEnergy: 5000,
    premiumStatus: true,
    referralCode: "DC456789",
    isActive: true
  },
  {
    telegramId: "987654321",
    username: "user2",
    firstName: "Олег",
    lastName: "Петров",
    language: "ru",
    dubaiCoin: 75000,
    tapProfit: 2,
    hourlyIncome: 500,
    level: 3,
    energy: 3200,
    maxEnergy: 5000,
    premiumStatus: false,
    referralCode: "DC654321",
    isActive: true
  },
  {
    telegramId: "456789123",
    username: "user3",
    firstName: "Ahmed",
    lastName: "Hassan",
    language: "uz",
    dubaiCoin: 300000,
    tapProfit: 3,
    hourlyIncome: 2500,
    level: 4,
    energy: 2800,
    maxEnergy: 5000,
    premiumStatus: true,
    referralCode: "DC789123",
    isActive: true
  }
];

// Sample notifications
const notifications = [
  {
    title: "Welcome to Dubai City!",
    message: "Start building your empire in Dubai! Complete tasks to earn coins.",
    type: "info",
    isActive: true
  },
  {
    title: "New Tasks Available",
    message: "Check out the new social media tasks for bonus rewards!",
    type: "success",
    isActive: true
  },
  {
    title: "Maintenance Notice",
    message: "The game will be under maintenance from 2:00 AM to 4:00 AM UTC.",
    type: "warning",
    isActive: true
  }
];

async function seedGameData() {
  console.log('🌱 Seeding game data...');
  
  try {
    // Seed empire levels
    console.log('📊 Seeding empire levels...');
    for (const level of empireLevels) {
      await storage.createEmpireLevel(level);
    }
    
    // Seed tasks
    console.log('📋 Seeding tasks...');
    for (const task of tasks) {
      await storage.createTask(task);
    }
    
    // Seed skins
    console.log('🎨 Seeding skins...');
    for (const skin of skins) {
      await storage.createSkin(skin);
    }
    
    // Seed businesses
    console.log('🏢 Seeding businesses...');
    for (const business of businesses) {
      await storage.createBusiness(business);
    }
    
    // Seed promo codes
    console.log('🎁 Seeding promo codes...');
    for (const promo of promoCodes) {
      await storage.createPromoCode(promo);
    }
    
    // Seed users
    console.log('👥 Seeding users...');
    for (const user of users) {
      await storage.createUser(user);
    }
    
    // Seed notifications
    console.log('🔔 Seeding notifications...');
    for (const notification of notifications) {
      await storage.createNotification(notification);
    }
    
    console.log('✅ Game data seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding game data:', error);
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedGameData();
}

export { seedGameData };