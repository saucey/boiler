import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import glamorous, { CSSProperties } from 'glamorous';
 
export interface ButtonComponentProps{
    text: string;
}

export interface ButtonComponentState{
    toggle: boolean;
}

export class ButtonComponent extends Component<ButtonComponentProps, ButtonComponentState> {
    constructor(props:ButtonComponentProps){
        super(props);
        this.state = {toggle: false};
    }
    onMouseEnter = () => {  this.setState({ toggle: true});}
    onMouseLeave = () => {  this.setState({ toggle: false});}

    render() {
        let toggle = this.state.toggle;
        return(
          <Spring from={{opacity: '0'}} to={{ opacity: toggle ? '1' : '0', width: toggle ? '100%' : '0%', backgroundColor: toggle ? 'yellow' : 'white'}} config={{duration: 400}}>
            {(props) => (
              <div style={{cursor: 'pointer', width:'fit-content'}} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
                <h1 style={{color:'white'}}>{this.props.text}</h1>
                <glamorous.Div css={{...props as CSSProperties, height:1, position:'relative'}}/>
              </div>
            )}
           </Spring>
        )
      } 
    }
