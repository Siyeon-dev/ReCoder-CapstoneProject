import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Component } from "react";

export default class ProblemEditor extends Component {
  state = {
    problemState: EditorState.createEmpty(),
  };

  onEditorStateChange = (problemState) => {
    this.setState({
      problemState,
    });
  };

  render() {
    const { problemState } = this.state;
    return (
      <div>
        <Editor
          editorState={problemState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
