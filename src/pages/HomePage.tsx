import React from "react";

interface HomePageState {
  title: string;
}

export default class HomePage extends React.Component<{}, HomePageState> {
  constructor(props: any) {
    super(props);
    this.state = { title: "Página Inicial" };
  }

   render() {
    return (
      <div className="HomePage">
        {this.state.title}       
      </div>
    );
  }
}
