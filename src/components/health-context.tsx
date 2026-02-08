import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HealthData {
  // Water tracking
  waterIntake: number;
  waterGoal: number;

  // Activity tracking
  steps: number;
  stepGoal: number;
  calories: number;
  distance: number;
  activeMinutes: number;

  // Sleep tracking
  sleepHours: number;
  sleepGoal: number;
  sleepQuality: number;
  bedtime: string;
  wakeTime: string;

  // Dates for tracking
  lastUpdated: string;
}

interface HealthContextType {
  healthData: HealthData;
  updateWater: (intake: number, goal?: number) => void;
  updateActivity: (steps: number, goal?: number, calories?: number, distance?: number, activeMinutes?: number) => void;
  updateSleep: (hours: number, goal?: number, quality?: number, bedtime?: string, wakeTime?: string) => void;
  resetDailyData: () => void;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  addSteps: (amount: number) => void;
}

const defaultHealthData: HealthData = {
  waterIntake: 0,
  waterGoal: 8,
  steps: 0,
  stepGoal: 10000,
  calories: 0,
  distance: 0,
  activeMinutes: 0,
  sleepHours: 0,
  sleepGoal: 8,
  sleepQuality: 3,
  bedtime: '23:00',
  wakeTime: '07:00',
  lastUpdated: new Date().toDateString(),
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const STORAGE_KEY = 'health_data';

export function HealthProvider({ children }: { children: React.ReactNode }) {
  const [healthData, setHealthData] = useState<HealthData>(defaultHealthData);

  // Load data from storage on mount
  useEffect(() => {
    loadHealthData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveHealthData();
  }, [healthData]);

  // Check if we need to reset daily data (new day)
  useEffect(() => {
    const today = new Date().toDateString();
    if (healthData.lastUpdated !== today) {
      resetDailyData();
    }
  }, []);

  const loadHealthData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const today = new Date().toDateString();

        // If it's a new day, reset daily metrics but keep goals
        if (parsedData.lastUpdated !== today) {
          setHealthData({
            ...parsedData,
            waterIntake: 0,
            steps: 0,
            calories: 0,
            distance: 0,
            activeMinutes: 0,
            sleepHours: 0,
            sleepQuality: 3,
            lastUpdated: today,
          });
        } else {
          setHealthData(parsedData);
        }
      }
    } catch (error) {
      console.error('Error loading health data:', error);
    }
  };

  const saveHealthData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(healthData));
    } catch (error) {
      console.error('Error saving health data:', error);
    }
  };

  const updateWater = (intake: number, goal?: number) => {
    setHealthData(prev => ({
      ...prev,
      waterIntake: Math.max(0, intake),
      waterGoal: goal || prev.waterGoal,
      lastUpdated: new Date().toDateString(),
    }));
  };

  const updateActivity = (
    steps: number,
    goal?: number,
    calories?: number,
    distance?: number,
    activeMinutes?: number
  ) => {
    setHealthData(prev => ({
      ...prev,
      steps: Math.max(0, steps),
      stepGoal: goal || prev.stepGoal,
      calories: calories !== undefined ? Math.max(0, calories) : prev.calories,
      distance: distance !== undefined ? Math.max(0, distance) : prev.distance,
      activeMinutes: activeMinutes !== undefined ? Math.max(0, activeMinutes) : prev.activeMinutes,
      lastUpdated: new Date().toDateString(),
    }));
  };

  const updateSleep = (
    hours: number,
    goal?: number,
    quality?: number,
    bedtime?: string,
    wakeTime?: string
  ) => {
    setHealthData(prev => ({
      ...prev,
      sleepHours: Math.max(0, Math.min(24, hours)),
      sleepGoal: goal || prev.sleepGoal,
      sleepQuality: quality || prev.sleepQuality,
      bedtime: bedtime || prev.bedtime,
      wakeTime: wakeTime || prev.wakeTime,
      lastUpdated: new Date().toDateString(),
    }));
  };

  const resetDailyData = () => {
    setHealthData(prev => ({
      ...prev,
      waterIntake: 0,
      steps: 0,
      calories: 0,
      distance: 0,
      activeMinutes: 0,
      sleepHours: 0,
      sleepQuality: 3,
      lastUpdated: new Date().toDateString(),
    }));
  };

  const addWaterGlass = () => {
    setHealthData(prev => ({
      ...prev,
      waterIntake: prev.waterIntake + 1,
      lastUpdated: new Date().toDateString(),
    }));
  };

  const removeWaterGlass = () => {
    setHealthData(prev => ({
      ...prev,
      waterIntake: Math.max(0, prev.waterIntake - 1),
      lastUpdated: new Date().toDateString(),
    }));
  };

  const addSteps = (amount: number) => {
    setHealthData(prev => ({
      ...prev,
      steps: prev.steps + amount,
      calories: prev.calories + Math.round(amount * 0.04),
      distance: prev.distance + amount * 0.0008,
      activeMinutes: prev.activeMinutes + (amount >= 100 ? Math.round(amount / 100) : 0),
      lastUpdated: new Date().toDateString(),
    }));
  };

  const contextValue: HealthContextType = {
    healthData,
    updateWater,
    updateActivity,
    updateSleep,
    resetDailyData,
    addWaterGlass,
    removeWaterGlass,
    addSteps,
  };

  return (
    <HealthContext.Provider value={contextValue}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}