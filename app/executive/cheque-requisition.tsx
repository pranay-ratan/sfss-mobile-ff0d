import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

export default function ChequeRequisition() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    payee: '',
    amount: '',
    purpose: '',
    description: '',
  });

  const handleSubmit = () => {
    console.log('Cheque requisition submitted:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={28}
              color={GLASS_TOKENS.colors.sfssBlue}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cheque Requisition</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Form */}
        <View style={styles.section}>
          <GlassCard intensity={20}>
            {/* Payee Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Payee Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter payee name"
                placeholderTextColor={GLASS_TOKENS.colors.darkText + '80'}
                value={formData.payee}
                onChangeText={(text) => setFormData({ ...formData, payee: text })}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Amount (CAD)</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor={GLASS_TOKENS.colors.darkText + '80'}
                  keyboardType="decimal-pad"
                  value={formData.amount}
                  onChangeText={(text) => setFormData({ ...formData, amount: text })}
                />
              </View>
            </View>

            {/* Purpose Dropdown */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Purpose</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectText}>
                  {formData.purpose || 'Select purpose'}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={GLASS_TOKENS.colors.darkText}
                />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter additional details"
                placeholderTextColor={GLASS_TOKENS.colors.darkText + '80'}
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
              />
            </View>
          </GlassCard>
        </View>

        {/* Submission Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission Process</Text>
          <GlassCard intensity={15}>
            <View style={styles.stepContainer}>
              {[
                { step: 1, title: 'Submit Form', status: 'current' },
                { step: 2, title: 'Manager Review', status: 'pending' },
                { step: 3, title: 'Director Approval', status: 'pending' },
                { step: 4, title: 'Finance Process', status: 'pending' },
              ].map((item, idx) => (
                <View key={item.step}>
                  <View style={styles.step}>
                    <View
                      style={[
                        styles.stepCircle,
                        item.status === 'current' && styles.stepCircleCurrent,
                      ]}
                    >
                      <Text style={styles.stepNumber}>{item.step}</Text>
                    </View>
                    <Text style={styles.stepTitle}>{item.title}</Text>
                  </View>
                  {idx < 3 && <View style={styles.stepConnector} />}
                </View>
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <GlassButton
            label="Submit Requisition"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
          />
          <GlassButton
            label="Cancel"
            onPress={() => router.back()}
            variant="secondary"
            size="lg"
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLASS_TOKENS.colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  headerTitle: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
    flex: 1,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  formGroup: {
    marginBottom: GLASS_TOKENS.spacing.lg,
  },
  label: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    borderRadius: GLASS_TOKENS.radius.md,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.md,
    fontSize: 16,
    color: GLASS_TOKENS.colors.darkText,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: GLASS_TOKENS.colors.darkText,
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    paddingVertical: GLASS_TOKENS.spacing.md,
    fontSize: 16,
    color: GLASS_TOKENS.colors.darkText,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    borderRadius: GLASS_TOKENS.radius.md,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  selectText: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
  },
  stepContainer: {
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    marginVertical: GLASS_TOKENS.spacing.sm,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  stepCircleCurrent: {
    backgroundColor: GLASS_TOKENS.colors.sfssRed,
    borderColor: GLASS_TOKENS.colors.sfssRed,
  },
  stepNumber: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  stepTitle: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
  },
  stepConnector: {
    width: 2,
    height: 20,
    backgroundColor: GLASS_TOKENS.colors.glassBorderLight,
    marginLeft: 20,
  },
  buttonContainer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.lg,
    gap: GLASS_TOKENS.spacing.md,
  },
  cancelButton: {
    marginTop: GLASS_TOKENS.spacing.sm,
  },
});
