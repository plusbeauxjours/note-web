import React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import styled from "styled-components";
import MarkDownRenderer from "react-markdown-renderer";
import { GET_NOTE } from "../../queries";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  height: 80px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  border: 1px solid black;
`;

interface MatchParams {
  id: string;
}

const Note: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const {
    params: { id }
  } = match;
  return (
    <Query query={GET_NOTE} variables={{ id }}>
      {({ data }) =>
        data ? (
          <>
            <TitleComponent>
              <Title>{data.note && data.note.title}</Title>
              <Link to={`/edit/${data.note.id}`}>
                <Button>Edit</Button>
              </Link>
            </TitleComponent>
            <MarkDownRenderer markdown={data.note.content} />
          </>
        ) : null
      }
    </Query>
  );
};
export default Note;
