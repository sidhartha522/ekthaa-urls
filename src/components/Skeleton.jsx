import React from 'react';

/**
 * Skeleton loader component for loading states
 */

// Base skeleton with animation
export const Skeleton = ({ className = '', animate = true }) => (
    <div
        className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
    />
);

// Text skeleton
export const SkeletonText = ({ lines = 1, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array(lines).fill(0).map((_, i) => (
            <Skeleton
                key={i}
                className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };
    return <Skeleton className={`${sizes[size]} rounded-full ${className}`} />;
};

// Card skeleton
export const SkeletonCard = ({ className = '' }) => (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
        <Skeleton className="w-full h-40 rounded-lg mb-4" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-6 w-1/3" />
    </div>
);

// Product card skeleton
export const SkeletonProductCard = ({ className = '' }) => (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm ${className}`}>
        <Skeleton className="w-full h-40" />
        <div className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-6 w-20 mb-2" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    </div>
);

// Business card skeleton
export const SkeletonBusinessCard = ({ className = '' }) => (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
        <div className="flex items-start gap-4">
            <SkeletonAvatar size="lg" />
            <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-16 rounded-full mb-3" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
            </div>
        </div>
    </div>
);

// List item skeleton
export const SkeletonListItem = ({ className = '' }) => (
    <div className={`flex items-center gap-4 p-4 bg-white rounded-lg ${className}`}>
        <SkeletonAvatar size="md" />
        <div className="flex-1">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-3 w-3/4" />
        </div>
    </div>
);

// Page header skeleton
export const SkeletonPageHeader = ({ className = '' }) => (
    <div className={`bg-gradient-to-r from-gray-300 to-gray-200 py-8 px-4 ${className}`}>
        <div className="container mx-auto animate-pulse">
            <Skeleton className="h-8 w-48 bg-white/30 mb-2" />
            <Skeleton className="h-5 w-32 bg-white/20" />
        </div>
    </div>
);

// Grid skeleton
export const SkeletonGrid = ({ cols = 4, items = 8, Card = SkeletonProductCard, className = '' }) => (
    <div className={`grid grid-cols-2 md:grid-cols-${Math.min(cols, 3)} lg:grid-cols-${cols} gap-4 ${className}`}>
        {Array(items).fill(0).map((_, i) => <Card key={i} />)}
    </div>
);

// Full page loader
export const PageLoader = ({ message = 'Loading...' }) => (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">{message}</p>
        </div>
    </div>
);

// Products page skeleton
export const ProductsPageSkeleton = () => (
    <div className="min-h-screen bg-brand-cream">
        <SkeletonPageHeader />
        <div className="container mx-auto px-4 py-6">
            {/* Search bar skeleton */}
            <div className="bg-white rounded-lg p-4 mb-6">
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            {/* Category filter skeleton */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
                ))}
            </div>
            {/* Grid skeleton */}
            <SkeletonGrid cols={4} items={8} />
        </div>
    </div>
);

// Businesses page skeleton
export const BusinessesPageSkeleton = () => (
    <div className="min-h-screen bg-brand-cream">
        <SkeletonPageHeader />
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg p-4 mb-6">
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="flex gap-2 mb-6">
                <Skeleton className="h-10 w-32 rounded-lg" />
                {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-20 rounded-full" />
                ))}
            </div>
            <SkeletonGrid cols={3} items={6} Card={SkeletonBusinessCard} />
        </div>
    </div>
);

// Detail page skeleton
export const DetailPageSkeleton = () => (
    <div className="min-h-screen bg-brand-cream">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="h-80 rounded-xl" />
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <Skeleton className="h-6 w-24 rounded-full mb-4" />
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-32 mb-6" />
                    <SkeletonText lines={3} />
                </div>
            </div>
        </div>
    </div>
);

export default {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonProductCard,
    SkeletonBusinessCard,
    SkeletonListItem,
    SkeletonPageHeader,
    SkeletonGrid,
    PageLoader,
    ProductsPageSkeleton,
    BusinessesPageSkeleton,
    DetailPageSkeleton
};
