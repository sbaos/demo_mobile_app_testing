import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: 'Welcome to ExamMate App',
    description: 'Learn how to write effective unit tests for your React Native app',
    emoji: '👋',
  },
  {
    id: 2,
    title: 'Test with Confidence',
    description: 'Use Jest and React Native Testing Library for reliable tests',
    emoji: '✅',
  },
  {
    id: 3,
    title: 'CI/CD Integration',
    description: 'Automate your testing workflow with GitHub Actions',
    emoji: '🚀',
  },
];

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const currentItem = onboardingData[currentIndex];
  const isLastSlide = currentIndex === onboardingData.length - 1;

  return (
    <View style={styles.container} testID="onboarding-screen">
      <View style={styles.content}>
        <Text style={styles.emoji} testID="onboarding-emoji">
          {currentItem.emoji}
        </Text>
        <Text style={styles.title} testID="onboarding-title">
          {currentItem.title}
        </Text>
        <Text style={styles.description} testID="onboarding-description">
          {currentItem.description}
        </Text>
      </View>

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
            testID={`pagination-dot-${index}`}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleBack}
            testID="back-button"
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={isLastSlide ? handleFinish : handleNext}
          testID={isLastSlide ? 'finish-button' : 'next-button'}
        >
          <Text style={styles.nextButtonText}>
            {isLastSlide ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
