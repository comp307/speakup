import React, {Component} from 'react';
import '../styles/_footer.scss';

/**
 * Footer component.
 * Used to display the footer section on all pages of the application
 */
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container text-center">
                   <p>&copy; 2016 <a target="_blank" href="https://github.com/comp307/speakup">Speakup</a> | All rights reserved
                   </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
