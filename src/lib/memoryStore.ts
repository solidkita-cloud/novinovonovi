// src/lib/memoryStore.ts
import { Wish } from '@/types/birthday';
import { SEED_WISHES } from '@/data/seedWishes';

// Global shared store for in-memory fallback testing
export const sharedWishesStore: Wish[] = [...SEED_WISHES];
