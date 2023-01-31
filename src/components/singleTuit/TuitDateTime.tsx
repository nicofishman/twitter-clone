import { format } from 'date-fns';
import React, { FC } from 'react';

interface TuitDateTimeProps {
    date: Date;
}

const TuitDateTime: FC<TuitDateTimeProps> = ({ date }) => {
    const formattedDate = format(date, 'MMM dd, yyyy');
    const formattedTime = format(date, 'h:mm a');

    return (
        <p className="text-textGray">
            <span>{formattedTime}</span>
            {' · '}
            <span>{formattedDate}</span>
        </p>
    );
};

export default TuitDateTime;
