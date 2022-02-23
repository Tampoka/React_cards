import s from './StarRating.module.scss'

type PropsType = {
    grade: number
    maxGrade: number
}

export const StarRating = ({grade, maxGrade}: PropsType) => {
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
