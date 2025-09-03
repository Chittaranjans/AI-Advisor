# AI Product Advisor 📱

A cutting-edge React Native application that leverages Google's Gemini AI to provide intelligent product recommendations based on natural language queries. Built with modern UI/UX principles and powered by advanced AI technology.

## 🌟 Features

### Core Functionality
- **Natural Language Processing**: Users can describe their needs in plain English
- **AI-Powered Recommendations**: Integrates with Google Gemini 1.5 Flash for intelligent product matching
- **Smart Product Catalog**: Uses a comprehensive JSON-based product database
- **Real-time Responses**: Instant AI-generated recommendations with explanations
- **Modern Dark UI**: Sleek, professional interface with intuitive design

### Technical Features
- **TypeScript Support**: Full type safety and better development experience
- **Expo Framework**: Easy deployment and development workflow
- **Environment Configuration**: Secure API key management
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Optimized for mobile devices
- **Performance Optimized**: Efficient rendering and state management

## 🛠️ Technical Stack

### Frontend
- **React Native 0.79.5**: Cross-platform mobile development
- **Expo SDK**: Development platform and build tools
- **TypeScript**: Type-safe JavaScript development
- **React Hooks**: Modern state management

### AI Integration
- **Google Generative AI**: Gemini 1.5 Flash model
- **@google/generative-ai**: Official SDK for AI integration

### Development Tools
- **Expo CLI**: Development and build commands
- **Metro Bundler**: JavaScript bundler for React Native
- **ESLint**: Code linting and quality assurance

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Expo CLI**: Latest version
- **Google Gemini API Key**: Required for AI functionality

### System Requirements
- **iOS Development**: macOS with Xcode 14+
- **Android Development**: Android Studio with SDK 33+
- **Web Development**: Modern web browser

## 🚀 Installation & Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd AIProductAdvisor

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
```

### 3. Get Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 4. Start Development Server
```bash
# Start Expo development server
npm start

# Or use specific platform
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web browser
```

## 📱 Usage

### Basic Usage
1. **Launch the App**: Open in Expo Go or run on emulator/simulator
2. **Enter Query**: Type a natural language description of what you're looking for
3. **Get Recommendations**: Tap "Get Recommendations" to receive AI-powered suggestions
4. **View Results**: Browse through recommended products with detailed explanations

### Example Queries
- "I need a portable ECG device for home monitoring"
- "Looking for a high-speed hair dryer with ionic technology"
- "Recommend a smart vacuum cleaner for large homes"
- "Need gaming headphones with good bass"

## 🏗️ Project Structure

```
AIProductAdvisor/
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── skus.json             # Product catalog database
├── assets/               # Static assets
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
├── node_modules/         # Dependencies
└── README.md            # This file
```

## 🔧 Configuration

### Expo Configuration (app.json)
```json
{
  "expo": {
    "name": "AIProductAdvisor",
    "version": "1.0.0",
    "orientation": "portrait",
    "newArchEnabled": true,
    "plugins": []
  }
}
```

### TypeScript Configuration
- **Strict Mode**: Enabled for better type safety
- **Target**: ES2020 for modern JavaScript features
- **Module Resolution**: Node.js style

## 🔐 Security & API Management

### API Key Security
- **Environment Variables**: API keys stored securely in `.env`
- **Runtime Loading**: Keys loaded at runtime, not bundled
- **No Hardcoding**: Never commit API keys to version control

### Data Handling
- **Client-side Processing**: All AI processing happens client-side
- **No Data Storage**: User queries and responses not stored
- **Secure Transmission**: HTTPS encryption for API calls

## 🐛 Troubleshooting

### Common Issues

#### 1. API Key Not Found
```
Error: API key not found. Please set EXPO_PUBLIC_GOOGLE_API_KEY in .env
```
**Solution**: Ensure `.env` file exists with correct API key format

#### 2. Metro Bundler Issues
```
Error: Metro bundler process exited
```
**Solution**:
```bash
# Clear cache and restart
npx expo start --clear
```

#### 3. TypeScript Errors
```
Cannot find name 'TouchableOpacity'
```
**Solution**: Ensure all React Native imports are correct

#### 4. Network Issues
```
Failed to get recommendations
```
**Solution**:
- Check internet connection
- Verify API key validity
- Check Google AI service status

### Development Tips
- Use `expo start --clear` for cache issues
- Enable remote debugging in Expo Go
- Use React DevTools for component inspection
- Check Expo logs for detailed error information

## 📊 Performance Optimization

### Bundle Size
- **Tree Shaking**: Automatic unused code elimination
- **Code Splitting**: On-demand loading where possible
- **Asset Optimization**: Compressed images and fonts

### Runtime Performance
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: FlatList for large product lists
- **Lazy Loading**: Components loaded as needed

## 🔄 API Integration Details

### Google Gemini Integration
- **Model**: `gemini-1.5-flash`
- **Endpoint**: Google Generative AI API
- **Authentication**: API key-based
- **Rate Limits**: Respects Google's API limits

### Request Format
```javascript
const prompt = `You are an AI product advisor. Based on the following product catalog: ${JSON.stringify(products)}, recommend up to 3 best products for the user's query: "${query}". For each recommendation, provide the product name, brand, and a brief explanation why it fits the query. Format the response as a JSON array of objects with keys: product_name, brand, reason.`;
```

### Response Processing
- **JSON Parsing**: AI response parsed and validated
- **Data Mapping**: Recommendations matched to catalog products
- **Error Handling**: Graceful fallbacks for malformed responses

## 🚀 Deployment

### Expo Build
```bash
# Build for production
npx expo build:android
npx expo build:ios

# Submit to stores
npx expo submit --platform android
npx expo submit --platform ios
```

### Environment Setup
- **Production API Keys**: Use separate keys for production
- **Build Configuration**: Update app.json for production
- **Code Obfuscation**: Enable for release builds

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit with descriptive messages
5. Push to branch and create pull request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow provided linting rules
- **Prettier**: Consistent code formatting
- **Testing**: Unit tests for critical functions

