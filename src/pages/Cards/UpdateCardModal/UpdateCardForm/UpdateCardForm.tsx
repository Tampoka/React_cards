import React from 'react';
import s from '../../AddCardForm/AddCardForm.module.scss';
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';

type PropsType = {
    onSubmitHandler: (question: string, answer: string) => void
    isLoading: boolean
    question: string
    answer: string
    closeOnSubmit:()=>void
}

export const UpdateCardForm = ({onSubmitHandler, isLoading, question, answer,closeOnSubmit}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            question: question,
            answer: answer,
        },
        validationSchema: Yup.object({
            question: Yup.string()
                .min(2, 'Too Short!'),
                // .max(25, 'Too Long!'),
            answer: Yup.string()
                .min(2, 'Too Short!')
                // .max(25, 'Too Long!'),
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.question, values.answer)
            formik.resetForm();
            closeOnSubmit()
        },
    });
    return (
        <div className={s.addCardContainer}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label htmlFor='question'>Question</label>
                <SuperInputText  {...formik.getFieldProps('question')}
                                 error={formik.touched.question && formik.errors.question
                                     ? formik.errors.question
                                     : ''}
                                 autoComplete='new-question'
                                 placeholder={'Enter question'}/>
                <label htmlFor='answer'>Answer</label>
                <SuperInputText  {...formik.getFieldProps('answer')}
                                 error={formik.touched.answer && formik.errors.answer
                                     ? formik.errors.answer
                                     : ''}
                                 autoComplete='new-answer'
                                 placeholder={'Enter answer'}/>
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Save</SuperButton>
            </form>
        </div>
    );
};

