import type { SourcePreviewDto } from '$lib/source/model';
import { writable } from 'svelte/store';

export const sources = writable<SourcePreviewDto[]>([]);