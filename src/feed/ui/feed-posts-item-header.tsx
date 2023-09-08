import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

import type { PostUuid } from '../feed.types'
import { feedCache } from '../feed-cache'
import { formatPostDate } from '../utils/format-post-date'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsItemCSS from './feed-posts-item-header.sss'

export type FeedPostsItemHeaderProps = {
  class?: string
  uuid: PostUuid
  visible?: boolean
}

export const FeedPostsItemHeader: Component<FeedPostsItemHeaderProps> = (props) => {
  const getPost = () => {
    return feedCache.posts[props.uuid]
  }

  const getDate = createMemo(() =>
    formatPostDate(getPost().date, { time: true })
  )

  const getChannelId = createMemo(() =>
    getPost().peer_id.channel_id
  )

  const getChannelTitle = createMemo(() =>
    feedCache.channels[getChannelId()].title
  )

  return (
    <header class={clsx(
      props.class,
      feedPostsItemCSS.base,
      layoutCSS.flex
    )}>
      <FeedChannelCover
        channelId={getChannelId()}
        size='medium'
        visible={props.visible}
      />

      <div class={clsx(
        feedPostsItemCSS.description,
        layoutCSS.flex
      )}>
        <Text variant='label' size='medium' ellipsis>
          {getChannelTitle()}
        </Text>
        <Text variant='label' size='small'>
          {getDate()}
        </Text>
      </div>

      <Button
        class={feedPostsItemCSS.button}
      >
        <Icon name='more' size='medium'/>
      </Button>
    </header>
  )
}
