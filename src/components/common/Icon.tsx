import React, { FC } from 'react';

import { Icons } from '../../types/Icons';

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: keyof typeof Icons
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
    const MyIcon: React.FunctionComponent<React.SVGAttributes<SVGElement>> = Icons[name];
    
    return (
        <MyIcon {...props} />
    );
};

export default Icon;
