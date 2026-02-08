import { Stack } from "expo-router/stack";
import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { LinearGradient } from "expo-linear-gradient";
import { useHealth } from "@/components/health-context";

export default function ActivityTracker() {
  const { healthData, addSteps, updateActivity } = useHealth();
  const { steps, stepGoal, calories, distance, activeMinutes } = healthData;

  const stepProgress = (steps / stepGoal) * 100;
  const remaining = Math.max(0, stepGoal - steps);

  const adjustGoal = (newGoal: number) => {
    updateActivity(steps, Math.max(1000, newGoal), calories, distance, activeMinutes);
  };

  const activities = [
    { name: 'Quick Walk', steps: 500, icon: '🚶‍♂️' },
    { name: 'Jog', steps: 1000, icon: '🏃‍♂️' },
    { name: 'Stairs', steps: 200, icon: '🏢' },
    { name: 'Manual Entry', steps: 100, icon: '✏️' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Activity Tracker", headerLargeTitle: true }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemBackground }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20, gap: 24 }}>
          {/* Main Progress Circle */}
          <View style={{
            alignItems: 'center',
            padding: 20,
          }}>
            <View style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: AC.secondarySystemBackground,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 12,
              borderColor: stepProgress >= 100 ? '#50C878' : AC.systemFill,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}>
              <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: AC.label,
                marginBottom: 4,
                fontVariant: 'tabular-nums'
              }}>
                {steps.toLocaleString()}
              </Text>
              <Text style={{
                fontSize: 14,
                color: AC.secondaryLabel,
                marginBottom: 8
              }}>
                of {stepGoal.toLocaleString()} steps
              </Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: stepProgress >= 100 ? '#50C878' : AC.tertiaryLabel
              }}>
                {Math.round(stepProgress)}%
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 18, marginBottom: 4 }}>🔥</Text>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: AC.label,
                fontVariant: 'tabular-nums'
              }}>
                {calories}
              </Text>
              <Text style={{
                fontSize: 12,
                color: AC.secondaryLabel
              }}>
                calories
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 18, marginBottom: 4 }}>📍</Text>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: AC.label,
                fontVariant: 'tabular-nums'
              }}>
                {distance.toFixed(1)}
              </Text>
              <Text style={{
                fontSize: 12,
                color: AC.secondaryLabel
              }}>
                km
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 18, marginBottom: 4 }}>⏱️</Text>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: AC.label,
                fontVariant: 'tabular-nums'
              }}>
                {activeMinutes}
              </Text>
              <Text style={{
                fontSize: 12,
                color: AC.secondaryLabel
              }}>
                active min
              </Text>
            </View>
          </View>

          {/* Activity Buttons */}
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
              Log Activity
            </Text>

            <View style={{ gap: 12 }}>
              {activities.map((activity, index) => (
                <Pressable
                  key={index}
                  onPress={() => addSteps(activity.steps)}
                  style={{
                    backgroundColor: AC.tertiarySystemBackground,
                    borderRadius: 12,
                    borderCurve: 'continuous',
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 24 }}>{activity.icon}</Text>
                    <View>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: AC.label
                      }}>
                        {activity.name}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: AC.secondaryLabel
                      }}>
                        +{activity.steps.toLocaleString()} steps
                      </Text>
                    </View>
                  </View>
                  <Text style={{
                    fontSize: 24,
                    color: '#50C878'
                  }}>
                    +
                  </Text>
                </Pressable>
              ))}
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
              Daily Step Goal
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                onPress={() => adjustGoal(stepGoal - 1000)}
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
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: AC.label,
                  fontVariant: 'tabular-nums'
                }}>
                  {stepGoal.toLocaleString()}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  steps per day
                </Text>
              </View>

              <Pressable
                onPress={() => adjustGoal(stepGoal + 1000)}
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
            backgroundColor: stepProgress >= 100 ? '#E8F5E8' : AC.tertiarySystemBackground,
            borderRadius: 12,
            borderCurve: 'continuous',
            padding: 16,
            alignItems: 'center',
          }}>
            {stepProgress >= 100 ? (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>🎉</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#2D7D32',
                  textAlign: 'center'
                }}>
                  Amazing! You've reached your daily step goal!
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>🚶‍♂️</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: AC.label,
                  textAlign: 'center'
                }}>
                  {remaining.toLocaleString()} more steps to reach your goal
                </Text>
              </>
            )}
          </View>

          {/* Activity Tips */}
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
              Stay Active Tips
            </Text>

            <View style={{ gap: 12 }}>
              {[
                { icon: '🚶‍♂️', text: 'Take the stairs instead of elevators' },
                { icon: '🚗', text: 'Park farther away from your destination' },
                { icon: '📞', text: 'Take walking meetings when possible' },
                { icon: '🐕', text: 'Walk your pet for extra steps' },
              ].map((tip, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 20 }}>{tip.icon}</Text>
                  <Text style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    flex: 1
                  }}>
                    {tip.text}
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