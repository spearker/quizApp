import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from "@testing-library/react-native";
import AnswerButton from "../../../src/Component/Button/AnswerButton";

const onPressMock = jest.fn()

describe('[AnswerButton] test', () => {
    const correct_props = {
        value: "answer",
        answer: "answer",
        onPress: onPressMock
    }
    const incorrect_props = {
        value: "wrong answer",
        answer: "answer",
        onPress: onPressMock
    }

    test('정답 버튼을 눌렀을 때', async () => {
        onPressMock.mockResolvedValue(correct_props.value === correct_props.answer)
        const rendered = render(<AnswerButton {...correct_props}/>)

        const answer = await rendered.findByText('answer')

        fireEvent.press(answer)

        expect(onPressMock).toBeCalledTimes(1)
        expect(onPressMock).toBeCalledWith(true)
    })

    test('오답 버튼을 눌렀을 때', async () => {
        onPressMock.mockResolvedValue(incorrect_props.value === incorrect_props.answer)
        const rendered = render(<AnswerButton {...incorrect_props}/>)

        const answer = await rendered.findByText('wrong answer')

        fireEvent.press(answer)

        expect(onPressMock).toBeCalledTimes(2)
        expect(onPressMock).toBeCalledWith(false)
    })

    test('버튼이 비활성화 될때', async () => {
        const disablePressMock = jest.fn()
        const rendered = render(<AnswerButton {...correct_props} onPress={disablePressMock} isChecked={true}/>)

        const disableButton = await rendered.findByText('answer')

        fireEvent.press(disableButton)

        expect(disablePressMock).not.toBeCalled()
    })
});
