import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { HomePageProps } from "../navigation/RootStack";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  useAnimatedRef,
  useScrollViewOffset,
  withSpring,
} from "react-native-reanimated";
import { data } from "../../assets/fake";
import { sharedElementTransition } from "../utils/SharedElementTransition";
import Ionicons from "@expo/vector-icons/Ionicons";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Home = ({ navigation }: HomePageProps) => {
  const widthh = useSharedValue(150);
  const heighth = useSharedValue(150);
  const backgroundColor = useSharedValue("teal");
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const startAnimation = () => {
    const randomWidth = Math.floor(Math.random() * 300) + 100;
    const randomHeight = Math.floor(Math.random() * 300) + 100;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    widthh.value = withTiming(randomWidth);
    heighth.value = withTiming(randomHeight);
    backgroundColor.value = withTiming(randomColor, {
      duration: 2000,
      //easing: Easing.bounce,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: widthh.value,
      width: heighth.value,
      backgroundColor: backgroundColor.value,
    };
  });

  const animatedInputStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const scrollHandler = useScrollViewOffset(scrollRef);

  const buttonStyle = useAnimatedStyle(() => {
    console.log("Scroll Handler value --> ", scrollHandler.value);
    return {
      opacity: scrollHandler.value > 1000 ? withSpring(1) : withSpring(0),
    };
  });

  const scrollTop = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <>
      <Animated.ScrollView ref={scrollRef}>
        <Button title="click Animation" onPress={startAnimation} />
        <AnimatedInput
          style={[animatedInputStyles, { height: 50, margin: 10 }]}
        />
        <Animated.View style={animatedStyles}></Animated.View>
        {data.map((item, index) => (
          <View key={index} style={{ padding: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { item })}
            >
              <Animated.Image
                sharedTransitionTag={`image-${item.id}`}
                sharedTransitionStyle={sharedElementTransition}
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
      <Animated.View
        style={[{ position: "absolute", bottom: 20, right: 20 }, buttonStyle]}
      >
        <TouchableOpacity
          onPress={scrollTop}
          style={{
            padding: 6,
            backgroundColor: "blue",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-circle" size={30} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
