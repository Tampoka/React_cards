import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import s from './AddCardForm.module.scss';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';

type PropsType = {
    onSubmitHandler: (question: string, answer: string) => void
    isLoading: boolean
}

export const AddCardForm = ({onSubmitHandler, isLoading}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        validationSchema: Yup.object({
            question: Yup.string()
                .min(2, 'Too Short!')
                .max(25, 'Too Long!')
                .required('Required'),
            answer: Yup.string()
                .min(2, 'Too Short!')
                .max(25, 'Too Long!')
                .required('Required'),
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.question, values.answer)
            formik.resetForm();
        },
    });
    return (
        <div className={s.addCardContainer}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <SuperInputText  {...formik.getFieldProps('question')}
                                 error={formik.touched.question && formik.errors.question
                                     ? formik.errors.question
                                     : ''}
                                 autoComplete='new-question'
                placeholder={'Enter question'}/>
                <SuperInputText  {...formik.getFieldProps('answer')}
                                 error={formik.touched.answer && formik.errors.answer
                                     ? formik.errors.answer
                                     : ''}
                                 autoComplete='new-answer'
                                 placeholder={'Enter answer'}/>
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Save</SuperButton>
            </form>
        </div>
    )
};

