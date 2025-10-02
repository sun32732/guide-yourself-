import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  scrollContent: {
    padding: 20,
  },
  
  // Glass Card
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.glass.strong,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  
  glassCardSmall: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.glass.medium,
  },
  
  blurContainer: {
    padding: 20,
    backgroundColor: colors.glass.background,
  },
  
  // Headers
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  
  // Buttons
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.glass.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  iconButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.glass.light,
  },
  
  // Text styles
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  
  body: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  
  caption: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  
  // Decorative circles
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  
  // Shadows
  shadowLight: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  
  // Spacing
  marginBottom8: { marginBottom: 8 },
  marginBottom12: { marginBottom: 12 },
  marginBottom16: { marginBottom: 16 },
  marginBottom20: { marginBottom: 20 },
  marginBottom24: { marginBottom: 24 },
  
  paddingHorizontal16: { paddingHorizontal: 16 },
  paddingHorizontal20: { paddingHorizontal: 20 },
  paddingVertical12: { paddingVertical: 12 },
  paddingVertical16: { paddingVertical: 16 },
});
