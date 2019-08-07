import * as React from 'react'
import {CSSTransition} from 'react-transition-group'
import './toggle.css'
import glamorous from '../../../node_modules/glamorous';

export interface IToggleProps{
    show: boolean;
}

export class Toggle extends React.Component<IToggleProps> {
    render() {
          return <div>
            <CSSTransition classNames="toggle" timeout={300} unmountonexit>
              {!this.props.show ? null : <div className="toggle-base">{this.props.children}</div>}
            </CSSTransition>    
         </div>
    }
  }

  export const Box = glamorous.div({
    transition: 'opacity 3000ms ease-in-out',
    opacity: 1,
    padding: 20,
    display: 'inline-block',
    backgroundColor: '#8787d8', 
    '.fade-enter': { opacity: 0,},
    '.fade-enter-active': { opacity: 1,},
    '.fade-exit': { opacity: 1,},
    '.fade-exit-active': { opacity: 0,},
  })