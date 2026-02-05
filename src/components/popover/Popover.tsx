import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  type ViewStyle,
  type LayoutChangeEvent,
} from "react-native";
import { createPortal } from "react-dom";
import { useThemeColors } from "../../context/ThemeContext";

/**
 * Placement options for the popover relative to its anchor.
 */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/**
 * Props for the Popover component.
 */
export type PopoverProps = {
  /** Whether the popover is visible */
  visible: boolean;
  /** Callback when the popover is closed */
  onClose: () => void;
  /** Reference to the anchor element */
  anchorRef: React.RefObject<View>;
  /** Placement relative to anchor */
  placement?: PopoverPlacement;
  /** Offset from the anchor in pixels */
  offset?: number;
  /** Whether clicking outside closes the popover */
  closeOnClickOutside?: boolean;
  /** Whether pressing Escape closes the popover */
  closeOnEscape?: boolean;
  /** Content to render inside the popover */
  children: React.ReactNode;
  /** Minimum width of the popover */
  minWidth?: number;
  /** Maximum width of the popover */
  maxWidth?: number;
  /** Maximum height of the popover */
  maxHeight?: number;
  /** Additional style overrides */
  style?: ViewStyle;
};

const DEFAULT_OFFSET = 8;

/**
 * A floating popover component that anchors to a trigger element.
 * Designed for desktop use with click-outside and escape key handling.
 *
 * @example Basic usage
 * ```tsx
 * const triggerRef = useRef<View>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Pressable ref={triggerRef} onPress={() => setIsOpen(true)}>
 *   <Text>Open Popover</Text>
 * </Pressable>
 *
 * <Popover
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   anchorRef={triggerRef}
 *   placement="bottom-end"
 * >
 *   <Text>Popover content</Text>
 * </Popover>
 * ```
 */
export function Popover({
  visible,
  onClose,
  anchorRef,
  placement = "bottom",
  offset = DEFAULT_OFFSET,
  closeOnClickOutside = true,
  closeOnEscape = true,
  children,
  minWidth = 200,
  maxWidth = 400,
  maxHeight = 500,
  style,
}: PopoverProps) {
  const themeColors = useThemeColors();
  const popoverRef = useRef<View>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [popoverSize, setPopoverSize] = useState({ width: 0, height: 0 });
  const [anchorRect, setAnchorRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Measure anchor position
  useEffect(() => {
    if (!visible || !anchorRef.current) return;

    if (Platform.OS === "web") {
      const element = anchorRef.current as unknown as HTMLElement;
      const rect = element.getBoundingClientRect?.();
      if (rect) {
        setAnchorRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    } else {
      anchorRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
        setAnchorRect({ top: y, left: x, width, height });
      });
    }
  }, [visible, anchorRef]);

  // Calculate position based on placement
  useEffect(() => {
    if (!visible || !anchorRect.width) return;

    const viewportWidth = Platform.OS === "web" ? window.innerWidth : 0;
    const viewportHeight = Platform.OS === "web" ? window.innerHeight : 0;

    let top = 0;
    let left = 0;

    const [mainAxis, crossAxis] = placement.split("-") as [string, string?];

    // Calculate main axis position
    switch (mainAxis) {
      case "top":
        top = anchorRect.top - popoverSize.height - offset;
        break;
      case "bottom":
        top = anchorRect.top + anchorRect.height + offset;
        break;
      case "left":
        left = anchorRect.left - popoverSize.width - offset;
        break;
      case "right":
        left = anchorRect.left + anchorRect.width + offset;
        break;
    }

    // Calculate cross axis position
    if (mainAxis === "top" || mainAxis === "bottom") {
      switch (crossAxis) {
        case "start":
          left = anchorRect.left;
          break;
        case "end":
          left = anchorRect.left + anchorRect.width - popoverSize.width;
          break;
        default: // center
          left = anchorRect.left + anchorRect.width / 2 - popoverSize.width / 2;
      }
    } else {
      switch (crossAxis) {
        case "start":
          top = anchorRect.top;
          break;
        case "end":
          top = anchorRect.top + anchorRect.height - popoverSize.height;
          break;
        default: // center
          top = anchorRect.top + anchorRect.height / 2 - popoverSize.height / 2;
      }
    }

    // Viewport boundary adjustments (web only)
    if (Platform.OS === "web" && popoverSize.width > 0) {
      // Prevent overflow right
      if (left + popoverSize.width > viewportWidth - 16) {
        left = viewportWidth - popoverSize.width - 16;
      }
      // Prevent overflow left
      if (left < 16) {
        left = 16;
      }
      // Prevent overflow bottom
      if (top + popoverSize.height > viewportHeight - 16) {
        top = viewportHeight - popoverSize.height - 16;
      }
      // Prevent overflow top
      if (top < 16) {
        top = 16;
      }
    }

    setPosition({ top, left });
  }, [visible, anchorRect, popoverSize, placement, offset]);

  // Handle popover size measurement
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setPopoverSize({ width, height });
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!visible || !closeOnEscape || Platform.OS !== "web") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, closeOnEscape, onClose]);

  // Handle click outside
  const handleBackdropPress = useCallback(() => {
    if (closeOnClickOutside) {
      onClose();
    }
  }, [closeOnClickOutside, onClose]);

  // Measure popover on web after render
  // NOTE: This must be before the conditional return to maintain hook order
  useEffect(() => {
    if (!visible || Platform.OS !== "web") return;

    const el = popoverRef.current as unknown as HTMLDivElement;
    if (el) {
      // Use ResizeObserver for accurate measurements
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setPopoverSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      observer.observe(el);

      // Initial measurement
      setPopoverSize({
        width: el.offsetWidth,
        height: el.offsetHeight,
      });

      return () => observer.disconnect();
    }
  }, [visible]);

  if (!visible) return null;

  // Web rendering with scrollable content
  if (Platform.OS === "web") {
    return createPortal(
      <>
        {/* Invisible backdrop to capture outside clicks */}
        {closeOnClickOutside && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
            onClick={handleBackdropPress}
          />
        )}
        <div
          ref={popoverRef as unknown as React.RefObject<HTMLDivElement>}
          style={{
            position: "fixed",
            top: position.top as number,
            left: position.left as number,
            minWidth: minWidth as number,
            maxWidth: maxWidth as number,
            maxHeight: maxHeight as number,
            backgroundColor: themeColors.background.surface,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: themeColors.border.subtle,
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...(style as React.CSSProperties),
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </>,
      document.body
    );
  }

  // Native rendering
  const popoverContent = (
    <View
      ref={popoverRef}
      onLayout={handleLayout}
      style={[
        styles.popover,
        {
          backgroundColor: themeColors.background.surface,
          borderColor: themeColors.border.subtle,
          minWidth,
          maxWidth,
          maxHeight,
        },
        style,
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {children}
      </ScrollView>
    </View>
  );

  return popoverContent;
}

const styles = StyleSheet.create({
  popover: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
