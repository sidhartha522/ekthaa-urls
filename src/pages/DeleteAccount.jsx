import React from 'react';
import './DeleteAccount.css';

function DeleteAccount() {
  return (
    <div className="delete-account-container">
      <article className="delete-account-content">
        <h1>Delete Account & Data – Ekthaa Business</h1>
        
        <p className="intro-text">
          Users of Ekthaa Business can request deletion of their account and associated data at any time.
        </p>

        <section>
          <h2>How to Request Deletion</h2>
          <p>Please send an email to <strong><a href="mailto:support@ekthaa.app">support@ekthaa.app</a></strong> with the subject line:</p>
          
          <div className="email-box">
            <code>"Account Deletion Request – Ekthaa Business"</code>
          </div>

          <p>Include the following details:</p>
          <ul>
            <li>Registered phone number or email</li>
            <li>Business name (if applicable)</li>
          </ul>
        </section>

        <section>
          <h2>What Data Will Be Deleted</h2>
          <ul>
            <li><strong>Account information</strong></li>
            <li><strong>Business profile details</strong></li>
            <li><strong>Customer data and transaction records</strong></li>
          </ul>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            Some information may be retained temporarily to comply with legal or regulatory requirements. 
            All other data will be permanently deleted within <strong>7–30 days</strong> after verification.
          </p>
        </section>

        <section className="contact-section">
          <h2>Need Help?</h2>
          <p>
            If you have any questions about the account deletion process, please contact us:
          </p>
          <p>
            📧 <strong><a href="mailto:support@ekthaa.app">support@ekthaa.app</a></strong>
          </p>
        </section>
      </article>
    </div>
  );
}

export default DeleteAccount;
