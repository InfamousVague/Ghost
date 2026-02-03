import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text as RNText,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
  ScrollView,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { createPortal } from "react-dom";
import { Size, TextAppearance } from "../../enums";
import { Colors, Typography } from "../../tokens";
import { useThemeColors } from "../../context/ThemeContext";
import { Icon, type IconName } from "../icon/Icon";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Option type for Select component.
 */
export type SelectOption<T = string> = {
  value: T;
  label: string;
  icon?: IconName;
  disabled?: boolean;
};

/**
 * Props for the Select component.
 */
export type SelectProps<T = string> = {
  /** Array of options */
  options: SelectOption<T>[];
  /** Currently selected value */
  value?: T;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Called when selection changes */
  onChange?: (value: T) => void;
  /** Size variant */
  size?: Size;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the component is loading */
  loading?: boolean;
  /** Optional icon to show before label */
  icon?: IconName;
  /** Label shown above the select */
  label?: string;
  /** Additional container style */
  style?: ViewStyle;
};

/**
 * Size to height mapping.
 */
const SIZE_MAP: Record<Size, { height: number; fontSize: number; padding: number }> = {
  [Size.TwoXSmall]: { height: 24, fontSize: 10, padding: 6 },
  [Size.ExtraSmall]: { height: 28, fontSize: 12, padding: 8 },
  [Size.Small]: { height: 32, fontSize: 14, padding: 10 },
  [Size.Medium]: { height: 36, fontSize: 14, padding: 12 },
  [Size.Large]: { height: 40, fontSize: 16, padding: 14 },
  [Size.ExtraLarge]: { height: 44, fontSize: 16, padding: 16 },
  [Size.TwoXLarge]: { height: 48, fontSize: 18, padding: 18 },
};

/**
 * A dropdown select component.
 */
export function Select<T = string>({
  options,
  value,
  placeholder = "Select...",
  onChange,
  size = Size.Medium,
  disabled = false,
  loading: loadingProp = false,
  icon,
  label,
  style,
}: SelectProps<T>) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);

  const sizeConfig = SIZE_MAP[size];
  const selectedOption = options.find((opt) => opt.value === value);

  const measureAndOpen = useCallback(() => {
    if (disabled || loading) return;

    if (Platform.OS === "web" && triggerRef.current) {
      // getBoundingClientRect exists on web
      const rect = (triggerRef.current as unknown as HTMLElement).getBoundingClientRect?.();
      if (rect) {
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    }
    setIsOpen(true);
  }, [disabled, loading]);

  const handleSelect = useCallback((optionValue: T) => {
    onChange?.(optionValue);
    setIsOpen(false);
  }, [onChange]);

  // Close on escape key (web)
  useEffect(() => {
    if (!isOpen || Platform.OS !== "web") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Loading state
  if (loading) {
    return (
      <View style={style}>
        {label && (
          <Skeleton width={60} height={12} borderRadius={4} style={styles.labelSkeleton} />
        )}
        <Skeleton
          width="100%"
          height={sizeConfig.height}
          borderRadius={8}
        />
      </View>
    );
  }

  const triggerStyle: ViewStyle = {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.padding,
    backgroundColor: themeColors.background.raised,
    borderWidth: 1,
    borderColor: isOpen ? themeColors.accent.primary : themeColors.border.subtle,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    opacity: disabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    flex: 1,
    fontSize: sizeConfig.fontSize,
    fontFamily: Typography.fontFamily.base,
    color: selectedOption ? themeColors.text.primary : themeColors.text.muted,
  };

  const renderDropdown = () => {
    if (!isOpen) return null;

    const dropdownContent = (
      <View
        style={[
          styles.dropdown,
          {
            backgroundColor: themeColors.background.surface,
            borderColor: themeColors.border.subtle,
            ...(Platform.OS === "web" ? {
              position: "fixed" as any,
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: Math.max(dropdownPosition.width, 160),
              maxHeight: 280,
              zIndex: 9999,
            } : {}),
          },
        ]}
      >
        <ScrollView
          style={styles.dropdownScroll}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isDisabled = option.disabled;
            const isLast = index === options.length - 1;

            return (
              <Pressable
                key={String(option.value)}
                onPress={() => !isDisabled && handleSelect(option.value)}
                style={(state) => [
                  styles.option,
                  {
                    backgroundColor: state.pressed
                      ? themeColors.background.overlay
                      : ("hovered" in state && state.hovered)
                      ? "rgba(255,255,255,0.05)"
                      : "transparent",
                    opacity: isDisabled ? 0.5 : 1,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderBottomWidth: isLast ? 0 : 1,
                    borderBottomColor: themeColors.border.subtle,
                  },
                ]}
              >
                {option.icon && (
                  <Icon
                    name={option.icon}
                    size={Size.Small}
                    appearance={isSelected ? TextAppearance.Link : TextAppearance.Muted}
                  />
                )}
                <RNText
                  style={[
                    styles.optionText,
                    {
                      fontSize: sizeConfig.fontSize,
                      color: isSelected ? themeColors.accent.primary : themeColors.text.primary,
                      fontWeight: isSelected ? "600" : "400",
                    },
                  ]}
                >
                  {option.label}
                </RNText>
                {isSelected && (
                  <Icon name="check" size={Size.Small} color={themeColors.accent.primary} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );

    // Web: use portal to render dropdown at document body level (avoids overflow clipping)
    if (Platform.OS === "web") {
      return createPortal(
        <>
          {/* Backdrop to capture outside clicks */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
            onClick={() => setIsOpen(false)}
          />
          {dropdownContent}
        </>,
        document.body
      );
    }

    // Native: use Modal
    return (
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.background.raised }]}>
            {dropdownContent}
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={style}>
      {label && (
        <RNText style={[styles.label, { color: themeColors.text.muted }]}>
          {label}
        </RNText>
      )}
      <Pressable
        ref={triggerRef}
        onPress={measureAndOpen}
        disabled={disabled}
        style={triggerStyle}
      >
        {icon && (
          <Icon name={icon} size={Size.Small} appearance={TextAppearance.Muted} />
        )}
        <RNText style={textStyle} numberOfLines={1}>
          {selectedOption?.label ?? placeholder}
        </RNText>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={Size.Small}
          appearance={TextAppearance.Muted}
        />
      </Pressable>
      {renderDropdown()}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.base,
    marginBottom: 6,
  },
  labelSkeleton: {
    marginBottom: 6,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    ...(Platform.OS === "web" ? {
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    } : {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 12,
    }),
  },
  dropdownScroll: {
    paddingVertical: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    flex: 1,
    fontFamily: Typography.fontFamily.base,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 300,
    borderRadius: 12,
    overflow: "hidden",
  },
});
