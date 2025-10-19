import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Budget_Report_Q4.pdf',
    type: 'Financial',
    size: '2.4 MB',
    date: 'Dec 10',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Meeting_Minutes.docx',
    type: 'Administrative',
    size: '1.2 MB',
    date: 'Dec 8',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Event_Proposal.pdf',
    type: 'Events',
    size: '3.1 MB',
    date: 'Dec 5',
    status: 'approved',
  },
];

const STATUS_COLORS = {
  approved: '#10b981',
  pending: '#f59e0b',
  rejected: '#ef4444',
};

export default function DocumentUploads() {
  const router = useRouter();
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  const renderDocument = ({ item }: { item: Document }) => (
    <GlassCard style={styles.docCard} intensity={15}>
      <View style={styles.docHeader}>
        <View style={styles.docIcon}>
          <Ionicons
            name="document"
            size={24}
            color={GLASS_TOKENS.colors.sfssBlue}
          />
        </View>
        <View style={styles.docInfo}>
          <Text style={styles.docName}>{item.name}</Text>
          <Text style={styles.docMeta}>{item.size} • {item.date}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[item.status] },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </GlassCard>
  );

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
          <Text style={styles.headerTitle}>Document Uploads</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Upload Zone */}
        <View style={styles.section}>
          <GlassCard intensity={20}>
            <TouchableOpacity style={styles.uploadZone}>
              <Ionicons
                name="cloud-upload"
                size={48}
                color={GLASS_TOKENS.colors.sfssBlue}
              />
              <Text style={styles.uploadTitle}>Upload Document</Text>
              <Text style={styles.uploadSubtitle}>
                Drag and drop or tap to select files
              </Text>
              <GlassButton
                label="Select File"
                onPress={() => {}}
                variant="primary"
                size="sm"
                style={styles.uploadButton}
              />
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* Document List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          <FlatList
            data={documents}
            renderItem={renderDocument}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: GLASS_TOKENS.spacing.md }} />}
          />
        </View>

        {/* Document Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {['Financial', 'Administrative', 'Events', 'Policies'].map((cat) => (
              <TouchableOpacity key={cat} activeOpacity={0.7}>
                <GlassCard intensity={15} style={styles.categoryCard}>
                  <Ionicons
                    name="folder"
                    size={28}
                    color={GLASS_TOKENS.colors.sfssBlue}
                  />
                  <Text style={styles.categoryName}>{cat}</Text>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
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
  uploadZone: {
    alignItems: 'center',
    paddingVertical: GLASS_TOKENS.spacing.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: GLASS_TOKENS.colors.sfssBlue,
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  uploadTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.md,
  },
  uploadSubtitle: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.7,
    marginTop: GLASS_TOKENS.spacing.sm,
  },
  uploadButton: {
    marginTop: GLASS_TOKENS.spacing.lg,
  },
  docCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  docMeta: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.md,
  },
  statusText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.white,
    textTransform: 'capitalize',
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: GLASS_TOKENS.spacing.md,
    flexWrap: 'wrap',
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  categoryName: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.sm,
  },
});
