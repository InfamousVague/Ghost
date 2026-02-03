import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
  Animated,
  PanResponder,
  ScrollView,
  type ViewStyle,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native";
import { createPortal } from "react-dom";
import { useThemeColors } from "../../context/ThemeContext";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Size, TextAppearance } from "../../enums";

/**
 * Props for the BottomSheet component.
 */
export type BottomSheetProps = {
  /** Whether the bottom sheet is visible */
  visible: boolean;
  /** Callback when the bottom sheet is closed */
  onClose: () => void;
  /** Optional title to show in the header */
  title?: string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether tapping the backdrop closes the sheet */
  closeOnBackdrop?: boolean;
  /** Whether dragging down closes the sheet */
  closeOnDrag?: boolean;
  /** Content to render inside the bottom sheet */
  children: React.ReactNode;
  /** Maximum height as a percentage of screen height (0-1) */
  maxHeightPercent?: number;
  /** Additional style overrides for the content container */
  style?: ViewStyle;
};

const ANIMATION_DURATION = 250;
const DRAG_THRESHOLD = 100;
const BACKDROP_OPACITY = 0.6;

/**
 * A bottom sheet component that slides up from the bottom of the screen.
 * Designed for mobile use with drag-to-dismiss functionality.
 *
 * @example Basic usage
 * ```tsx
 * <BottomSheet
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Settings"
 * >
 *   <Text>Content goes here</Text>
 * </BottomSheet>
 * ```
 */
export function BottomSheet({
  visible,
  onClose,
  title,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnDrag = true,
  children,
  maxHeightPercent = 0.9,
  style,
}: BottomSheetProps) {
  const themeColors = useThemeColors();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);
  const [translateYValue, setTranslateYValue] = useState(visible ? 0 : 100);
  const [backdropOpacityValue, setBackdropOpacityValue] = useState(visible ? BACKDROP_OPACITY : 0);
  const [contentHeight, setContentHeight] = useState(0);
  const dragOffsetRef = useRef(0);

  // For native animations
  const translateY = useRef(new Animated.Value(1000)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const dragOffset = useRef(new Animated.Value(0)).current;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  // Web animation handling
  useEffect(() => {
    if (Platform.OS !== "web") return;

    if (visible) {
      setShouldRender(true);
      // Trigger animation after render
      requestAnimationFrame(() => {
        setTranslateYValue(0);
        setBackdropOpacityValue(BACKDROP_OPACITY);
      });
    } else {
      setTranslateYValue(100);
      setBackdropOpacityValue(0);
      // Remove from DOM after animation
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // Native animation handling
  const animateIn = useCallback(() => {
    if (Platform.OS === "web") return;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: BACKDROP_OPACITY,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  const animateOut = useCallback((callback?: () => void) => {
    if (Platform.OS === "web") {
      callback?.();
      return;
    }
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: contentHeight || 1000,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, [translateY, backdropOpacity, contentHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDrag,
      onMoveShouldSetPanResponder: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        return closeOnDrag && gestureState.dy > 10;
      },
      onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 0) {
          if (Platform.OS === "web") {
            dragOffsetRef.current = gestureState.dy;
          } else {
            dragOffset.setValue(gestureState.dy);
          }
        }
      },
      onPanResponderRelease: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          animateOut(onClose);
        } else {
          if (Platform.OS === "web") {
            dragOffsetRef.current = 0;
          } else {
            Animated.spring(dragOffset, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible && Platform.OS !== "web") {
      dragOffset.setValue(0);
      animateIn();
    }
  }, [visible, animateIn, dragOffset]);

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdrop) {
      if (Platform.OS === "web") {
        onClose();
      } else {
        animateOut(onClose);
      }
    }
  }, [closeOnBackdrop, animateOut, onClose]);

  const handleClose = useCallback(() => {
    if (Platform.OS === "web") {
      onClose();
    } else {
      animateOut(onClose);
    }
  }, [animateOut, onClose]);

  // Web rendering
  if (Platform.OS === "web") {
    if (!shouldRender) return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={handleBackdropPress}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000",
            opacity: backdropOpacityValue,
            transition: `opacity ${ANIMATION_DURATION}ms ease-out`,
          }}
        />

        {/* Sheet */}
        <div
          style={{
            backgroundColor: themeColors.background.raised,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: `${maxHeightPercent * 100}%`,
            transform: `translateY(${translateYValue}%)`,
            transition: `transform ${ANIMATION_DURATION}ms ease-out`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 0",
              cursor: closeOnDrag ? "grab" : "default",
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: themeColors.text.muted,
                opacity: 0.4,
              }}
            />
          </div>

          {/* Header */}
          {(title || showCloseButton) && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0 16px 16px 16px",
                gap: 12,
              }}
            >
              <Text
                size={Size.Medium}
                weight="semibold"
                style={{ flex: 1 }}
              >
                {title || ""}
              </Text>
              {showCloseButton && (
                <Pressable
                  onPress={handleClose}
                  style={[
                    styles.closeButton,
                    { backgroundColor: themeColors.background.overlay },
                  ]}
                >
                  <Icon
                    name="close"
                    size={Size.Small}
                    appearance={TextAppearance.Muted}
                  />
                </Pressable>
              )}
            </div>
          )}

          {/* Content - scrollable */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 16px 34px 16px",
            }}
          >
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Native rendering
  const combinedTranslateY = Animated.add(translateY, dragOffset);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
        >
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacity,
              },
            ]}
          />
        </Pressable>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: themeColors.background.raised,
              maxHeight: `${maxHeightPercent * 100}%`,
              transform: [{ translateY: combinedTranslateY }],
            },
            style,
          ]}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          {/* Drag handle */}
          <View style={styles.handleContainer}>
            <View
              style={[
                styles.handle,
                { backgroundColor: themeColors.text.muted },
              ]}
            />
          </View>

          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              <Text
                size={Size.Medium}
                weight="semibold"
                style={{ flex: 1 }}
              >
                {title || ""}
              </Text>
              {showCloseButton && (
                <Pressable
                  onPress={handleClose}
                  style={[
                    styles.closeButton,
                    { backgroundColor: themeColors.background.overlay },
                  ]}
                >
                  <Icon
                    name="close"
                    size={Size.Small}
                    appearance={TextAppearance.Muted}
                  />
                </Pressable>
              )}
            </View>
          )}

          {/* Content - scrollable */}
          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={true}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    opacity: 0.4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
});
