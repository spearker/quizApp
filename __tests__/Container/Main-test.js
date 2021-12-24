import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Main from "../../src/Containers/Main";

describe("[Main] Test", () => {
    const onPressMock = jest.fn();
    const Props = {}

    test("메뉴 텍스트 출력", () => {
        const rendered = render(<Main {...Props} />)
        rendered.getByText("퀴즈 풀기")
    })

    test("메뉴 버튼 클릭", () => {
        const rendered = render(<Main {...Props} />)
    })
})
