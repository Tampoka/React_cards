import {StarRating} from './StarRating/StarRating';

type PropsType = {
    grade: number
    maxGrade: number
}

export const Grade = ({grade, maxGrade}: PropsType) => {
    return (
        <div>
            <StarRating grade={grade} maxGrade={maxGrade}/>
        </div>
    );
};

