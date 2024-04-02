import React from "react";
import { Button, Card, Divider, Layout, Modal } from "antd";
import { IQuestion } from "../../../models/questions";
import questions from "../../../assets/lists/questions.json";

import logo from "../../../assets/img/logo.png";

import "./App.css";
import Sider from "../../organisms/Sider";
import CardTitle from "../../organisms/CardTitle";

const { Header, Content } = Layout;

interface IState {
  currentQuestion: IQuestion;
  bookmarkedQuestions: IQuestion[];
}

const App: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    currentQuestion: { index: -1, question: "", response: "" },
    bookmarkedQuestions: [],
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const selectNewQuestion = () => {
    const max = questions.length;
    const newQuestionIndex = Math.floor(Math.random() * max);
    const newQuestion = questions[newQuestionIndex] as IQuestion;
    registerNewQuestion(newQuestion);
  };

  React.useEffect(() => {
    const state = localStorage.getItem("state");
    if (state === null) {
      const max = questions.length;
      const newQuestionIndex = Math.floor(Math.random() * max);
      const newQuestion = questions[newQuestionIndex] as IQuestion;
      registerNewQuestion(newQuestion);
    } else {
      setState(JSON.parse(state));
    }
  }, []);

  const registerNewQuestion = (q: IQuestion) => {
    setState((s: IState) => {
      const newState = { ...s, currentQuestion: { ...q } };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    });
  };

  const handleOnNewQuestionClick = () => {
    selectNewQuestion();
  };

  const handleOnShowResponseClick = () => {
    setIsModalOpen(true);
  };

  const handleOnQuestionClick = (index: number) => {
    const questionToLoad = questions.find((q) => q.index === index) as
      | IQuestion
      | undefined;
    if (!questionToLoad) return;
    registerNewQuestion(questionToLoad);
  };

  const handleOnQuestionBookmarkClick = () => {
    setState((s: IState) => {
      const newState = {
        ...s,
        bookmarkedQuestions: [...s.bookmarkedQuestions, s.currentQuestion],
      };
      localStorage.setItem("state", JSON.stringify(newState));
      return {
        ...s,
        bookmarkedQuestions: [...s.bookmarkedQuestions, s.currentQuestion],
      };
    });
  };

  const handleOnDeleteBookmark = (index: number) => {
    setState((s: IState) => {
      const newState: IState = {
        ...s,
        bookmarkedQuestions: [
          ...s.bookmarkedQuestions.filter((b) => b.index !== index),
        ],
      };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="App">
      <Layout className="App-layout">
        <Header className="App-header">
          <img className="App-logo" src={logo} alt="Bibliquiz" height="36" />
        </Header>
        <Content className="App-content">
          <Card
            title={
              <CardTitle
                header={`Question ${state.currentQuestion.index + 1} sur ${
                  questions.length
                }`}
                onQuestionBookmarkClick={handleOnQuestionBookmarkClick}
              />
            }
            className="App-card"
          >
            <p className="App-question">{state.currentQuestion.question}</p>
            <Divider />
            <div className="App-card-footer">
              <Button
                onClick={handleOnShowResponseClick}
                className="App-button App-button--response"
              >
                Voir la réponse
              </Button>
              <Button
                onClick={handleOnNewQuestionClick}
                className="App-button  App-button--next"
              >
                Nouvelle question
              </Button>
            </div>
          </Card>
        </Content>
      </Layout>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        centered
        closable={false}
        okButtonProps={{ style: { height: 48, fontSize: "1.5em" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p style={{ fontSize: "2em", textAlign: "center" }}>
          {state.currentQuestion.response}
        </p>
      </Modal>
      <Sider
        questions={state.bookmarkedQuestions}
        onQuestionClick={handleOnQuestionClick}
        onDeleteBookmark={handleOnDeleteBookmark}
      />
    </div>
  );
};

export default App;
