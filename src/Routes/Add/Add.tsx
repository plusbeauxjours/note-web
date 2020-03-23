import React from "react";
import { Mutation, MutationFunction } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

class Add extends React.Component<RouteComponentProps> {
  public createNote: MutationFunction;
  public render() {
    return (
      <Mutation mutation={ADD_NOTE}>
        {createNote => {
          this.createNote = createNote;
          return <Editor onSave={this._onSave} />;
        }}
      </Mutation>
    );
  }
  public _onSave = (title, content) => {
    const { history } = this.props;
    if (title !== "" && content !== "") {
      this.createNote({ variables: { title, content } });
      history.push("/");
    }
  };
}

export default withRouter(Add);
