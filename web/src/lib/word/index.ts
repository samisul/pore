import { env } from '$lib/env';
import { del, get, post, put } from '$lib/http';
import { AddWordDto, UpdateWordDto, type WordDto, type WordPreviewDto } from './model';

const WORDS_URL = `${env.baseUrl}/words`;

export async function getWords(): Promise<WordPreviewDto[]> {
	return get<WordPreviewDto[]>(`${WORDS_URL}`);
}

export async function getWord(id: string): Promise<WordDto> {
	return get<WordDto>(`${WORDS_URL}/${id}`);
}

export async function addWord(word: AddWordDto): Promise<void> {
	post<AddWordDto>(`${WORDS_URL}`, word);
}

export async function updateWord(id: string, word: UpdateWordDto): Promise<void> {
	put<UpdateWordDto>(`${WORDS_URL}/${id}`, word);
}

export async function deleteWord(id: string): Promise<void> {
	del(`${WORDS_URL}/${id}`);
}
