import React from 'react';

import CustomChart from '../../../components/chart/customChart';
import Loading from '../../../components/loading/loading';

import { probabilityMetrics } from '../../../shared/interfaces';

const probabilityChart = (props: probabilityMetrics) => {
    return (
        <>
            {props.gradePredictionsOptions.length === props.maxSessions 
            && 
            props.maxSessions > 0 ? 
            <CustomChart 
                  type='area'
                  title="Passed Probability (%)" 
                  options={props.gradePredictionsOptions} 
                  series={[{name: "You", data: props.gradePredictions}]}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
        </>
    );
}

export default probabilityChart;