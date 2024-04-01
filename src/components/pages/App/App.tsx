import React from 'react';
import { Button, Card, Divider, Layout, Modal } from 'antd';
import { IQuestion } from '../../../models/questions';
import questions from "../../../assets/lists/questions.json";

import logo from "../../../assets/img/logo.png";

import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [state, setState] = React.useState<IQuestion>({ index: -1, question: "", response: "" });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const selectNewQuestion = () => {
    const max = questions.length;
    const newQuestionIndex = Math.floor(Math.random() * max);
    const newQuestion = questions[newQuestionIndex] as IQuestion;
    setState({ ...newQuestion, index: newQuestionIndex });
    localStorage.setItem("question", JSON.stringify({ ...newQuestion, index: newQuestionIndex }))
  }

  React.useEffect(() => {
    const question = localStorage.getItem('question');
    if (question === null) {
      selectNewQuestion();
    } else {
      setState(JSON.parse(question));
    }
  }, [])

  const handleOnNewQuestionClick = () => {
    selectNewQuestion();
  }

  const handleOnShowResponseClick = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      <Layout className='App-layout'>
        <Header className='App-header'>
          <img className='App-logo' src={logo} alt="Bibliquiz" height="36" />
        </Header>
        <Content className='App-content'>
          <Card title={`Question ${state.index + 1} sur ${questions.length}`} className='App-card'>
            <p className='App-question'>{state.question}</p>
            <Divider />
            <div className='App-card-footer'>
              <Button onClick={handleOnShowResponseClick} className='App-button App-button--response'>Voir la réponse</Button>
              <Button onClick={handleOnNewQuestionClick} className='App-button  App-button--next'>Nouvelle question</Button>
            </div>
          </Card>
        </Content>
      </Layout>
      <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} centered closable={false} okButtonProps={{ style: { height: 48, fontSize: '1.5em' } }} cancelButtonProps={{ style: { display: 'none' } }}>
        <p style={{ fontSize: "2em", textAlign: "center" }}>{state.response}</p>
      </Modal>
    </div>
  );
}

export default App;
