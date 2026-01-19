import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";

type CommonHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  height?: number;
};

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  leftComponent,
  rightComponent,
  centerComponent,
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
  height = 56,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height },
      ]}
    >
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="dark-content"
      />

      {/* LEFT */}
      <View style={styles.side}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.iconBtn}
          >
            <ChevronLeft size={26} color={textColor} />
          </TouchableOpacity>
        ) : (
          leftComponent
        )}
      </View>

      {/* CENTER */}
      <View style={styles.center}>
        {centerComponent ? (
          centerComponent
        ) : (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: textColor },
            ]}
          >
            {title}
          </Text>
        )}
      </View>

      {/* RIGHT */}
      <View style={styles.side}>
        {rightComponent}
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  side: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 20,
  },
});
