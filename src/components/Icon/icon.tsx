import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme? : ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  // 如果theme是primary，添加类 icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classnames('icon', className, {
    [`icon-${theme}`]: theme
  })

  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon;
