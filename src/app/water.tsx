import { Stack } from "expo-router/stack";
import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { LinearGradient } from "expo-linear-gradient";
import { useHealth } from "@/components/health-context";

export default function WaterTracker() {
  const { healthData, addWaterGlass, removeWaterGlass, updateWater } = useHealth();
  const { waterIntake, waterGoal } = healthData;

  const progress = (waterIntake / waterGoal) * 100;
  const remaining = Math.max(0, waterGoal - waterIntake);

  const adjustGoal = (newGoal: number) => {
    updateWater(waterIntake, Math.max(1, newGoal));
  };

  return (
    <>
      <Stack.Screen options={{ title: "Water Intake", headerLargeTitle: true }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemBackground }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20, gap: 24 }}>
          {/* Progress Circle */}
          <View style={{
            alignItems: 'center',
            padding: 20,
          }}>
            <View style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: AC.secondarySystemBackground,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 8,
              borderColor: progress >= 100 ? '#4A90E2' : AC.systemFill,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}>
              <Text style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: AC.label,
                marginBottom: 4,
                fontVariant: 'tabular-nums'
              }}>
                {waterIntake}
              </Text>
              <Text style={{
                fontSize: 16,
                color: AC.secondaryLabel,
                marginBottom: 8
              }}>
                of {waterGoal} glasses
              </Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: progress >= 100 ? '#4A90E2' : AC.tertiaryLabel
              }}>
                {Math.round(progress)}%
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 16,
              textAlign: 'center'
            }}>
              Quick Actions
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={removeWaterGlass}
                style={{
                  flex: 1,
                  backgroundColor: AC.systemRed,
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text style={{
                  fontSize: 24,
                  marginBottom: 4
                }}>
                  −
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Remove
                </Text>
              </Pressable>

              <Pressable
                onPress={addWaterGlass}
                style={{
                  flex: 1,
                  backgroundColor: '#4A90E2',
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text style={{
                  fontSize: 24,
                  marginBottom: 4,
                  color: 'white'
                }}>
                  +
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Add Glass
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Daily Goal */}
          <View style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 16
            }}>
              Daily Goal
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                onPress={() => adjustGoal(waterGoal - 1)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: AC.systemFill,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20, color: AC.label }}>−</Text>
              </Pressable>

              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: AC.label,
                  fontVariant: 'tabular-nums'
                }}>
                  {waterGoal}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  glasses per day
                </Text>
              </View>

              <Pressable
                onPress={() => adjustGoal(waterGoal + 1)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: AC.systemFill,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20, color: AC.label }}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Status Message */}
          <View style={{
            backgroundColor: progress >= 100 ? '#E8F5E8' : AC.tertiarySystemBackground,
            borderRadius: 12,
            borderCurve: 'continuous',
            padding: 16,
            alignItems: 'center',
          }}>
            {progress >= 100 ? (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>🎉</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#2D7D32',
                  textAlign: 'center'
                }}>
                  Congratulations! You've reached your daily water goal!
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>💧</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: AC.label,
                  textAlign: 'center'
                }}>
                  {remaining} more glass{remaining !== 1 ? 'es' : ''} to reach your goal
                </Text>
              </>
            )}
          </View>

          {/* Water Benefits */}
          <View style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 16
            }}>
              Benefits of Staying Hydrated
            </Text>

            <View style={{ gap: 12 }}>
              {[
                { icon: '🧠', text: 'Improves brain function and focus' },
                { icon: '⚡', text: 'Boosts energy levels' },
                { icon: '✨', text: 'Promotes healthy skin' },
                { icon: '💪', text: 'Supports muscle function' },
              ].map((benefit, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 20 }}>{benefit.icon}</Text>
                  <Text style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    flex: 1
                  }}>
                    {benefit.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}