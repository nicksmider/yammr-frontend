import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { style, styles } from './TextItem.styles';
import { Vote } from '../../Vote/Vote';
import { getTimeAgo } from '../../../config/helpers';
import { TouchablePlatformSpecific } from '../../index';

/**
 * Performs actions when
 * @param {The id of the current post} postId
 * @param {The post-click handler given by Feed.js} clickHandler
 */
const onPress = (postId, clickHandler) => {
  console.log('Post Clicked on id ' + postId);
  if (clickHandler) {
    clickHandler(postId);
  } else {
    console.log('Post item clicked on, but no clickHandler supplied');
  }
};

export const TextItem = ({
  postId,
  score,
  text,
  timestamp,
  replyCount,
  clickHandler,
  voteHandler,
  voteType,
}) => {
  if (!text || text.length == 0) {
    console.log(`Warning, post with ID: ${postId}, has an empty text body`);
  }
  //timestamp = new Date();
  timestamp = new Date(timestamp.split('.000+0000')[0]);
  return (
    <TouchablePlatformSpecific onPress={() => onPress(postId, clickHandler)}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{text}</Text>
          </View>
          <View style={styles.voteContainer}>
            <Vote
              score={score}
              voteHandler={voteHandler}
              postId={postId}
              voteType={voteType}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={style.bottomTextStyle}>{getTimeAgo(timestamp)}</Text>
          </View>
          <View>
            <Text style={style.bottomTextStyle}>
              {replyCount
                ? replyCount > 1
                  ? replyCount + ' replies'
                  : replyCount + ' reply'
                : null}
            </Text>
          </View>
          <View style={styles.extraContainer}>
            <Text style={style.bottomTextStyle} />
          </View>
        </View>
      </View>
    </TouchablePlatformSpecific>
  );
};
