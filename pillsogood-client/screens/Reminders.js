import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { colors } from './colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PrimaryButton } from './components/PrimaryButton';
import { styles } from './styles';
const days = [
    { title: 'SU', active: true },
    { title: 'M', active: true },
    { title: 'T', active: true },
    { title: 'W', active: true },
    { title: 'TH', active: false },
    { title: 'F', active: false },
    { title: 'S', active: true },
];
1
const Reminders = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(true);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headingWrapper}>
                <Text style={styles.heading}>몇시에 약을 </Text>
                <Text style={styles.heading}>먹고 싶으신가요?</Text>

                <Text style={styles.subHeading}>
                    편한 시간대를 선택해주세요. 아침 식사 후를 추천합니다.
                </Text>
            </View>
            <View style={styles.timePickerWrapper}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            </View>

            <View style={styles.headingWrapper}>
                <Text style={styles.heading}>무슨 요일에 </Text>
                <Text style={styles.heading}>알려드릴까요?</Text>

                <Text style={styles.subHeading}>
                    모두 선택하시면 매일 매일 알려드릴게요 !
                </Text>
            </View>
            <View style={styles.dayContainer}>
                {days.map((item, index) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.dayItem,
                                {
                                    backgroundColor: item.active
                                        ? colors.heading
                                        : colors.secondaryBg,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.dayTitle,
                                    { color: item.active ? colors.whiteShade : colors.gray },
                                ]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.btnWrapper}>
                <PrimaryButton background={colors.primary} label={'저장하기'} />

                <PrimaryButton
                    background={colors.white}
                    color={colors.heading}
                    label={'NO THANKS'}
                />
            </View>
        </View>
    );
};

export default Reminders