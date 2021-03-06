import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[] | number[]
    onChangeOption?: (option: string | number) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        name,
        options, value,
        onChange, onChangeOption, type = "radio",
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: JSX.Element[] = options
        ? options.map((o, i) => (
            <label key={`${name} - ${i}`}>
                <input
                    type={type}
                    name={name}
                    value={o}
                    onChange={onChangeCallback}
                    checked={o === value}
                    className={o === value ? s.radioSelected : s.radio}
                    {...restProps}
                    // name, checked, value, onChange
                />
                {o}
            </label>
        ))
        : []
    return (
        <div className={s.radioContainer}>
            {mappedOptions}
        </div>
    )
}

export default SuperRadio
