import './Terms.css';

export default function Terms() {
    return (
        <div className="terms-page">
            <div className="terms-container">
                <h1>Terms of Service</h1>
                <p className="last-updated">Last updated: December 25, 2025</p>

                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Ekthaa's services, you accept and agree to be bound by the terms
                        and provision of this agreement.
                    </p>
                </section>

                <section>
                    <h2>2. Use of Service</h2>
                    <p>
                        Ekthaa provides a digital credit management platform. You agree to use the service only
                        for lawful purposes and in accordance with these Terms of Service.
                    </p>
                </section>

                <section>
                    <h2>3. User Accounts</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account credentials and
                        for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2>4. Privacy</h2>
                    <p>
                        Your use of Ekthaa is also governed by our Privacy Policy. Please review our Privacy
                        Policy, which also governs the site and informs users of our data collection practices.
                    </p>
                </section>

                <section>
                    <h2>5. Modifications</h2>
                    <p>
                        Ekthaa reserves the right to modify or replace these Terms at any time. We will notify
                        users of any changes by posting the new Terms on this page.
                    </p>
                </section>

                <section>
                    <h2>6. Contact</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at{' '}
                        <a href="mailto:support@ekthaa.com">support@ekthaa.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
