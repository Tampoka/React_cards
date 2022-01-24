import s from './StarRating.module.scss'

type PropsType = {
    grade: number
    minGrade: number
    maxGrade: number
}

export const StarRating = ({grade, maxGrade, minGrade}: PropsType) => {
    return (
        <div className={s.starRating}>
            {[...Array(maxGrade)].map((star, index) => {
                index += 1
                return (
                    <i
                        key={index}
                        style={{color: index <= (grade) ? '#d57689' : '#c7c7c7'}}>
                        <span>&#9733;</span>
                    </i>
                )
            })}
        </div>
    )
}
