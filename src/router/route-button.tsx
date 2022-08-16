import type { Component } from 'solid-js'
import { splitProps } from 'solid-js'

import type { Props as ButtonProps } from '~/ui/elements'
import { Button } from '~/ui/elements'

import type { RoutesItem } from './router.routes'
import { pushRoute, popRoute } from './router.actions'

type Props = {
  route: RoutesItem
  back?: boolean
} & ButtonProps

export const RouteButton: Component<Props> = (_props) => {
  const [props, buttonProps] = splitProps(_props, ['route', 'back'])

  const handleClick = () => {
    props.back ? popRoute(props.route) : pushRoute(props.route)
  }

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
    />
  )
}
