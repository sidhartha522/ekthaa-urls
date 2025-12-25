import './Privacy.css';

export default function Privacy() {
    return (
        <div className="privacy-page">
            <div className="privacy-container">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last updated: December 25, 2025</p>

                <section>
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information that you provide directly to us, including your name, email
                        address, phone number, and transaction data when you use our services.
                    </p>
                </section>

                <section>
                    <h2>2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services,
                        process transactions, send you technical notices and support messages, and respond to
                        your requests.
                    </p>
                </section>

                <section>
                    <h2>3. Information Sharing</h2>
                    <p>
                        We do not share your personal information with third parties except as described in
                        this policy. We may share information with service providers who perform services on our
                        behalf.
                    </p>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>
                        We take reasonable measures to help protect your personal information from loss, theft,
                        misuse, unauthorized access, disclosure, alteration, and destruction.
                    </p>
                </section>

                <section>
                    <h2>5. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information. You may also
                        object to or restrict certain processing of your information.
                    </p>
                </section>

                <section>
                    <h2>6. Changes to Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes
                        by posting the new Privacy Policy on this page.
                    </p>
                </section>

                <section>
                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@ekthaa.com">privacy@ekthaa.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
