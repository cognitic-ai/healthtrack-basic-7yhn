import { ThemeProvider } from "@/components/theme-provider";
import { HealthProvider } from "@/components/health-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <HealthProvider>
        <TabsLayout />
      </HealthProvider>
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: (props) => <MaterialIcons {...props} name="dashboard" />,
        }}
      />
      <WebTabs.Screen
        name="water"
        options={{
          title: "Water",
          tabBarIcon: (props) => <MaterialIcons {...props} name="local-drink" />,
        }}
      />
      <WebTabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: (props) => <MaterialIcons {...props} name="directions-walk" />,
        }}
      />
      <WebTabs.Screen
        name="sleep"
        options={{
          title: "Sleep",
          tabBarIcon: (props) => <MaterialIcons {...props} name="bedtime" />,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "chart.line.uptrend.xyaxis", selected: "chart.line.uptrend.xyaxis" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="dashboard" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="water">
        <NativeTabs.Trigger.Label>Water</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "drop", selected: "drop.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="local-drink" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Label>Activity</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "figure.walk", selected: "figure.walk" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="directions-walk" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="sleep">
        <NativeTabs.Trigger.Label>Sleep</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "moon.zzz", selected: "moon.zzz.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="bedtime" />,
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
