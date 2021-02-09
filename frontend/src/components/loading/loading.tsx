import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css'
import { loadingProps } from '../../shared/interfaces';

const Loading = ({type, color, height, width}: loadingProps) => (
    <div className='loading'>
        <ReactLoading type={type} color={color} height={height} width={width}/>
    </div>
);
 
export default Loading;