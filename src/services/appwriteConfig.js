import { Client, Databases } from 'appwrite';

const client = new Client();

const PROJECT_ID = '68a41a30000dc7d238ec';
// Use the Sydney endpoint as verified
const ENDPOINT = 'https://syd.cloud.appwrite.io/v1';

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const databases = new Databases(client);

export const APPWRITE_CONFIG = {
    DATABASE_ID: '1234567890khatape',
    COLLECTION_ID_CATALOG: 'catalog'
};
