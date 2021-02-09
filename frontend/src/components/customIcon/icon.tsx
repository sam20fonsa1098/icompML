import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const Icon = (data: any) => {
    return (
        <SvgIcon {...data}>
            <path d={data.path} />
        </SvgIcon>
    );
}

export default Icon;