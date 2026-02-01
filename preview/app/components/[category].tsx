import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "@/lib/theme";
import { getCategoryBySlug } from "@/lib/registry";

export default function CategoryScreen() {
  const { category: categorySlug } = useLocalSearchParams<{ category: string }>();
  const { colors } = useTheme();
  const category = getCategoryBySlug(categorySlug || "");

  if (!category) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Category not found
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category.name,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {category.description}
          </Text>
        </View>

        {category.components.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Coming Soon
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
              Components for this category are in development.
            </Text>
          </View>
        ) : (
          category.components.map((component) => (
            <View
              key={component.name}
              style={[styles.componentCard, { backgroundColor: colors.surface }]}
            >
              <View style={styles.componentHeader}>
                <Text style={[styles.componentName, { color: colors.text }]}>
                  {component.name}
                </Text>
                <Text
                  style={[
                    styles.componentDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {component.description}
                </Text>
              </View>

              <View style={styles.variantsContainer}>
                {component.variants.map((variant, index) => (
                  <View key={variant.name} style={styles.variant}>
                    {index > 0 && (
                      <View
                        style={[styles.divider, { backgroundColor: colors.border }]}
                      />
                    )}
                    {variant.render()}
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
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
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
  },
  componentCard: {
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  componentHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  componentName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 14,
  },
  variantsContainer: {
    padding: 16,
  },
  variant: {},
  divider: {
    height: 1,
    marginVertical: 20,
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
