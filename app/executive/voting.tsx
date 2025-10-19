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

interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: { yes: number; no: number; abstain: number };
  status: 'open' | 'closed' | 'passed' | 'failed';
  deadline: string;
  userVote?: 'yes' | 'no' | 'abstain' | null;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1',
    title: 'Approve Annual Budget 2024-25',
    description: 'Vote on the proposed annual budget allocations for all departments',
    votes: { yes: 18, no: 2, abstain: 1 },
    status: 'open',
    deadline: 'Dec 20',
    userVote: null,
  },
  {
    id: '2',
    title: 'New Event Planning Policy',
    description: 'Establish new guidelines for event planning and approvals',
    votes: { yes: 15, no: 3, abstain: 3 },
    status: 'closed',
    deadline: 'Dec 15',
    userVote: 'yes',
  },
  {
    id: '3',
    title: 'Constitutional Amendment - Article 3',
    description: 'Amend Article 3 regarding member eligibility',
    votes: { yes: 10, no: 8, abstain: 3 },
    status: 'passed',
    deadline: 'Dec 12',
    userVote: 'yes',
  },
];

export default function VotingScreen() {
  const router = useRouter();
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);

  const handleVote = (id: string, vote: 'yes' | 'no' | 'abstain') => {
    setProposals(
      proposals.map((p) => (p.id === id ? { ...p, userVote: vote } : p))
    );
  };

  const renderProposal = ({ item }: { item: Proposal }) => {
    const totalVotes = item.votes.yes + item.votes.no + item.votes.abstain;
    const yesPercent = totalVotes > 0 ? (item.votes.yes / totalVotes) * 100 : 0;

    return (
      <GlassCard style={styles.proposalCard} intensity={15}>
        {/* Header */}
        <View style={styles.proposalHeader}>
          <View style={styles.proposalTitleContainer}>
            <Text style={styles.proposalTitle}>{item.title}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'open'
                      ? '#3b82f6'
                      : item.status === 'closed'
                      ? '#f59e0b'
                      : item.status === 'passed'
                      ? '#10b981'
                      : '#ef4444',
                },
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>

        {/* Vote Results */}
        <View style={styles.voteResults}>
          <View style={styles.voteResultItem}>
            <Text style={styles.voteCount}>{item.votes.yes}</Text>
            <View style={styles.voteBar}>
              <View
                style={[
                  styles.voteBarFill,
                  {
                    width: `${yesPercent}%`,
                    backgroundColor: '#10b981',
                  },
                ]}
              />
            </View>
            <Text style={styles.voteLabel}>Yes</Text>
          </View>

          <View style={styles.voteResultItem}>
            <Text style={styles.voteCount}>{item.votes.no}</Text>
            <View style={styles.voteBar}>
              <View
                style={[
                  styles.voteBarFill,
                  {
                    width: `${(item.votes.no / totalVotes) * 100}%`,
                    backgroundColor: '#ef4444',
                  },
                ]}
              />
            </View>
            <Text style={styles.voteLabel}>No</Text>
          </View>

          <View style={styles.voteResultItem}>
            <Text style={styles.voteCount}>{item.votes.abstain}</Text>
            <View style={styles.voteBar}>
              <View
                style={[
                  styles.voteBarFill,
                  {
                    width: `${(item.votes.abstain / totalVotes) * 100}%`,
                    backgroundColor: '#f59e0b',
                  },
                ]}
              />
            </View>
            <Text style={styles.voteLabel}>Abstain</Text>
          </View>
        </View>

        {/* Voting Buttons */}
        {item.status === 'open' && (
          <View style={styles.votingButtons}>
            <GlassButton
              label="Yes"
              onPress={() => handleVote(item.id, 'yes')}
              variant={item.userVote === 'yes' ? 'primary' : 'glass'}
              size="sm"
              style={styles.voteButton}
            />
            <GlassButton
              label="No"
              onPress={() => handleVote(item.id, 'no')}
              variant={item.userVote === 'no' ? 'secondary' : 'glass'}
              size="sm"
              style={styles.voteButton}
            />
            <GlassButton
              label="Abstain"
              onPress={() => handleVote(item.id, 'abstain')}
              variant={item.userVote === 'abstain' ? 'primary' : 'glass'}
              size="sm"
              style={styles.voteButton}
            />
          </View>
        )}
      </GlassCard>
    );
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
          <Text style={styles.headerTitle}>Council Voting</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <GlassCard style={styles.statCard} intensity={15}>
            <Text style={styles.statLabel}>Active Votes</Text>
            <Text style={styles.statValue}>
              {proposals.filter((p) => p.status === 'open').length}
            </Text>
          </GlassCard>
          <GlassCard style={styles.statCard} intensity={15}>
            <Text style={styles.statLabel}>You Voted</Text>
            <Text style={styles.statValue}>
              {proposals.filter((p) => p.userVote).length}
            </Text>
          </GlassCard>
        </View>

        {/* Proposals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proposals</Text>
          <FlatList
            data={proposals}
            renderItem={renderProposal}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: GLASS_TOKENS.spacing.md }} />}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
    gap: GLASS_TOKENS.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  statLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.7,
  },
  statValue: {
    ...GLASS_TOKENS.typography.h2,
    color: GLASS_TOKENS.colors.sfssBlue,
    marginTop: GLASS_TOKENS.spacing.sm,
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
  proposalCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  proposalHeader: {
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  proposalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  proposalTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    flex: 1,
    marginRight: GLASS_TOKENS.spacing.md,
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
  deadline: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
  },
  description: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.lg,
    lineHeight: 18,
  },
  voteResults: {
    gap: GLASS_TOKENS.spacing.md,
    marginBottom: GLASS_TOKENS.spacing.lg,
    paddingBottom: GLASS_TOKENS.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  voteResultItem: {
    gap: GLASS_TOKENS.spacing.sm,
  },
  voteCount: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  voteBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    overflow: 'hidden',
  },
  voteBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  voteLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
  },
  votingButtons: {
    flexDirection: 'row',
    gap: GLASS_TOKENS.spacing.md,
  },
  voteButton: {
    flex: 1,
  },
});
