class ScrollBearApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = 'ScrollBear';
    const subtitle = 'Best spellbook ever';
    return (<div>
      <Header title={title} subtitle={subtitle}/>
    </div>);
  }
}

class Header extends React.Component {
  render() {
    return (<div>
      <h1>{this.props.title}</h1>
      <h2>{this.props.subtitle}</h2>
    </div>);
  }
}

ReactDOM.render(<ScrollBearApp/>, document.getElementById('app'));
