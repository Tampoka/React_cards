import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import s from '../../../common/components/Modal/CommonModalForm/CommonModalForm.module.scss';
import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';

type PropsType = {
    onSubmitHandler: (question: string, answer: string) => void
    isLoading: boolean
    onClose:()=>void
}

export const AddCardForm = ({onSubmitHandler, isLoading,onClose}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
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
            <h2>New Card Info</h2>
            <button onClick={onClose} className={s.closeBtn}>X</button>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <SuperInputText  {...formik.getFieldProps('question')}
                                 error={formik.touched.question && formik.errors.question
                                     ? formik.errors.question
                                     : ''}
                                 autoComplete='new-question'
                placeholder={'Enter question'}/>
                <p className={s.attach}>+ Attach file</p>
                <SuperInputText  {...formik.getFieldProps('answer')}
                                 error={formik.touched.answer && formik.errors.answer
                                     ? formik.errors.answer
                                     : ''}
                                 autoComplete='new-answer'
                                 placeholder={'Enter answer'}/>
                <p>+ Attach file</p>
                <div className={s.submitBtn}><SuperButton type='submit'  disabled={isLoading}>Save</SuperButton></div>
            </form>
        </div>
    )
};

