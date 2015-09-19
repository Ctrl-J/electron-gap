import React, {Component, PropTypes} from 'react';

class Footer extends Component {
  render() {
    const date = new Date();
    const styles = require('./footer.scss');

    return (
      <div className={styles.footer}>
        <div className={styles.footerCopy}>
          &copy; {date.getDate()}/{date.getMonth()}/{date.getFullYear()} Jordan Marsh
        </div>
        <div className={styles.footerLinks}>

        </div>
      </div>
    );
  }
}
