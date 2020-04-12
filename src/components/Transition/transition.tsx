import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

// interface _transitionProps {
//   animation?: AnimationName;
//   wrapper?: boolean;
// }

// export type TransitionProps = Partial<_transitionProps & CSSTransitionProps>;

interface TransitionProps extends CSSTransitionProps {
  animation?: AnimationName,
  wrapper? : boolean,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;

// import React from 'react';
// import { CSSTransition } from 'react-transition-group';
// // 为了继承 CSSTransition 的属性进行继承，所以要单独引入
// import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

// // 额外加属性
// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName;
//   wrapper?: boolean;
// }

// const Transition: React.FC<TransitionProps> = (props) => {
//   const { children, className, animation, ...restProps } = props;
//   return (
//     <CSSTransition classNames={className ? className : animation} {...restProps}>
//       {children}
//   </CSSTransition>
//   )
// };

// Transition.defaultProps = {
//   unmountOnExit: true,
//   appear: true,
// }

// export default Transition;
