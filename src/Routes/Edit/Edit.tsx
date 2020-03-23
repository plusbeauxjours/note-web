import React from "react";
import { Query, Mutation, MutationFunction } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { GET_NOTE } from "../../queries";
import Editor from "../../Components/Editor";
import gql from "graphql-tag";

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

class Edit extends React.Component<RouteComponentProps> {
  public editNote: MutationFunction;
  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data.note ? (
            <Mutation mutation={EDIT_NOTE}>
              {editNote => {
                this.editNote = editNote;
                return (
                  <Editor
                    propsId={data.note.id}
                    propsTitle={data.note.title}
                    propsContent={data.note.content}
                    onSave={this._onSave}
                  />
                );
              }}
            </Mutation>
          ) : null
        }
      </Query>
    );
  }
  public _onSave = (title: string, content: string, id: string) => {
    const {
      history: { push }
    } = this.props;
    if (title !== "" && content !== "" && id) {
      this.editNote({ variables: { title, content, id } });
      push("/");
    }
  };
}

export default withRouter(Edit);
