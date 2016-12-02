/* @flow */
import type { TextProps } from './Text';
import type { Theme } from '../themes';
import React from 'react';
import style from './style';
import { Link as ReactRouterLink } from 'react-router';
import { textStyle } from './Text';

type LinkProps = {
  download?: boolean,
  exactly?: boolean,
  target?: string,
  to: string,
} & TextProps;

const linkStyle = (props: LinkProps, theme: Theme) => ({
  // Note how we can reuse styles with plain JavaScript.
  ...textStyle(props, theme),
  color: props.inverted ? theme.colors.white : theme.colors.primary,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

// TODO: Should be in theme, but wait for found router.
const routerLinkActiveStyle = { textDecoration: 'underline' };

const AnchorLink = style(linkStyle, 'a', [
  'download', 'href', 'target',
]);

const RouterLink = style(linkStyle, ReactRouterLink, [
  'activeOnlyWhenExact', 'activeStyle', 'to',
]);

const isExternalLink = to => to.includes('://');

const Link = (props: LinkProps) => (
  isExternalLink(props.to) ?
    <AnchorLink
      {...props}
      href={props.to}
      target="_blank"
    />
  :
    <RouterLink
      {...props}
      activeOnlyWhenExact={props.exactly}
      activeStyle={routerLinkActiveStyle}
    />
);

export default Link;
