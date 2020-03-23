import React, { useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;

interface IProps {
  onSave: (title: string, content: string, id?: string) => void;
  propsId?: string;
  propsTitle?: string;
  propsContent?: string;
}

const Editor: React.FunctionComponent<IProps> = ({
  onSave,
  propsId,
  propsTitle,
  propsContent
}) => {
  const [id, setId] = useState<string>(propsTitle || "");
  const [title, setTitle] = useState<string>(propsTitle || "");
  const [content, setContent] = useState<string>(propsContent || "");

  const _onInputChange = event => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "id") {
      setId(value);
    } else {
      return;
    }
  };

  const _onSave = () => {
    onSave(title, content, id);
  };
  return (
    <>
      <TitleContainer>
        <TitleInput
          value={title}
          onChange={_onInputChange}
          placeholder={"Untitled..."}
          name={"title"}
        />
        <Button onClick={_onSave}>Save</Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={_onInputChange}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <MarkdownRenderer markdown={content} className={"markdown"} />
      </ContentPreview>
    </>
  );
};

export default Editor;
