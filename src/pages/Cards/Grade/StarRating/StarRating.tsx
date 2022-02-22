import s from './StarRating.module.scss'
import {Nullable} from '../../../../redux/types/Nullable';

type PropsType = {
    grade: number
    minGrade?: Nullable<number>
    maxGrade: number
}

export const StarRating = ({grade, maxGrade, minGrade = 0}: PropsType) => {
    return (
        <div className={s.starRating}>
            {[...Array(maxGrade)].map((star, index) => {
                index += 1
                return (
                    <i
                        key={index}
                        style={{color: index <= (grade) ? '#d57689' : '#9a8f8f'}}>
                        <span>&#9733;</span>
                    </i>
                )
            })}
        </div>
    )
}
