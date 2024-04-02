import React from "react";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";

import "./Sider.css";
import { IQuestion } from "../../../models/questions";
import { Button } from "antd";

interface IProps {
  questions: IQuestion[];
  onQuestionClick: (index:number) => void;
  onDeleteBookmark: (index:number) => void;
}

const Sider: React.FC<IProps> = ({ questions, onQuestionClick, onDeleteBookmark }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className={`Sider ${open ? "Sider--open" : ""}`}>
      <label className="Sider-toggleButton" htmlFor="toggle">
        <LeftOutlined className="Sider-icon" />
      </label>
      <input
        style={{ display: "none" }}
        onChange={(evt) => setOpen(evt.target.checked)}
        type="checkbox"
        name="toggle"
        id="toggle"
      />
      <div className="Sider-container">
        <h2 style={{textAlign:"center", paddingBottom: 8, margin: "8px 4px", borderBottom: '1px solid lightgray'}}>Questions enregistrées</h2>
        {questions.map((q) => (
          <div className="Sider-item">
          <p onClick={() => onQuestionClick(q.index)}>{q.question}</p>
          <Button onClick={() => onDeleteBookmark(q.index)} danger icon={<DeleteOutlined />}/></div>
        ))}
      </div>
    </div>
  );
};

export default Sider;
