import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Octicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // current color scheme
    console.log('Current color scheme:', colorScheme);
  })

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerBackgroundContainerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].card,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? 'light'].primary,
          fontFamily: 'OrbitronBold',
          fontSize: hp('3.0%'),
        },
        tabBarLabelStyle: {
          fontSize: hp('1.4%'),
          fontFamily: 'OrbitronBold',
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Converter',
          headerTitle: 'Bin2Dec',
          tabBarIcon: ({ color }) => <Octicons name="file-binary" color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon name="clipboard" color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
