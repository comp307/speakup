import React, {Component} from 'react'

/**
 * Main component.
 * Represents the contents of the default page
 */
class Main extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Main Page
        // Put some fancy promo video here
      </div>
    );
  }
}

export default Main;
