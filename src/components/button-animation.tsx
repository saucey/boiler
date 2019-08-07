import * as React from 'react';
import { ButtonAppLoading } from './app-loading';
//import { Success } from './success';

export interface IButtonAnimationProps {
isProcessing: boolean;
isSuccess: boolean;
}

export const ButtonAnimation = ({isProcessing, isSuccess }: IButtonAnimationProps) => {
const animateButton = ()=>{
if (isProcessing) {
return (<div style={{ color: 'transparent'}} key='appLoading'>save <ButtonAppLoading /></div> );
} else if (isSuccess) {
return ( <div style={{ color: 'transparent'}} key='success'>save <ButtonAppLoading /></div>);
}return (<div>save</div>);
};
return animateButton();
};