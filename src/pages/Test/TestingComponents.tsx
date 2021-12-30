import React from 'react';
import SuperInputText from "../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/components/c3-SuperCheckbox/SuperCheckbox";
import Loader from "../../common/components/Loader/Loader";
import SuperEditableSpan from "../../common/components/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/components/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/components/c6-SuperRadio/SuperRadio";

const TestingComponents = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton>Submit</SuperButton>
            <SuperCheckbox/>
            <SuperEditableSpan value="enter text"/>
            <SuperSelect options={['1', '2', '3']}   value={'1'}/>
            <SuperRadio options={['1', '2', '3']}  name="radio" value={'1'} />
            <Loader/>
        </>
    );
};

export default TestingComponents;