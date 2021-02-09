import React from 'react';

import CustomChart from '../../../components/chart/customChart';
import Loading from '../../../components/loading/loading';

import { userChartProps } from '../../../shared/interfaces';

const userChart = (props: userChartProps) => {
    return (
        <>
            {props.codeMetricsSeries.length > 1 ? 
            <CustomChart 
                  type='radar'
                  title="Code Metrics" 
                  options={props.codeMetricsOptions} 
                  series={props.codeMetricsSeries}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
            {props.submitedMetricsSeries.length > 1 ? 
            <CustomChart 
                  type='radar' 
                  title="Submited/Tested Metrics"  
                  options={props.submitedMetricsOptions} 
                  series={props.submitedMetricsSeries}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={150} height={100}/>}
            {props.keyboardMetricsSeries.length > 1 ? 
            <CustomChart 
                  type='radar' 
                  title="Keyboard Metrics" 
                  options={props.keyboardMetricsOptions} 
                  series={props.keyboardMetricsSeries}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
            {props.timeMetricsSeries.length > 1 ?
            <CustomChart 
                  type='bar' 
                  title="Time and Bad Metrics" 
                  options={props.timeMetricsOptions} 
                  series={props.timeMetricsSeries}/>
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
            {props.gradeStatus.length > 1 ? 
            <CustomChart 
                type='bar' 
                title="Grade Metrics" 
                options={['grade']} 
                series={props.gradeStatus}
            />
            : <Loading type={'spinningBubbles'} color={'#993399'} width={100} height={100}/>}
        </>
    );
}

export default userChart;