import {useEffect, useState} from 'react';
import s from './Pagination.module.scss'
import {useAppSelector} from '../../../redux/store';

type PropsType = {
    totalCount: number,
    countPerPage: number,
    currentPage: number,
    onChange: (page: number) => void
    step?: number
}

export const Pagination = ({totalCount, countPerPage, currentPage, onChange, step = 10}: PropsType) => {
    const [prevIsHidden, setPrevIsHidden] = useState(false)
    const [nextIsHidden, setNextIsHidden] = useState(false)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

    const pageNumbers: number = Math.ceil(totalCount / countPerPage)
    const pages = []
    for (let i = 1; i <= pageNumbers; i++) {
        pages.push(i)
    }

    const previousPage = currentPage !== 1 ? currentPage - 1 : 1
    const nextPage = currentPage !== pageNumbers ? currentPage + 1 : pageNumbers
    const pageNextStep = (currentPage + step) > pageNumbers ? pageNumbers : currentPage + step
    const pagePreviousStep = (currentPage - step) < 1 ? 1 : currentPage - step

    useEffect(() => {
        previousPage === currentPage ? setPrevIsHidden(true) : setPrevIsHidden(false)
        nextPage === currentPage ? setNextIsHidden(true) : setNextIsHidden(false)
    }, [currentPage, nextPage, previousPage])

    if (isNaN(pageNumbers) || totalCount === 0 || pageNumbers === 1) {
        return <></>
    }

    return (
        <div className={s.container}>
            <button className={`${prevIsHidden && s.hidden}`}
                    onClick={() => onChange(currentPage - 1)} disabled={isLoading}>Prev
            </button>

            <button className={`${prevIsHidden && s.hidden}`}
                    onClick={() => onChange(1)} disabled={isLoading}>Start
            </button>

            <button className={`${prevIsHidden && s.hidden}`}
                    onClick={() => onChange(pagePreviousStep)} disabled={isLoading}>...
            </button>

            <button className={`${prevIsHidden && s.hidden}`}
                    onClick={() => onChange(previousPage)}
                    disabled={isLoading}>{previousPage !== currentPage && previousPage}</button>

            <button className={s.active} disabled={isLoading}>{currentPage}</button>

            <button className={`${nextIsHidden && s.hidden}`}
                    onClick={() => onChange(nextPage)}
                    disabled={isLoading}>{nextPage !== currentPage && nextPage}</button>

            <button className={`${nextIsHidden && s.hidden}`}
                    onClick={() => onChange(pageNextStep)} disabled={isLoading}>...
            </button>


            <button className={`${nextIsHidden && s.hidden}`}
                    onClick={() => onChange(currentPage + 1)} disabled={isLoading}>Next
            </button>

            <button className={`${nextIsHidden && s.hidden}`}
                    onClick={() => onChange(pageNumbers)} disabled={isLoading}>End
            </button>

        </div>
    )
}