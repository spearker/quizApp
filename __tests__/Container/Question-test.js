import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from "@testing-library/react-native";
import axios from "axios";
import {fetchQuiz, QUIZ_URL} from "../../utils/fetchQuiz";
import Question from "../../src/Containers/Question";

const datas = [
    {
        category: "Science: Mathmatics",
        type: "multiple",
        difficulty: "medium",
        question: "What is the area of a circle with a diameter of 20 inches if &pi;=3.1415?",
        correct_answer: "314.15 Inches",
        incorrect_answers: [
            "380.1215 Inches",
            "3141.5 Inches",
            "1256.6 Inches"
        ]
    },
]

describe('[Axios] test', () => {
    test('퀴즈 api 요청이 성공적으로 응답 했을 때', async () => {
        const mockAxiosGet = jest.spyOn(axios, "get")
        mockAxiosGet.mockResolvedValue({data: datas})

        const result = await fetchQuiz()

        expect(axios.get).toBeCalledWith(QUIZ_URL)
        expect(result).toEqual(datas)
    })

    test('퀴즈 api 요청이 성공적으로 응답 했을 때', async () => {
        axios.get.mockRejectedValueOnce(new Error("Network error"))

        const result = await fetchQuiz()

        expect(axios.get).toBeCalledWith(QUIZ_URL)
        expect(result).toEqual({
            results: []
        })
    })
});

describe('[Question] test', () => {
    test('퀴즈 api 요청이 성공적으로 응답 했을 때', async () => {
        const rendered = render(<Question />)

        const quizTitle = await rendered.getByTestId('quizTitle')
        const Answer0 = await rendered.getByTestId('answer_button_0')
        const Answer1 = await rendered.getByTestId('answer_button_1')
        const Answer2 = await rendered.getByTestId('answer_button_2')
        const Answer3 = await rendered.getByTestId('answer_button_3')

        expect(Answer0).toBeTruthy()
        expect(Answer1).toBeTruthy()
        expect(Answer2).toBeTruthy()
        expect(Answer3).toBeTruthy()

        fireEvent.changeText(quizTitle, datas[0].question)

        expect(quizTitle).toBeTruthy()
    })
});
