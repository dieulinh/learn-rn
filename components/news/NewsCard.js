import React from 'react'
import { Text, View, Image } from 'react-native'
import { Card } from 'react-native-elements'

const NewsCard = ({ post }) => {
  return (
    <Card title={post.title} image={{uri: post.thumb_url}}>
      <Text>{post.content_excerpt}</Text>
    </Card>
  )
}

const styles = {
  headerContainer: {
    padding: 10
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  metaItemAuthor: {
    color: 'blue',
    marginRight: 10
  },
  metaItem: {
    marginRight: 10
  }
}

export { NewsCard };
