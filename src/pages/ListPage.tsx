import React from "react";

export default class ListPage extends React.Component<{}, {title: string}> {
    constructor(props: any) {
      super(props);
      this.state = { title: "Listagem" };
    }
  
    render() {
      return (
        <div className="ListPage">
          {this.state.title}
        </div>
      );
    }
  }
  