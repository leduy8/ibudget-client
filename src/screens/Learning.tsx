import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { windowWidth } from "../configs/app";

const blogs = [
  {
    title: "What Is Investing? How Can You Start Investing?",
    content:
      "Investing is the process of buying assets that increase in value over time and provide returns in the form of income payments or capital gains. In a larger sense, investing can also be about spending time or money to improve your own life or the lives of others. But in the world of finance, investing is the purchase of securities, real estate and other items of value in the pursuit of capital gains or income.",
    url: "https://www.forbes.com/advisor/investing/what-is-investing",
    imgUrl:
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2020/07/what-investing-e1595962588896.jpg",
  },
  {
    title: "How to Reach Financial Freedom: 12 Habits to Get You There",
    content:
      "Learn the 12 habits of financial freedom, including basic budgeting, debt reduction, automatic savings, financial education, and smart maintenance.",
    url: "https://www.investopedia.com/articles/personal-finance/112015/these-10-habits-will-help-you-reach-financial-freedom.asp",
    imgUrl:
      "https://1.bp.blogspot.com/-imIY2NKSIv4/XSLNSEhFt2I/AAAAAAAAAi8/gungvpmkixcXZ42WOgLveJzRSVwGW_mUwCLcBGAs/s1600/sharon-mccutcheon-8lnbXtxFGZw-unsplash.jpg",
  },
  {
    title: "15 Steps to Achieve Financial Freedom",
    content: `What is financial freedom?

Ask a room of people to define financial freedom, and you're likely to get a dozen answers.
“We all have different relationships with our money,” notes Shelly-Ann Eweka, director of central advice for financial firm TIAA.
For some, financial freedom means being able to pay the bills with money left over each month or having a fully funded emergency account. Others may want to retire early and travel extensively.`,
    url: "https://money.usnews.com/money/personal-finance/slideshows/steps-to-achieve-financial-freedom",
    imgUrl:
      "https://www.usnews.com/object/image/00000180-0435-db39-a98f-24b79d950000/gettyimages-1284298875.jpg",
  },
  {
    title: "How to Save Money: 22 Simple Tips",
    content:
      "Do you ever feel like no matter how hard you try it's still impossible to find ways to save money? You mean well and try to spend less, but something always comes up. Life gets in the way—the car needs new tires, the teenager needs braces, the house needs a new roof—and just like that, saving money takes a back seat. Sound familiar?",
    url: "https://www.ramseysolutions.com/budgeting/the-secret-to-saving-money",
    imgUrl:
      "https://ducthangbui.com/wp-content/uploads/2018/05/saving-money-ielts-speaking-sample-min.jpg",
  },
  {
    title: "8 simple ways to save money",
    content:
      "Sometimes the hardest thing about saving money is just getting started. This step-by-step guide can help you develop a simple and realistic strategy, so that you can save for all your short- and long-term goals.",
    url: "https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money",
    imgUrl:
      "https://bepnhapkhau247.com/wp-content/uploads/2019/11/Saving-money-not-feeling-deprived.jpg",
  },
];

const Learning = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.v_header_name, { marginVertical: 20 }]}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Học hỏi</Text>
        </View>

        {blogs.map((blog) => (
          <TouchableOpacity
            key={blog.title}
            style={{
              marginBottom: 10,
              backgroundColor: "#fff",
              flexDirection: "row",
              padding: 10,
            }}
            onPress={() => Linking.openURL(blog.url)}
          >
            <Image
              style={{
                marginTop: 13,
                width: 100,
                height: 100,
              }}
              source={{ uri: blog.imgUrl }}
            />
            <View style={{ width: windowWidth - 100, padding: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {blog.title}
              </Text>
              <Text numberOfLines={3} ellipsizeMode={"tail"}>
                {blog.content}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  v_header_name: {
    paddingHorizontal: 15,
  },
});

export default Learning;
