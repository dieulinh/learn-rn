import React from 'react'
import { Text, View, Image } from 'react-native'
import { Card } from 'react-native-elements'

const NewsCardDetail = ({ post }) => {
  return (
    <Card featuredTitle={post.title} image={{uri: post.thumb_url}}>

      <View style={styles.metaContainer}>
        <Text style={styles.metaItemAuthor }>Myung Corwin</Text>
        <Text>17.Mai 2018</Text>
      </View>

      <Text style={styles.content}>{post.content}</Text>

    </Card>
  )
}

const styles = {
  headerContainer: {
    padding: 10
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

export { NewsCardDetail };
