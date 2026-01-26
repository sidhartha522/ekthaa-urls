import { Client, Databases, Query } from 'appwrite';

const client = new Client();

const PROJECT_ID = '68a41a30000dc7d238ec';
// Use the Sydney endpoint as verified
const ENDPOINT = 'https://syd.cloud.appwrite.io/v1';

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const databases = new Databases(client);
export { Query };

export const APPWRITE_CONFIG = {
    DATABASE_ID: '1234567890khatape',
    COLLECTION_ID_CATALOG: 'catalog',
    COLLECTION_ID_BUSINESSES: 'businesses',
    // New Analytics Collections
    COLLECTION_ID_RAW_TRAFFIC: 'raw_traffic_logs',
    COLLECTION_ID_ANALYTICS_AGGREGATES: 'analytics_aggregates',
    COLLECTION_ID_POWER_USERS: 'power_users',
    COLLECTION_ID_USER_COHORTS: 'user_cohorts',
    COLLECTION_ID_UNIQUE_VIEWS: 'unique_views'
};
