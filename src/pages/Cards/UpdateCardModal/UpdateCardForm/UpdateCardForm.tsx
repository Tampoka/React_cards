import React from 'react';
import s from '../../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import SuperInputText from '../../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../../common/components/SuperButton/SuperButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';

type PropsType = {
    onSubmitHandler: (question: string, answer: string) => void
    isLoading: boolean
    question: string
    answer: string
    onClose:()=>void
}

export const UpdateCardForm = ({onSubmitHandler, isLoading, question, answer,onClose}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            question: question,
            answer: answer,
        },
        validationSchema: Yup.object({
            question: Yup.string()
                .min(2, 'Too Short!'),
            answer: Yup.string()
                .min(2, 'Too Short!')
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.question, values.answer)
            formik.resetForm();
        },
    });
    return (
        <div className={s.container}>
            <h2>Card Info</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label htmlFor='answer'>Question</label>
                <SuperInputText  {...formik.getFieldProps('question')}
                                 error={formik.touched.question && formik.errors.question
                                     ? formik.errors.question
                                     : ''}
                                 autoComplete='new-question'/>
                <label htmlFor='answer'>Answer</label>
                <SuperInputText  {...formik.getFieldProps('answer')}
                                 error={formik.touched.answer && formik.errors.answer
                                     ? formik.errors.answer
                                     : ''}
                                 autoComplete='new-answer'/>
                <div  className={s.submitBtn} ><SuperButton type='submit' disabled={isLoading}>Update</SuperButton></div>
            </form>
        </div>
    );
};

