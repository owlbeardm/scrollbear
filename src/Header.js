import React from 'react';

export default class Header extends React.Component {
  render() {
    return (<div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">{this.props.title}</a>
      </nav>
    </div>);
  }
}
