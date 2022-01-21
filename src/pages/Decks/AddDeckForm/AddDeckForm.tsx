import SuperInputText from '../../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/components/SuperButton/SuperButton';
import {useFormik} from 'formik';
import s from './AddDeckForm.module.scss'
import * as Yup from 'yup';

type PropsType = {
    onSubmitHandler: (title:string)=>void
    isLoading:boolean
}
export const AddDeckForm = ({onSubmitHandler,isLoading}: PropsType) => {
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(25, 'Too Long!')
                .required('Required')
        }),
        onSubmit: (values) => {
            onSubmitHandler(values.name)
            formik.resetForm();
        },
    });
    return (
        <>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                    <SuperInputText  {...formik.getFieldProps('name')}
                                     error={formik.touched.name && formik.errors.name
                                         ? formik.errors.name
                                         : ''}
                    autoComplete='new-title'/>
                <SuperButton type='submit' className={s.submitBtn} disabled={isLoading}>Add new deck</SuperButton>
            </form>
        </>
    )
};