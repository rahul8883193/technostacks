import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (screen, params = {}) => {
    navigationRef.current?.navigate(screen, params);
};


export function navigateToClearStack(routeName, params) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: routeName, params: params }],
        }),
    );
}
