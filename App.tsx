const DATA = [
  {
    id: 1,
    title: 'The Hunger Games',
  },
  {
    id: 2,
    title: 'Harry Potter and the Order of the Phoenix',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
  },
  {
    id: 5,
    title: 'Twilight',
  },
  {
    id: 6,
    title: 'The Book Thief',
  },
  {
    id: 7,
    title: 'The Chronicles of Narnia',
  },
  {
    id: 8,
    title: 'Animal Farm',
  },
  {
    id: 10,
    title: 'The Shadow of the Wind',
  },
  {
    id: 11,
    title: 'The Fault in Our Stars',
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    id: 13,
    title: 'The Giving Tree',
  },
  {
    id: 14,
    title: 'Wuthering Heights',
  },
  {
    id: 15,
    title: 'The Da Vinci Code',
  },
  {
    id: 11,
    title: 'The Fault in Our Stars',
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    id: 13,
    title: 'The Giving Tree',
  },
  {
    id: 14,
    title: 'Wuthering Heights',
  },
  {
    id: 15,
    title: 'The Da Vinci Code',
  },
  {
    id: 11,
    title: 'The Fault in Our Stars',
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    id: 13,
    title: 'The Giving Tree',
  },
  {
    id: 14,
    title: 'Wuthering Heights',
  },
  {
    id: 15,
    title: 'The Da Vinci Code',
  },
];

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

export interface AnimatedHeaderProps {
  animatedValue: Animated.Value;
  hidden: boolean;
}

const HEADER_HEIGHT = 100;

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  animatedValue,
  hidden,
}) => {
  const insets = useSafeAreaInsets();

  const clampedScroll = Animated.diffClamp(
    animatedValue,
    0,
    HEADER_HEIGHT + 44,
  );

  const headerHeight = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top],
    extrapolate: 'clamp',
  });

  const shadowOpacity = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT - 20, HEADER_HEIGHT],
    outputRange: [1, 0.01, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: hidden ? headerHeight : HEADER_HEIGHT + insets.top,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}>
      <Animated.Text
        style={{
          opacity: hidden ? shadowOpacity : 1,
        }}>
        Animated Header
      </Animated.Text>
    </Animated.View>
  );
};

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [hidden, setHidden] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
    setHidden(offsetY > 0);
    console.log(offsetY <= 0);
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: false,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <AnimatedHeader animatedValue={scrollY} hidden={hidden} />
        <ScrollView
          style={{flex: 1, backgroundColor: 'white'}}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: 120,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onScroll}>
          {DATA.map(item => (
            <View
              key={item.id}
              style={{
                marginBottom: 20,
              }}>
              <Text style={{color: '#101010', fontSize: 32}}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
