import React from "react";
import { Button } from "antd";

import "./CardTitle.css";
import { BookFilled } from "@ant-design/icons";

interface IProps {
  header: string;
  onQuestionBookmarkClick: () => void;
}

const CardTitle: React.FC<IProps> = ({ header, onQuestionBookmarkClick }) => {
  return (
    <div className="CardTitle">
      {header}
      <Button type="primary" onClick={onQuestionBookmarkClick} icon={<BookFilled/>}/>
    </div>
  );
};

export default CardTitle;
