import { Stack } from "expo-router/stack";
import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { LinearGradient } from "expo-linear-gradient";
import { useHealth } from "@/components/health-context";

export default function Dashboard() {
  const { healthData } = useHealth();

  const waterProgress = (healthData.waterIntake / healthData.waterGoal) * 100;
  const stepProgress = (healthData.steps / healthData.stepGoal) * 100;
  const sleepProgress = (healthData.sleepHours / healthData.sleepGoal) * 100;

  return (
    <>
      <Stack.Screen options={{ title: "Health Dashboard", headerLargeTitle: true }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemBackground }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20, gap: 20 }}>
          {/* Welcome Section */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{
              fontSize: 28,
              fontWeight: "bold",
              color: AC.label,
              marginBottom: 8
            }}>
              Good morning! 👋
            </Text>
            <Text style={{
              fontSize: 16,
              color: AC.secondaryLabel
            }}>
              Here's your health summary for today
            </Text>
          </View>

          {/* Quick Stats Cards */}
          <View style={{ gap: 16 }}>
            {/* Water Intake Card */}
            <Pressable style={{
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <LinearGradient
                colors={['#4A90E2', '#357ABD']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: AC.label, marginBottom: 4 }}>
                    💧 Water Intake
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: AC.label }}>
                    {healthData.waterIntake}/{healthData.waterGoal} glasses
                  </Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel, marginTop: 4 }}>
                    {Math.round(waterProgress)}% of daily goal
                  </Text>
                </View>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: AC.systemFill,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: AC.label }}>
                    {Math.round(waterProgress)}%
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Steps Card */}
            <Pressable style={{
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <LinearGradient
                colors={['#50C878', '#228B22']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: AC.label, marginBottom: 4 }}>
                    🚶‍♂️ Steps
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: AC.label, fontVariant: 'tabular-nums' }}>
                    {healthData.steps.toLocaleString()}
                  </Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel, marginTop: 4 }}>
                    {Math.round(stepProgress)}% of {healthData.stepGoal.toLocaleString()} goal
                  </Text>
                </View>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: AC.systemFill,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: AC.label }}>
                    {Math.round(stepProgress)}%
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Sleep Card */}
            <Pressable style={{
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <LinearGradient
                colors={['#6B46C1', '#4C1D95']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: AC.label, marginBottom: 4 }}>
                    😴 Sleep
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: AC.label }}>
                    {healthData.sleepHours}h
                  </Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel, marginTop: 4 }}>
                    {Math.round(sleepProgress)}% of {healthData.sleepGoal}h goal
                  </Text>
                </View>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: AC.systemFill,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: AC.label }}>
                    {Math.round(sleepProgress)}%
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>

          {/* Today's Goal Progress */}
          <View style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginTop: 10,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 16
            }}>
              Today's Progress
            </Text>

            <View style={{ gap: 12 }}>
              {/* Water Progress Bar */}
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 14, color: AC.label, fontWeight: '500' }}>Water</Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel }}>
                    {healthData.waterIntake}/{healthData.waterGoal} glasses
                  </Text>
                </View>
                <View style={{
                  height: 8,
                  backgroundColor: AC.systemFill,
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <View style={{
                    height: '100%',
                    width: `${Math.min(waterProgress, 100)}%`,
                    backgroundColor: '#4A90E2',
                    borderRadius: 4,
                  }} />
                </View>
              </View>

              {/* Steps Progress Bar */}
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 14, color: AC.label, fontWeight: '500' }}>Steps</Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel, fontVariant: 'tabular-nums' }}>
                    {healthData.steps.toLocaleString()}/{healthData.stepGoal.toLocaleString()}
                  </Text>
                </View>
                <View style={{
                  height: 8,
                  backgroundColor: AC.systemFill,
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <View style={{
                    height: '100%',
                    width: `${Math.min(stepProgress, 100)}%`,
                    backgroundColor: '#50C878',
                    borderRadius: 4,
                  }} />
                </View>
              </View>

              {/* Sleep Progress Bar */}
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 14, color: AC.label, fontWeight: '500' }}>Sleep</Text>
                  <Text style={{ fontSize: 14, color: AC.secondaryLabel }}>
                    {healthData.sleepHours}h/{healthData.sleepGoal}h
                  </Text>
                </View>
                <View style={{
                  height: 8,
                  backgroundColor: AC.systemFill,
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <View style={{
                    height: '100%',
                    width: `${Math.min(sleepProgress, 100)}%`,
                    backgroundColor: '#6B46C1',
                    borderRadius: 4,
                  }} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
