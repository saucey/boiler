import * as React from 'react';
import glamorous from 'glamorous';
import { keyframes } from 'glamor';

const wheelSpin = keyframes({ '0%': { 'transform': 'rotate(-5deg)','100%': { 'transform': 'rotate(365deg)' } }});
const ButtonLoadingContainer = glamorous.div({ position: 'absolute', top: 10, right: 38.5 });
const ButtonWheel = glamorous.div({ width: 15.5, height: 15.5, margin: '0 auto', border: '1.2px solid',
borderRadius: '50%', borderRightColor: 'transparent', animation: `${wheelSpin} 1.2s infinite linear` });

export const ButtonAppLoading = () => {
return (
<ButtonLoadingContainer>
<ButtonWheel />
</ButtonLoadingContainer>);
};