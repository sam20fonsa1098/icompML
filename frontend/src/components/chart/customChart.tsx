import React, { useContext } from 'react';
import Chart from "react-apexcharts";
import useWindowDimensions from '../../hooks/windowHook/window';

import { defaultOptions, drawerWidth } from '../../shared/constants';
import { chartProps } from '../../shared/interfaces';
import { OpenContext } from '../../containers/user/index';

const CustomChart = (props: chartProps) => {
    const isOpen = useContext(OpenContext);
    const { height, width } = useWindowDimensions();
    return (
        <Chart 
            options={{
              ...defaultOptions,
              xaxis: {
                categories: props.options
              },
              chart: {
                  type: props.type,
                  dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                  }
                  
              },
              title: {
                text: props.title
            }, 
            }} 
            series={props.series}
            type={props.type}
            height={isOpen? height * 0.65 : height * 0.75}
            width={isOpen ? width - drawerWidth * 1.3 : width - drawerWidth * 0.7} 
        />
    );
}

export default CustomChart;
