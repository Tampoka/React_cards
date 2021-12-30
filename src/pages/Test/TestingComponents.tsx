import React, {useState} from 'react';
import SuperInputText from "../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/components/c3-SuperCheckbox/SuperCheckbox";
import Loader from "../../common/components/Loader/Loader";
import SuperEditableSpan from "../../common/components/c4-SuperEditableSpan/SuperEditableSpan";

const TestingComponents = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton>Submit</SuperButton>
            <SuperCheckbox/>
            <Loader/>
            <SuperEditableSpan  value="enter text"
            />
        </>
    );
};

export default TestingComponents;