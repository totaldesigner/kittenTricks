import * as React from 'react'
import {
  Image,
  ListView,
  View,
} from 'react-native'
import { RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components'
import { data } from '../../data'

import * as moment from 'moment'

export class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  };
  private data

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.data = ds.cloneWithRows(data.getNotifications())
  }


  renderRow(row) {
    const username = `${row.user.firstName} ${row.user.lastName}`
    const hasAttachment = row.attach !== undefined
    let attachment = <View />

    let mainContentStyle
    if (hasAttachment) {
      mainContentStyle = styles.mainContent
      attachment =
        <Image style={styles.attachment} source={row.attach} />
    }

    return (
      <View style={styles.container}>
        <Avatar img={row.user.photo}
          style={styles.avatar}
          badge={row.type} />
        <View style={styles.content}>
          <View style={mainContentStyle}>
            <View style={styles.text}>
              <RkText>
                <RkText rkType="header6">{username}</RkText>
                <RkText rkType="primary2"> {row.description}</RkText>
              </RkText>
            </View>
            <RkText rkType="secondary5 hintColor">{moment().add(row.time, 'seconds').fromNow()}</RkText>
          </View>
          {attachment}
        </View>
      </View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.root}
        dataSource={this.data}
        renderRow={this.renderRow} />

    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start',
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
}))