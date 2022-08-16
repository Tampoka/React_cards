import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.scss'
import {Optional} from '../../../redux/types/Optional';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: Optional<boolean>
    classname?: Optional<string>
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, type,
        ...restProps
    }
) => {
    const finalClassName = `${s.button} ${red ? s.red : s.default} ${className?className:""}`

    return (
        <button
            className={finalClassName}
            {...restProps}
            type={type}
        />
    )
}

export default SuperButton
