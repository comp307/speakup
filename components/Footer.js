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
                <div className="container text-center">
                   <p> Copyright <span className="glyphicon glyphicon-copyright-mark"></span> Speakup 2016</p>
                </div>
            </footer>
        )
    }
}

export default Footer;