import React, {useState} from 'react';
import SuperInputText from "../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/components/c3-SuperCheckbox/SuperCheckbox";
import Loader from "../../common/components/Loader/Loader";

const TestingComponents = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton>Submit</SuperButton>
            <SuperCheckbox/>
            <Loader/>
        </>
    );
};

export default TestingComponents;