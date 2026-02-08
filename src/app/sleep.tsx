import { Stack } from "expo-router/stack";
import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { useHealth } from "@/components/health-context";

export default function SleepTracker() {
  const { healthData, updateSleep } = useHealth();
  const { sleepHours, sleepGoal, bedtime, wakeTime, sleepQuality } = healthData;

  const progress = (sleepHours / sleepGoal) * 100;
  const sleepDebt = sleepGoal - sleepHours;

  const adjustSleepHours = (amount: number) => {
    const newHours = Math.max(0, Math.min(24, sleepHours + amount));
    updateSleep(newHours, sleepGoal, sleepQuality, bedtime, wakeTime);
  };

  const adjustGoal = (newGoal: number) => {
    const validGoal = Math.max(4, Math.min(12, newGoal));
    updateSleep(sleepHours, validGoal, sleepQuality, bedtime, wakeTime);
  };

  const setSleepHours = (hours: number) => {
    updateSleep(hours, sleepGoal, sleepQuality, bedtime, wakeTime);
  };

  const setSleepQuality = (quality: number) => {
    updateSleep(sleepHours, sleepGoal, quality, bedtime, wakeTime);
  };

  const qualityLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const qualityColors = ['#FF4444', '#FF8800', '#FFAA00', '#88CC00', '#44AA88'];

  return (
    <>
      <Stack.Screen options={{ title: "Sleep Tracker", headerLargeTitle: true }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemBackground }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{ padding: 20, gap: 24 }}>
          {/* Sleep Duration Circle */}
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
              borderColor: progress >= 100 ? '#6B46C1' : AC.systemFill,
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
                {sleepHours.toFixed(1)}
              </Text>
              <Text style={{
                fontSize: 16,
                color: AC.secondaryLabel,
                marginBottom: 8
              }}>
                hours of sleep
              </Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: progress >= 100 ? '#6B46C1' : AC.tertiaryLabel
              }}>
                {Math.round(progress)}% of goal
              </Text>
            </View>
          </View>

          {/* Sleep Schedule */}
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
              Sleep Schedule
            </Text>

            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{
                flex: 1,
                backgroundColor: AC.tertiarySystemBackground,
                borderRadius: 12,
                borderCurve: 'continuous',
                padding: 16,
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 24, marginBottom: 8 }}>🌙</Text>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: AC.label,
                  marginBottom: 4,
                  fontVariant: 'tabular-nums'
                }}>
                  {bedtime}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  Bedtime
                </Text>
              </View>

              <View style={{
                flex: 1,
                backgroundColor: AC.tertiarySystemBackground,
                borderRadius: 12,
                borderCurve: 'continuous',
                padding: 16,
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 24, marginBottom: 8 }}>☀️</Text>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: AC.label,
                  marginBottom: 4,
                  fontVariant: 'tabular-nums'
                }}>
                  {wakeTime}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  Wake up
                </Text>
              </View>
            </View>
          </View>

          {/* Sleep Quality */}
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
              Sleep Quality
            </Text>

            <View style={{
              backgroundColor: AC.tertiarySystemBackground,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: qualityColors[sleepQuality - 1],
                marginBottom: 4
              }}>
                {qualityLabels[sleepQuality - 1]}
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text
                    key={star}
                    style={{
                      fontSize: 24,
                      color: star <= sleepQuality ? qualityColors[sleepQuality - 1] : AC.systemFill
                    }}
                  >
                    ⭐
                  </Text>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Pressable
                  key={rating}
                  onPress={() => setSleepQuality(rating)}
                  style={{
                    flex: 1,
                    backgroundColor: sleepQuality === rating ? qualityColors[rating - 1] : AC.systemFill,
                    borderRadius: 8,
                    borderCurve: 'continuous',
                    paddingVertical: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: sleepQuality === rating ? 'white' : AC.secondaryLabel
                  }}>
                    {rating}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Adjust Sleep Hours */}
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
              Log Sleep Duration
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Pressable
                onPress={() => adjustSleepHours(-0.5)}
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
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: AC.label,
                  fontVariant: 'tabular-nums'
                }}>
                  {sleepHours.toFixed(1)}h
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  sleep duration
                </Text>
              </View>

              <Pressable
                onPress={() => adjustSleepHours(0.5)}
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

            {/* Quick preset buttons */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[6, 7, 8, 9].map((hours) => (
                <Pressable
                  key={hours}
                  onPress={() => setSleepHours(hours)}
                  style={{
                    flex: 1,
                    backgroundColor: AC.tertiarySystemBackground,
                    borderRadius: 8,
                    borderCurve: 'continuous',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: AC.label
                  }}>
                    {hours}h
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Sleep Goal */}
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
              Sleep Goal
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                onPress={() => adjustGoal(sleepGoal - 0.5)}
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
                  {sleepGoal}h
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: AC.secondaryLabel
                }}>
                  per night
                </Text>
              </View>

              <Pressable
                onPress={() => adjustGoal(sleepGoal + 0.5)}
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

          {/* Sleep Status */}
          <View style={{
            backgroundColor: progress >= 100 ? '#F0E6FF' : sleepDebt > 1 ? '#FFE6E6' : AC.tertiarySystemBackground,
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
                  color: '#6B46C1',
                  textAlign: 'center'
                }}>
                  Great job! You've met your sleep goal!
                </Text>
              </>
            ) : sleepDebt > 1 ? (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>⚠️</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#D32F2F',
                  textAlign: 'center'
                }}>
                  You have a sleep debt of {sleepDebt.toFixed(1)} hours
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>😴</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: AC.label,
                  textAlign: 'center'
                }}>
                  You need {sleepDebt.toFixed(1)} more hours to reach your goal
                </Text>
              </>
            )}
          </View>

          {/* Sleep Tips */}
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
              Better Sleep Tips
            </Text>

            <View style={{ gap: 12 }}>
              {[
                { icon: '📱', text: 'Avoid screens 1 hour before bed' },
                { icon: '🌡️', text: 'Keep your room cool (60-67°F)' },
                { icon: '☕', text: 'Limit caffeine after 2 PM' },
                { icon: '🧘‍♀️', text: 'Practice relaxation techniques' },
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