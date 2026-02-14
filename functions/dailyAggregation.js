/**
 * Appwrite Function: Daily Analytics Aggregation
 * 
 * This function should be scheduled to run daily (e.g., at 1 AM UTC via cron: 0 1 * * *)
 * 
 * It:
 * 1. Aggregates raw_traffic_logs from the past day
 * 2. Creates/updates analytics_aggregates with daily summaries
 * 3. Updates power_users cache
 * 4. Cleans up raw logs older than 30 days
 * 
 * To deploy:
 * 1. Create a new Appwrite Function in the console
 * 2. Copy this file as the function code
 * 3. Set environment variables (APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY)
 * 4. Set cron trigger: "0 1 * * *" (daily at 1 AM UTC)
 * 5. Deploy
 */

import { Client, Databases, Query } from 'node-appwrite';

export default async (req, res) => {
    // Initialize Appwrite client
    const client = new Client();
    const databases = new Databases(client);

    // Use environment variables
    client
        .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://syd.cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_PROJECT_ID || '68a41a30000dc7d238ec')
        .setKey(process.env.APPWRITE_API_KEY);

    const DATABASE_ID = '1234567890khatape';
    const BATCH_SIZE = 1000;

    try {
        // Calculate date range for yesterday
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);

        const tomorrow = new Date(yesterday);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dateStr = yesterday.toISOString().split('T')[0];

        console.log(`[Analytics] Starting aggregation for ${dateStr}`);

        // ====================================================================
        // STEP 1: Fetch all raw logs from yesterday
        // ====================================================================
        
        let allLogs = [];
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
            const logs = await databases.listDocuments(
                DATABASE_ID,
                'raw_traffic_logs',
                [
                    Query.greaterThanEqual('timestamp', yesterday.toISOString()),
                    Query.lessThan('timestamp', tomorrow.toISOString()),
                    Query.limit(BATCH_SIZE),
                    Query.offset(offset)
                ]
            );

            allLogs = allLogs.concat(logs.documents);
            offset += BATCH_SIZE;
            hasMore = logs.documents.length === BATCH_SIZE;
        }

        console.log(`[Analytics] Found ${allLogs.length} raw logs for ${dateStr}`);

        // ====================================================================
        // STEP 2: Aggregate metrics
        // ====================================================================

        const metrics = {
            unique_visitors: new Set(),
            total_hits: 0,
            path_stats: {},
            latencies: [],
            referrers: new Set()
        };

        allLogs.forEach(log => {
            // Count unique visitors
            metrics.unique_visitors.add(log.visitorId);

            // Count total hits
            metrics.total_hits += 1;

            // Track per-path statistics
            if (!metrics.path_stats[log.path]) {
                metrics.path_stats[log.path] = 0;
            }
            metrics.path_stats[log.path] += 1;

            // Track referrers
            if (log.referrer && log.referrer !== 'direct') {
                metrics.referrers.add(log.referrer);
            }
        });

        const uniqueVisitorCount = metrics.unique_visitors.size;
        const avgLatency = 45; // Placeholder - calculate from actual API metrics if available
        const successRate = 99.2; // Placeholder - calculate from error logs if available

        // Get top 10 pages
        const topPages = Object.entries(metrics.path_stats)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Get top 10 referrers
        const topReferrers = Array.from(metrics.referrers)
            .slice(0, 10)
            .join(', ');

        console.log(
            `[Analytics] Aggregated: ${uniqueVisitorCount} unique visitors, ${metrics.total_hits} hits`
        );

        // ====================================================================
        // STEP 3: Create or update aggregates record
        // ====================================================================

        const aggregateId = `agg_${dateStr}`;

        // Check if already exists
        try {
            await databases.getDocument(
                DATABASE_ID,
                'analytics_aggregates',
                aggregateId
            );

            // Update existing
            await databases.updateDocument(
                DATABASE_ID,
                'analytics_aggregates',
                aggregateId,
                {
                    date: yesterday.toISOString(),
                    unique_visitors: uniqueVisitorCount,
                    total_hits: metrics.total_hits,
                    avg_latency: avgLatency,
                    success_rate: successRate,
                    top_pages: JSON.stringify(topPages),
                    top_referrers: topReferrers
                }
            );

            console.log(`[Analytics] Updated aggregate for ${dateStr}`);
        } catch (error) {
            // Create new
            await databases.createDocument(
                DATABASE_ID,
                'analytics_aggregates',
                aggregateId,
                {
                    date: yesterday.toISOString(),
                    unique_visitors: uniqueVisitorCount,
                    total_hits: metrics.total_hits,
                    avg_latency: avgLatency,
                    success_rate: successRate,
                    top_pages: JSON.stringify(topPages),
                    top_referrers: topReferrers
                }
            );

            console.log(`[Analytics] Created aggregate for ${dateStr}`);
        }

        // ====================================================================
        // STEP 4: Update power users cache
        // ====================================================================

        const visitorActivity = {};
        allLogs.forEach(log => {
            visitorActivity[log.visitorId] = (visitorActivity[log.visitorId] || 0) + 1;
        });

        const powerUsers = Object.entries(visitorActivity)
            .map(([visitorId, visits]) => ({ visitorId, visits }))
            .sort((a, b) => b.visits - a.visits)
            .slice(0, 100);

        // Save power users for quick queries
        for (const user of powerUsers.slice(0, 20)) {
            const userId = `power_${user.visitorId.slice(0, 20)}`;
            try {
                await databases.updateDocument(
                    DATABASE_ID,
                    'power_users',
                    userId,
                    {
                        visitorId: user.visitorId,
                        totalVisits: user.visits,
                        lastSeen: new Date().toISOString(),
                        cohortMonth: dateStr.substring(0, 7)
                    }
                );
            } catch (error) {
                await databases.createDocument(
                    DATABASE_ID,
                    'power_users',
                    userId,
                    {
                        visitorId: user.visitorId,
                        totalVisits: user.visits,
                        lastSeen: new Date().toISOString(),
                        cohortMonth: dateStr.substring(0, 7)
                    }
                );
            }
        }

        console.log(`[Analytics] Updated ${Math.min(20, powerUsers.length)} power users`);

        // ====================================================================
        // STEP 5: Clean up old raw logs (keep only 30 days)
        // ====================================================================

        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        let deletedCount = 0;
        let deleteOffset = 0;
        let hasMoreToDelete = true;

        while (hasMoreToDelete) {
            const oldLogs = await databases.listDocuments(
                DATABASE_ID,
                'raw_traffic_logs',
                [
                    Query.lessThan('timestamp', thirtyDaysAgo.toISOString()),
                    Query.limit(BATCH_SIZE),
                    Query.offset(deleteOffset)
                ]
            );

            for (const log of oldLogs.documents) {
                try {
                    await databases.deleteDocument(
                        DATABASE_ID,
                        'raw_traffic_logs',
                        log.$id
                    );
                    deletedCount += 1;
                } catch (error) {
                    console.warn(`Failed to delete log ${log.$id}:`, error.message);
                }
            }

            hasMoreToDelete = oldLogs.documents.length === BATCH_SIZE;
            deleteOffset += BATCH_SIZE;
        }

        console.log(`[Analytics] Cleaned up ${deletedCount} logs older than 30 days`);

        // ====================================================================
        // SUCCESS RESPONSE
        // ====================================================================

        return res.json({
            success: true,
            message: `Analytics aggregation completed for ${dateStr}`,
            results: {
                date: dateStr,
                uniqueVisitors: uniqueVisitorCount,
                totalHits: metrics.total_hits,
                topPagesCount: topPages.length,
                powerUsersUpdated: Math.min(20, powerUsers.length),
                oldLogsDeleted: deletedCount
            }
        });

    } catch (error) {
        console.error('[Analytics] Aggregation failed:', error);

        return res.json(
            {
                success: false,
                error: error.message,
                type: error.constructor.name
            },
            500
        );
    }
};
