import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Skeleton, TextSkeleton } from "./Skeleton";
import { Shape, Size } from "../../enums";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 24,
  },
};

export const Shapes: Story = {
  name: "Different Shapes",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Skeleton width={100} height={40} borderRadius={0} />
        <View style={styles.label}>
          <span>None</span>
        </View>
      </View>
      <View style={styles.row}>
        <Skeleton width={100} height={40} shape={Shape.Soft} />
        <View style={styles.label}>
          <span>Soft</span>
        </View>
      </View>
      <View style={styles.row}>
        <Skeleton width={100} height={40} shape={Shape.Rounded} />
        <View style={styles.label}>
          <span>Rounded</span>
        </View>
      </View>
      <View style={styles.row}>
        <Skeleton width={100} height={40} shape={Shape.Pill} />
        <View style={styles.label}>
          <span>Pill</span>
        </View>
      </View>
      <View style={styles.row}>
        <Skeleton width={40} height={40} shape={Shape.Circle} />
        <View style={styles.label}>
          <span>Circle</span>
        </View>
      </View>
    </View>
  ),
};

export const TextSkeletons: Story = {
  name: "Text Skeletons",
  render: () => (
    <View style={styles.column}>
      <View style={styles.section}>
        <span style={{ color: "#9096AB", fontSize: 12, marginBottom: 8 }}>Single Line</span>
        <TextSkeleton lineHeight={24} fontSize={16} />
      </View>
      <View style={styles.section}>
        <span style={{ color: "#9096AB", fontSize: 12, marginBottom: 8 }}>Multiple Lines</span>
        <TextSkeleton lineHeight={24} fontSize={16} lines={3} />
      </View>
      <View style={styles.section}>
        <span style={{ color: "#9096AB", fontSize: 12, marginBottom: 8 }}>Custom Last Line Width</span>
        <TextSkeleton lineHeight={24} fontSize={16} lines={3} lastLineWidth="40%" />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  name: "Various Sizes",
  render: () => (
    <View style={styles.column}>
      <Skeleton width={60} height={12} />
      <Skeleton width={120} height={16} />
      <Skeleton width={200} height={20} />
      <Skeleton width={280} height={24} />
      <Skeleton width={320} height={32} />
    </View>
  ),
};

export const ContentPlaceholders: Story = {
  name: "Content Placeholders",
  render: () => (
    <View style={styles.column}>
      {/* Avatar + Text */}
      <View style={styles.row}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <View style={styles.textGroup}>
          <Skeleton width={120} height={16} shape={Shape.Soft} />
          <Skeleton width={180} height={12} shape={Shape.Soft} />
        </View>
      </View>

      {/* Card placeholder */}
      <View style={styles.cardPlaceholder}>
        <Skeleton width="100%" height={120} shape={Shape.Rounded} />
        <View style={styles.cardContent}>
          <Skeleton width="80%" height={18} shape={Shape.Soft} />
          <Skeleton width="60%" height={14} shape={Shape.Soft} />
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Skeleton width={60} height={28} shape={Shape.Soft} />
          <Skeleton width={80} height={12} shape={Shape.Soft} />
        </View>
        <View style={styles.stat}>
          <Skeleton width={60} height={28} shape={Shape.Soft} />
          <Skeleton width={80} height={12} shape={Shape.Soft} />
        </View>
        <View style={styles.stat}>
          <Skeleton width={60} height={28} shape={Shape.Soft} />
          <Skeleton width={80} height={12} shape={Shape.Soft} />
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  column: {
    gap: 24,
    width: 320,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  label: {
    minWidth: 80,
  },
  section: {
    gap: 8,
  },
  textGroup: {
    flex: 1,
    gap: 8,
  },
  cardPlaceholder: {
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    padding: 12,
    borderRadius: 12,
  },
  cardContent: {
    gap: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flex: 1,
    gap: 8,
    alignItems: "center",
  },
});
