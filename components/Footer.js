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
                    I am a footer
                </div>
            </footer>
        )
    }
}

export default Footer;