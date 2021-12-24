import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from "@testing-library/react-native";

import RootNavigator from "../../src/Navigation/RootNavigator";
import Main from "../../src/Containers/Main";

describe("[RootNavigation] test", () => {
    test("메인페이지에 페이지 이동 가능한 버튼 확인", async () => {
        const component = (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )

        const { findByText, findAllByText } = render(component)
        const Button = findByText('퀴즈 풀기')

        expect(Button).toBeTruthy()
    })

    test("메뉴 클릭시 메뉴 이동 테스트", async() => {
        const component = (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )

        const rendered = render(component)
        const questionButton = await rendered.findByText('퀴즈 풀기')

        fireEvent.press(questionButton)

        const changeButton = await rendered.findByTestId('quizTitle')

        expect(changeButton).toBeTruthy()
    })
})
