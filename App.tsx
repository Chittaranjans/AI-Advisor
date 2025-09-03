import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Product {
  brand: string;
  product_name: string;
  price: number;
  category: string;
  description: string;
}

interface Recommendation {
  product: Product;
  reason: string;
}

const products: Product[] = require('./skus.json');

export default function App() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a query');
      return;
    }
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      Alert.alert('Error', 'API key not found. Please set EXPO_PUBLIC_GOOGLE_API_KEY in .env');
      return;
    }
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are an AI product advisor. Based on the following product catalog: ${JSON.stringify(products)}, recommend up to 3 best products for the user's query: "${query}". For each recommendation, provide the product name, brand, and a brief explanation why it fits the query. Format the response as a JSON array of objects with keys: product_name, brand, reason.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const recs = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      const fullRecs: Recommendation[] = recs.map((r: any) => {
        const product = products.find((p: Product) => p.product_name === r.product_name && p.brand === r.brand);
        if (product) {
          return { product, reason: r.reason };
        }
        return null;
      }).filter(Boolean);
      setRecommendations(fullRecs);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get recommendations. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Product Advisor</Text>
        <Text style={styles.subtitle}>Discover perfect products with AI intelligence</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe what you're looking for... e.g., 'I need a portable ECG device for home use'"
          placeholderTextColor="#666"
          value={query}
          onChangeText={setQuery}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, loading && styles.loadingButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.listContainer}
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>{item.product.product_name}</Text>
              <Text style={styles.price}>₹{item.product.price}</Text>
            </View>
            <Text style={styles.brand}>by {item.product.brand}</Text>
            <Text style={styles.category}>{item.product.category}</Text>
            <Text style={styles.description}>{item.product.description}</Text>
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonTitle}>Why recommended:</Text>
              <Text style={styles.reason}>{item.reason}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>Enter a query above to get AI-powered product suggestions!</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderWidth: 2,
    borderColor: '#16213e',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#ffffff',
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0f3460',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#0f3460',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingButton: {
    backgroundColor: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00d4ff',
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  brand: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 8,
    fontWeight: '500',
  },
  category: {
    fontSize: 14,
    color: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: '#d0d0d0',
    lineHeight: 22,
    marginBottom: 15,
  },
  reasonContainer: {
    backgroundColor: 'rgba(15, 52, 96, 0.3)',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d4ff',
    marginBottom: 8,
  },
  reason: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 26,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});
