/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, TextInput, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

function AppTextInput(props) {


    const { label, style, source, text } = props;

    return (
        <View
            style={{ ...style, justifyContent: 'center', alignContent: 'center' }}>
            <TextInput
                {...props}
                style={{ borderWidth: 1, borderRadius: 15 }}
                label={label}
            />
            <Text style={{
                position: 'absolute', right: 40,
                bottom: 16, color: '#15ddf1', paddingRight: 2
            }}>{text}</Text>
            <Image
                style={styles.icon}
                source={source}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 15,
        bottom: 14,
        height: 20,
        width: 20
    },
});

AppTextInput.defaultProps = {
    iconSize: 25,
    label: 'Password',
    iconColor: '#222222',
    text: ""
};

AppTextInput.propTypes = {
    iconSize: PropTypes.number,
    label: PropTypes.string,
    iconColor: PropTypes.string,
    text: PropTypes.string,
};

export default AppTextInput;
