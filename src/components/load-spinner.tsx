import * as React from 'react'
import { PulseSpinner } from 'react-spinners-kit'

export const LoadSpinner = () => {
    return (
        <div style={{ margin: '0 auto' }}><PulseSpinner size={50} color="white" loading={true} /></div>
    );
}

export const LoadSpinnerInverse = () => {
    return (
        <div style={{ margin: '0 auto' }}><PulseSpinner size={50} color="black" loading={true} /></div>
    );
}
