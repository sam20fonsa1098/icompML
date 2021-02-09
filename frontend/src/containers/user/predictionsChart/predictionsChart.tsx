import React from 'react';

import CustomChart from '../../../components/chart/customChart';
import Loading from '../../../components/loading/loading';

import { predictionsMetrics } from '../../../shared/interfaces';

const predictionsChart = (props: predictionsMetrics) => {
    return (
        <>
            {props.predictionMetricsSeries.length === props.maxSessions 
            && 
            props.maxSessions > 0 ?
            <CustomChart 
                  type='area'
                  title="Prediction Metrics" 
                  options={props.predictionMetricsOptions} 
                  series={props.predictionMetricsSeries}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
        </>
    );
}

export default predictionsChart;