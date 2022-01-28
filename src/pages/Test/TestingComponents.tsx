import SuperInputText from '../../common/components/SuperInputText/SuperInputText';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import SuperCheckbox from '../../common/components/SuperCheckbox/SuperCheckbox';
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperSelect from '../../common/components/SuperSelect/SuperSelect';
import SuperRadio from '../../common/components/SuperRadio/SuperRadio';

const TestingComponents = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton>Submit</SuperButton>
            <SuperCheckbox/>
            <SuperEditableSpan defaultValue="enter text"/>
            <SuperSelect options={['1', '2', '3']} value={'1'}/>
            <SuperRadio options={['1', '2', '3']} name="radio" value={'2'}/>
        </>
    );
};

export default TestingComponents;