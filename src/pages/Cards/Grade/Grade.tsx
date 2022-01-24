import React from 'react';
import {StarRating} from './StarRating/StarRating';

type PropsType={
    grade:number
    minGrade:number
    maxGrade:number
}

export const Grade = ({grade,minGrade,maxGrade}:PropsType) => {
    return (
        <div>
            <StarRating grade={grade} minGrade={minGrade} maxGrade={maxGrade}/>
        </div>
    );
};

