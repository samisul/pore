<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';
	import type { InputValidator } from './input';

	export let label = '';
	export let value = '';
	export let validator: InputValidator | undefined = undefined;
	export let disabled = false;

	$: hasErr = !!validator?.errMsg && validator?.isTouched;
</script>

<div>
	{#if label !== ''}
		<Label for={label} class="mb-2 flex justify-between text-white">
			<span class={hasErr ? 'font-bold text-primary-800 underline decoration-wavy' : 'font-bold'}
				>{label}</span
			>
			{#if hasErr}
				<Helper class="mt-2" color="red"
					><span class="font-medium">
						{validator?.errMsg}
					</span></Helper
				>
			{/if}
		</Label>
	{/if}
	<Input
		{disabled}
		class="border-gray-600 bg-neutral-800 text-white"
		size="sm"
		color={hasErr ? 'red' : 'base'}
		bind:value
		id={label}
		name={label}
		on:blur|once={() => {
			if (validator) {
				validator.isTouched = true;
			}
		}}
	/>
</div>
