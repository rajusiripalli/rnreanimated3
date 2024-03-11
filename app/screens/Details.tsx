import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DetailsPageProps } from "../navigation/RootStack";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  Easing,
  FadeInLeft,
  SlideInLeft,
} from "react-native-reanimated";
import { sharedElementTransition } from "../utils/SharedElementTransition";

const Details = ({ route }: DetailsPageProps) => {
  const { item } = route.params;

  return (
    <ScrollView>
      <Animated.Image
        sharedTransitionTag={`image-${item.id}`}
        sharedTransitionStyle={sharedElementTransition}
        source={{ uri: item.image }}
        style={{ width: "100%", height: 300 }}
      />
      <Animated.Text
        entering={FadeInLeft.springify()
          .damping(30)
          .mass(5)
          .stiffness(10)
          .overshootClamping(false)
          .restDisplacementThreshold(0.1)
          .restSpeedThreshold(5)}
        style={{ fontWeight: "bold", fontSize: 18, padding: 16 }}
      >
        {item.title}
      </Animated.Text>
      <Animated.Text
        entering={FadeInLeft.duration(500).delay(600)}
        style={{ fontSize: 16, padding: 16 }}
      >
        {item.description}
      </Animated.Text>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
