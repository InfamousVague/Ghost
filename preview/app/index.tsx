import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/lib/theme";
import { getAllCategories } from "@/lib/registry";

export default function HomeScreen() {
  const { colors, toggleTheme, theme } = useTheme();
  const categories = getAllCategories();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Ghost</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          React Native Design System
        </Text>
        <Pressable
          style={[styles.themeToggle, { backgroundColor: colors.surface }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeToggleText, { color: colors.text }]}>
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Components
        </Text>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/components/${category.slug}`}
            asChild
          >
            <Pressable
              style={({ pressed }) => [
                styles.categoryCard,
                { backgroundColor: colors.surface },
                pressed && styles.categoryCardPressed,
              ]}
            >
              <View style={styles.categoryHeader}>
                <Text style={[styles.categoryName, { color: colors.text }]}>
                  {category.name}
                </Text>
                <Text
                  style={[styles.categoryCount, { color: colors.textSecondary }]}
                >
                  {category.components.length}
                </Text>
              </View>
              <Text
                style={[
                  styles.categoryDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {category.description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Ghost v0.1.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  themeToggle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryCardPressed: {
    opacity: 0.8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryDescription: {
    fontSize: 14,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
