import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { Card } from '../common'

const { height, width } = Dimensions.get('window');
let screenHeight = height;
let screenWidth = width;
const aspectRatio = screenHeight / screenWidth;

const NewsCard = ({ post }) => {
  return (
    <Card>

      <View>
        <Image style={styles.thumb} source={{uri: 'https://lorempixel.com/300/200/nature/'}} />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaItemAuthor }>Myung Corwin</Text>
          <Text>17.Mai 2018</Text>
        </View>
        <Text style={styles.content}>{post.content}</Text>
      </View>

    </Card>
  )
}


const styles = {
  thumb: {
    width: '100%',
    height: screenWidth * 0.66
  },
  headerContainer: {
    padding: 10
  },
  title: {
    fontSize: 25,
    marginBottom: 5
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  metaItemAuthor: {
    color: 'blue',
    marginRight: 10
  },
  metaItem: {
    marginRight: 10
  },
  content: {
    marginTop: 10
  }
}

export { NewsCard };
