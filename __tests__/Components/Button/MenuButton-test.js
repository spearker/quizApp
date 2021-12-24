import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MenuButton from "../../../src/Component/Button/MenuButton";

describe("[MenuButton] Test", () => {
    const onPressMock = jest.fn();
    const props = {
        title: "문제풀기",
        onPress: onPressMock,
    };

    test("버튼이 눌린다.", () => {
        const rendered = render(<MenuButton {...props} />);

        for (let i = 0; i < 5; i++) {
            fireEvent(rendered.getByText("문제풀기"), "onPress");
        }
        expect(onPressMock).toBeCalledTimes(5);
        expect(rendered.toJSON().children[0].children[0].children[0]).toEqual(
            "문제풀기",
        );
    });
});
