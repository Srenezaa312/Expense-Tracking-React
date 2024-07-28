import React from 'react';
import ADI from '@expo/vector-icons/AntDesign';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';

type TabBarIconProps = {
  color: string;
  size: number;
  type: 'expenses' | 'reports' | 'add' | 'settings';
};

export const TabBarIcon = ({type, color, size}: TabBarIconProps) => {
  switch (type) {
    case 'expenses':
      return <MCI name="tray-arrow-up" color={color} size={size} />;
    case 'add':
      return <ADI name="plus" size={size} color={color} />;
    case 'settings':
      return <MCI name="cog" size={size} color={color} />;
    default:
      return null;
  }
};
