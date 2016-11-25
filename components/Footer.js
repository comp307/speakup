import React, {Component} from 'react'
import '../styles/_footer.scss';

/**
 * Footer component.
 * Used to display the footer section on all pages of the application
 */
class Footer extends Component {
    render () {
        return (
            <footer className="footer">
                <div className="container">
                    copyright &copy Speakup 2016
                </div>
            </footer>
        )
    }
}

export default Footer;