# 🎮 Dubai City Game Backend Integration Guide

## 🔗 Backend API Ma'lumotlari

### Base URL
```
https://workspace.didore2664.repl.co
```

### Authentication
- Telegram Web App data verification
- User authentication via telegramId

## 📋 API Endpoints

### 1. User Management

**Get User:**
```
GET /api/game/user/:telegramId
Response: { success: true, data: userObject }
```

**Create User:**
```
POST /api/game/user
Body: {
  telegramId: "123456789",
  username: "user1",
  firstName: "Ali",
  lastName: "Karimov",
  language: "uz",
  dubaiCoin: 1000,
  energy: 5000,
  referralCode: "DC123456"
}
Response: { success: true, data: userObject }
```

**Update User:**
```
PUT /api/game/user/:telegramId
Body: { dubaiCoin: 5000, energy: 4000 }
Response: { success: true, data: updatedUser }
```

### 2. Game Actions

**Tap Action:**
```
POST /api/game/tap
Body: { telegramId: "123456789", taps: 10 }
Response: { 
  success: true, 
  data: { 
    user: updatedUser,
    coinGain: 10,
    newEnergy: 4990
  }
}
```

**Claim Offline Earnings:**
```
POST /api/game/claim-offline
Body: { telegramId: "123456789" }
Response: { 
  success: true, 
  data: { 
    user: updatedUser,
    offlineEarnings: 5000,
    hours: 5
  }
}
```

### 3. Tasks

**Get Tasks:**
```
GET /api/game/tasks
Response: { success: true, data: [taskArray] }
```

**Complete Task:**
```
POST /api/game/complete-task
Body: { telegramId: "123456789", taskId: 1 }
Response: { 
  success: true, 
  data: { 
    userTask: taskObject,
    user: updatedUser,
    reward: 1000
  }
}
```

### 4. Market & Business

**Get Market Items:**
```
GET /api/game/market
Response: { success: true, data: [businessArray] }
```

**Purchase Business:**
```
POST /api/game/purchase
Body: { telegramId: "123456789", businessId: 1 }
Response: { 
  success: true, 
  data: { 
    userBusiness: businessObject,
    user: updatedUser
  }
}
```

### 5. Promo Codes

**Use Promo Code:**
```
POST /api/game/use-promo
Body: { telegramId: "123456789", code: "DUBAI2024" }
Response: { 
  success: true, 
  data: { 
    usage: usageObject,
    user: updatedUser,
    reward: 5000
  }
}
```

### 6. Empire Levels

**Get Empire Levels:**
```
GET /api/game/empire-levels
Response: { success: true, data: [empireLevelArray] }
```

## 🛠️ Implementation Guide

### 1. Bot Setup

```javascript
// Bot initialization
const BACKEND_URL = "https://workspace.didore2664.repl.co";

// Example API call function
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
  return response.json();
}
```

### 2. User Authentication

```javascript
// Get or create user
async function initializeUser(telegramId, userInfo) {
  try {
    // Try to get existing user
    let result = await apiCall(`/api/game/user/${telegramId}`);
    
    if (!result.success) {
      // Create new user
      const userData = {
        telegramId: telegramId.toString(),
        username: userInfo.username || `user_${telegramId}`,
        firstName: userInfo.first_name || "",
        lastName: userInfo.last_name || "",
        language: userInfo.language_code || "uz",
        dubaiCoin: 1000,
        energy: 5000,
        referralCode: `DC${telegramId.toString().slice(-6)}`
      };
      
      result = await apiCall('/api/game/user', 'POST', userData);
    }
    
    return result.data;
  } catch (error) {
    console.error('User initialization failed:', error);
    return null;
  }
}
```

### 3. Game Functions

```javascript
// Tap function
async function handleTap(telegramId, taps) {
  try {
    const result = await apiCall('/api/game/tap', 'POST', {
      telegramId,
      taps
    });
    
    if (result.success) {
      return {
        coins: result.data.coinGain,
        energy: result.data.newEnergy,
        user: result.data.user
      };
    }
  } catch (error) {
    console.error('Tap failed:', error);
  }
  return null;
}

// Complete task
async function completeTask(telegramId, taskId) {
  try {
    const result = await apiCall('/api/game/complete-task', 'POST', {
      telegramId,
      taskId
    });
    
    if (result.success) {
      return {
        reward: result.data.reward,
        user: result.data.user
      };
    }
  } catch (error) {
    console.error('Task completion failed:', error);
  }
  return null;
}

// Purchase business
async function purchaseBusiness(telegramId, businessId) {
  try {
    const result = await apiCall('/api/game/purchase', 'POST', {
      telegramId,
      businessId
    });
    
    if (result.success) {
      return {
        business: result.data.userBusiness,
        user: result.data.user
      };
    }
  } catch (error) {
    console.error('Business purchase failed:', error);
  }
  return null;
}
```

### 4. Error Handling

```javascript
// Global error handler
function handleApiError(error, context) {
  console.error(`API Error in ${context}:`, error);
  
  if (error.message?.includes('fetch')) {
    return "🔌 Backend ulanish xatosi. Keyinroq qayta urinib ko'ring.";
  }
  
  return "❌ Xato yuz berdi. Qayta urinib ko'ring.";
}
```

## 🔧 Integration Steps

1. **Backend URL ni o'rnating:**
   ```javascript
   const BACKEND_URL = "https://workspace.didore2664.repl.co";
   ```

2. **User authentication qo'shing:**
   - Har bot ishga tushganda user ma'lumotlarini backend dan oling
   - Agar user yo'q bo'lsa, yangi user yarating

3. **Game actions ni ulang:**
   - Tap action
   - Task completion
   - Business purchase
   - Promo code usage

4. **Data syncing:**
   - Har action dan keyin user datani yangilang
   - Offline earnings ni claim qiling

5. **Error handling:**
   - Network errors
   - Backend unavailable
   - Invalid data responses

## 🎯 Test Endpoints

Backend test qilish uchun:

```bash
# Test user creation
curl -X POST https://workspace.didore2664.repl.co/api/game/user \
  -H "Content-Type: application/json" \
  -d '{
    "telegramId": "123456789",
    "username": "testuser",
    "firstName": "Test",
    "language": "uz"
  }'

# Test tap action
curl -X POST https://workspace.didore2664.repl.co/api/game/tap \
  -H "Content-Type: application/json" \
  -d '{
    "telegramId": "123456789",
    "taps": 5
  }'

# Test get tasks
curl https://workspace.didore2664.repl.co/api/game/tasks
```

## 📊 Expected Data Structures

### User Object
```javascript
{
  id: 1,
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
  isActive: true,
  lastActive: "2024-01-01T00:00:00.000Z"
}
```

### Task Object
```javascript
{
  id: 1,
  title: "Follow Telegram Channel",
  titleUz: "Telegram kanalga obuna bo'ling",
  titleRu: "Подписаться на Telegram канал",
  description: "Follow our official channel",
  type: "telegram",
  url: "https://t.me/DubaiCity_live",
  reward: 1000,
  isActive: true
}
```

### Business Object
```javascript
{
  id: 1,
  name: "Coffee Shop",
  nameUz: "Kofe Dukon",
  nameRu: "Кофейня",
  description: "Small coffee business",
  price: 1000,
  hourlyIncome: 50,
  category: "cafe",
  requiredLevel: 1,
  isActive: true
}
```

Bu ma'lumotlarni o'yin qismiga bering va ular backend ga ulansin!